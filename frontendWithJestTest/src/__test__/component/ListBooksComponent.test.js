import React, { Component } from 'react';

import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import ListBooksComponent from '../../component/ListBooksComponent';

import BookDataService from '../../service/BookDataService';
import renderer from 'react-test-renderer'

import { BrowserRouter as Router} from 'react-router-dom';

import axios from 'axios';

const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
const username = 'bytecaptain';

jest.mock('axios');

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test("renders correctly", async() => {

    const books = [{ "id": 10001, "title": "title1", "description": "description1", "author":"author1" }, { "id": 10002, "title": "title2", "description": "description2", "author":"author2" }];
    axios.get.mockResolvedValue(books);

    const tree = renderer.create(<ListBooksComponent />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render ListBookComponent widgets with user logged in ', async() => {

    const books = [{ "id": 10001, "title": "title1", "description": "description1", "author":"author1"}, { "id": 10002, "title": "title2", "description": "description2", "author":"author2" }];
    let response = { data: books };
    axios.get.mockResolvedValue(response);
	//test if user logged in
	sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    const { container } = render(<ListBooksComponent />);

    //Verify text
    expect(screen.getByText(/All Books/i)).toBeInTheDocument()
    expect(screen.getByText(/Id/i)).toBeInTheDocument()
    expect(screen.getByText(/Description/i)).toBeInTheDocument()
    expect(screen.getByText(/Update/i)).toBeInTheDocument()
    expect(screen.getByText(/Delete/i)).toBeInTheDocument()

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const title = container.querySelector('h3');
    expect(title.innerHTML).toEqual('All Books');

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const listBookDiv = container.querySelector('div.container');
    const listBookDivContent = listBookDiv.innerHTML
    expect(listBookDivContent).toContain('Id');
    expect(listBookDivContent).toContain('Description');
    expect(listBookDivContent).toContain('Update');
    expect(listBookDivContent).toContain('Delete');

    //Verify widget
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const addBookButton = container.querySelector('button');
    expect(addBookButton.outerHTML).toEqual('<button class="btn btn-success">Add</button>');

});

test('add book', async() => {

    const books = [{ "id": 10001, "title": "title1", "description": "description1", "author":"author1"}, { "id": 10002, "title": "title2", "description": "description2", "author":"author2"  }];
    let response = { data: books };
    axios.get.mockResolvedValue(response);

    const tree = renderer.create(<ListBooksComponent  />);
    render(<ListBooksComponent />);
    fireEvent.click(screen.getByText("Add"))
    
});

test('update book', async() => {

    const books = [{ "id": 10001, "title": "title1", "description": "description1", "author":"author1"}, { "id": 10002, "title": "title2", "description": "description2", "author":"author2" }];
    let response = { data: books };
    axios.get.mockResolvedValue(response);
    render(<ListBooksComponent />);

    await screen.findAllByTestId('updateButton');
    
    fireEvent.click(screen.getAllByTestId('updateButton')[0]);

});

test('delete book', async() => {

    const books = [{ "id": 10001, "title": "title1", "description": "description1", "author":"author1"}, { "id": 10002, "title": "title2", "description": "description2", "author":"author2"  }];
    let response = { data: books };
    axios.get.mockResolvedValue(response);
    render(<ListBooksComponent />);

    let deleteResponse = { messge: "test" };
    axios.delete.mockResolvedValue(deleteResponse);
    await screen.findAllByTestId('deleteButton');
    
    fireEvent.click(screen.getAllByTestId('deleteButton')[0]);

    //TODO check if arrived to book list page and one entry left

});

test('Render ListBookComponent widgets with user not logged in ', async() => {

    const books = [{"id": 10001, "title": "title1", "description": "description1", "author":"author1"}, { "id": 10002, "title": "title2", "description": "description2", "author":"author2"  }];
    let response = { data: books };
    axios.get.mockResolvedValue(response);
	//test if user logged in
	sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    render(<ListBooksComponent />);

    //Verify text
    const allBookText = screen.queryByTestId("All Books")
    expect(allBookText).toBeNull()

    const updateText = screen.queryByTestId("Update")
    expect(updateText).toBeNull()

    const deleteText = screen.queryByTestId("Delete")
    expect(deleteText).toBeNull()

});