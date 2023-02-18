import React, { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import { v4 } from 'uuid';
import './App.css';
import Header from "./Header"
import AddContact from "./AddContact"
import ContactList from "./ContactList"
import ContactDetail from "./ContactDetail";


function App() {
  const LOCAL_STORAGE_KEY = "contacts"; 
  let ctx = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (ctx === null) ctx = [];
  const [contacts, setContacts] = useState(ctx);
  

  
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
