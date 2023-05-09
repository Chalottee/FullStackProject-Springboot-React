import axios from 'axios'

const INSTRUCTOR = 'bytecaptain'
// const BOOK_API_URL = 'http://54.155.62.224:8080'
//const PASSWORD = 'bytecaptain'
const INSTRUCTOR_API_URL = '/instructors/'+INSTRUCTOR

class BookDataService {

    retrieveAllBooks(name) {
        return axios.get(INSTRUCTOR_API_URL+'/books');//, 
        //{ headers: { authorization: 'Basic ' + window.btoa(INSTRUCTOR + ":" + PASSWORD) } });
    }

    retrieveBook(name, id) {
        return axios.get(INSTRUCTOR_API_URL+'/books/'+id);
    }

    deleteBook(name, id) {
        //console.log('executed service')
        return axios.delete(INSTRUCTOR_API_URL+'/books/'+id);
    }

    updateBook(name, id, book) {
        return axios.put(INSTRUCTOR_API_URL+'/books/'+id, book);
    }
  
    createBook(name, book) {
        return axios.post(INSTRUCTOR_API_URL+'/books', book);
    }
}

export default new BookDataService()