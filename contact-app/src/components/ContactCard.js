import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png"

const ContactCard = (props) => {
    const {id, name, email} = props.contact;
    return (
            <div className="item">
                <img className="ui avatar image" src={user} alt="user" />
                <div className="content" style={{width:"80%"}}>
                    <Link to={`/contact/${id}`} state={{contact: props.contact}}>
                        <div className="header">{ name }</div>
                        <div>{ email }</div>
                    </Link>
                    <div style={{marginTop:"-30px", marginRight:"0px", float:"right"}}>
                        <i className="trash alternate outline icon" style={{color:"red", marginTop:"7px"}}
                        onClick={ () => props.clickHandler(id)}></i>
                    </div>
                    <Link to={`/edit`} state={{contact: props.contact}}>
                        <div style={{marginTop:"-30px", marginRight:"50px", float:"right"}}>
                            <i className="edit alternate outline icon" style={{color:"blue", marginTop:"7px"}}
                            ></i>
                        </div>
                    </Link>
                </div>
            </div>
    
    );
};

export default ContactCard;