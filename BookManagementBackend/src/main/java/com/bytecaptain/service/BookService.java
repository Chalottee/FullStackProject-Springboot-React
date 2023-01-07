package com.bytecaptain.service;

import java.util.List;

import com.bytecaptain.model.Book;

public interface BookService {

	List<Book> getAllBooks(String username);
	
	Book getBook(String username, long id);
	
	void deleteBook(String username, long id);
	
	Book updateBook(String username, long id, Book course);
	
	Book createBook(String username, Book course);
}
