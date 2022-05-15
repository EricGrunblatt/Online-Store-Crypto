import React, {useState, useEffect, useContext} from "react";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import qs from 'qs';
import CartDeleteModal from "./CartDeleteModal";
import { GlobalStoreContext } from '../store'
import api from "../api"

export default function Cart() {
    const history = useHistory();
	const { store } = useContext(GlobalStoreContext);
	const [items, setItems] = useState([]);
	const [shippingPrices, setShippingPrices] = useState([]);
	const [pendingPurchases, setPendingPurchases] = useState([]);
	// const [pendingShipping, setPendingShipping] = useState([]);
    
    useEffect(() => {
		/* GET PRODUCTS BY USER ID */
		async function fetchData() {
			try{
				// GET CART PRODUCTS FOR USER
				api.getPendingPurchasesForUser().then(async function(result) {
					setPendingPurchases(result.data.pendingPurchases);
					// const unresolvedShippingPrices = result.data.pendingPurchases.product.map(async(product) => {
					// 	const data = { '_id': product._id };
					// 	const res = await api.getShippingPrice(qs.stringify(data));
					// 	return Math.round(+res.data.shippingPrice * 100) / 100;
					// 	// return res.data.shippingPrice;
					// });
					// setPendingShipping(await Promise.all(unresolvedShippingPrices));
				});

				api.getCartProductsForUser().then(async function(result) {
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

	for(let i = 0; i < shippingPrices.length; i++) {
        let price = parseFloat(shippingPrices[i]).toFixed(2);
        shippingPrices[i] = price;
    }

	async function handleDeleteCartItem(productId) {
		console.log("DELETE HERE", productId);
		// REMOVE FROM CART
		const data = { '_id': store.cartItemRemove };
		api.removeFromCart(qs.stringify(data)).then(function() {
			// GET PRODUCTS FOR USER
			api.getCartProductsForUser().then(function(result) {
				setItems(result.data.products);
			});
		});
	}

	/* OPENS CART DELETE MODAL IF PRESSED */
	const handleDeleteModalOpen = function (event) {
		store.markCartRemove(event.target.id);
    }

	async function handleCheckout() {
		api.purchaseFromCart().then(async function(result) {
			if(result.data.status === "ERROR") {
				console.log("purchaseFromCart ERROR")
			}
			console.log("purchaseFromCart RESPONSE: ", result.data);
			history.push({	
				pathname: "/checkout",
				state:  result.data});
		});
	}

	async function handlePendingCheckout(event) {
		const data = {
			status:"OK", 
			reservedProducts: pendingPurchases[event.target.id].products,
			failedToReserve: [],
			price: pendingPurchases[event.target.id].price,
			invoice: pendingPurchases[event.target.id].invoice
		};
		console.log(data);
		history.push({	
			pathname: "/checkout",
			state:  data});
	}


	const handleViewProfile = (seller) => {
		let json = {
			username: seller
		}
		console.log(json);
		store.getProfile(json);
	}

    let cartItems = 
        <div className="order-card" style={{ marginBottom: '20px' }}>
            {/* EACH ITEM CARDS */}
            <div style={{ margin: '3% 7%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 0.5fr))' }}>
                {items.map((index, i) => (
                    <div key={index._id} style={{ padding: '25px', margin: '5px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', minHeight: '100px', border: 'black 2px solid', borderRadius: '20px' }}>
						{/* ITEM IMAGE */}
						<div style={{ position: 'absolute'}}>
							<img onClick={() => { history.push("/product/" + index._id) }} src={index.image} 
							alt="" width="150px" height="150px" style={{ borderRadius: '10%', cursor: 'pointer' }} ></img>
						</div>
						{/* ITEM INFO */}
						{/* <div style={{position: 'absolute', margin: '0 0 0 200px'}}> */}
						<div style={{ marginLeft: '200px' }}>
							<div onClick={() => { history.push("/product/" + index._id) }} style={{ fontSize: '50px', fontWeight: 'bold', cursor: 'pointer' }}> 
							{index.name.length > 10 ? index.name.substring(0,11) + "..." : index.name}
							</div>
							<div style={{ marginTop: '2px', fontSize: '30px' }}>{index.price}&nbsp;Algo</div>
							<div style={{ marginTop: '3px', fontSize: '15px' }}>(Shipping Price: {shippingPrices[i]} Algo)</div>
							<div style={{ marginTop: '3px', fontSize: '20px' }}>Seller:
								<div onClick={() => { handleViewProfile(index.sellerUsername) }} style={{ margin: '0 0 0 10px', display: 'inline-block', cursor: 'pointer', color: '#879ED9' }}><u>{index.sellerUsername}</u></div>
							</div>
							<div id={index._id} onClick={handleDeleteModalOpen} style={{ marginTop: '3px', fontSize: '20px', cursor: 'pointer', color: 'red' }}>Remove</div>
						</div>
                    </div>
                    
                ))}
            </div>
            <div className="go-to-checkout" style={{ justifyContent: 'center', textAlign: 'center', margin: '10px 0px 40px 0px' }}>
                <Button onClick={handleCheckout} className="back-to-profile-button" style={{ background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>
                    Checkout
                </Button>
            </div>
        </div>;

    if(items.length === 0) {
        cartItems = 
            <div className="cart-empty" style={{ margin: '140px 0px 0px 0px', textAlign: 'center', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '40px', color: 'black' }}>
                <div>Your orders are empty... Let's begin<br></br>shopping</div>
                <Button onClick={() => { history.push("/")}} style={{ margin: '100px', background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>Start Shopping</Button>
            </div>
    }

	let pending = ""
	// IF THERE IS ANY PENING PURCHASES
	if(pendingPurchases.length > 0) {
		pending = 
		<div style={{ margin: '3% 7%', display: 'grid', alignContent: 'center', justifyContent: 'center', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 0.5fr))' }}>
			{pendingPurchases.map((p, i) => (
				<div style={{ border: 'black 2px solid', borderRadius: '20px', margin: '5px' }}>
					<div key={i} className="order-card" style={{ justifyContent: 'center', marginBottom: '20px', margin: '5px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 0.3fr))', minHeight: '100px' }}>
						{/* EACH ITEM CARDS */}
						{p.products.map((index, j) => (
							<div key={index._id} className="order-card" style={{ margin: '10px', padding: '5px', justifyContent: 'center', border: 'black 1px solid', borderRadius: '20px' }}>
								<div>
									<img onClick={() => { history.push("/product/" + index._id) }} src={index.image} 
									alt="" width="120px" height="120px" style={{ borderRadius: '10%', cursor: 'pointer' }} ></img>
									<div onClick={() => { history.push("/product/" + index._id) }} style={{ textAlign: 'right', fontSize: '30px', fontWeight: 'bold', cursor: 'pointer' }}> 
									{index.name.length > 10 ? index.name.substring(0,6) + "..." : index.name}
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="go-to-checkout" style={{ display: 'grid' }}>
						<div style={{ textAlign: 'center', fontSize: '20px', marginRight: '5px' }}>Total Price: {p.price} Algo</div>
						<Button id={i} onClick={handlePendingCheckout} className="back-to-profile-button" style={{ margin: '5px auto', background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>
							Keep Purchasing
						</Button>
					</div>
				</div>
			))}
		</div>;
	}
	

    return (
        <div>
			{pendingPurchases.length > 0 ? <div className="cart" style={{ margin: '50px 0% 50px 10%', width: '80%', minHeight: '600px', border: 'black 2px solid', borderRadius: '20px' }}>
                <div className="display-name-cart" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                    <u> Pending Items </u>
                </div>
                {pending}
            </div>:""}
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