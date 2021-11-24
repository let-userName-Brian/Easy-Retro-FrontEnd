import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react'
import Dashboard from './Dashboard';
import RetroCards from './RetroCards';
import '@testing-library/jest-dom/extend-expect';
import {userRetro as retros} from '../App';
import users from '../App';

const cardRenderer = (
    <Router>
      <Dashboard users={users}>
        <RetroCards retros={retros}/>
      </Dashboard>
    </Router>)

//come back to this when we have eveything talking 
xit('has a card', async ()=>{
    render(cardRenderer);
    const card = await screen.findByText(/Chasten's Thoughts on Mjolnir/i)
    expect(card).toBeInTheDocument();
})

//open retro button exists
xit('has an open retro button in the card ', async ()=>{
    render(cardRenderer);
    const openRetroButton = await screen.findById(1)
    expect(openRetroButton).toBeInTheDocument();
})

//opens the retro when clicked 
//look at the app on localhost
//check if title exists on card
xit('has a title on the card', async ()=>{
    render(cardRenderer);
    const title = await screen.findByText(/chasten's thoughts on mjolnir/i)
    expect(title).toBeInTheDocument();
})

//verify ID exists on card
xit('has an id on the card for the retro', async ()=>{
    render(cardRenderer);
    const id = await screen.findByAltText(/e0fef645-088d-4f13-b53a-ccb95f4f2131/i)
    expect(id).toBeInTheDocument();
})