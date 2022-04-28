import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from '@mui/material';

export default function ThankyouPage() {
	const history = useHistory();

	return (
		<div className="order_placed" style={{ margin: '140px 0px 0px 0px', textAlign: 'center', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '40px', color: 'black' }}>
			<div>Thank you for your order... <br></br>Let's continue shopping</div>
			<Button onClick={() => {history.push("/")}} style={{ margin: '100px', background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>Continue Shopping</Button>
		</div>
    )
}