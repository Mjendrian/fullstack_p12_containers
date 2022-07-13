import React from 'react'

const Detail = ({ todo }) => {

  console.log(todo);
  
  if(!todo) { 
    return (
      <div></div>
    )
  }


  return (
    <div>
      <h2>
        Todo : {todo.text}
      </h2>
      <p>
        Done : {todo.done}
      </p>
    </div>
  )
  
}

export default Detail