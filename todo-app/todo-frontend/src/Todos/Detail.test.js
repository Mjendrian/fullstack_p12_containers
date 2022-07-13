import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Detail from './Detail'

test('renders content', () => {
  const todo = {
    text: 'Do a ton of stuff',
    done: false
  }

  render(<Detail todo={todo} />)

  const element = screen.getByText('Todo : Do a ton of stuff')
  expect(element).toBeDefined()
})