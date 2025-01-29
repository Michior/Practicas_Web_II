import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import {db} from './data/db.js'
import { Guitar } from './components/Guitar.jsx'

function App() {
  function initialCart(){
    const localStorageCart =localStorage.getItem('cart')
    return localStorageCart? JSON.parse(localStorageCart):[]
  }

  const [data, setData] = useState(db)
  
  const [cart, setCart] = useState(initialCart)
  useEffect (()=>{ //Se encarga de gestionar los efectos secundarios de cuando se modifica la variable de estado que esta definiendo como segundo parametro 
    localStorage.setItem(`cart`, JSON.stringify(cart))
  }, [cart])

  function addToCart(guitar){
    const itemIndex = cart.findIndex((item)=>guitar.id===item.id)
    console.log(itemIndex);
    
    if(itemIndex===-1){//Ese articulo no existe
        guitar.quantity=1
        setCart([...cart, guitar])
      }
      else{//si la  guitarra ya se habia añadido al carrito 
        const updatedCart=[...cart] //Creando una copia de la variable estado
        updatedCart[itemIndex].quantity++;
        setCart(updatedCart);
      }
  }

  function removeToCart(guitar) {
    const itemIndex = cart.findIndex((item) => item.id === guitar.id);
    
    if (itemIndex !== -1) { // Si el producto existe en el carrito
      const updatedCart = [...cart];
      if (updatedCart[itemIndex].quantity > 1) {
        // Reducir la cantidad
        updatedCart[itemIndex].quantity--;
      } else {
        // Eliminar del carrito si la cantidad es 1
        updatedCart.splice(itemIndex, 1);
      }
      setCart(updatedCart);
    }
  }

  function outOfCart(id){
    const updatedCart = cart.filter((item) => item.id !== id); // Filtra los elementos que no coinciden con el ID
    setCart(updatedCart);
  }

  function vaciarCart(){
    setCart([])
  }

  function calculateTotal(){
    /*let total = 0;
    for (const guitar of cart) {
      total+=guitar.price * guitar.quantity;
    }*/

    let total = cart.reduce((total,item)=>total+item.price*item.quantity,0)
    return total;
  }
  
  return (
    <>
      <Header cart={cart} total={calculateTotal()} addToCart={addToCart} removeToCart={removeToCart} outOfCart={outOfCart} vaciarCart={vaciarCart}/>
        <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
              {data.map((guitar) =>(
                <Guitar guitar={guitar} key={guitar.id} addToCart ={addToCart}/>
              ))}


              
          </div>
        </main>
      <Footer/>
    </>
  )
}

export default App