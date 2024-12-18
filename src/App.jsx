import { Routes, Route } from 'react-router-dom';
import CardCarousel from './CardCarousel'
//import Navbar from './Navbar'
import Home from './Home';
import './App.css'
import Collection from './Collection';

function App() {


  return (
    <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<CardCarousel />} />
      <Route path="/collection" element={<Collection />} />
    </Routes>
    <CardCarousel />
    </div>
  )
}

export default App
