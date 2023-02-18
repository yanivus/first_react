import React from "react";
import { Link, useLocation } from "react-router-dom";
import user from "../images/regUser.png"

const ContactDetail = (props) => {

    const location = useLocation();
    const {name, email} = location.state.contact;
    return (
        <div className="main" style={{color:"black", marginTop:"60px"}}>
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header"> {name} </div>
                    <div className="description"> {email} </div>
                </div>
            
            </div>
            <div className="ui centered" style={{textAlign:"center"}}>
                <Link to="/">
                    <div className="ui button blue centered">Back to Contact List</div>
                </Link>
            </div>
        </div>
    );


};

export default ContactDetail;