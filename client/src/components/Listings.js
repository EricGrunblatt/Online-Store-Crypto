import React, { useState, useEffect, useContext } from "react";
import Button from '@mui/material/Button'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import ListingsDeleteModal from "./ListingsDeleteModal";

export default function Listings() {
    const history = useHistory();
    const [sellingItems, setSellingItems] = useState([]);
	const [soldItems, setSoldItems] = useState([]);
	const [notShippedItems, setNotShippedItems] = useState([]);

    /* GET PRODUCTS BY USER ID */
    useEffect(() => {
        async function fetchData() {
            try{
                // getSellingProductsForUser
                const url = 'http://localhost:4000/api/product/getSellingProductsForUser';
                // POST 
                const options = {
                    method: 'POST',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    url
                };
                axios(options).then(function(result) {
                    setSellingItems(result.data.products);
                });
            }
            catch{
            }
        }
        fetchData()
    },[]);

	function showListCards(items) {
		return <div className="display-listings">
			{/* EACH ITEM CARDS */}
			<div style={{ margin: '3% 0 3% 7%', display: 'grid', gridTemplateColumns: 'repeat(2, 35vw)' }}>
				{items.map((index) => (
					<div style={{ marginBottom: '5%', display: 'grid', gridTemplateColumns: 'repeat(2, 35vw)', width: '95%', height: '200px', border: 'black 2px solid', borderRadius: '20px' }}>
						{/* ITEM IMAGE */}
						<div style={{ position: 'absolute', margin: '2% 0 0 2%'}}>
							<img onClick={() => { history.push("/product/" + index._id) }} src={`data:${index.image.mimetype};base64,${Buffer.from(index.image.data).toString('base64')}`} 
							alt="" width="150px" height="150px" style={{ width: '150px', height: '150px', borderRadius: '10%', cursor: 'pointer' }} ></img>
						</div>
						{/* ITEM INFO */}
						<div style={{position: 'absolute', margin: '1% 0 0 15%'}}>
							<div onClick={() => { history.push("/product/" + index._id) }} style={{ fontSize: '50px', fontWeight: 'bold', cursor: 'pointer' }}> {index.name}</div>
							<div style={{ marginTop: '3px', fontSize: '30px' }}>{index.price}&nbsp;Algo</div>
							<div style={{ marginTop: '3px', fontSize: '20px' }}>Seller:&nbsp;{index.sellerUsername}</div>
							{index.isSold ? <div style={{ marginTop: '3px', fontSize: '20px' }}>Sold on: {index.isSold}</div>
								:<u onClick={() => { history.push("/editItem/" + index._id) }} style={{ marginTop: '3px', fontSize: '20px', cursor: 'pointer', color: 'red', }}>Edit</u>}
						</div> 
					</div>	
				))}
			</div>
		</div>;
		}

    let sellingItemsCards = "";
	let soldItemsCards = "";
	let notShippedItemsCards = "";
    
    if(sellingItems.length === 0) {
        sellingItemsCards = 
            <div className="listings-empty" style={{ margin: '140px 0px 50px 0px', textAlign: 'center', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '40px', color: 'black' }}>
                <div>Your listings are empty... Let's list<br></br>an item</div>
                <Button onClick={() => {history.push("/listitem")}} style={{ margin: '100px', background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>List Item</Button>
            </div>
    }
	else {sellingItemsCards = showListCards(sellingItems);}

	if(notShippedItems.length > 0) {
        notShippedItemsCards = showListCards(notShippedItems);
    }

	if(soldItems.length > 0) {
        soldItemsCards = showListCards(soldItems);
    }
	
    return (
        <div>
			<div className="list-item-button" style={{ textAlign: 'center' }}>
				<Button onClick={() => { history.push("/listitem") }} className="back-to-profile-button" style={{ margin: '50px 0px 20px 0px', background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>
					List Item
				</Button>
			</div>
            <div className="listings" style={{ margin: '50px 0% 50px 10%', width: '80%', minHeight: '600px', border: 'black 2px solid', borderRadius: '20px' }}>
                <div className="display-name-listings" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                    <u> Listings </u>
                </div>
                {sellingItemsCards}
            </div>
			{notShippedItems.length === 0 ? "": <div className="listings" style={{ margin: '50px 0% 50px 10%', width: '80%', minHeight: '600px', border: 'black 2px solid', borderRadius: '20px' }}>
                <div className="display-name-listings" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                    <u> Sold But Not Shipped Yet </u>
                </div>
                {notShippedItemsCards}
            </div>}
			{soldItems.length ===0 ? "": <div className="listings" style={{ margin: '50px 0% 50px 10%', width: '80%', minHeight: '600px', border: 'black 2px solid', borderRadius: '20px' }}>
                <div className="display-name-listings" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                    <u> Sold </u>
                </div>
                {soldItemsCards}
            </div>}
			
            <ListingsDeleteModal />
        </div>
    )
}