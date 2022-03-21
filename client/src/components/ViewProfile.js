import React from "react";
import Grid from '@mui/material/Grid';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarOutlineIcon from '@mui/icons-material/StarOutline';


export default function ViewProfile() {
	let userName = "User3"
	let joined = "Feb, 2022"
	let userStars = 1
	let reviews = [
		{name: "user1", stars: 1, review: "agrszdfxvcbnhjystraesdFZxfchgmjv,k.lhgfdhg"},
		{name: "user1", stars: 2, review: "afsdxhgjliufydtsaresfdzbxgnhkyustrgdftyjg"},
		{name: "user1", stars: 5, review: "uydtjfhgdgrrtayutiufyhjmnfsartyugjmhnvgfs"},
		{name: "user1", stars: 3, review: "teysdrjghngdfsfwt6578ioyilkh,jmhndzsw6576uty"}
	]

	let items = [
		{itemName: "Hoodie", img: "https://dummyimage.com/160x160/000/fff", price: 45, seller: "user1", listed: "Feb 20, 2022"},
		{itemName: "Hoodie", img: "https://dummyimage.com/160x160/000/fff", price: 45, seller: "user1", listed: "Feb 20, 2022"},
		{itemName: "Hoodie", img: "https://dummyimage.com/160x160/000/fff", price: 45, seller: "user1", listed: "Feb 20, 2022"},
		{itemName: "Hoodie", img: "https://dummyimage.com/160x160/000/fff", price: 45, seller: "user1", listed: "Feb 20, 2022"},
		{itemName: "Hoodie", img: "https://dummyimage.com/160x160/000/fff", price: 45, seller: "user1", listed: "Feb 20, 2022"},
		{itemName: "Hoodie", img: "https://dummyimage.com/160x160/000/fff", price: 45, seller: "user1", listed: "Feb 20, 2022"}
	]

	function stars(num) {
		let ratingStar = ""
		if(num == 1) {
			ratingStar = 
				<Grid container xs>
					<Grid item xs={2}><StarRateIcon style={{ color: 'Orange', fontSize: '30px' }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarOutlineIcon style={{ fontSize: '30px' }}></StarOutlineIcon></Grid>
					<Grid item xs={2}><StarOutlineIcon style={{ fontSize: '30px' }}></StarOutlineIcon></Grid>
					<Grid item xs={2}><StarOutlineIcon style={{ fontSize: '30px' }}></StarOutlineIcon></Grid>
					<Grid item xs={2}><StarOutlineIcon style={{ fontSize: '30px' }}></StarOutlineIcon></Grid>
				</Grid>
		}
		else if(num == 2) {
			ratingStar = 
				<Grid container xs>
					<Grid item xs={2}><StarRateIcon style={{ color: 'Orange', fontSize: '30px' }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: 'Orange', fontSize: '30px' }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarOutlineIcon style={{ fontSize: '30px' }}></StarOutlineIcon></Grid>
					<Grid item xs={2}><StarOutlineIcon style={{ fontSize: '30px' }}></StarOutlineIcon></Grid>
					<Grid item xs={2}><StarOutlineIcon style={{ fontSize: '30px' }}></StarOutlineIcon></Grid>
				</Grid>
		}
		else if(num == 3) {
			ratingStar = 
				<Grid container xs>
					<Grid item xs={2}><StarRateIcon style={{ color: 'Orange', fontSize: '30px' }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: 'Orange', fontSize: '30px' }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: 'Orange', fontSize: '30px' }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarOutlineIcon style={{ fontSize: '30px' }}></StarOutlineIcon></Grid>
					<Grid item xs={2}><StarOutlineIcon style={{ fontSize: '30px' }}></StarOutlineIcon></Grid>
				</Grid>
		}
		else if(num == 4) {
			ratingStar = 
				<Grid container xs>
					<Grid item xs={2}><StarRateIcon style={{ color: 'Orange', fontSize: '30px' }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: 'Orange', fontSize: '30px' }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: 'Orange', fontSize: '30px' }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: 'Orange', fontSize: '30px' }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarOutlineIcon style={{ fontSize: '30px' }}></StarOutlineIcon></Grid>
				</Grid>
		}
		else if(num == 5) {
			ratingStar = 
				<Grid container xs>
					<Grid item xs={2}><StarRateIcon style={{ color: 'Orange', fontSize: '30px' }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: 'Orange', fontSize: '30px' }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: 'Orange', fontSize: '30px' }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: 'Orange', fontSize: '30px' }}></StarRateIcon></Grid>
					<Grid item xs={2}><StarRateIcon style={{ color: 'Orange', fontSize: '30px' }}></StarRateIcon></Grid>
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
					<u> {userName}'s Profile </u>
					<div style={{ fontFamily: 'Quicksand', fontWeight: '300',fontSize: '30px' }}>Joined: {joined}</div>
					<div style={{ fontFamily: 'Quicksand', fontWeight: '300',fontSize: '30px' }}>{userStars}/5 Stars </div>
					{stars(userStars)}
					<div style={{ display: 'flex' }}>
						<AccountCircleRoundedIcon style={{ margin: '20px 0px 0px 0', fontSize: '300px' }} />
					</div>
				</Grid>
				{/* RIGHT REVIEWS */}
            	<Grid item xs={6} style={{ overflowY: 'scroll', margin: '50px 0px 0px 70px', width: '90%', height: '600px', border: 'black 2px solid', borderRadius: '20px' }}>
					<div style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontSize: '35px', color: 'black'  }}><u>Reviews</u></div>
					{reviews.map((index) => (
						<Grid container xs style={{ margin: '15px auto 15px auto', width: '90%', height: '120px', border: 'black 2px solid', borderRadius: '20px' }}>
							<Grid item xs={3} style={{ marginLeft: '20px'}}>
								<div style={{ fontSize: '30px' }}><a href="https://example.com/faq.html" rel="noreferrer"> {index.name} </a></div>
								<div style={{ marginTop: '5px', fontSize: '20px' }}>{index.stars}/5 Stars</div>
								{stars(index.stars)}
							</Grid>
							<Grid item xs={6} style={{ marginTop: '10px'}}>
								<div>{index.review}</div>
							</Grid>
						</Grid>
					))}
				</Grid>
			</Grid>
			{/* LISTED ITEMS */}
			<div style={{ overflowY: 'scroll', margin: '50px 0% 0 10%', width: '80%', height: '700px', border: 'black 2px solid', borderRadius: '20px' }}>
				<div style={{ margin: '50px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '50px' }}>
					<u>{userName}'s Listing</u>
				</div>
				{/* EACH ITEM CARDS */}
				<Grid container xs >
					{items.map((index) => (
						<Grid item xs={5} style={{ margin: '10px auto 10px auto'}}>
							<Grid container xs style={{ margin: '10px auto 10px auto', width: '100%', height: '200px', border: 'black 2px solid', borderRadius: '20px' }}>
								{/* ITEM IMAGE */}
								<Grid item xs={3} style={{ margin: '20px'}}>
									<img src={index.img} style={{ borderRadius: '10%' }} ></img>
								</Grid>
								{/* ITEM INFO */}
								<Grid item xs={5} style={{ margin: '10px auto auto 40px'}}>
									<div style={{ fontSize: '50px', fontWeight: 'bold' }}> {index.itemName}</div>
									<div style={{ marginTop: '3px', fontSize: '30px' }}>{index.price}&nbsp;Algo</div>
									<div style={{ marginTop: '3px', fontSize: '20px' }}>Seller:&nbsp;{index.seller}</div>
									<div style={{ marginTop: '3px', fontSize: '20px' }}>Listed:&nbsp;{index.listed}</div>
									
									{stars(index.stars)}
								</Grid>
							</Grid>	
						</Grid>
						
					))}
				</Grid>
			</div>
        
		</div>
        
    )
}