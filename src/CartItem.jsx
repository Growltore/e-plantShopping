import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  // Convierte "$12.5" o "12.5" o 12.5 a número
  const toNumber = (value) =>
    typeof value === 'number' ? value : Number(String(value).replace(/[^0-9.]/g, '')) || 0;

  // TOTAL GLOBAL
  const calculateTotalAmount = () => totalAmount.toFixed(2);

  // CONTINUAR COMPRANDO
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping?.(e);
  };

  // (Opcional) demo para Checkout
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  // INCREMENT / DECREMENT
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    const next = item.quantity - 1;
    if (next <= 0) dispatch(removeItem(item.name));
    else dispatch(updateQuantity({ name: item.name, quantity: next }));
  };

  // REMOVE
  const handleRemove = (item) => dispatch(removeItem(item.name));

  // SUBTOTAL POR ÍTEM
  const calculateTotalCost = (item) =>
    (toNumber(item.cost) * item.quantity).toFixed(2);

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${toNumber(item.cost).toFixed(2)}</div>

              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {cart.length === 0 && (
          <p style={{ color: 'black', marginTop: 16 }}>
            Your cart is empty. Add some plants!
          </p>
        )}
      </div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
