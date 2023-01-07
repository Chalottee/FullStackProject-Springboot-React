package com.bytecaptain.model;

import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Book {
	@Id
	@GeneratedValue
	private Long id;
	private String username;
	private String title;
	private String description;
	private String author;

	
	public Book() {

	}
	


	public Book(long id, String username,String title, String description, String author) {
		super();
		this.id = id;
		this.username = username;
		this.title = title;
		this.description = description;
		this.author = author;
	}

	public String getTitle() {
		return title;
	}



	public void setTitle(String title) {
		this.title = title;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}



	public String getAuthor() {
		return author;
	}



	public void setAuthor(String author) {
		this.author = author;
	}
	

}