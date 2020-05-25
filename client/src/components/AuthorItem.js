import React, { useState } from 'react'
import { Button, ButtonGroup, Modal, ModalBody, ModalHeader, FormGroup, Input, ModalFooter } from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import authHeader from '../services/auth-header';

const AuthorItem = (props) => {
    // console.log(props);
    const [author1, setAuthor1] = useState(props.author)
    const [author, setAuthor] = useState({ firstName: "", lastName: "", birthdate: "", image_path: "" });
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [authorFirstName, setAuthorFirstName] = useState("");
    const [authorLastName, setAuthorLastName] = useState("");
    const [authorBirthdate, setAuthorBirthdate] = useState("");
    const [authorImage, setAuthorImage] = useState(null);
    const API_auth_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/authors/${props.author._id}`;
    
    const changeAuthor = (e) => {
        const { target: { name, value } } = e

        setAuthor({ ...author, [name]: value });
        console.log(author.firstName);
    }
    const authorUpdate = async (e) => {
        setModal(!modal)
        e.preventDefault();
        console.log("here");
        let forum2 = new FormData()
        forum2.append('image_path', authorImage)
        forum2.append('firstName', authorFirstName)
        forum2.append('lastName', authorLastName)
        forum2.append('birthdate', authorBirthdate)
        try {
            console.log(forum2);
            // console.log(forum2.get('image_path'));
            await axios.patch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/authors/${props.author._id}`,
                forum2
                , { headers: authHeader() }).then(await axios.get(API_auth_URL, { headers: authHeader() })
                    .then(response => {
                        console.log(response.data);
                        setAuthor1(response.data)
                        // log()
                        // props.setAuthors(response.data.authors)
                    })
                    .catch(err => {
                        console.log(err);
                    }))
        } catch (error) { console.log(error) }
    }
    const imageChange = (e) => {
        setAuthorImage(e.target.files[0]);
    }
    return (

        <tr>
            <td>{author1.firstName}</td>
            <td>{author1.lastName}</td>
            <td>{author1.birthdate.split('T')[0]}</td>
            <td>
                <Link to={`/authors/${author1._id}`}>
                    <img className="card-img-top" src={author1.image_path} alt="Author Pic" style={{ width: "100px", height: "100px" }} />
                </Link>
            </td>
            <td>
                <ButtonGroup>
                    <Button color="warning" onClick={toggle} className="mr-2">Edit</Button>
                </ButtonGroup>
            </td>
            <td>
                <ButtonGroup>
                    <Button color="danger" onClick={() => { props.authorDelete(props.author._id) }} className="mr-2">Delete</Button>
                </ButtonGroup>
            </td>
            <Modal isOpen={modal} toggle={toggle}>
                <form encType="multipart/form-data" onSubmit={authorUpdate}>
                    <ModalHeader>Update Author</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Input type="text" value={authorFirstName} onChange={(e) => { setAuthorFirstName(e.target.value) }} placeholder="first name" />
                            <Input type="text" value={authorLastName} onChange={(e) => { setAuthorLastName(e.target.value) }} placeholder="last name" />
                            <Input type="text" value={authorBirthdate} onChange={(e) => { setAuthorBirthdate(e.target.value) }} placeholder="birthdate" />
                            <Input type="file" name="image_path" onChange={imageChange} placeholder="image" />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <button color="primary" >Update Author</button>
                        <button color="secondary" onClick={toggle}>Cancel</button>
                    </ModalFooter>
                </form>
            </Modal>
        </tr>
    );
}

export default AuthorItem;