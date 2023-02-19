import React, { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { v4 } from 'uuid';
import './App.css';
import Header from "./Header"
import AddContact from "./AddContact"
import EditContact from "./EditContact"
import ContactList from "./ContactList"
import ContactDetail from "./ContactDetail";
import api from "../api/contacts";


function App() { 

  const [contacts, setContacts] = useState([]);

  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  
  const addContactHandler = async (contact) => {
      const request = {
        id: v4(),
        ...contact
      };
      const response = await api.post("/contacts", request);
      setContacts([...contacts, response.data]);
  };


  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const {id, name, email} = response.data;
    setContacts(contacts.map((contact)=>{
        return contact.id === id ? {...response.data} : contact;
      })
    );
  };



  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };
  
  useEffect(()=>{
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);


  
  return (
   <div className="ui container">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<ContactList contacts={contacts} getContactId={removeContactHandler}/>}/>
        <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />}/>
        <Route path="/edit" element={<EditContact updateContactHandler={updateContactHandler} />}/>
        <Route path="/contact/:id" element={<ContactDetail  />}/>
      </Routes>
    </BrowserRouter>
    
   </div>
  );
}

export default App;
