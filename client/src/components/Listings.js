import React, { useState, useEffect, useContext } from "react";
import Button from '@mui/material/Button'
import { useHistory } from "react-router-dom";
import Grid from '@mui/material/Grid';
import axios from 'axios';
import ListingsDeleteModal from "./ListingsDeleteModal";

export default function Listings() {
    const history = useHistory();
    const [items, setItems] = useState([]);

    /* GET PRODUCT BY ID */
    useEffect(() => {
        async function fetchData() {
            try{
                // getListingProductsForUser
                const url = 'http://localhost:4000/api/product/getListingProductsForUser';
                // POST 
                const options = {
                    method: 'POST',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    url
                };
                axios(options).then(function(result) {
                    setItems(result.data.products);
                });
            }
            catch{
            }
        }
        fetchData()
    },[]);

    function editOrSold(listed) {
        if(listed === "") {
            return (
                <div><a href="/listitem" style={{ color: 'red' }}>Edit</a></div>
            )
        }
        else {
            return (
                <div>Listed:&nbsp;{listed}</div>
            )
        }
    }

    let listings = 
        <div className="display-listings">
            {/* EACH ITEM CARDS */}
            <Grid item container xs >
                {items.map((index) => (
                    <Grid item xs={5} style={{ margin: '10px auto 10px auto'}}>
                        <Grid item container xs style={{ margin: '10px auto 10px auto', width: '100%', height: '200px', border: 'black 2px solid', borderRadius: '20px' }}>
                            {/* ITEM IMAGE */}
                            <Grid item xs={3} style={{ margin: '20px'}}>
                                <img src={`data:${index.image.mimetype};base64,${Buffer.from(index.image.data).toString('base64')}`} alt="" style={{ borderRadius: '10%' }} ></img>
                            </Grid>
                            {/* ITEM INFO */}
                            <Grid item xs={5} style={{ margin: '10px auto auto 40px'}}>
                                <div style={{ fontSize: '50px', fontWeight: 'bold' }}> {index.name}</div>
                                <div style={{ marginTop: '3px', fontSize: '30px' }}>{index.price}&nbsp;Algo</div>
                                <div style={{ marginTop: '3px', fontSize: '20px' }}>Seller:&nbsp;{index.sellerUsername}</div>
                                {index.isSold ? <div style={{ marginTop: '3px', fontSize: '20px' }}>Sold on: {index.isSold}</div>
                                    :<u onClick={() => { history.push("/editItem/" + index._id) }} style={{ marginTop: '3px', fontSize: '20px', cursor: 'pointer', color: 'red', }}>Edit</u>}
                            </Grid> 
                        </Grid>	
                    </Grid>
                    
                ))}
            </Grid>
            <div className="list-item-button" style={{ textAlign: 'center' }}>
                <Button onClick={() => { history.push("/listitem") }} className="back-to-profile-button" style={{ margin: '0px 0px 20px 0px', background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>
                    List Item
                </Button>
            </div>
        </div>;
    
    if(items.length === 0) {
        listings = 
            <div className="listings-empty" style={{ margin: '140px 0px 50px 0px', textAlign: 'center', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '40px', color: 'black' }}>
                <div>Your listings are empty... Let's list<br></br>an item</div>
                <Button onClick={() => {history.push("/listitem")}} style={{ margin: '100px', background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>List Item</Button>
            </div>
    }

    return (
        <div>
            <div className="listings" style={{ margin: '50px 0% 50px 10%', width: '80%', minHeight: '600px', border: 'black 2px solid', borderRadius: '20px' }}>
                <div className="display-name-listings" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                    <u> Listings </u>
                </div>
                {listings}
            </div>
            <ListingsDeleteModal />
        </div>
    )
}