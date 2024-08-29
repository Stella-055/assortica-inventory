import React  from 'react'
import {  NavLink } from 'react-router-dom'
import Companyicon from "./companyicon.png"
import personpic from "./3490994.png"


function Navbar() {
 /*const [searchitem, setSearchitem]=useState("")
  function filter(e){
   let search= e.target.value;
   setSearchitem(search);
   const fetchItems = async () => {try {
    const response = await fetch('http://localhost:5000/home');
  
  } 
 catch}
   
  }
  useEffect(()=>{
   filter()

  },[])*/
  return (
    <>
    <nav className='navhead'>
       <div> <div className='navdiv1'>
           <div className='navdiv2'><img  className="navimg" src={Companyicon} alt='company icon'></img>
            <h1>Assortica inventory</h1></div> 
         
        </div>
       
            <ul className='navlist'>
               <li><NavLink className='navlink'activeClassName="active" to="/Home">HOME</NavLink></li>
               <li><NavLink  className='navlink'to="/add" activeClassName="active">ADD</NavLink></li>
               <li> <NavLink  className='navlink'to="/remove" activeClassName="active">REMOVE</NavLink></li>
               </ul>
               </div>
               <img src={personpic}className='personpic' alt="person"></img>
    </nav>
    </>
  )
}

export default Navbar