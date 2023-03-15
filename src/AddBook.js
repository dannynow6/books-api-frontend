import { useState, useEffect } from 'react'; 
import { ListGroup, Card, Button, Form } from 'react-bootstrap'; 
import API from "./API"; 

const AddBook = ({ onAdd }) => {
    const [title, setTitle] = useState(""); 
    const [genre, setGenre] = useState(""); 
    const [datePublished, setDatePublished] = useState(""); 
    const [isbn, setIsbn] = useState(""); 
    const [publisher, setPublisher] = useState(""); 
    const [format, setFormat] = useState(""); 
    const [edition, setEdition] = useState(""); 
    const [bookId, setBookId] = useState(null); 
    const [books, setBooks] = useState([]); 

    useEffect(() => {
        refreshBooks();
    }, []); 

    const refreshBooks = () => {
        API.get("/")
            .then((res) => {
                setBooks(res.data);
                // setTitle(res[0].title)
                // setGenre(res[0].genre)
                // setDatePublished(res[0].datePublished)
                // setIsbn(res[0].isbn)
                // setPublisher(res[0].publisher) 
                // setFormat(res[0].format)
                // setEdition(res[0].edition)
                // setBookId(res[0].id) 
            })
            .catch(console.error); 
    };

    const onSubmit = (e) => {
        e.preventDefault(); 
        let item = { title, genre, datePublished, isbn, publisher, format, edition }; 
        API.post("/", item).then(() => refreshBooks());
    }; 

    const onUpdate = (id) => {
        let item = { title };
        API.patch(`/${id}/`, item).then((res) => refreshBooks()); 
    };

    const onDelete = (id) => {
        API.delete(`/${id}/`).then((res) => refreshBooks()); 
    };

    function selectBook(id) {
        let item = books.filter((book) => book.id === id)[0]; 
        setTitle(item.title);
        setGenre(item.genre);
        setDatePublished(item.datePublished);
        setIsbn(item.isbn);
        setPublisher(item.publisher);
        setFormat(item.format);
        setEdition(item.edition);
        setBookId(item.id); 
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <h3 className="float-left">Add a New Book</h3>
                    
                </div>
            </div>
        </div>
    )
}