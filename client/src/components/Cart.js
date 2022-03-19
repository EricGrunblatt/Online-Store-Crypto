import React from "react";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";

export default function Cart() {
    const history = useHistory();

    return (
        <div>
            <div className="cart" style={{ margin: '50px 0% 0px 10%', width: '80%', height: '600px', border: 'black 2px solid', borderRadius: '20px' }}>
                <div className="display-name-cart" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                    <u> Cart </u>
                </div>
            </div>
            <div className="go-to-checkout" style={{ justifyContent: 'center', textAlign: 'center', margin: '50px 0px 50px 0px' }}>
                <Button onClick={() => { history.push("/") }} className="back-to-profile-button" style={{ background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>
                    Checkout
                </Button>
            </div>
        </div>
    )
}