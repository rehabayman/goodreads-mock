import React from "react";
import Footer from "../../components/footer";

function AboutUs() {
    
    return (
        <>
            <div className="mt-5 jumbotron" style={{marginBottom: "12.6rem"}}>
                <h3 className="mb-3">This Website is developed by:</h3>
                <ul className="ml-5">
                    <li>
                        <a href="https://github.com/mohamedadham" target="_blank" rel="noopener noreferrer"><h4>Mohamed Adham</h4></a>
                    </li>
                    <li>
                        <a href="https://github.com/rehabayman" target="_blank" rel="noopener noreferrer"><h4>Rehab Ayman</h4></a>
                    </li>
                    <li>
                        <a href="https://github.com/Mohamed-Zkaria" target="_blank" rel="noopener noreferrer"><h4>Mohamed Zakaria</h4></a>
                    </li>
                    <li>
                        <a href="https://github.com/Nouran-yehia" target="_blank" rel="noopener noreferrer"><h4>Nouran Mohamed Yehia</h4></a>
                    </li>
                    <li>
                        <a href="https://github.com/basmmohamed" target="_blank" rel="noopener noreferrer"><h4>Basma Mohamed</h4></a>
                    </li>
                    <li>
                        <a href="https://github.com/Ali-ismail-g" target="_blank" rel="noopener noreferrer"><h4>Ali Ismail</h4></a>
                    </li>
                </ul>
            </div>
            <Footer />
        </>
    );
}

export default AboutUs;