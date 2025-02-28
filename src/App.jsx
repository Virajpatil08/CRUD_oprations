import './App.css';
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Home';
import Create from './Create';
import Update from './Update';
import Read from './Read';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/create" element={<Create />}></Route>
      <Route path="/update/:id" element={<Update />}></Route>
      <Route path="/read/:id" element={<Read />}></Route>


    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />

    </BrowserRouter>
    
  );
}

export default App;
