import React from "react";
import algo from "../images/Algorand.png";
import Button from '@mui/material/Button';

export default function Wallet() {
    return (
        <div className="wallet" style={{ margin: '50px 0% 0px 10%', width: '80%', height: '700px', border: 'black 2px solid', borderRadius: '20px' }}>
            <div className="display-name-wallet" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                <u> Wallet </u>
            </div>
            <div style={{ margin: '50px 0% 0px 5%', width: '90%', height: '500px', background: 'black', borderRadius: '20px' }}>
                <img src={algo} alt="" style={{ margin: '140px 0px 0px 5%', width: '200px', height: '200px' }}></img>
                <div className="add-funds" style={{ justifyContent: 'center', textAlign: 'center', margin: '90px 0px 0px 0px' }}>
                    <Button style={{ background: 'white', color: 'black', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>
                        Add Funds
                    </Button>
                </div>
            </div>
        </div>
    )
}