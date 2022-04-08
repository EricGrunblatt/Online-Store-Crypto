import React from "react";
import Grid from '@mui/material/Grid';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import StarRateIcon from '@mui/icons-material/StarRate';
import { GlobalStoreContext } from '../store'
import { useContext } from "react";


export default function ViewMyProfile() {
    const { store } = useContext(GlobalStoreContext);

	let username = store.userProfile.username;
	let joined = store.userProfile.dateJoined.substring(0,10);
	let userStars = 0
    let reviews = store.userProfile.reviews;
    let profilePic = store.userProfile.profileImage;
    let userImage = "";
    if(profilePic !== null) {
        let url = `data:${profilePic.mimetype};base64,${Buffer.from(profilePic.data).toString('base64')}`;
        userImage = <img src={url} alt="" style={{ margin: '20px 0px 0px 0px', width: '250px', height: '250px', borderRadius: '50%' }}></img>
    } else {
        userImage = <AccountCircleRoundedIcon style={{ margin: '20px 0px 0px 0px', fontSize: '300px' }} />;
    }

    if(store.userProfile.reviews.length > 0) {
        reviews.forEach(star => {
            userStars += star.stars;
        });
        userStars = Math.round(userStars / reviews.length);
    }

    let items = store.userProfile.sellingProducts;

    /*
	let items = [
		{name: "Hoodie", img: "https://dummyimage.com/160x160/000/fff", price: 45, sellerUsername: "user1", dateListed: "02/20/2022"},
		{name: "Hoodie", img: "https://dummyimage.com/160x160/000/fff", price: 45, sellerUsername: "user1", dateListed: "02/20/2022"},
		{name: "Hoodie", img: "https://dummyimage.com/160x160/000/fff", price: 45, sellerUsername: "user1", dateListed: "02/20/2022"},
		{name: "Hoodie", img: "https://dummyimage.com/160x160/000/fff", price: 45, sellerUsername: "user1", dateListed: "02/20/2022"},
		{name: "Hoodie", img: "https://dummyimage.com/160x160/000/fff", price: 45, sellerUsername: "user1", dateListed: "02/20/2022"},
		{name: "Hoodie", img: "https://dummyimage.com/160x160/000/fff", price: 45, sellerUsername: "user1", dateListed: "02/20/2022"}
	]*/

	function stars(num, fontSize) {
		let ratingStar = "";
        if(num === 0) {
			ratingStar = 
				<Grid item container xs>
					<Grid item xs={2}><StarRateIcon style={{ color: '#C4C4C4', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#C4C4C4', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#C4C4C4', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#C4C4C4', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#C4C4C4', fontSize: fontSize }}></StarRateIcon></Grid>
				</Grid>
		}
		if(num === 1) {
			ratingStar = 
				<Grid item container xs>
					<Grid item xs={2}><StarRateIcon style={{ color: '#FFBD59', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#C4C4C4', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#C4C4C4', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#C4C4C4', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#C4C4C4', fontSize: fontSize }}></StarRateIcon></Grid>
				</Grid>
		}
		else if(num === 2) {
			ratingStar = 
				<Grid item container xs>
					<Grid item xs={2}><StarRateIcon style={{ color: '#FFBD59', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#FFBD59', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#C4C4C4', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#C4C4C4', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#C4C4C4', fontSize: fontSize }}></StarRateIcon></Grid>
				</Grid>
		}
		else if(num === 3) {
			ratingStar = 
				<Grid item container xs>
					<Grid item xs={2}><StarRateIcon style={{ color: '#FFBD59', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#FFBD59', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#FFBD59', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#C4C4C4', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#C4C4C4', fontSize: fontSize }}></StarRateIcon></Grid>
				</Grid>
		}
		else if(num === 4) {
			ratingStar = 
				<Grid item container xs>
					<Grid item xs={2}><StarRateIcon style={{ color: '#FFBD59', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#FFBD59', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#FFBD59', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#FFBD59', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#C4C4C4', fontSize: '30px' }}></StarRateIcon></Grid>
				</Grid>
		}
		else if(num === 5) {
			ratingStar = 
				<Grid item container xs>
					<Grid item xs={2}><StarRateIcon style={{ color: '#FFBD59', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#FFBD59', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#FFBD59', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#FFBD59', fontSize: fontSize }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: '#FFBD59', fontSize: fontSize }}></StarRateIcon></Grid>
				</Grid>
		}
		return ratingStar
	}

    return (
		<div>
			{/* TOP PROFILE & REVIEWS */}
			<Grid container className="Profile" style={{ margin: '50px 0% 0px 10%', width: '80%', height: '700px', border: 'black 2px solid', borderRadius: '20px' }}>
				{/* LEFT PROFILE */}
				<Grid item xs={4} className="display-name-wallet" style={{ margin: '50px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '50px', color: 'black' }}>
					<u> {username}'s Profile </u>
					<div style={{ fontFamily: 'Quicksand', fontWeight: '300',fontSize: '30px' }}>Joined: {joined}</div>
					<div style={{ fontFamily: 'Quicksand', fontWeight: '300',fontSize: '30px' }}>{userStars}/5 Stars </div>
					{stars(userStars, '3vw')}
					<div style={{ display: 'flex' }}>
						{userImage}
					</div>
				</Grid>
				{/* RIGHT REVIEWS */}
            	<Grid item xs={6} style={{ overflowY: 'scroll', margin: '50px 0px 0px 70px', width: '90%', height: '600px', border: 'black 2px solid', borderRadius: '20px' }}>
					<div style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontSize: '35px', color: 'black'  }}><u>Reviews</u></div>
					{reviews.map((index) => (
						<Grid item container xs style={{ margin: '15px auto 15px auto', width: '90%', height: '120px', border: 'black 2px solid', borderRadius: '20px' }}>
							<Grid item xs={3} style={{ marginLeft: '20px'}}>
								<div style={{ fontSize: '30px' }}><a href="https://example.com/faq.html" rel="noreferrer"> {index.byUsername} </a></div>
								<div style={{ marginTop: '5px', fontSize: '20px' }}>{index.stars}/5 Stars</div>
								{stars(index.stars, '1.5vw')}
							</Grid>
							<Grid item xs={6} style={{ marginTop: '10px'}}>
								<div>{index.comment}</div>
							</Grid>
						</Grid>
					))}
				</Grid>
			</Grid>
			{/* LISTED ITEMS */}
			<div style={{ overflowY: 'scroll', margin: '50px 0% 50px 10%', width: '80%', height: '700px', border: 'black 2px solid', borderRadius: '20px' }}>
				<div style={{ margin: '50px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '50px' }}>
					<u>{username}'s' Listings</u>
				</div>
				{/* EACH ITEM CARDS */}
				<Grid item container xs >
					{items.map((index) => (
						<Grid item xs={5} style={{ margin: '10px auto 10px auto'}}>
							<Grid item container xs style={{ margin: '10px auto 10px auto', width: '100%', minHeight: '200px', border: 'black 2px solid', borderRadius: '20px' }}>
								{/* ITEM IMAGE */}
								<Grid item xs={3} style={{ margin: '20px'}}>
									<img src={`data:${index.image.mimetype};base64,${Buffer.from(index.image.data).toString('base64')}`} alt="" style={{ width: '200px', height: '200px', borderRadius: '10%' }} ></img>
								</Grid>
								{/* ITEM INFO */}
								<Grid item xs={5} style={{ margin: '10px auto auto 40px'}}>
									<div style={{ fontSize: '50px', fontWeight: 'bold' }}> {index.name}</div>
									<div style={{ marginTop: '3px', fontSize: '30px' }}>{index.price}&nbsp;Algo</div>
									<div style={{ marginTop: '3px', fontSize: '20px' }}>Seller:&nbsp;{index.sellerUsername}</div>
									<div style={{ marginTop: '3px', fontSize: '20px' }}>Listed:&nbsp;{index.dateListed}</div>
								</Grid>
							</Grid>	
						</Grid>
						
					))}
				</Grid>
			</div>
		</div>
        
    )
}