
import React, {useState, useEffect,Component,Header} from 'react'
import './starStyle.css'
import axios from 'axios';
import authHeader from '../services/auth-header'
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function searchResult(props) {
    return(
        <>
         
        {console.log(Object.values(props.location.state.filteredBooks).map(i=>i.name))}
        {Object.values(props.location.state.filteredBooks).map(i=><li key={i._id}>{i.name}</li>)}
        </>

    )
}
    export default searchResult
 
