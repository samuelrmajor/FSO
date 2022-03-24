import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    author: 'fakeauthor',
    title: 'faketitle',
    likes: 5,
    url: 'urlfake'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('fakeauthor')
  expect(element).toBeDefined()
})