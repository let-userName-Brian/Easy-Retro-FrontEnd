import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react'
import Dashboard from './Dashboard';
import '@testing-library/jest-dom/extend-expect';

const dashRender = (
  <Router>
    <Dashboard />
  </Router>
);


it('displays "welcome back" ', async() => {
 render(dashRender);
 const welcome = await screen.findByText(/welcome back/i);
 expect(welcome).toBeInTheDocument();
});

it('has a search bar', ()=>{
  render(dashRender);
  const searchBar = screen.getByPlaceholderText(/Search.../i);
  expect(searchBar).toBeInTheDocument();
});

it('has a search bar that cancan receive input', ()=>{
  render(dashRender);
  const searchBar = screen.getByPlaceholderText(/Search.../i);
  fireEvent.change(searchBar, {target: {value: 'test'}})
  expect(searchBar.value).toBe('test'); 
})

//search bar displays hastags when searched for

it('has a new retro button', ()=>{
    render(dashRender);
    const newRetroButton = screen.getByText(/create a new retro/i);
    expect(newRetroButton).toBeInTheDocument();
})

//creates a new retro when clicked

it('displays "Your active retros" ', ()=>{
    render(dashRender);
    const retroHeaderText = screen.getByText(/your active retros/i)
    expect(retroHeaderText).toBeInTheDocument();
})




