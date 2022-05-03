import React from "react";
import StarIcon from '@mui/icons-material/Star';
import { Button, TextareaAutosize } from '@mui/material';
import { useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { GlobalStoreContext } from "../store";
import api from '../api';


export default function Orders() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    let numStars = 0;
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            try{
				// GET ORDERED PRODUCTS FOR USER
                api.getOrderedProductsForUser().then(function(result) {
                    setItems(result.data.products);
                });
            }
            catch{
            }
        }
        fetchData()
    }, [])

    const handleSubmit = (index, productId) => {
        let count = 0;
        let stars = document.querySelectorAll('[data-star]');
        stars.forEach(star => {
            let starId = star.id.substring(0, star.id.length-1)
            if(starId === index._id) {
                if(star.style.color === "rgb(255, 189, 89)") {
                    count++;
                }
            }
        });
        console.log(count);
        let newComment = "";
        let comments = document.querySelectorAll('[data-comment]');
        comments.forEach(comment => {
            let commentId = comment.id.substring(0, comment.id.length-7);
            console.log(commentId);
            console.log(index._id);
            if(commentId === index._id) {
                newComment = comment.value;
            }
        });
        console.log(newComment);
        if(count < 1 || count > 5) {
            alert("Please click the number of stars for the rating");
        } else {
            let json = {
                stars: count,
                comment: newComment,
                productId: productId
            }
            store.writeReview(json).then(() => {
				// GET ORDERED PRODUCTS FOR USER
                api.getOrderedProductsForUser().then(function(result) {
                    setItems(result.data.products);
                    console.log(result.data.products);
                });
            });
            
        }
        
    }

    const handleStars = (i, index) => {
        if(index.review === null) {
            numStars = parseInt(i);
            let stars = document.querySelectorAll('[data-star]');
            stars.forEach(star => {
                let starValue = star.id.substring(star.id.length-1, star.id.length);
                let starId = star.id.substring(0, star.id.length-1);
                if(parseInt(starValue) <= numStars && starId === index._id) {
                    star.style.color = '#FFBD59';
                }
                else if(parseInt(starValue) > numStars && starId === index._id) {
                    star.style.color = '#C4C4C4';
                }
            });
        }    
    }

    const handleGetProfile = (seller) => {
        let json = {
			username: seller
		}
		console.log(json);
		store.getProfile(json);
    }

    let orders = 
            <div className="order-card" style={{ margin: '0px 0px 20px 0px' }}>
                {items.map((index) => (
                    <div key={index.id} className="order-outer" style={{ margin: '20px 0vw 0px 1.25vw', width: '75.5vw', height: '160px', border: 'black 2px solid', borderRadius: '10px', fontFamily: 'Quicksand' }}>
                        <div className="order-photo" style={{ display: 'inline-block', float: 'left', margin: '10px 0px 10px 10px', width: '140px', height: '140px', border: 'black 1px solid', borderRadius: '10px' }}>
                            <img src={index.image} alt="" style={{ width: '140px', height: '140px'}}></img>
                        </div>
                        <div className="right-of-photo" style={{ zIndex: 0, position: 'absolute', display: 'inline-block', float: 'left' }}>
                            <div className="product-data" style={{margin: '10px 0vw 0vw 10px' }}>
                                <div className="product-name" style={{ fontSize: '30px' }}>
                                {index.name.length > 10 ? index.name.substring(0,11) + "..." : index.name}
                                </div>
                                <div className="product-price" style={{ marginTop: '10px', fontSize: '20px' }}>
                                    Price: {index.price} Algo
                                </div>
                                <div className="seller-name" style={{ marginTop: '10px', color: '#808080', fontSize: '18px' }}>
                                    <div style={{ marginRight: '10px', display: 'inline-block' }}>
                                        Seller:
                                    </div>
                                    <div onClick={() => { handleGetProfile(index.sellerUsername) }} style={{ cursor: 'pointer', display: 'inline-block', color: '#879ED9' }}>
                                        <u>{index.sellerUsername}</u>
                                    </div>
                                </div>
                                <div className="order-date" style={{ marginTop: '10px', color: '#808080', fontSize: '15px' }}>
                                    <div style={{ marginRight: '10px', display: 'inline-block' }}>
                                        Placed:
                                    </div>
                                    <div style={{ display: 'inline-block', color: 'black' }}>
                                        {index.dateSold}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="submit-review" style={{ zIndex: 1000, display: 'inline-block', float: 'right', marginRight: '2vw' }}>
                            <div className="leave-rating" style={{ display: 'inline-block', margin: '10px 0vw 0vw 0vw', fontSize: '20px' }}>
                                <u>Leave a Rating</u>
                                <div className="stars" style={{ marginTop: '20px' }}>
                                    <StarIcon data-star id={index._id + "1"} onClick={() => {handleStars("1", index)}} style={{ cursor: index.review === null ? 'pointer' : 'default', fontSize: '25px', color: index.review !== null && index.review.stars >= 1 ? '#FFBD59' : '#C4C4C4' }}>1</StarIcon>
                                    <StarIcon data-star id={index._id + "2"} onClick={() => {handleStars("2", index)}} style={{ cursor: index.review === null ? 'pointer' : 'default', fontSize: '25px', color: index.review !== null && index.review.stars >= 2 ? '#FFBD59' : '#C4C4C4' }}>2</StarIcon>
                                    <StarIcon data-star id={index._id + "3"} onClick={() => {handleStars("3", index)}} style={{ cursor: index.review === null ? 'pointer' : 'default', fontSize: '25px', color: index.review !== null && index.review.stars >= 3 ? '#FFBD59' : '#C4C4C4' }}>3</StarIcon>
                                    <StarIcon data-star id={index._id + "4"} onClick={() => {handleStars("4", index)}} style={{ cursor: index.review === null ? 'pointer' : 'default', fontSize: '25px', color: index.review !== null && index.review.stars >= 4 ? '#FFBD59' : '#C4C4C4' }}>4</StarIcon>
                                    <StarIcon data-star id={index._id + "5"} onClick={() => {handleStars("5", index)}} style={{ cursor: index.review === null ? 'pointer' : 'default', fontSize: '25px', color: index.review !== null && index.review.stars >= 5 ? '#FFBD59' : '#C4C4C4' }}>5</StarIcon>
                                </div>
                                { console.log(index) }
                                { index.review === null ? <Button data-submit id={index._id + "submit"} onClick={() => {handleSubmit(index, index._id)}} style={{ marginTop: '25px', color: 'black', border: 'black 1px solid', borderRadius: '10px', width: '110px', height: '35px', fontSize: '13px' }}>Submit</Button>: ""}
                                
                            </div>
                            <div className="leave-comment" style={{ margin: '15px 0vw 0vw 20px', display: 'inline-block', float: 'right', fontSize: '15px' }}>
                                <u>Comment</u>
                                <div style={{ margin: '10px 0vw 0vw 0vw' }}>
                                    {index.review === null ?
                                        <TextareaAutosize
                                            data-comment
                                            id={index._id + "comment"}
                                            disabled={index.review !== null}
                                            maxRows={5}
                                            aria-label="maximum height"
                                            placeholder="Leave Comment"
                                            style={{ width: '30vw', height: '100px', maxWidth: '40vw', maxHeight: '100px', fontSize: '15px' }}
                                        /> : 
                                        <TextareaAutosize
                                            data-comment-disabled
                                            value={index.review.comment}
                                            id={index._id + "commentDisabled"}
                                            disabled={index.review !== null}
                                            maxRows={5}
                                            aria-label="maximum height"
                                            placeholder="Leave Comment"
                                            style={{ width: '30vw', height: '100px', maxWidth: '40vw', maxHeight: '100px', fontSize: '15px' }}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>;
    
    if(items.length === 0) {
        orders = 
            <div className="orders-empty" style={{ margin: '140px 0px 0px 0px', textAlign: 'center', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '40px', color: 'black' }}>
                <div>Your orders are empty... Let's begin<br></br>shopping</div>
                <Button onClick={() => {history.push("/")}} style={{ margin: '100px', background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>Start Shopping</Button>
            </div>
    }

    return (
        <div className="orders" style={{ margin: '50px 0% 50px 10%', width: '80%', minHeight: '600px', border: 'black 2px solid', borderRadius: '20px' }}>
            <div className="display-name-orders" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                <u> Orders </u>
            </div>
            {orders}
        </div>
    )
}