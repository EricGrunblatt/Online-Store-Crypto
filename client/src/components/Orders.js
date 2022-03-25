import React from "react";
import StarIcon from '@mui/icons-material/Star';
import { Button, TextareaAutosize } from '@mui/material';

export default function Orders() {
    let numStars = 0;

    let items = [
		{itemName: "Hoodie", id: "fsdlkfj", img: "https://dummyimage.com/160x160/000/fff", price: 45, seller: "user1", ordered: "03/04/2022", submitRating: ["", ""]},
		{itemName: "Hoodie", id: "dsfsdf", img: "https://dummyimage.com/160x160/000/fff", price: 45, seller: "user1", ordered: "03/01/2022", submitRating: ["", ""]},
		{itemName: "Hoodie", id: "fsdlkfasj", img: "https://dummyimage.com/160x160/000/fff", price: 45, seller: "user1", ordered: "02/20/2022", submitRating: ["", ""]},
		{itemName: "Hoodie", id: "fsdj", img: "https://dummyimage.com/160x160/000/fff", price: 45, seller: "user1", ordered: "02/20/2022", submitRating: ["", ""]},
		{itemName: "Hoodie", id: "lrtfj", img: "https://dummyimage.com/160x160/000/fff", price: 45, seller: "user1", ordered: "02/20/2022", submitRating: ["", ""]},
		{itemName: "Hoodie", id: "fsertfj", img: "https://dummyimage.com/160x160/000/fff", price: 45, seller: "user1", ordered: "02/20/2022", submitRating: ["", ""]}
	]

    const handleSubmit = (index) => {
        let count = 0;
        let stars = document.querySelectorAll('[data-star]');
        stars.forEach(star => {
            let starId = star.id.substring(0, star.id.length-1)
            if(starId === index.id) {
                if(star.style.color === "rgb(255, 189, 89)") {
                    count++;
                }
            }
        });
        let newComment = "";
        let comments = document.querySelectorAll('[data-comment]');
        comments.forEach(comment => {
            let commentId = comment.id.substring(0, comment.id.length-7);
            if(commentId === index.id) {
                newComment = comment.value;
            }
        });
        index.submitRating = [count.toString(), newComment.toString()];
        let submitButtons = document.getElementById(index.id + "submit");
        submitButtons.style.visibility = 'hidden';
        let commentBox = document.getElementById(index.id + "comment");
        commentBox.setAttribute("disabled", true);
        
        
    }

    const handleStars = (i, index) => {
        if(index.submitRating[0] === "" && index.submitRating[1] === "") {
            numStars = parseInt(i);
            let stars = document.querySelectorAll('[data-star]');
            stars.forEach(star => {
                let starValue = star.id.substring(star.id.length-1, star.id.length);
                let starId = star.id.substring(0, star.id.length-1);
                if(parseInt(starValue) <= numStars && starId === index.id) {
                    star.style.color = '#FFBD59';
                }
                else if(parseInt(starValue) > numStars && starId === index.id) {
                    star.style.color = '#C4C4C4';
                }
            });
        }    
    }

    return (
        <div className="orders" style={{ margin: '50px 0% 50px 10%', width: '80%', minHeight: '700px', border: 'black 2px solid', borderRadius: '20px' }}>
            <div className="display-name-orders" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                <u> Orders </u>
            </div>
            <div className="order-card" style={{ margin: '0px 0px 20px 0px' }}>
                {items.map((index) => (
                    <div key={index.id} className="order-outer" style={{ margin: '20px 0vw 0px 1.25vw', width: '75.5vw', height: '160px', border: 'black 2px solid', borderRadius: '10px', fontFamily: 'Quicksand' }}>
                        <div className="order-photo" style={{ display: 'inline-block', float: 'left', margin: '10px 0px 10px 10px', width: '140px', height: '140px', border: 'black 1px solid', borderRadius: '10px' }}>
                        </div>
                        <div className="right-of-photo" style={{ zIndex: 0, position: 'absolute', display: 'inline-block', float: 'left' }}>
                            <div className="product-data" style={{margin: '10px 0vw 0vw 10px' }}>
                                <div className="product-name" style={{ fontSize: '30px' }}>
                                    {index.itemName}
                                </div>
                                <div className="product-price" style={{ marginTop: '10px', fontSize: '20px' }}>
                                    Price: {index.price} Algo
                                </div>
                                <div className="seller-name" style={{ marginTop: '10px', color: '#808080', fontSize: '18px' }}>
                                    <div style={{ marginRight: '10px', display: 'inline-block' }}>
                                        Seller:
                                    </div>
                                    <a href="/viewprofile" style={{ display: 'inline-block', color: '#879ED9' }}>
                                        {index.seller}
                                    </a>
                                </div>
                                <div className="order-date" style={{ marginTop: '10px', color: '#808080', fontSize: '15px' }}>
                                    <div style={{ marginRight: '10px', display: 'inline-block' }}>
                                        Placed:
                                    </div>
                                    <div style={{ display: 'inline-block', color: 'black' }}>
                                        {index.ordered}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="submit-review" style={{ zIndex: 1000, display: 'inline-block', float: 'right', marginRight: '2vw' }}>
                            <div className="leave-rating" style={{ display: 'inline-block', margin: '10px 0vw 0vw 0vw', fontSize: '20px' }}>
                                <u>Leave a Rating</u>
                                <div className="stars" style={{ marginTop: '20px' }}>
                                    <StarIcon data-star id={index.id + "1"} onClick={() => {handleStars("1", index)}} style={{ cursor: 'pointer', fontSize: '25px', color: '#C4C4C4' }}>1</StarIcon>
                                    <StarIcon data-star id={index.id + "2"} onClick={() => {handleStars("2", index)}} style={{ cursor: 'pointer', fontSize: '25px', color: '#C4C4C4' }}>2</StarIcon>
                                    <StarIcon data-star id={index.id + "3"} onClick={() => {handleStars("3", index)}} style={{ cursor: 'pointer', fontSize: '25px', color: '#C4C4C4' }}>3</StarIcon>
                                    <StarIcon data-star id={index.id + "4"} onClick={() => {handleStars("4", index)}} style={{ cursor: 'pointer', fontSize: '25px', color: '#C4C4C4' }}>4</StarIcon>
                                    <StarIcon data-star id={index.id + "5"} onClick={() => {handleStars("5", index)}} style={{ cursor: 'pointer', fontSize: '25px', color: '#C4C4C4' }}>5</StarIcon>
                                </div>
                                <Button data-submit id={index.id + "submit"} onClick={() => {handleSubmit(index)}} style={{ visibility: "", marginTop: '25px', color: 'black', border: 'black 1px solid', borderRadius: '10px', width: '110px', height: '35px', fontSize: '13px' }}>Submit</Button>
                                
                            </div>
                            <div className="leave-comment" style={{ margin: '15px 0vw 0vw 20px', display: 'inline-block', float: 'right', fontSize: '15px' }}>
                                <u>Comment</u>
                                <div style={{ margin: '10px 0vw 0vw 0vw' }}>
                                    <TextareaAutosize
                                        id={index.id + "comment"}
                                        maxRows={5}
                                        aria-label="maximum height"
                                        placeholder="Leave Comment"
                                        style={{ width: '30vw', height: '100px', maxWidth: '40vw', maxHeight: '100px', fontSize: '15px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}