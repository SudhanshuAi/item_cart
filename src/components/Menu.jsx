import React from "react";

const Menu = ({ menuItems, addToCart, cartCount, removeFromCart }) => {
  const chunkArray = (array, size) => {
    return array.reduce((chunks, item, index) => {
      if (index % size === 0) {
        chunks.push([item]);
      } else {
        chunks[chunks.length - 1].push(item);
      }
      return chunks;
    }, []);
  };

  const rows = chunkArray(menuItems, 3);

  
  return (
    <div className="menu">
      <h1>Desserts</h1>
      <div className="menu-items">
        {rows.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((item) => (
              <div className="item" key={item.id}>
                <img src={item.image} alt={item.name} className="image-item" />
                <div className="item-name">{item.name}</div>
                <div className="item-price">${item.price}</div>

                <div className="cart-controls">
                  {cartCount[item.id] > 0 ? (
                    <>
                      <button onClick={() => removeFromCart(item.id)}> - </button>
                      <span>{cartCount[item.id]}</span>
                      <button onClick={() => addToCart(item)}> + </button>
                    </>
                  ) : (
                    <button onClick={() => addToCart(item)}>Add to Cart</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
