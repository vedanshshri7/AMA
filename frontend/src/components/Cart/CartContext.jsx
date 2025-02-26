import React, {createContext, useEffect, useState} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

export const CartContext = createContext();

export const CartProvider = (({children}) => {
    const [cartData, setCartData] = useState(() => {
        const savedCart = localStorage.getItem('cartData');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartData', JSON.stringify(cartData));
    }, [cartData]);

    const addToCart = (item) => {
        setCartData((prevCartData) => {
            const itemExists = prevCartData.find(cartItem => cartItem._id === item._id);
    
            if (itemExists) {
                // If the item is already in the cart, update the quantity
                toast.info(`${item.name} quantity updated in the cart`, {
                    position: "top-right",
                    autoClose: 2000,  // duration of toast
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return prevCartData.map(cartItem =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                // If the item is not in the cart, add it with quantity 1
                toast.success(`${item.name} added to the cart`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return [...prevCartData, { ...item, quantity: 1 }];
            }
        });
    }
    const removeFromCart = (itemId) => {
        setCartData((prevCartData) => prevCartData.filter(item => item._id !== itemId))
    }

    return (
        <CartContext.Provider value={{ cartData, setCartData, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
});