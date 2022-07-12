const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const redis = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  console.log(todo);
  const added_todos = await redis.getAsync("added_todos") || 0;
  console.log(added_todos);
  if(!added_todos) {
    await redis.setAsync("added_todos", 1);
  }else{
    await redis.setAsync("added_todos", Number(added_todos) + 1);
  }
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  console.log(req.body);
  console.log(req.todo.id);

  const updateCallback = (err, todo) => {
    if (err){
      res.status(400);
      res.send(err);
    } else {
      res.status(200);
      res.send(todo);
    }
  } 

  const todo = await Todo.updateOne({_id:req.todo.id}, req.body, updateCallback);

});


router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
