import { useState } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import {db} from './data/db'
import { Guitar } from './components/Guitar'


function App() {

  const [data, setData]= useState(db);

  const [cart, setCart] = useState([]);

  function addToCart (guitar){
    const itemIndex = cart.findIndex((item)=>guitar.id===item.id)
    if(itemIndex===-1){
      guitar.quantity = 1;
      setCart([...cart, guitar])
    } else{
      const updatedCart = [...cart]
      updatedCart[itemIndex].quantity++;
      setCart(updatedCart);
    }
  }
  

  return (
    <>
      <Header cart={cart}/>

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
            {data.map((guitar)=>(
              <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart} />
            ))}
          
          </div>
      </main>
      <Footer/>

    
    </>
  )
}

export default App
