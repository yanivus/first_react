import React, { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { v4 } from 'uuid';
import './App.css';
import Header from "./Header"
import AddContact from "./AddContact"
import ContactList from "./ContactList"
import ContactDetail from "./ContactDetail";
import api from "../api/contacts";


function App() {
  const LOCAL_STORAGE_KEY = "contacts"; 

  const retrieveContacts = () => {
    const response = api.get("/contacts");
    return response;
  };


  // let ctx = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  // const getAllContacts = () => {
  //   const allContacts = retrieveContacts();
  //   if (allContacts) setContacts(allContacts);
  // }
  // let ctx = getAllContacts();
  // if (ctx === null) ctx = [];
  const [contacts, setContacts] = useState([]);
  
  useEffect(()=>{
    console.log("called 1");
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts.data);
    };
    getAllContacts();
  }, []);


  
  const addContactHandler = (contact) => {
      setContacts([...contacts, {id: v4(), ...contact}]);
  };



  const removeContactHandler = (id) => {
      const newContactList = contacts.filter((contact) => {
        return contact.id !== id;
      });
      setContacts(newContactList);
  };
  


  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  
  return (
   <div className="ui container">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<ContactList contacts={contacts} getContactId={removeContactHandler}/>}/>
        <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />}/>
        <Route path="/contact/:id" element={<ContactDetail  />}/>
      </Routes>
    </BrowserRouter>
    
   </div>
  );
}

export default App;
