import React, { useState } from 'react';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Popup from './components/popup';
import './App.css';
import waffle from './assets/images/image-waffle-desktop.jpg'
import Bean from './assets/images/image-creme-brulee-desktop.jpg'
import Macro from './assets/images/image-macaron-desktop.jpg'
import Tira from './assets/images/image-tiramisu-desktop.jpg'
import Pista from './assets/images/image-baklava-desktop.jpg'
import Lemon from './assets/images/image-meringue-desktop.jpg'
import Cake from './assets/images/image-cake-desktop.jpg'
import Brown from './assets/images/image-brownie-desktop.jpg'
import Vanilla from './assets/images/image-panna-cotta-desktop.jpg'

const App = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, 
      name: 'Waffle', 
      price: 10,
      image: waffle,
      cartCount: 0,
    },
    { id: 2, 
      name: 'Creme Bruice', 
      price: 5, 
      image: Bean,
      cartCount: 0
    },
    { id: 3, 
      name: 'Macaron', 
      price: 3,
      image: Macro,
      cartCount: 0
    },
    { id: 4, 
      name: 'Tiramisu', 
      price: 8,
      image: Tira,
      cartCount: 0
    },
    { id: 5, 
      name: 'Pistachio Baklava', 
      price: 6,
      image: Pista,
      cartCount: 0
    },
    { id: 6, 
      name: 'Lemon Meringue Pie', 
      price: 4,
      image: Lemon,
      cartCount: 0
    },
    { id: 7, 
      name: 'Red Velvet Cake', 
      price: 6.5,
      image: Cake,
      cartCount: 0
    },
    { id: 8, 
      name: 'Salted Caramel Brownie', 
      price: 3.8,
      image: Brown,
      cartCount: 0
    },
    { id: 9, 
      name: 'Vanilla Panna cotta', 
      price: 4,
      image: Vanilla,
      cartCount: 0
    }
         
  ]);
  const [cartItems, setCartItems] = useState([]);
  const [ispopopen, setispopopen] = useState(false);
  const [totalAmount, settotalAmount] = useState(0);
  const [cartCount, setCartCount] = useState({});
  

  const addToCart = (item) => {
    
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      
      const updatedCartItems = cartItems.map(cartItem => 
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedCartItems);

      setCartCount(prevCount => ({
        ...prevCount,
        [item.id]: (prevCount[item.id] || 0) + 1
      }));

    } else {
      
      const newItem = { ...item, quantity: 1 };
      setCartItems([...cartItems, newItem]);

      setCartCount(prevCount => ({
        ...prevCount,
        [item.id]: 1
      }));
    }
    
    
  };

  const removeFromCart = (id) => {
    
    const updatedCartItems = cartItems.map(cartItem =>
      cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    ).filter(cartItem => cartItem.quantity > 0);

    setCartItems(updatedCartItems);

    setCartCount(prevCount => {
      const newCount = { ...prevCount };
      if (newCount[id] > 0) {
        newCount[id] -= 1;
        if (newCount[id] === 0) {
          delete newCount[id];
        }
      }
      return newCount;
    });
  };

  const placeOrder = () => {
    const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);
    setispopopen(true);
    settotalAmount(totalAmount);
    
  };


  const handleClosePopup = () => {
    setCartItems([]);
    setCartCount({});
    setispopopen(false); 
};


  return (
      <div className="container">
        <Menu menuItems={menuItems} addToCart={addToCart} removeFromCart={removeFromCart} cartCount={cartCount} />
        <Cart cartItems={cartItems} removeFromCart={removeFromCart} placeOrder={placeOrder} />
        <Popup  
                isOpen={ispopopen}
                onClose={handleClosePopup}
                cartItems={cartItems}
                totalAmount={totalAmount} />
      </div>
  );
};

export default App;
