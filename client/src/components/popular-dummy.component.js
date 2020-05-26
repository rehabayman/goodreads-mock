import React from "react";

function PopularDummy(props){
    let data = "";

    const divStyle = {
        width: "300px",
        marginBottom:"15px",
        marginTop: "15px",
        padding: "5px",
        borderRadius: "10px",
        border: "2px solid #555",
    }

    const headerStyle = {
        backgroundColor: "white",
        textAlign: "center",
        border: "2px solid #555",
        marginTop : "-20px",
        padding: "5px",
        borderRadius: "20px"
    }

    if( props.title === "Popular Books" ){
        data = props.data.length > 0 ? props.data.map((book)=>{
            return <p>{book.book.name}</p>
        })
        : <h5 style={{marginLeft: "4rem"}}>Not Specified Yet</h5>
    }

    if( props.title === "Popular Authors" ){
        // console.log(props.data);
        data = props.data.length > 0 ? props.data.map( (item) =>{
            return <p>{item.book.author.firstName + " " + item.book.author.lastName}</p>
        })
        : <h5 style={{marginLeft: "4rem"}}>Not Specified Yet</h5>
    }

    if( props.title === "Popular Categories" ){
        // console.log(props.data);
        data = props.data.length > 0 ? props.data.map( (item) =>{
            return <p>{item.book.category.name}</p>
        })
        : <h5 style={{marginLeft: "4rem"}}>Not Specified Yet</h5>
    }

    // console.log(props.title, props.data);
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