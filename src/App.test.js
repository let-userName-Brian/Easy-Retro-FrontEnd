import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'

const app = (<Router><App /></Router>)

test('renders without crashing', () => {
  render(app)
})