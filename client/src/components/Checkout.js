import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import axios from 'axios';
import qs from 'qs';
import api from "../api"
import algo from "../images/Algorand.png";
import { useHistory } from "react-router-dom";

export default function Checkout() {
    const history = useHistory();
	const [items, setItems] = useState([]);
	const [shippingPrices, setShippingPrices] = useState([]);
    const [wallets, setWallets] = useState([]);

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
        async function fetchWalletData() {
            try {
                // getWalletForUser
                const url = 'http://localhost:4000/api/wallet/getWallets';
                // POST 
                const options = {
                    method: 'POST',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    url
                };
                axios(options).then(function(result) {
                    console.log(result.data.wallets);
                    setWallets(result.data.wallets);
                });
            }
            catch {

            }
        }
        fetchData()
        fetchWalletData()
    },[]);

    let totalPrice = 0;
    for(let i = 0; i < items.length; i++) {
        totalPrice += +items[i].price;
    }

	for(let i = 0; i < shippingPrices.length; i++) {
        let price = parseFloat(shippingPrices[i]).toFixed(2);
        shippingPrices[i] = price;
        totalPrice += +price;
    }

    const handleScrollDown = () => {
        window.scrollTo({
            top: 880,
            behavior: "smooth"
        });
    }

    const handlePlaceOrder = () => {
        if(wallets.length === 0) {
            alert("You must set up a wallet to checkout. You are now being redirected");
            history.push("/wallet");
        }
    }

    return (
        <div className="checkout-page">
            <div className="payment" style={{ margin: '50px 0% 0px 10%', width: '80%', minHeight: '700px', border: 'black 2px solid', borderRadius: '20px' }}>
                <div className="display-name-payment" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '45px', color: 'black' }}>
                    Payment
                </div>
                <div style={{ margin: '50px 0% 0px 5%', width: '90%', height: '500px', background: 'black', borderRadius: '20px', textAlign: 'center' }}>
                    <div>
                        {wallets.length > 0 ? 
                            <div style={{ color: 'white', height: '40px', paddingTop: '35px', fontSize: '25px', fontFamily: 'Quicksand' }}>Account ID: {wallets[0]._id}</div>:
                            <div style={{ color: 'white', height: '40px', paddingTop: '35px', fontSize: '25px', fontFamily: 'Quicksand', fontWeight: 'bold' }}>Wallet Not Set Up</div>       
                        }
                    </div>
                    <img src={algo} alt="" style={{ margin: '50px 0px 0px 0%', width: '200px', height: '200px' }}></img>
                    <div className="add-remove-wallet" style={{ justifyContent: 'center', textAlign: 'center', margin: '90px 0px 0px 0px' }}>
                        {wallets.length > 0 ? 
                            <Button onClick={() => { handleScrollDown() }} style={{ background: 'white', color: 'black', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>
                                Proceed to Checkout
                            </Button>:
                            <Button onClick={() => { history.push("/wallet") }} style={{ background: 'white', color: 'black', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>
                                Go to Wallet Page
                            </Button>
                        }
                    </div>
                </div>
            </div>
            <div className="order-summary" style={{ margin: '50px 0% 50px 10%', width: '80%', minHeight: '430px', border: 'black 2px solid', borderRadius: '20px' }}>
                <div className="display-name-order-summary" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '45px', color: 'black' }}>
                    Order Summary
                </div>
                <div className="list-items-order" style={{ margin: '0px 0px 80px 0px' }}>
                    {items.map((index, i) => (
                        <div key={index._id} className="order-outer" style={{ margin: '20px 0vw 20px 1.25vw', width: '75.5vw', height: '250px', border: 'black 2px solid', borderRadius: '10px', fontFamily: 'Quicksand' }}>
                            <div className="order-photo" style={{ display: 'inline-block', float: 'left', margin: '15px 0px 15px 15px', width: '220px', height: '220px', border: 'black 1px solid', borderRadius: '10px' }}>
								<img src={index.image} 
								alt="" width="220px" height="220px" style={{ borderRadius: '10px', cursor: 'pointer' }} ></img>
                            </div>
                            <div className="right-of-photo" style={{ padding: '0px 50px 0px 0px', display: 'inline-block', float: 'right' }}>
                                <div className="product-data" style={{margin: '15px 0vw 0vw 15px', width: '40vw', height: '220px', border: 'white 1px solid' }}>
                                    <div className="product-name">
                                        <div style={{ position: 'absolute', float: 'left', fontSize: '50px', fontWeight: 'bold' }}>{index.name}</div>
                                        <div style={{ float: 'right', fontSize: '40px', margin: '8px 20px 0px 0px' }}>{index.price} Algo</div>
                                    </div>
                                    <div className="seller-name" style={{ marginTop: '70px', display: 'flex', color: '#808080', fontSize: '30px' }}>
                                        <div style={{ float: 'left', fontWeight: 'bold' }}>Seller:</div>
                                        <div style={{ marginLeft: '20px' }}>
											{index.sellerUsername}
                                        </div>   
                                    </div>
                                    <div className="order-date" style={{ marginTop: '10px', color: '#808080', fontSize: '30px' }}>
                                        <div style={{ marginRight: '10px', display: 'inline-block', fontWeight: 'bold' }}>
                                            Shipping Price:
                                        </div>
                                        <div style={{ margin: '-5px 20px 0px 0px', float: 'right', color: 'black', fontSize: '40px' }}>
                                            {shippingPrices[i]} Algo
                                        </div>
                                    </div>
                                    <div className="price-divider-line">
                                        <hr style={{ width: '40vw', float: 'right', margin: '10px 0vw 0px 0px' }}></hr>
                                    </div>
                                    <div className="added-price" style={{ float: 'right', margin: '0px 20px 0px 0px', fontSize: '40px' }}>{Math.round((+index.price + +shippingPrices[i]) * 100) / 100} Algo</div> 
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="total-payment" style={{ float: 'right', margin: '0px 20px 20px 20px', fontFamily: 'Quicksand', fontSize: '35px', color: '#FFBD59' }}>
                        Total: {Math.round(+totalPrice * 100) / 100} Algo
                    </div>
                </div>
            </div>
            <div className="place-order" style={{ textAlign: 'center' }}>
                <Button onClick={() => { handlePlaceOrder() }} className="place-order-button" style={{ margin: '0px 0px 50px 0px', background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>Place Order</Button>
            </div>
        </div>
    )
}