import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {

    // console.log(props);
    const inputE1 = useRef("");

    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };

    const getSearchTerm = () => {
        // console.log(inputE1.current.value);
        props.searchKeyword(inputE1.current.value);
    };

    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id} ></ContactCard>
        );
    });
    return (
        <>
            <div className="main">
                <div  style={{color:"black", marginTop:"60px"}}>
                    <h2>Contact List</h2>
                    <Link to="/add">
                        <button className="ui button blue right" style={{marginTop:"-40px", float: "right"}}>Add Contact</button>
                    </Link>
                </div>
                </div>
                <div className="ui search">
                    <div className="ui icon input">
                        <input ref={inputE1} type="text" placeholder="search contact" 
                           className="prompt" value={props.term} onChange={getSearchTerm} />
                        <i className="search icon"></i>
                    </div>
                <div className="ui celled list">
                    {renderContactList.length > 0 ? renderContactList : "No contacts available"}
                </div>

            </div>
        </>
    );
};

export default ContactList;