import { useState, useEffect } from 'react'; 
import { ListGroup, Card, Button, Form } from 'react-bootstrap'; 
import { GiBlackBook } from "react-icons/gi"; 
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
                    <Form onSubmit={onSubmit} className="mt-4">
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>{bookId} Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Book Title"
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGenre">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Genre"
                                value={genre} 
                                onChange={(e) => setGenre(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDatePublished">
                            <Form.Label>Date Published</Form.Label>
                            <Form.Control 
                                type="date" 
                                placeholder="Enter Date Published"
                                value={datePublished} 
                                onChange={(e) => setDatePublished(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formIsbn">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter ISBN"
                                value={isbn} 
                                onChange={(e) => setIsbn(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPublisher">
                            <Form.Label>Publisher</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Publisher"
                                value={publisher} 
                                onChange={(e) => setPublisher(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formFormat">
                            <Form.Label>Book Format</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Book Format"
                                value={format} 
                                onChange={(e) => setFormat(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEdition">
                            <Form.Label>Edition</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Edition"
                                value={edition} 
                                onChange={(e) => setEdition(e.target.value)}
                            />
                        </Form.Group>

                        <div className="float-right">
                            <Button 
                                variant="primary"
                                type="submit"
                                onClick={onSubmit} 
                                className="mx-2"
                            >
                                Save
                            </Button>
                            <Button 
                                variant="primary"
                                type="button"
                                onClick={() => onUpdate(bookId)} 
                                className="mx-2"
                            >
                                Update
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className="col-md-8 m">
                    <table class="table">
                        <thead>
                            
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    )
}