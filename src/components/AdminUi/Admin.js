import React, { useEffect, useState } from 'react';
import './Admin.css'
import Table from '../Table/Table';


const Admin = () => {
    const [word,setWord]=useState('') // to store the Search Key
  
    return (
        <div>
             <div className="wrap">
   <div className="search">
      <input type="text" className="searchTerm" onChange={e=>setWord(e.target.value.toLowerCase())} placeholder="Search by name,email or role"/>
    
   </div>
</div>
            <div className="admin-section">
           <Table word={word} ></Table>
            </div>
        </div>
    );
};

export default Admin;