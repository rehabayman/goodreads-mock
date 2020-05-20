import React, {useState, useEffect} from "react";
import axios from 'axios';

function AddBookReview(props){
    const [review, setReview] = useState("");
    const userId = JSON.parse(props.user).id;
    const bookId = props.bookId; 
    const url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/books/addreview/${bookId}/${userId}`;


    function reviewSubmission(e){
        e.preventDefault();
        if( review == ""){
            window.alert("Add a review to submit!");
        } else {
            axios.post(url, {review: review})
                .then(res=>{
                    console.log(res.data);
                    setReview("");
                    window.alert("Review added sucessfully!");
                })
                .catch(e=>{
                    console.log(e);
                    window.alert("review wasn't added, some error happedn");
                    console.log("post request failed");
                    setReview("");
                });
        }
    }

    function reviewValueChange(e){
        setReview(e.target.value);
    }

    return (
        <div className="container">
            <h3>Add a review</h3>
            <form onSubmit={reviewSubmission}>
                <div className="form-group">
                    <textarea onChange={reviewValueChange} value={review}cols="117" rows="10"></textarea>
                </div>
                <button type="submit" class="btn btn-primary btn-block w-100">Submit</button>            
            </form>

        </div>
    )
}

export default AddBookReview;