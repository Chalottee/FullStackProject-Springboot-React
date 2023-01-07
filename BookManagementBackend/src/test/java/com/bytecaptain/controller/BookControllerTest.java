package com.bytecaptain.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.bytecaptain.model.Book;
import com.bytecaptain.service.BookService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(SpringExtension.class)
@WebMvcTest(value = BookController.class)
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookService bookService;
    
    private static final ObjectMapper om = new ObjectMapper();

    //TODO move to base class as sample data
    Book mockBook = new Book(10001, "bytecaptain","spring", "Spring Boot Introduction","0501");

    String exampleBookJson = "{\"id\":10001,\"username\":\"bytecaptain\",\"description\":\"Spring Boot Introduction\"}";

    @Test
    public void getBook() throws Exception {

        Mockito.when(bookService.getBook("bytecaptain",10001)).thenReturn(mockBook);

        RequestBuilder requestBuilder = MockMvcRequestBuilders.get(
                "/instructors/bytecaptain/books/10001").accept(
                MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        JSONAssert.assertEquals(exampleBookJson, result.getResponse().getContentAsString(), false);

    }

    @Test
    public void createBook() throws Exception {

    	Book book = new Book(10001, "bytecaptain","spring", "Spring Boot Introduction","0501");

        Mockito.when(bookService.createBook(Mockito.anyString(), Mockito.any(Book.class))).thenReturn(book);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/instructors/bytecaptain/books").content(exampleBookJson)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = result.getResponse();

        assertEquals(HttpStatus.CREATED.value(), response.getStatus());

        assertEquals("http://localhost/instructors/bytecaptain/books/10001",
                response.getHeader(HttpHeaders.LOCATION));

    }
    
    @Test
    public void updateBook() throws Exception {

    	Book book = new Book(10001, "bytecaptain","spring", "Spring Boot Introduction","0501");

        Mockito.when(bookService.updateBook(Mockito.anyString(), Mockito.anyLong(), Mockito.any(Book.class))).thenReturn(book);
        
        String bookString = om.writeValueAsString(book);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .put("/instructors/bytecaptain/books/10001")
                .contentType(MediaType.APPLICATION_JSON).content(bookString);
        

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = result.getResponse();

        assertEquals(HttpStatus.OK.value(), response.getStatus());

        JSONAssert.assertEquals(exampleBookJson, result.getResponse().getContentAsString(), false);

    }
    
    @Test
    public void deleteBook() throws Exception {

    	doNothing().when(bookService).deleteBook("bytecaptain", Long.valueOf(10001));

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .delete("/instructors/bytecaptain/books/10001");

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = result.getResponse();

        assertEquals(HttpStatus.NO_CONTENT.value(), response.getStatus());

    }

}
