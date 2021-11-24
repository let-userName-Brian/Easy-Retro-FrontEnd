//need to test
import React from 'react';
import RetroModal from './RetroModal';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react'
import Dashboard from './Dashboard';
import '@testing-library/jest-dom/extend-expect';

const modalRenderer = (
    <Router>
      <Dashboard>
        <RetroModal />
      </Dashboard>
    </Router>)
  
function openModal() {
  render(modalRenderer)
  const openRetroButton = screen.getByText(/create a new retro/i)
  fireEvent.click(openRetroButton)
}


//displays "retro options" text
it('displays retro options text', () => {
    openModal();
    const title = screen.getByText(/retro options/i);
    expect(title).toBeInTheDocument();
  });

//-----------------------Retro Name-----------------------------------------------------------------------------------------------
//displays retro name text feild
it('displays retro name text field', async () => {
    openModal();
    const title = await screen.findByText(/retro options/i);
    expect(title).toBeInTheDocument();
  });

//can type in retro name text feild
it('can type in retro name text feild', async() => {
    openModal();
    const retroName = await screen.findByLabelText(/Retro Name?/i);
    expect(retroName).toBeInTheDocument();
  });

//-----------------------Column Feild 1-----------------------------------------------------------------------------------------------
//displays column text feild1
it('displays column text feild1', async() => {
    openModal();
    const col1 = await screen.findByLabelText(/Column 1 name/i);
    expect(col1).toBeInTheDocument();
  });

//can type into column text feild1
it('can type into column text feild1', async () => {
    openModal();
    const col1 = await screen.findByLabelText(/Column 1 name/i);
    fireEvent.change(col1, {target: {value: 'test'}})
    expect(col1.value).toBe('test')
  });

//-----------------------Column Feild 2-----------------------------------------------------------------------------------------------
//displays column text feild2
it('displays column text feild2', async () => {
    openModal();
    const col2 = await screen.findByLabelText(/Column 2 name/i);
    expect(col2).toBeInTheDocument();
  });

//can type into column text feild2
it('can type into column text feild2', async () => {
    openModal();
    const col2 = await screen.findByLabelText(/Column 2 name/i);
    fireEvent.change(col2, {target: {value: 'test'}})
    expect(col2.value).toBe('test')
  });

//-----------------------Column Feild 3-----------------------------------------------------------------------------------------------
//displays column text feild3
it('displays column text feild3', async () => {
    openModal();
    const col3 = await screen.findByLabelText(/Column 3 name/i);
    expect(col3).toBeInTheDocument();
  });

//can type into column text feild3
it('can type into column text feild3', async () => {
    openModal();
    const col3 = await screen.findByLabelText(/Column 3 name/i);
    fireEvent.change(col3, {target: {value: 'test'}})
    expect(col3.value).toBe('test');
  });

//------------------------Tags Feild 1----------------------------------------------------------------------------------------------
//displays #tags text feild1
it('displays #tags text feild1', async() => {
  openModal();
  const tagsOne = await screen.findByLabelText(/tag1/i);
  expect(tagsOne).toBeInTheDocument();
});

//can type into #tags text feild1
it('can type into #tags text feild1', async () => {
  openModal();
  const tagsOne = await screen.findByLabelText(/tag1/i);
  fireEvent.change(tagsOne, {target: {value: 'test'}})
  expect(tagsOne.value).toBe('test');
});
//--------------------------Tags Feild 2--------------------------------------------------------------------------------------------

//displays #tags text feild2
it('displays "tags" text feild2', async() => {
  openModal();
  const tagsTwo = await screen.findByLabelText(/tag2/i);
  expect(tagsTwo).toBeInTheDocument();
});

//can type into #tags text feild2
it('can type into #tags text feild2', async () => {
  openModal();
  const tagsTwo = await screen.findByLabelText(/tag2/i);
  fireEvent.change(tagsTwo, {target: {value: 'test'}})
  expect(tagsTwo.value).toBe('test');
});

//----------------------------Tags Feild 3------------------------------------------------------------------------------------------
//displays #tags text feild3
it('displays "tags" text feild3', async() => {
  openModal();
  const tagsThree = await screen.findByLabelText(/tag3/i);
  expect(tagsThree).toBeInTheDocument();
});

//can type into #tags text feild3
it('can type into "tags" feild 3', async () =>{
  openModal();
  const tagsThree = await screen.findByLabelText(/tag3/i);
  fireEvent.change(tagsThree, {target: {value: 'test'}})
  expect(tagsThree.value).toBe('test');
})
//-------------------------------Cancel Button---------------------------------------------------------------------------------------
//displays "cancel button"
it('displays "cancel" button', async() => {
    openModal();
    const cancelButton = await screen.findByText(/cancel/i);
    expect(cancelButton).toBeInTheDocument();
});
  
//----------------------------------Create Button------------------------------------------------------------------------------------
//displays 'create' button
it('displays "create" button', async () => {
  openModal();
  const createButton = await screen.findByText("Create");
  expect(createButton).toBeInTheDocument();
});



