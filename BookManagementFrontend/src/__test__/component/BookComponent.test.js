import React from 'react';

import axios from 'axios';

import BookComponent from '../.././component/BookComponent';
import renderer from 'react-test-renderer';

import { BrowserRouter as Router} from 'react-router-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

jest.mock('axios');

test("renders correctly", async () => {

    const books = [{ "id": 10001,"username": "bytecaptain", "title": "title1", "description": "description1", "author":"author1" }, { "id": 10002,"username": "bytecaptain", "title": "title2", "description": "description2", "author":"author2"  }];
    axios.get.mockResolvedValue(books);

    const addParams = {params: {id: -1}};
    const addBookComponent = renderer.create(<Router><BookComponent match={addParams}/></Router>).toJSON();
    expect(addBookComponent).toMatchSnapshot();

});

test('add book', async () => {

    const params = {params: {id: -1}};
    render(<Router><BookComponent match={params} /></Router>);
    
    const descriptionField = screen.getByTestId('bookDescription');
    await waitFor(() => descriptionField);
    fireEvent.blur(descriptionField);

    const bookContainer = screen.getByTestId('bookContainer');
    await waitFor(() => {
        expect(bookContainer).toHaveTextContent("Enter a Description");  
    });

    fireEvent.change(descriptionField, { target: { value: '112' }});

    await waitFor(() => {
        expect(bookContainer).toHaveTextContent("Enter at least 5 Characters in Description");  
    }); 

    fireEvent.change(descriptionField, { target: { value: 'Description' }});
    
    await waitFor(() => {
        const descriptionError = screen.queryByText("Enter at least 5 Characters in Description");
        expect(descriptionError).toBeNull();
    }); 
    
    let book = { "id": 10001, "username": "bytecaptain", "title": "title1", "description": "description1", "author":"author1" };
    axios.post.mockResolvedValue(book);

    const button = screen.getByText("Save");

    await waitFor(() => {
        fireEvent.click(button);
    });  
    
});

test('update book', async () => {

    //TODO refactor to be reused
    const updatedbook = {data: { "id": 10001,"username": "bytecaptain", "title": "title1", "description": "description1", "author":"author1"}};
    axios.get.mockResolvedValue(updatedbook);

    const params = {params: {id: 10001}};
    render(<Router><BookComponent match={params} /></Router>);
    
    const descriptionField = screen.getByTestId('bookDescription');
    await waitFor(() => descriptionField);

    fireEvent.change(descriptionField, { target: { value: 'description1 updated' }});
    
    let book = { "id": 10001,"username": "bytecaptain",   "title": "title1", "description": "description1 updated", "author":"author1" };
    axios.put.mockResolvedValue(book);

    const button = screen.getByText("Save");

    await waitFor(() => {
        fireEvent.click(button);
    });    
    
});
