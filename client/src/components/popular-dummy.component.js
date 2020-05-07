import React from "react";

function PopularDummy(props){
    let data = "";

    const divStyle = {
        width: "240px",
        marginBottom:"15px",
        marginTop: "15px",
        
        padding: "5px",
        borderRadius: "10px",
        border: "1px solid #555",
    }

    const headerStyle = {
        backgroundColor: "white",
        textAlign: "center",
        border: "1px solid #555",
        marginTop : "-20px"
    }

    if( props.title === "Popular Books" ){
        data = props.data.map((book)=>{
            return <p>{book.book.name}</p>
        })
    }

    if( props.title === "Popular Authors" ){
        // console.log(props.data);
        data = props.data.map( (item) =>{
            return <p>{item.book.author.firstName + " " + item.book.author.lastName}</p>
        })
    }

    if( props.title === "Popular Categories" ){
        // console.log(props.data);
        data = props.data.map( (item) =>{
            return <p>{item.book.category.name}</p>
        })
    }

    console.log(props.title, props.data);
    return (
        <div style={divStyle}>
            <h4 style={headerStyle}>{props.title}</h4>
            {
                data
            }
        </div>
    )
}

export default PopularDummy