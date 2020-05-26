import React, {useState} from "react";
import axios from 'axios';
import authHeader from '../services/auth-header';

function AddBookReview(props){
    const [review, setReview] = useState("");
    const userId = JSON.parse(props.user).id;
    const bookId = props.bookId; 
    const url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books/addreview/${bookId}/${userId}`;


    function reviewSubmission(e){
        e.preventDefault();
        if( review === ""){
            window.alert("Add a review to submit!");
        } else {
            axios.post(url, {review: review}, {headers: authHeader()})
                .then(res=>{
                    console.log(res.data);
                    setReview("");
                    props.setReviewAdded((prev)=>{
                        return !prev
                    })
                    window.alert("Review added sucessfully!");
                })
                .catch(e=>{
                    console.log(e);
                    window.alert("review wasn't added, some error happened");
                    console.log("post request failed");
                    setReview("");
                });
        }
    }

    function reviewValueChange(e){
        setReview(e.target.value);
    }

    return (
        <div className="container mt-3">
            <h3>Add a review</h3>
            <form onSubmit={reviewSubmission}>
                <div className="form-group">
                    <textarea onChange={reviewValueChange} value={review} cols="58" rows="5"></textarea>
                </div>
                <button type="submit" className="btn btn-dark btn-block w-50">Submit</button>            
            </form>

        </div>
    )
}

export default AddBookReview;