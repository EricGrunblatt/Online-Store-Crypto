import React from "react";
//import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { useHistory } from "react-router-dom";


export default function ProductPage() {
	const history = useHistory();
	const productName = "Hoodie"
	const productNum = 287013
	const condition = "New"
	const seller = "seller3"
	const cost = "45"
	let itemImages = [
		{src: "https://dummyimage.com/120x120/000/fff", title: 'img1'},
		{src: "https://dummyimage.com/120x120/000/fff", title: 'img2'},
		{src: "https://dummyimage.com/120x120/000/fff", title: 'img1'},
		{src: "https://dummyimage.com/120x120/000/fff", title: 'img1'}
	]

    return (
		<Box style={{ position: 'absolute', marginLeft: '10%', marginRight: '10%', marginTop: '80px', width: '79%', minHeight: '450px'}}>
			<Grid container spacing={17}>
				{/* LEFT IMAGES & DESCRIPTION */}
				<Grid item xs>
					<img src="https://dummyimage.com/600x400/000/fff" alt="" style={{ borderRadius: '10%' }} ></img>
					<Grid container spacing={4}>
						{itemImages.map((index) => (
								<Grid item xs>
									<img src={index.src} alt="" title={index.title} style={{ borderRadius: '10%' }} ></img>
								</Grid>
							))}
					</Grid>
					<div style={{ fontFamily: 'Quicksand', fontWeight: '500', fontSize: '40px', color: 'black' }}>
						<u> Description </u>
					</div>
					<div style={{ paddingTop: '10px', fontFamily: 'Quicksand', fontSize: '20px', color: 'black' }}>
						This hoodie is great.
					</div>
				</Grid>
				{/* RIGHT ABOUT THE ITEM */}
				<Grid item xs> 
					<div style={{ fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '50px', color: 'black' }}>
                    	{productName}
					</div>
					<div style={{ paddingTop: '40px', textDecoration: 'none', fontFamily: 'Quicksand', fontSize: '20px', color: 'black' }}>
                    	Product #: {productNum}
					</div>
					<div style={{ paddingTop: '30px', textDecoration: 'none', fontFamily: 'Quicksand', fontSize: '20px', color: 'black' }}>
                    	Condition: {condition}
					</div>
					<div style={{ paddingTop: '30px', textDecoration: 'none', fontFamily: 'Quicksand', fontSize: '20px', color: 'black' }}>
                    	Seller: <a href="https://example.com/faq.html" rel="noreferrer"> {seller} </a>
					</div>
					
					<div style={{ paddingTop: '60px', textDecoration: 'none', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '45px', color: 'black', textAlign: 'right' }}>
                    	{cost} Algo
					</div>
					<Button onClick={() => { history.push("/cart") }} className="add-to-cart-button" style={{ background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>
						Add to Cart
					</Button>
					<div style={{ paddingTop: '40px', fontFamily: 'Quicksand', fontWeight: '500', fontSize: '25px', color: 'black' }}>
                    	<u> Return &#38; Refund Policy </u>
					</div>
					<div style={{ paddingTop: '10px', fontFamily: 'Quicksand', fontSize: '20px', color: 'black', textAlign: 'right' }}>
						60 days returns
						seller pays for return shipping
					</div>
					<div style={{ paddingTop: '40px', fontFamily: 'Quicksand', fontWeight: '500', fontSize: '25px', color: 'black' }}>
                    	<u> Shipping Info </u>
					</div>
					<div style={{ paddingTop: '10px', paddingBottom: '80px', fontFamily: 'Quicksand', fontSize: '20px', color: 'black', textAlign: 'right' }}>
						Standard 3-Day Priority Shipping through USPS. Shipping costs varies based on location
					</div>
					
				</Grid>
			</Grid>
			
            <LoginModal />
            <RegisterModal />
        </Box>  
    )
}