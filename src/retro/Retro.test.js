import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mock_retro } from './MockData';
import Retro from './Retro';

const server = setupServer(
  rest.get('/retros', (req, res, ctx) => {
    return res(ctx.json(mock_retro))
  }),
)

const retro = (<Router><Retro /></Router>)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Displays the retro page without crashing', () => {
  render(retro)
})