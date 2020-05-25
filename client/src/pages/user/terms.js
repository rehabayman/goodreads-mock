import React from "react";
import Footer from "../../components/footer";

function Terms() {
    
    return (
        <>
            <div className="mt-5 jumbotron" style={{marginBottom: "22.1rem"}}>
                <p className="mb-3">
                    This website is meant to be as a mock for Good Reads functionalities for developing and learing issues 
                    and not by any means violating copyrights.
                    <hr></hr>
                    <br/>
                    We appreciate your pull requests at our 
                    <a className="ml-1 mr-1" href="https://github.com/rehabayman/goodreads-mock" target="_blank" rel="noopener noreferrer">Github</a>
                     link.
                </p>
            </div>
            <Footer />
        </>
    );
}

export default Terms;