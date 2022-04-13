import React, {useEffect, useState} from "react";
// import { Alert } from 'react-alert'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';
import { GlobalStoreContext } from '../store'
import { useContext } from "react";


export default function ProductPage() {
	const { store } = useContext(GlobalStoreContext);
	const history = useHistory();

	const pathname = window.location.pathname;
    const productId = pathname.split("/").pop();

	const [productName, setProductName] = useState("");
	const [productNum, setProductNum] = useState("");
	const [condition, setCondition] = useState("");
	const [description, setDescription] = useState("");
	const [seller, setSeller] = useState("");
	const [cost, setCost] = useState("");
	const [itemImage0, setItemImage0] = useState(null);
	const [itemImages, setItemImages] = useState([]);

	/* GET PRODUCTS BY USER ID */
    useEffect(() => {
        async function fetchData() {
            try{
                // getListingProductsForUser
                const url = 'http://localhost:4000/api/product/getProduct';
                // POST 
                const data = { '_id': productId };
                const options = {
                    method: 'POST',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    data: qs.stringify(data),
                    url
                };
                axios(options).then(function(result) {
                    console.log("RESPONSE: ", result);
					setProductName(result.data.product.name);
					setProductNum(result.data.product._id);
					setDescription(result.data.product.description);
					setCondition(result.data.product.condition);
					setSeller(result.data.product.sellerUsername);
					setCost(result.data.product.price);
					setItemImage0(result.data.product.images[0]);
					setItemImages(result.data.product.images);
                });
            }
            catch{
            }
        }
        fetchData()
    },[]);

	/* IMAGES ON CLICK */
    const handleImage = (event) => {
        setItemImage0(itemImages[event.target.id]);
    };

	// let alert = "";

	// ADD TO CART BUTTON
    const handleAddToCart = async function() {
        const url = 'http://localhost:4000/api/purchase/addToCart';
        // POST 
        const data = { '_id': productId };
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url
        };
        axios(options).then(function(result){
			if(result.data.status === "OK") {
				history.push("/cart")
			}
			else {
				if(result.data.errorMessage === "USER OWNS THIS ITEM"){
					console.log(result.data.errorMessage);
					// alert("You can't put your item in the cart");
				}
				// USER NOT LOGGED IN
				else {
					store.setOpenLoginModal();
				}
			}
		});
    };



	let showImages = 
        <Grid container spacing={4}>
            {itemImages.map((index, indexNum) => (
                index? 
                    <Grid item xs style={{cursor: "pointer"}}>
                        <img id={indexNum} src={`data:${index.mimetype};base64,${Buffer.from(index.data).toString('base64')}`} alt="" 
                        onClick={handleImage} title={index.title} width="100px" height="100px" style={{ borderRadius: '10%', border: "black 2px" }} ></img>
                    </Grid>:<div></div>
            ))}
        </Grid>;

	
	const handleViewProfile = (seller) => {
		let json = {
			username: seller
		}
		console.log(json);
		store.getProfile(json);
	}
	
    return (
		<Box style={{ position: 'absolute', marginLeft: '10%', marginRight: '10%', marginTop: '60px', width: '79%', minHeight: '450px'}}>
			<Grid container spacing={17}>
				{/* LEFT IMAGES & DESCRIPTION */}
				<Grid item xs>
					{/* THE MAIN IMAGE */}
					{itemImage0? <img src={`data:${itemImage0.mimetype};base64,${Buffer.from(itemImage0.data).toString('base64')}`} width="600px" height="400px" alt="" style={{ borderRadius: '10%' }} ></img>
						:<img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg" width="600px" height="400px" alt="" style={{ borderRadius: '10%' }} ></img>}
					{/* THE 8 IMAGES */}
					{showImages}
					{/* DESCRIPTION */}
					<div style={{ fontFamily: 'Quicksand', fontWeight: '500', fontSize: '40px', color: 'black' }}>
						<u> Description </u>
					</div>
					<div style={{ paddingBottom: '50px', paddingTop: '10px', fontFamily: 'Quicksand', fontSize: '20px', color: 'black' }}>
						{description}
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
                    	Seller: <div onClick={() => { handleViewProfile(seller) }} style={{ cursor: 'pointer', color: '#879ED9'}}><u>{seller}</u></div>
					</div>
					
					<div style={{ paddingTop: '60px', textDecoration: 'none', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '45px', color: 'black', textAlign: 'right' }}>
                    	{cost} Algo
					</div>
					<Button onClick={handleAddToCart} className="add-to-cart-button" style={{ background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>
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


