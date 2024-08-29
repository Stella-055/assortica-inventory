import React,{useEffect,useState} from 'react'

function Item() {
  const [items,setItems]=useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [visibleItems, setVisibleItems] = useState(5);
  const handleShowMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 5); 
  };
  function filterdisplay( e){
    const value = e.target.value;
    const filtered = items.filter(item =>
      item.jina.toLowerCase().includes(value.toLowerCase())
    );
    
    setItems(filtered)
    if (value===""){
      fetchItems()
    }
   
  }
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/home/${id}`, {
        method: 'DELETE',
      })
      console.log(response)
      if(response.ok){
    alert("Deleted")
    setItems(items.filter(item => item._id !== id))
  }
  else{
    alert("Oops did not delete")
  }}
   catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() =>{fetchItems()},[])
  const fetchItems = async () => {try {
    const response = await fetch('http://localhost:5000/home'); // Replace with your API URL
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    setItems(data); // Update state with the fetched items
  } catch (error) {
    setError(error.message); // Handle errors
    
  } finally {
    setLoading(false); 
  }};
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className='itemdiv1'> 
       <input type='search' className='navsearchinput'  placeholder='search by name' onChange={filterdisplay}/>
    <table>
       <thead>
      
        
        <th>Item </th>
        <th>Quantity </th>
        <th>Action </th>
     </thead>
      <tbody>
          {items.slice(0, visibleItems).map((item, index) => (
            <tr key={index}>
              <td>{item.jina}</td>
              <td>{item.total}</td>
            <td>  <button onClick={() => handleDelete(item._id)}>remove</button> </td>
            </tr>
          ))}
        </tbody>

    </table>
    <button onClick={handleShowMore}>Load more</button>
    </div>
  )
}

export default Item