import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import BookComponent from './BookComponent';
import MenuComponent from './MenuComponent';
import ListBooksComponent from './ListBooksComponent';
import MyProvider from './MyProvider';

class InstructorApp extends Component {
    render() {
        return (
            <>
                <MyProvider>
                    <MenuComponent />
                    <Routes>
                        <Route path="/" element={<LoginComponent />} />
                        <Route path="/login" element={<LoginComponent />} />
                        <Route path="/logout" element={<LogoutComponent />} />
                        <Route path="/books" element={<ListBooksComponent />} />
                        <Route path="/books/:id" element={<BookComponent />} />
                    </Routes>
                </MyProvider>
            </>
        )
    }
}

export default InstructorApp;