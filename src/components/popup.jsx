import React from "react";

const Popup = ({ isOpen, cartItems, onClose, totalAmount}) => {
  if (!isOpen) {
    return null;
  }

  console.log("Popup Cart Items: ", cartItems);

  const handleOK = () => {
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Order Confirmed</h3>
        <ul>
         {cartItems.map(item => (
           <li key={item.id}>
             <h5> {item.name} = {item.quantity} x ${item.price} </h5> 
           </li>
         ))}
       </ul>
        <p>Total amount: ${totalAmount}</p>
        <button onClick={handleOK}>Start New Order</button>
      </div>
    </div>
  );
};

export default Popup;
