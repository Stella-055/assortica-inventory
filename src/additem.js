import {React,useState} from 'react'

function Additem( {names,amount,date}) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [tarehe, setTarehe] = useState('');
  const [message, setMessage] = useState('');
  function keeping1(e){
   let inputname= e.target.value;
   setName(inputname)
   setMessage("");
  }
  function keeping2(e){
    let inputamount= e.target.value;
    setQuantity(inputamount);
    setMessage("")
   }
   function keeping3(e){
    let inputamount= e.target.value;
    setTarehe(inputamount)
    setMessage("")
   }
  // Example using fetch in your React component
const addItems = async (name, quantity) => {
  try {
    const response = await fetch('http://localhost:5000/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jinas: name, total: quantity }),
    });
    const data = await response.json();
    
    if (data.success) {
      setMessage(data.message);  // Set success message
      
    } else {
      setMessage('Failed to save item.');  // Set error message if saving failed
    }
  } catch (error) {
    setMessage('An error occurred while saving the item.');
  }
// New item added

};
function handleSubmit(e) {
  e.preventDefault(); // Prevent default form submission
  addItems(name, quantity);
setName("");
setQuantity("");
setTarehe("")
}

  return (
    <div className="form-container" >
    <div>{message}</div>
        <form  onSubmit={handleSubmit}>
        <label > {names}</label>
            <input type='text' value={name} onChange={keeping1}/>
            <label > {amount}</label>
            <input  value={quantity} onChange={keeping2}/>
            <label > {date}</label>
            <input value={tarehe} onChange={keeping3}/>
            <input type='submit'placeholder='Add' />
        </form>
    </div>
  )
}

export default Additem