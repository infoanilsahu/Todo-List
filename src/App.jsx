import { useState,useEffect, useRef } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Main from './components/Main'


function App() {
  const [showFinsh, setshowFinsh] = useState(false)
  const [todo, settodo] = useState([]);
  const [todos, settodos] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const togglefinshed = () => {
    setshowFinsh(!showFinsh)
  }

  // shownav logic for controlling nav width
  const navRef = useRef();
  const blackRef = useRef();

  const shownav = () => {
    if (navRef.current) {
      navRef.current.style.width = "80vw";
      blackRef.current.style.display = "block";
    }
  };

  return (
    <div className="container flex h-[100dvh] overflow-hidden relative">
      <Navbar togglefinshed={togglefinshed} todos={todos} shownav={shownav} navRef={navRef} menuOpen={menuOpen} setMenuOpen={setMenuOpen} blackRef={blackRef} />
      
      <Main showFinsh={showFinsh} setshowFinsh={setshowFinsh} todo={todo} settodo={settodo} todos={todos} settodos={settodos} shownav={shownav} menuOpen={menuOpen} />
    </div>
  )
}

export default App
