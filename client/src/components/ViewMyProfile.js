import React from "react";
import Grid from '@mui/material/Grid';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import StarRateIcon from '@mui/icons-material/StarRate';
import { GlobalStoreContext } from '../store'
import { useContext } from "react";
import { Button } from '@mui/material';
import { useHistory } from "react-router-dom";

export default function ViewMyProfile() {
    const { store } = useContext(GlobalStoreContext);
	const history = useHistory();

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
					<Grid item xs={2}><StarRateIcon style={{ color: '#C4C4C4', fontSize: fontSize }}></StarRateIcon></Grid>
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
					<u> My Profile </u>
					<div style={{ fontFamily: 'Quicksand', fontWeight: '300',fontSize: '30px' }}>Joined: {joined}</div>
					<div style={{ fontFamily: 'Quicksand', fontWeight: '300',fontSize: '30px' }}>{userStars}/5 Stars </div>
					{stars(userStars, '2.5vw')}
					<div style={{ display: 'flex' }}>
						{userImage}
					</div>
				</Grid>
				{/* RIGHT REVIEWS */}
            	<Grid item xs={6} style={{ overflowY: 'scroll', margin: '50px 0px 0px 70px', width: '90%', height: '600px', border: 'black 2px solid', borderRadius: '20px' }}>
					<div style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontSize: '35px', color: 'black'  }}><u>Reviews</u></div>
					{reviews.map((index) => (
						<Grid key={index.stars + "_" + index.comment + "_myProfile"} item container xs style={{ margin: '15px auto 15px auto', width: '90%', height: '150px', border: 'black 2px solid', borderRadius: '20px' }}>
							<Grid item xs={3} style={{ marginLeft: '20px'}}>
								<div style={{ fontSize: '30px' }}><u onClick={() => { store.getProfile(index.byUsername) }} style={{ cursor: 'pointer', color: 'lightblue' }}> {index.byUsername} </u></div>
								<div style={{ marginTop: '15px', fontSize: '1.25vw' }}>{index.stars}/5 Stars</div>
								<div style={{ marginTop: '15px' }}>{stars(index.stars, '1.25vw')}</div>
							</Grid>
							<Grid item xs={6} style={{ margin: '7px 0px 0px 2vw'}}>
								<div style={{ fontSize: '25px' }}><u>Comment:</u></div>
								<div style={{ border: 'black 1px solid', borderRadius: '10px', overflowY: 'auto', width: '21vw', height: '90px', marginTop: '5px' }}><div style={{ margin: '0px 5px 0px 5px' }}>{index.comment}</div></div>
							</Grid>
						</Grid>
					))}
				</Grid>
			</Grid>
			{/* LISTED ITEMS */}
			<div style={{ overflowY: 'scroll', margin: '50px 0% 50px 10%', width: '80%', height: '700px', border: 'black 2px solid', borderRadius: '20px' }}>
				<div style={{ margin: '50px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '50px' }}>
					<u>My Listings</u>
				</div>
				{/* EACH ITEM CARDS */}
				<div style={{ margin: '3% 0 3% 7%', display: 'grid', gridTemplateColumns: 'repeat(2, 35vw)' }}>
					{items.map((index) => (
						<div style={{ marginBottom: '5%', display: 'grid', gridTemplateColumns: 'repeat(2, 35vw)', width: '95%', height: '200px', border: 'black 2px solid', borderRadius: '20px' }}>
							{/* ITEM IMAGE */}
							<div style={{ position: 'absolute', margin: '25px 0 0 25px'}}>
								<img onClick={() => { history.push("/product/" + index._id) }} src={`data:${index.image.mimetype};base64,${Buffer.from(index.image.data).toString('base64')}`} alt="" style={{ cursor: 'pointer', width: '150px', height: '150px', borderRadius: '10%' }} ></img>
							</div>
							{/* ITEM INFO */}
							<div style={{position: 'absolute', margin: '3px 0 0 200px'}}>
								<div onClick={() => { history.push("/product/" + index._id) }} style={{ cursor: 'pointer', fontSize: '50px', fontWeight: 'bold' }}> {index.name}</div>
								<div style={{ marginTop: '3px', fontSize: '30px' }}>{index.price}&nbsp;Algo</div>
								<div style={{ marginTop: '3px', fontSize: '20px' }}>Seller:&nbsp;{index.sellerUsername}</div>
								<div style={{ marginTop: '3px', fontSize: '20px' }}>Listed:&nbsp;{index.dateListed}</div>
							</div>
						</div>
					))}
				</div>
			</div>
            <div style={{ margin: '0px 0px 50px 0px', textAlign: 'center' }}>
                <Button className="edit-account-button" onClick={() => { store.getAccount() }} style={{ background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>
                    Edit Account
                </Button>
            </div>
		</div>
        
    )
}