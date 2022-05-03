import React, { useState, useEffect, useContext } from "react";
import { GlobalStoreContext } from '../store';
import { useHistory } from "react-router-dom";
import ListingsDeleteModal from "./ListingsDeleteModal";
import { TextField, Button } from "@mui/material";
import TrackingInfoModal from "./TrackingInfoModal";
import api from '../api';

export default function Listings() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    const [sellingItems, setSellingItems] = useState([]);
	const [soldItems, setSoldItems] = useState([]);
	const [notShippedItems, setNotShippedItems] = useState([]);
    const [wallets, setWallets] = useState([]);

    /* GET PRODUCTS BY USER ID */
    useEffect(() => {
        async function fetchData() {
            try{
				// GET LISTING PRODUCTS FOR USER
                api.getListingProductsForUser().then(function(result) {
                    setSellingItems(result.data.products);

                    //GET WALLET FOR USER
                    api.getWallets().then(function(result) {
                        setWallets(result.data.wallets);
                    });
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
			<div style={{ margin: '3% 7%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 0.5fr))' }}>
				{items.map((index) => (
					<div style={{ padding: '25px', margin: '5px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', minHeight: '100px', border: 'black 2px solid', borderRadius: '20px' }}>
						{/* ITEM IMAGE */}
						<div style={{ position: 'absolute' }}>
							<img onClick={() => { history.push("/product/" + index._id) }} src={index.image} 
							alt="" width="150px" height="150px" style={{ width: '150px', height: '150px', borderRadius: '10%', cursor: 'pointer' }} ></img>
						</div>
						{/* ITEM INFO */}
						{/* <div style={{position: 'absolute', margin: '15px 0 0 200px', width: '20vw'}}> */}
						<div style={{marginLeft: '200px'}}>
							<div onClick={() => { history.push("/product/" + index._id) }} style={{ fontSize: '50px', fontWeight: 'bold', cursor: 'pointer' }}> 
                                {index.name.length > 10 ? index.name.substring(0,11) + "..." : index.name}
                            </div>
							<div style={{ marginTop: '3px', fontSize: '30px' }}>{index.price}&nbsp;Algo</div>
							<div style={{ marginTop: '3px', fontSize: '20px' }}>Seller:&nbsp;{index.sellerUsername}</div>
							{index.buyerUsername === undefined || index.buyerUsername === null ? <u onClick={() => { history.push("/editItem/" + index._id) }} style={{ marginTop: '3px', fontSize: '20px', cursor: 'pointer', color: 'red', }}>Edit</u>
								: index.trackingNumber === null || index.trackingNumber === undefined ? 
                                <div style={{ display: 'flex', marginTop: '3px', fontSize: '20px', height: '40px'}}>
                                    <TextField id={"tracking" + index._id} placeholder="Tracking Number" size='small' style={{ width: '230px', marginRight: '5px' }}></TextField>
                                    <Button onClick={() => handleTrackingNumber(index, document.getElementById("tracking" + index._id)) } style={{ background: 'blue', color: 'white', fontSize: '10px' }}>Submit <br></br> Tracking</Button>
                                    <Button onClick={() => store.markBuyerAddress(index._id) } style={{ marginLeft: '5px', background: 'black', color: 'white', fontSize: '10px' }}>Shipping Info</Button>
                                </div>
                                : <div style={{ marginTop: '3px', fontSize: '20px' }}>Sold on: {index.dateSold}</div>}
                                
						</div> 
					</div>	
				))}
			</div>
		</div>;
		}
    
    const handleTrackingNumber = async function (index, trackingNumber) {
        let trackingString = trackingNumber.value.toString();
        let productId = index._id;
        if((trackingString.startsWith("94001") && trackingString.length === 22) || (trackingString.startsWith("92055") && trackingString.length === 22)) {
            let json = {
                productId: productId,
                trackingNumber: trackingString
            }
            let response = await api.setTrackingNumber(json);
            if(response.data.status === "OK") {
                console.log("Tracking Number Success");
                api.getListingProductsForUser().then(function(result) {
                    setNotShippedItems([]);
                    setSoldItems([]);
                    setSellingItems(result.data.products);
                });
            } else if (response.data.status === "ERROR") {
                alert(response.data.errorMessage);
            }
        } else {
            alert("Invalid Tracking Number");
        }
    }

    let sellingItemsCards = "";
	let soldItemsCards = "";
	let notShippedItemsCards = "";

    let index = 0;
    while(index < sellingItems.length) {
        if(sellingItems[index].buyerUsername === null) {
            index++;
        } else if (sellingItems[index].buyerUsername !== null && sellingItems[index].trackingNumber === null) {
            let newArray = notShippedItems;
            newArray.push(sellingItems[index]);
            setNotShippedItems(newArray);
            sellingItems.splice(index, 1);
        } else {
            let newArray =  soldItems;
            newArray.push(sellingItems[index]);
            setSoldItems(newArray);
            sellingItems.splice(index, 1);
        }
    }
    console.log(notShippedItems);
    console.log(soldItems);
    
    if(sellingItems.length === 0) {
        sellingItemsCards = 
            <div className="listings-empty" style={{ margin: '140px 0px 50px 0px', textAlign: 'center', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '40px', color: 'black' }}>
                <div>Your listings are empty... Let's list<br></br>an item</div>
            </div>
    }
	else {sellingItemsCards = showListCards(sellingItems);}

	if(notShippedItems.length > 0) {
        notShippedItemsCards = showListCards(notShippedItems);
    }

	if(soldItems.length > 0) {
        soldItemsCards = showListCards(soldItems);
    }

    const handleGoToListItem = () =>  {
        if(wallets.length === 0) {
            alert("You must set up a wallet before listing an item");
        } else {
            history.push("/listitem");
        }
    }
	
    return (
        <div>
            <div className="listings" style={{ margin: '50px 0% 50px 10%', width: '80%', minHeight: '600px', border: 'black 2px solid', borderRadius: '20px' }}>
                <div className="display-name-listings" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                    <u> Listings </u>
                </div>
                {sellingItemsCards}
                <div style={{ textAlign: 'center' }}>
                    <Button onClick={() => { handleGoToListItem() }} style={{ margin: '100px', background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>
                        List Item
                    </Button>
                </div>
            </div>
			{notShippedItems.length === 0 ? 
            <div>
                <div className="listings" style={{ margin: '50px 0% 50px 10%', width: '80%', minHeight: '600px', border: 'black 2px solid', borderRadius: '20px' }}>
                    <div className="display-name-listings" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                        <u> Sold But Not Shipped Yet </u>
                    </div>
                    <div style={{ margin: '140px 0px 0px 0px', textAlign: 'center', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '40px', color: 'black' }}>
                        No orders ready to be shipped
                    </div>
                </div>
            </div>: 
            <div className="listings" style={{ margin: '50px 0% 50px 10%', width: '80%', minHeight: '600px', border: 'black 2px solid', borderRadius: '20px' }}>
                <div className="display-name-listings" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                    <u> Sold But Not Shipped Yet </u>
                </div>
                {notShippedItemsCards}
            </div>}
			{soldItems.length === 0 ? 
            <div>
                <div className="listings" style={{ margin: '50px 0% 50px 10%', width: '80%', minHeight: '600px', border: 'black 2px solid', borderRadius: '20px' }}>
                    <div className="display-name-listings" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                        <u> Sold </u>
                    </div>
                    <div style={{ margin: '140px 0px 0px 0px', textAlign: 'center', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '40px', color: 'black' }}>
                        No orders have been sold
                    </div>
                </div>
            </div>: 
            <div className="listings" style={{ margin: '50px 0% 50px 10%', width: '80%', minHeight: '600px', border: 'black 2px solid', borderRadius: '20px' }}>
                <div className="display-name-listings" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                    <u> Sold </u>
                </div>
                {soldItemsCards}
            </div>}
			<TrackingInfoModal />
            <ListingsDeleteModal />
        </div>
    )
}