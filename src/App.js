import "./App.css";
import { useEffect, useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem";
/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {

  // set the state variables 
  const [cart, setCart] = useState([]); // state for cart (array)
  const [total, setTotal] = useState(0); // state for price total (int)
  const [itemCounts, setItemCounts] = useState({}); // state for item totals ({name:count})

  // function whenever add cart button is pressed
  const addToCart = (itemToAdd) => {

    // set the item counts 
    setItemCounts((prevItemCounts) => {
      const newItemCounts = { ...prevItemCounts };
      if (itemToAdd.name in itemCounts) {
        newItemCounts[itemToAdd.name] = newItemCounts[itemToAdd.name] + 1
      } else {
        newItemCounts[itemToAdd.name] = 1

        // add to the cart 
        setCart((prevCart) => [...prevCart, itemToAdd])
      }

      // change the total 
      setTotal((prevTotal) => prevTotal + itemToAdd.price);
      
      return newItemCounts;
    })

  }

 // whenever we refresh
  useEffect(() => {

    // reset everything 
    setCart([]);
    setTotal(0);
    setItemCounts({})

  }, [])
  return (
    <>
      <div className="App">
        <h1 className="header">Justin's Bakery</h1>
        <div className="bakery-items">
          {bakeryData.map((item, index) => ( 
            <BakeryItem key={index} item={item} addToCart={addToCart}/>
          ))}
        </div>
        
        <div className="cart-items">
          <h2>Cart</h2>
          {cart.length ? 
    cart.map((item, index) => (
        itemCounts[item.name] ? <div key={index}>x{itemCounts[item.name]} {item.name}</div> : null
    ))
    : <p>Nothing has been added yet!</p>
          }
          
          {total !== 0 && <p>Total: {total.toFixed(2)}</p>}

        </div>
      </div>
    </>

  );
}

export default App;
