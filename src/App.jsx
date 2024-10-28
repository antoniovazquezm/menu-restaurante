import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Food } from './components/Food'

function App() {
  const [showMenu, setShowMenu] = useState(false)

  const handleClick = () => {
    setShowMenu(true);
  };

  if (showMenu){
    return <Food/>;
  }

  return (
    <>
      <h1>Restaurante Mexicano</h1>
      <div className="card">
        <button onClick={handleClick}>
          Comenzar Compra
        </button>
      </div>
      
    </>
  )
}

export default App
