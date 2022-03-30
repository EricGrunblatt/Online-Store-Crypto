import React from "react";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import Grid from '@mui/material/Grid';
import CartDeleteModal from "./CartDeleteModal";

export default function Cart() {
    const history = useHistory();

    //let items = [];
    
    let items = [
		{itemName: "Hoodie", img: "https://dummyimage.com/160x160/000/fff", price: 45, seller: "user1", listed: ""},
		{itemName: "Hoodie", img: "https://dummyimage.com/160x160/000/fff", price: 45, seller: "user1", listed: ""},
		{itemName: "Hoodie", img: "https://dummyimage.com/160x160/000/fff", price: 45, seller: "user1", listed: "02/20/2022"},
		{itemName: "Hoodie", img: "https://dummyimage.com/160x160/000/fff", price: 45, seller: "user1", listed: "02/20/2022"},
		{itemName: "Hoodie", img: "https://dummyimage.com/160x160/000/fff", price: 45, seller: "user1", listed: "02/20/2022"},
		{itemName: "Hoodie", img: "https://dummyimage.com/160x160/000/fff", price: 45, seller: "user1", listed: "02/20/2022"}
	]

    let cartItems = 
        <div className="order-card" style={{ margin: '0px 0px 20px 0px' }}>
            {/* EACH ITEM CARDS */}
            <Grid item container xs >
                {items.map((index) => (
                    <Grid item xs={5} style={{ margin: '10px auto 10px auto'}}>
                        <Grid item container xs style={{ margin: '10px auto 10px auto', width: '100%', height: '200px', border: 'black 2px solid', borderRadius: '20px' }}>
                            {/* ITEM IMAGE */}
                            <Grid item xs={3} style={{ margin: '20px'}}>
                                <img src={index.img} alt="" style={{ borderRadius: '10%' }} ></img>
                            </Grid>
                            {/* ITEM INFO */}
                            <Grid item xs={5} style={{ margin: '10px auto auto 40px'}}>
                                <div style={{ fontSize: '50px', fontWeight: 'bold' }}> {index.itemName}</div>
                                <div style={{ marginTop: '3px', fontSize: '30px' }}>{index.price}&nbsp;Algo</div>
                                <div style={{ marginTop: '3px', fontSize: '20px' }}>Seller:&nbsp;{index.seller}</div>
                                <div style={{ marginTop: '3px', fontSize: '20px' }}><a href="/" style={{ color: 'red' }}>Remove</a></div>
                            </Grid>
                        </Grid>	
                    </Grid>
                    
                ))}
            </Grid>
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
                <Button onClick={() => {history.push("/")}} style={{ margin: '100px', background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>Start Shopping</Button>
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
            <CartDeleteModal />
        </div>
    )
}