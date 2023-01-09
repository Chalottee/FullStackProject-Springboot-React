import React, { Component } from 'react';
import withRouter from './withRouter';
import BookDataService from '../service/BookDataService';
import AuthenticationService from '../service/AuthenticationService';

const INSTRUCTOR = 'bytecaptain';

class ListBooksComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: [],
            message: null
        }

        this.refreshBooks = this.refreshBooks.bind(this)
        this.deleteBookClicked = this.deleteBookClicked.bind(this)
        this.updateBookClicked = this.updateBookClicked.bind(this)
        this.addBookClicked = this.addBookClicked.bind(this)
        
    }



    componentDidMount() {
        this.refreshBooks();
    }

    addBookClicked() {
        //TODO refactor/improve this
        this.props.navigation("/books/-1")
    }

    updateBookClicked(id) {
        console.log('update ' + id)
        this.props.navigation(`/books/${id}`)
    }

    refreshBooks() {
        BookDataService.retrieveAllBooks(INSTRUCTOR)//HARDCODED
            .then(
                response => {
                    console.log(response);
                    this.setState({ books: response.data })
                }
            ).catch(error => {
                //TODO better handle errors https://axios-http.com/docs/handling_errors
                return error;
            })
    }

    deleteBookClicked(id) {
        BookDataService.deleteBook(INSTRUCTOR, id)
            .then(
                response => {
                    this.setState({ message: `Delete of book ${id} Successful` })
                    this.refreshBooks()
                }
            ).catch(error => {
                //TODO better handle errors
                return error;
            })

    }

    render() {

        if (!AuthenticationService.isUserLoggedIn()) {
            this.props.navigation('/login')
        } else {
            return (
                

                <div className="container">
                    <h3>All Books</h3>
                    {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Author</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.books.map(
                                        book =>
                                            <tr key={book.id}>
                                                <td>{book.id}</td>
                                                <td>{book.title}</td>
                                                <td>{book.description}</td>
                                                <td>{book.author}</td>
                                                <td><button data-testid="updateButton" className="btn btn-success" onClick={() => this.updateBookClicked(book.id)}>Update</button></td>
                                                <td><button data-testid="deleteButton" className="btn btn-warning" onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')) this.deleteBookClicked(book.id)}}>Delete</button></td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addBookClicked}>Add</button>
                    </div>
                </div>
            )


        }

        
    }
}

export default withRouter(ListBooksComponent);