import React from 'react';
import Navbar from "./Navbar";
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react'
import Dashboard from './Dashboard';
import '@testing-library/jest-dom/extend-expect';
import {setDarkMode} from "../App.js"


const navRenderer = (
  <Router>
    <Dashboard>
      <Navbar />
    </Dashboard>
  </Router>)

it('contains an image', () => {
  render(navRenderer);
  const image = screen.getByAltText('Logo');
  expect(image).toBeInTheDocument();
});

it('has a light/dark mode switch', () =>{
    render(navRenderer);
    const darkModeButton = screen.getByTestId("Brightness7Icon");
    expect(darkModeButton).toBeInTheDocument();
})

// xit('toggles between light and dark mode', async ()=>{
//     render(
//     <Router>
//       <Dashboard setDarkMode={setDarkMode}>
//       <Navbar />
//       </Dashboard>
//       </Router>
//     );
//     const darkModeButton = screen.getByTestId("Brightness7Icon");
//     fireEvent.click(darkModeButton);
//     const darkModeToggle = await screen.findByTestId('Brightness7Icon', {hidden: false})
//     expect(darkModeToggle).toBeInTheDocument();
// })


it('displays an avatar', () =>{
    render(navRenderer);
    const avatar = screen.getByLabelText("account of current user");
    expect(avatar).toBeInTheDocument();
})

it('opens popout menu containing "Admin Tools" when avatar is clicked', async () =>{
  render(navRenderer);
  const avatarButton = screen.getByLabelText("account of current user");
  fireEvent.click(avatarButton);
  const popoutMenu = await screen.findByText(/Admin Tools/i);
  expect(popoutMenu).toBeInTheDocument();
})

it('opens popout menu containing "My Retros" when avatar is clicked', async () =>{
  render(navRenderer);
  const avatarButton = screen.getByLabelText("account of current user");
  fireEvent.click(avatarButton);
  const popoutMenu = await screen.findByText(/My Retros/i);
  expect(popoutMenu).toBeInTheDocument();
})


