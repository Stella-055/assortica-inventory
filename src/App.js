import './App.css';
import Navbar from './navbar.js';
import {  Routes, Route ,useLocation } from 'react-router-dom';
import Item from './item.js';
import Additem from './additem.js';
import Removeitem from './removeitem.js';
import Login from './login.js';
import Delivery from './delivery.js';
function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';
  return (
    <div className="App">
     {showNavbar && <Navbar />}
    
     <Routes>
     <Route path='/'element={<Login/>}/>
     <Route path='/Home'element={<Item/>}/>
      <Route path='/add'element={<Additem names="Item Name" amount="Item quantity" date="Date added"/>}/>
      <Route path='/remove'element={<Removeitem name="Item name" amount="Item quantity" date="Date removed"/>}/>
      <Route  path='/delivery' element={ <Delivery/>}/>
     </Routes>
    </div>
  );
}

export default App;
