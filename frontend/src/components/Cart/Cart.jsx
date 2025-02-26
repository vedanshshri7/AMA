import React, { useContext } from 'react'
import './Cart.css';
import { CartContext } from './CartContext';

function Cart() {
    const {cartData, setCartData, removeFromCart} = useContext(CartContext);

    const handleItemQuantity = (id, qty) => {
        const updatedCartData = cartData.map(cartItem => cartItem.id === id ? {...cartItem, quantity: parseInt(qty, 10)}: cartItem);
        setCartData(updatedCartData);
    }

    const getTotalPrice = (data) => {
        return data.reduce((price, item) => price + item.Price*item.quantity, 0);
    }

  return (
    <div className='cart-container'>
        <div className='cart'>
            <div className='cart-header'>
                <div className='cart-heading-left'>Item Name</div>
                <div className='cart-heading-right'>Price</div>
            </div>
            <hr />
            {cartData.length > 0 ? 
            (
            <div>
                {cartData.map((cart_item, key) => (
                    <div className='cart-item' key={key}>
                        <div className='item-info'>
                        <img src={`${cart_item.img}`} alt="problem" className='cart-item-image'/>
                        <div className='cart-item-info'>
                            <div className='cart-item-name'>{cart_item.name}</div>
                            <div className='cart-item-price'>₹{cart_item.Price}/- per item</div>
                            <div className='quantity'>
                                <h2 className='qty-text'>Qty:</h2>
                                <div className='option-input'>
                                    <select 
                                        value={cart_item.quantity} 
                                        onChange={(e) => handleItemQuantity(cart_item.id, e.target.value)} 
                                        className='quantity-field'>
                                        {[...Array(5).keys()].map(num => (
                                            <option value={num+1} key={num+1}>
                                                {num+1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className='right-options'>
                            <div className='net-price'>₹{cart_item.Price * cart_item.quantity}/-</div>
                            <div className='del-btn'>
                                <button className='delete-btn' onClick={() => removeFromCart(cart_item._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            ):
            (<h1 className='empty-notice'>Your Cart is empty.</h1>)
            }
            <hr />
            <div className='total-price'>Total Price: ₹{getTotalPrice(cartData)}/-</div>
        </div>
    </div>
  )
}

export default Cart
