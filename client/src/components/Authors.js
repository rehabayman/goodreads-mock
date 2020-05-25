import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Table, Input,Button,Modal ,ModalHeader,ModalBody,FormGroup,ModalFooter} from 'reactstrap'; 
import authHeader from '../services/auth-header';
import AuthorItem from './AuthorItem';

const Authors=(props)=>{
    const API_auth_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/authors/`;
    const [authors, setAuthors] = useState([]);
    const [modal, setModal] = useState(false);
    const [authorFirstName, setAuthorFirstName] = useState("");
    const [authorLastName, setAuthorLastName] = useState("");
    const [authorBirthdate, setAuthorBirthdate] = useState("");
    const [authorImage, setAuthorImage] = useState(null);
    const toggle = () => setModal(!modal);
    useEffect(() => {
        axios.get(API_auth_URL, { headers: authHeader() })
    .then(response => {
        console.log("success");
        console.log(response.data.authors);
        setAuthors(response.data.authors)
    })
    .catch(err => {
        if (err.response) {
            console.log(err);
            if (err.response.status === 404) {
                setAuthors([]);
            }
        }
    }) } , [modal]);



    const addAuthor = async(e)=>{
        e.preventDefault();
        let forum = new FormData()
        forum.append('image_path', authorImage)
        forum.append('firstName',authorFirstName)
        forum.append('lastName',authorLastName)
        forum.append('birthdate',authorBirthdate)
        try {
            console.log(authorFirstName,authorImage);
            console.log(forum.get('image_path'));
            const response = await axios.post(
                `http://localhost:${process.env.REACT_APP_SERVER_PORT}/authors/`,
                forum , { headers: authHeader() }
            );
            console.log(authors);
            setAuthors(authors=>authors.concat(response.data));
            toggle();
            console.log(authors);
        } catch (error) {console.log(error)}
       
    }
    

    const authorDelete = async(authorID)=>{
        try{
            setAuthors(authors.filter((author)=>author._id !== authorID));
            const res = await axios.delete(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/authors/${authorID}`, { headers: authHeader() })
        }catch (error){
            console.log(error);
        }
    }
    const imageChange = (e) => {
        setAuthorImage(e.target.files[0]);
    }
    
    return(
        authors.length > 0 ?
        (<>
        <div>
        <Button color="secondary" onClick={toggle} >Add Author</Button>
        </div>
        <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birthdate</th>
            <th>Image path</th>
            <th>edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {authors.map((author,index)=>{
            return (
                            <AuthorItem
                                key={index}
                                index={index}
                                author={author}
                                setAuthors={setAuthors}
                                authorDelete={authorDelete}
                                imageChange={imageChange}
                            />
                        );
                    })}
        </tbody>
      </Table>
        <Modal isOpen={modal} toggle={toggle}>
        <form encType="multipart/form-data" onSubmit={(e)=>{addAuthor(e)}}>
            <ModalHeader>Add Author</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Input type="text" value={authorFirstName} onChange={(e)=>{setAuthorFirstName(e.target.value)}} placeholder="first name" />
                    <Input type="text" value={authorLastName} onChange={(e)=>{setAuthorLastName(e.target.value)}}  placeholder="last name"/>
                    <Input type="text" value={authorBirthdate} onChange={(e)=>{setAuthorBirthdate(e.target.value)}} placeholder="birthdate"/>
                    <Input type="file" name = "image_path" onChange={imageChange} placeholder="image"/>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <button color="primary" >Add Author</button>
                <button color="secondary" onClick={toggle}>Cancel</button>
            </ModalFooter>
            </form>
        </Modal>
      </>)
         : <div>no available authors</div>
    );
}
export default Authors;