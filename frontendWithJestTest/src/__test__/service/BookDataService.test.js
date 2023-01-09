import axios from 'axios';
import BookDataService from '../../service/BookDataService';

jest.mock('axios');

test('Get all books', () => {
	const books = [{ "id": 10001, "title": "title1", "description": "description1", "author":"author1"}, { "id": 10002, "title": "title2", "description": "description2", "author":"author2" }];
	axios.get.mockResolvedValue(books);

	// eslint-disable-next-line jest/valid-expect-in-promise
	BookDataService.retrieveAllBooks("bytecaptain").then(responseData => expect(responseData).toEqual(books));
});

test('Get book by id', () => {
	const book = { "id": 10001, "title": "title1", "description": "description1", "author":"author1" };
	axios.get.mockResolvedValue(book);

	// eslint-disable-next-line jest/valid-expect-in-promise
	BookDataService.retrieveBook("bytecaptain", 10001).then(responseData => expect(responseData).toEqual(book));
});

test('create book', () => {
	const book = { "id": 10001, "title": "title1", "description": "description1", "author":"author1"};
	axios.post.mockResolvedValue(book);

	// eslint-disable-next-line jest/valid-expect-in-promise
	BookDataService.createBook("bytecaptain", book).then(responseData => expect(responseData).toEqual(book));
});

test('update book', () => {
	const book = { "id": 10001, "title": "title1", "description": "description1", "author":"author1"};
	axios.put.mockResolvedValue(book);

	// eslint-disable-next-line jest/valid-expect-in-promise
	BookDataService.updateBook("bytecaptain", book).then(responseData => expect(responseData).toEqual(book));
});

test('delete book', () => {

	BookDataService.deleteBook("bytecaptain", 10001);

	expect(axios.delete).toHaveBeenCalledTimes(1);

	const response = '';
	axios.delete.mockResolvedValue(response);
	// eslint-disable-next-line jest/valid-expect-in-promise
	BookDataService.deleteBook("bytecaptain", 10001).then(responseData => expect(responseData).toEqual(""));
});


