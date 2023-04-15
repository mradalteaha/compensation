import React from "react";

function Footer(){

    var date = new Date();
    var year = date.getFullYear();

    return (<footer>
        <p>
            All copyright preserved to Teaha Morad {year}
        </p>
    </footer>)

}

export default Footer;