import React from "react";
import StarIcon from '@mui/icons-material/Star';
import { Button, TextareaAutosize } from '@mui/material';

export default function OrderProduct() {

    let numStars = 0;

    const handleStars = (index) => {
        numStars = parseInt(index);
        let stars = document.querySelectorAll('[data-star]');
        stars.forEach(star => {
            if(parseInt(star.id) <= numStars) {
                star.style.color = '#FFBD59';
            }
            else {
                star.style.color = '#C4C4C4';
            }
        });
    }

    return (
        <div className="order-outer" style={{ margin: '20px 0px 0px 2vw', width: '75.5vw', height: '17vw', border: 'black 2px solid', borderRadius: '10px', fontFamily: 'Quicksand' }}>
            <div className="order-photo" style={{ display: 'inline-block', float: 'left', margin: '1vw 0px 1vw 1vw', width: '15vw', height: '15vw', border: 'black 1px solid', borderRadius: '10px' }}>
            </div>
            <div className="right-of-photo" style={{ display: 'inline-block', float: 'left' }}>
                <div className="product-data" style={{margin: '1vw 0vw 0vw 1vw' }}>
                    <div className="product-name" style={{ fontSize: '3vw' }}>
                        Hoodie
                    </div>
                    <div className="product-price" style={{ marginTop: '0.5vw', fontSize: '2.25vw' }}>
                        45 Algo
                    </div>
                    <div className="seller-name" style={{ marginTop: '5px', color: '#808080', fontSize: '2vw' }}>
                        <div style={{ marginRight: '1vw', display: 'inline-block' }}>
                            Seller:
                        </div>
                        <div style={{ display: 'inline-block', color: '#879ED9' }}>
                            User3
                        </div>
                    </div>
                    <div className="order-date" style={{ marginTop: '5px', color: '#808080', fontSize: '2vw' }}>
                        <div style={{ marginRight: '10px', display: 'inline-block' }}>
                            Placed:
                        </div>
                        <div style={{ display: 'inline-block', color: 'black' }}>
                            03/22/22
                        </div>
                    </div>
                </div>
            </div>
            <div className="submit-review" style={{ marginLeft: '2vw', display: 'inline-block', float: 'left' }}>
                <div className="leave-rating" style={{ display: 'inline-block', margin: '1vw 0vw 0vw 0vw', fontSize: '2vw' }}>
                    <u>Leave a Rating</u>
                    <div className="stars" style={{ marginTop: '2vw' }}>
                        <StarIcon data-star id="1" onClick={() => {handleStars("1")}} style={{ cursor: 'pointer', fontSize: '2.5vw', color: '#C4C4C4' }}>1</StarIcon>
                        <StarIcon data-star id="2" onClick={() => {handleStars("2")}} style={{ cursor: 'pointer', fontSize: '2.5vw', color: '#C4C4C4' }}>2</StarIcon>
                        <StarIcon data-star id="3" onClick={() => {handleStars("3")}} style={{ cursor: 'pointer', fontSize: '2.5vw', color: '#C4C4C4' }}>3</StarIcon>
                        <StarIcon data-star id="4" onClick={() => {handleStars("4")}} style={{ cursor: 'pointer', fontSize: '2.5vw', color: '#C4C4C4' }}>4</StarIcon>
                        <StarIcon data-star id="5" onClick={() => {handleStars("5")}} style={{ cursor: 'pointer', fontSize: '2.5vw', color: '#C4C4C4' }}>5</StarIcon>
                    </div>
                    <Button style={{ marginTop: '2vw', color: 'black', border: 'black 1px solid', borderRadius: '10px', width: '12vw', height: '4vw', fontSize: '1.5vw' }}>Submit</Button>
                </div>
                <div className="leave-comment" style={{ margin: '1.5vw 0vw 0vw 2vw', display: 'inline-block', float: 'right', fontSize: '1.5vw' }}>
                    <u>Comment</u>
                    <div style={{ margin: '1vw 0vw 0vw 0vw' }}>
                        <TextareaAutosize
                            maxRows={5}
                            aria-label="maximum height"
                            placeholder="Leave Comment"
                            style={{ width: '22vw', height: '10vw', maxWidth: '22vw', maxHeight: '10vw', fontSize: '15px' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}