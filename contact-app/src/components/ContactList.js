import React from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {

    console.log(props);

    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };

    // const contacts = [{
    //     id: "1",
    //     name: "John",
    //     email: "john@doe.com"
    // }];
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
                <div className="ui celled list">
                    {renderContactList}
                </div>

            </div>
        </>
    );
};

export default ContactList;