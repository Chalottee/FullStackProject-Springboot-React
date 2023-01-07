package com.bytecaptain.service.impl;

import java.util.List;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bytecaptain.exception.BookNotFoundException;
import com.bytecaptain.model.Book;
import com.bytecaptain.repository.BookRepository;
import com.bytecaptain.service.BookService;

@Service
public class BookServiceImpl implements BookService {
	
	Logger logger = LoggerFactory.getLogger(BookServiceImpl.class);
	
    @Autowired 
    private BookRepository bookRepository;

   	@Override
	public List<Book> getAllBooks(String username) {
   		logger.trace("Entered getAllBooks method");
   		
   		List<Book> books = bookRepository.findAll();

		return books;
	}

	@Override
	public Book getBook(String username, long id) {
		return bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException(id));
	}

	@Override
	public void deleteBook(String username, long id) {
		Optional<Book> book = bookRepository.findById(id);
		if(book.isPresent()) {
			bookRepository.deleteById(id);
		} else {
			throw new BookNotFoundException(id);
		}
		
	}

	@Override
	public Book updateBook(String username, long id, Book book) {
		Book bookUpdated = bookRepository.save(book);
		return bookUpdated;
	}

	@Override
	public Book createBook(String username, Book book) {
		Book createdBook = bookRepository.save(book);
		return createdBook;
		
	}
    
}
