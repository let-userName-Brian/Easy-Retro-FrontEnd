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


//come back to this when we have eveything talking 
it('has a card', ()=>{
    render(dashRender);
    const card = screen.getByText(/chasten's thoughts on mjolnir/i)
    expect(card).toBeInTheDocument();
})

//open retro button exists
xit('has an open retro button in the card ', async ()=>{
    render(dashRender);
    const openRetroButton = await screen.findByText(/open retro/i)
    expect(openRetroButton).toBeInTheDocument();
})

//opens the retro when clicked 

//check if title exists on card
it('has a title on the card', async ()=>{
    render(dashRender);
    const title = await screen.findByText(/chasten's thoughts on mjolnir/i)
    expect(title).toBeInTheDocument();
})

//verify ID exists on card
xit('has an id on the card for the retro', async ()=>{
    render(dashRender);
    const id = await screen.findByText(/e0fef645-088d-4f13-b53a-ccb95f4f2131/i)
    expect(id).toBeInTheDocument();
})

