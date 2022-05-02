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
						<div style={{marginLeft: '200px'}}>
							<div onClick={() => { history.push("/product/" + index._id) }} style={{ fontSize: '30px', fontWeight: 'bold', cursor: 'pointer' }}> 
								{index.name.length > 14 ? index.name.substring(0,15) + "..." : index.name}
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
	let totalPrice = 0
	// IF THERE IS ANY PENING PURCHASES
	if(pendingPurchases.length > 0) {
		for(let i = 0; i < pendingPurchases.length; i++) {
			totalPrice += +pendingPurchases[i].price;
		}
		// for(let i = 0; i < pendingShipping.length; i++) {
		// 	let price = parseFloat(pendingShipping[i]).toFixed(2);
		// 	pendingShipping[i] = price;
		// 	totalPrice += +price;
		// }
		pending = 
		<div>
			{pendingPurchases.map((p) => (
				<div className="list-items-order" style={{ margin: '0px 20px 80px 20px', border: 'black 2px solid', borderRadius: '10px' }}>
					{p.products.map((index, i) => (
						<div key={index._id} className="order-outer" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 1fr)', fontFamily: 'Quicksand' }}>
							<div className="order-photo" style={{ display: 'inline-block', float: 'left', margin: '15px 0px 15px 15px' }}>
								<img src={index.image} 
								alt="" width="150px" height="150px" style={{ borderRadius: '10px', cursor: 'pointer', border: 'black 2px solid', borderRadius: '10px' }} ></img>
							</div>
							<div className="right-of-photo" style={{ padding: '0px 50px 0px 0px', display: 'inline-block', float: 'right' }}>
								<div className="product-data" style={{margin: '15px 0vw 0vw 15px', border: 'white 1px solid' }}>
									<div className="product-name">
										<div style={{ position: 'absolute', float: 'left', fontSize: '30px', fontWeight: 'bold' }}>{index.name}</div>
										<div style={{ float: 'right', fontSize: '40px', margin: '8px 20px 0px 0px' }}>{index.price} Algo</div>
									</div>
									<div className="seller-name" style={{ marginTop: '70px', display: 'flex', color: '#808080', fontSize: '20px' }}>
										<div style={{ float: 'left', fontWeight: 'bold' }}>Seller:</div>
										<div style={{ marginLeft: '20px' }}>
											{index.sellerUsername}
										</div>   
									</div>
									{/* <div className="order-date" style={{ marginTop: '10px', color: '#808080', fontSize: '20px' }}>
										<div style={{ marginRight: '10px', display: 'inline-block', fontWeight: 'bold' }}>
											Shipping Price:
										</div>
										<div style={{ margin: '-5px 20px 0px 0px', float: 'right', color: 'black', fontSize: '20px' }}>
											{pendingShipping[i]} Algo
										</div>
									</div> */}
									<div className="price-divider-line">
										<hr style={{ width: '40vw', float: 'right', margin: '10px 0vw 0px 0px' }}></hr>
									</div>
								</div>
							</div>
						</div>
					))}
					<Button onClick={() => { window.location.href = p.invoice }} style={{ margin: '100px', background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>Keep Purchasing</Button>
				</div>
			))}
		</div>
		// <div>
		// 	{pendingPurchases.map((p) => (
		// 		<div className="order-card" style={{ marginBottom: '20px' }}>
		// 		{/* EACH ITEM CARDS */}
		// 		<div style={{ margin: '3% 7%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 0.5fr))' }}>
		// 			{p.products.map((index, i) => (
		// 				<div key={index._id} style={{ padding: '25px', margin: '5px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', minHeight: '100px', border: 'black 2px solid', borderRadius: '20px' }}>
		// 					{/* ITEM IMAGE */}
		// 					<div style={{ position: 'absolute'}}>
		// 						<img onClick={() => { history.push("/product/" + index._id) }} src={index.image} 
		// 						alt="" width="150px" height="150px" style={{ borderRadius: '10%', cursor: 'pointer' }} ></img>
		// 					</div>
		// 					{/* ITEM INFO */}
		// 					<div style={{marginLeft: '200px'}}>
		// 						<div onClick={() => { history.push("/product/" + index._id) }} style={{ fontSize: '30px', fontWeight: 'bold', cursor: 'pointer' }}> 
		// 							{index.name.length > 14 ? index.name.substring(0,15) + "..." : index.name}
		// 						</div>
		// 						<div style={{ marginTop: '2px', fontSize: '30px' }}>{index.price}&nbsp;Algo</div>
		// 						<div style={{ marginTop: '3px', fontSize: '15px' }}>(Shipping Price: {shippingPrices[i]} Algo)</div>
		// 						<div style={{ marginTop: '3px', fontSize: '20px' }}>Seller:
		// 							<div onClick={() => { handleViewProfile(index.sellerUsername) }} style={{ margin: '0 0 0 10px', display: 'inline-block', cursor: 'pointer', color: '#879ED9' }}><u>{index.sellerUsername}</u></div>
		// 						</div>
		// 						</div>
		// 				</div>
						
		// 			))}
		// 		</div>
		// 		<div className="go-to-checkout" style={{ justifyContent: 'center', textAlign: 'center', margin: '10px 0px 40px 0px' }}>
		// 			<Button onClick={() => {window.location.href = p.invoice;}} className="back-to-profile-button" style={{ background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>
		// 				Keep Purchasing
		// 			</Button>
		// 		</div>
		// 	</div>
		// 	))}
			
		// </div>;
	}
	

    return (
        <div>
			<div className="cart" style={{ margin: '50px 0% 50px 10%', width: '80%', minHeight: '600px', border: 'black 2px solid', borderRadius: '20px' }}>
                <div className="display-name-cart" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                    <u> Pending Items </u>
                </div>
                {pending}
            </div>
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