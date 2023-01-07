import React, { Component } from 'react';
import withRouter from './withRouter';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import BookDataService from '../service/BookDataService';
const INSTRUCTOR = 'bytecaptain'

class BookComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            title: '',
            description: '',
            author:'',
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        console.log(this.state.id)
        // eslint-disable-next-line
        debugger
        if (this.state.id === -1) {
            return
        }
        BookDataService.retrieveBook(INSTRUCTOR, this.state.id)
            .then(response => this.setState({
                title: response.data.title,
                description: response.data.description,
                author: response.data.author
            })).catch(error => {
                //TODO better handle errors
                return error;
            })

    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter at least 5 Characters in Description'
        } else if(!values.author){
            errors.description = 'Enter a author'
        } else if(!values.title){
            errors.description = 'Enter a title'
        }

        return errors
    }

    onSubmit(values) {
        let username = INSTRUCTOR

        let book = {
            id: this.state.id,
            title: values.title,
            description: values.description,
            author: values.author,
        }

        if (this.state.id === -1) {
            BookDataService.createBook(username, book)
                .then(() => this.props.navigation('/books'), console.log(`Create book successfully`))
                .catch(error => {
                    //TODO better handle errors https://axios-http.com/docs/handling_errors
                    return error;
                })
        } else {
            BookDataService.updateBook(username, this.state.id, book)
                .then(() => this.props.navigation('/books'), console.log(`Update book ${this.state.id} successfully`))
                .catch(error => {
                    //TODO better handle errors https://axios-http.com/docs/handling_errors
                    return error;
                })
        }

        console.log(values);
    }

    render() {
        let { title, description, author, id } = this.state
        return (
            <div>
                <h3>Book</h3>
                <div data-testid="bookContainer" className="container">
                    <Formik
                        initialValues={{ id, title, description, author }}
                        onSubmit={this.onSubmit}
                        validateOnChange={true}
                        validateOnBlur={true}
                        validate={this.validate}
                        enableReinitialize={true}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field data-testid="bookId" className="form-control" type="text" name="id" disabled />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Title</label>
                                        <Field data-testid="bookTitle" className="form-control" type="text" name="title" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field data-testid="bookDescription" className="form-control" type="text" name="description" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Author</label>
                                        <Field data-testid="bookAuthor" className="form-control" type="text" name="author" />
                                    </fieldset>
                                    
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default withRouter(BookComponent);