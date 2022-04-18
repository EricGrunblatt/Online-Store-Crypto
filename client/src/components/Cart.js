import React, {useState, useEffect, useContext} from "react";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';
import CartDeleteModal from "./CartDeleteModal";
import { GlobalStoreContext } from '../store'
import api from "../api"

export default function Cart() {
    const history = useHistory();
	const { store } = useContext(GlobalStoreContext);
	const [items, setItems] = useState([]);
	const [shippingPrices, setShippingPrices] = useState([]);

    
    useEffect(() => {
		/* GET PRODUCTS BY USER ID */
		async function fetchData() {
			try{
				// getCartProductsForUser
				const url = 'http://localhost:4000/api/product/getCartProductsForUser';
				// POST 
				const options = {
					method: 'POST',
					headers: { 'content-type': 'application/x-www-form-urlencoded' },
					url
				};
				axios(options).then(async function(result) {
					setItems(result.data.products);
					
					const unresolvedShippingPrices = result.data.products.map(async(product) => {
						const data = { '_id': product._id };
						const res = await api.getShippingPrice(qs.stringify(data));
						return Math.round(+res.data.shippingPrice * 100) / 100;
						// return res.data.shippingPrice;
					});
					setShippingPrices(await Promise.all(unresolvedShippingPrices));
				});
			}
			catch{
			}
		}
        fetchData()
    },[]);

	async function handleDeleteCartItem(productId) {
		console.log("DELETE HERE", productId);
		// removeFromCart
		const url = 'http://localhost:4000/api/purchase/removeFromCart';
		// POST 
		const data = { '_id': store.cartItemRemove };
		const options = {
			method: 'POST',
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			data: qs.stringify(data),
			url
		};
		axios(options).then(function() {
			// getCartProductsForUser
			const url = 'http://localhost:4000/api/product/getCartProductsForUser';
			// POST 
			const options = {
				method: 'POST',
				headers: { 'content-type': 'application/x-www-form-urlencoded' },
				url
			};
			axios(options).then(function(result) {
				setItems(result.data.products);
			});
		});
	}

	/* OPENS CART DELETE MODAL IF PRESSED */
	const handleDeleteModalOpen = function (event) {
		store.markCartRemove(event.target.id);
    }

    let cartItems = 
        <div className="order-card" style={{ margin: '0px 0px 20px 0px' }}>
            {/* EACH ITEM CARDS */}
            <div style={{ margin: '3% 0 3% 7%', display: 'grid', gridTemplateColumns: 'repeat(2, 35vw)' }}>
                {items.map((index, i) => (
                    <div key={index._id} style={{ marginBottom: '5%', display: 'grid', gridTemplateColumns: 'repeat(2, 35vw)', width: '95%', height: '200px', border: 'black 2px solid', borderRadius: '20px' }}>
						{/* ITEM IMAGE */}
						<div style={{ position: 'absolute', margin: '2% 0 0 2%'}}>
							<img onClick={() => { history.push("/product/" + index._id) }} src={`data:${index.image.mimetype};base64,${Buffer.from(index.image.data).toString('base64')}`} 
							alt="" width="150px" height="150px" style={{ borderRadius: '10%', cursor: 'pointer' }} ></img>
						</div>
						{/* ITEM INFO */}
						<div style={{position: 'absolute', margin: '0 0 0 15%'}}>
							<div onClick={() => { history.push("/product/" + index._id) }} style={{ fontSize: '50px', fontWeight: 'bold', cursor: 'pointer' }}> {index.name}</div>
							<div style={{ marginTop: '2px', fontSize: '30px' }}>{index.price}&nbsp;Algo</div>
							<div style={{ marginTop: '3px', fontSize: '15px' }}>(Shipping Price: {shippingPrices[i]}Algo)</div>
							<div style={{ marginTop: '3px', fontSize: '20px' }}>Seller:&nbsp;{index.sellerUsername}</div>
							<div id={index._id} onClick={handleDeleteModalOpen} style={{ marginTop: '3px', fontSize: '20px', cursor: 'pointer', color: 'red' }}>Remove</div>
						</div>
                    </div>
                    
                ))}
            </div>
            <div className="go-to-checkout" style={{ justifyContent: 'center', textAlign: 'center', margin: '10px 0px 40px 0px' }}>
                <Button onClick={() => { history.push("/checkout") }} className="back-to-profile-button" style={{ background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>
                    Checkout
                </Button>
            </div>
        </div>;

    if(items.length === 0) {
        cartItems = 
            <div className="cart-empty" style={{ margin: '140px 0px 0px 0px', textAlign: 'center', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '40px', color: 'black' }}>
                <div>Your orders are empty... Let's begin<br></br>shopping</div>
                <Button onClick={() => { history.push("/") }} style={{ margin: '100px', background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>Start Shopping</Button>
            </div>
    }

    return (
        <div>
            <div className="cart" style={{ margin: '50px 0% 50px 10%', width: '80%', minHeight: '600px', border: 'black 2px solid', borderRadius: '20px' }}>
                <div className="display-name-cart" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                    <u> Cart </u>
                </div>
                {cartItems}
            </div>
            <CartDeleteModal handleDeleteCartItem={handleDeleteCartItem}/>
        </div>
    )
}