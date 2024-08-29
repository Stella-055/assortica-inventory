import { useState } from "react";
import React  from 'react'

function Removeitem({name,amount,date}) {
 
  const [name1, setName1] = useState(''); // Item name to search
  const [quantity1, setQuantity1] = useState('');
  const [date1, setDate1] = useState(''); 
  const [message, setMessage] = useState('');
  function change1(e){
    let details= e.target.value;
    setName1(details);
    setMessage("");
  }
  function change2(e){
    let details= e.target.value;
    setQuantity1(details);
    setMessage("");
  }
  function change3(e){
    let details= e.target.value;
    setDate1(details);
    setMessage("");
  }
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission reload

    try {
      const response = await fetch('http://localhost:5000/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name1, quantity1 }),
      });
      const data = await response.json();
      if (response.status === 404) {
        setMessage(data.message); // Display "Item not found"
      } else if (response.ok) {
        setMessage(data.message); // Display "Item updated successfully"
        setName1('');  // Clear the name input
        setQuantity1('');  // Clear the quantity input
      } else {
        setMessage('Failed to remove item.'); // Handle other errors
      }
    } catch (error) {
      setMessage('An error occurred while removing the item.');
    }

  };

  return (
    <div className="form-container" >
      <div>{message}</div>
       <form  className="form-container"onSubmit={handleSubmit}>
    <label > {name}</label>
        <input type='text' value={name1} onChange={change1}/>
        <label > {amount} </label>
        <input value={quantity1}  onChange={change2}/>
        <label > {date}</label>
        <input value={date1}  onChange={change3}/>
        <input type='submit' placeholder='Remove'/>
    </form></div>
  )
}

export default Removeitem;