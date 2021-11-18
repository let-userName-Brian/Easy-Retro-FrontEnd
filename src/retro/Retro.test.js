import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { mock_retros } from './MockData';
import Retro from './Retro';
import { createMemoryHistory } from 'history'
import App from '../App';

const server = setupServer(
  rest.get('/retros', (req, res, ctx) => {
    return res(ctx.json(mock_retros))
  }),
)

const retro = (<Router><Retro /></Router>)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Displays the retro page without crashing', () => {
  render(retro)
})


test('Displays the ID of the retro', () => {
  const retro_id = mock_retros[0].retro_id
  const retroUrl = `/retro/${retro_id}`

  render(<Router initialEntries={[retroUrl]}>
    <Routes>
      <Route path="/retro/:retro_id" element={<Retro />} />
    </Routes>
  </Router>)

  const reg = new RegExp(retro_id, "gi")
  expect(screen.getByText(reg)).toBeInTheDocument()
})

test('Displays the name of the retro', () => {
  const retro_id = mock_retros[0].retro_id
  const retroUrl = `/retro/${retro_id}`

  render(<Router initialEntries={[retroUrl]}>
    <Routes>
      <Route path="/retro/:retro_id" element={<Retro />} />
    </Routes>
  </Router>)

  const reg = new RegExp(mock_retros[0].retro_name, "gi")
  expect(screen.getByText(reg)).toBeInTheDocument()
})