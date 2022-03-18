import React from "react";
import algo from "../images/Algorand.png";

export default function Wallet() {
    return (
        <div className="wallet" style={{ margin: '50px 0% 0px 10%', width: '80%', height: '700px', border: 'black 2px solid', borderRadius: '20px' }}>
            <div className="display-name-wallet" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                <u> Wallet </u>
            </div>
            <div style={{ margin: '50px 0% 0px 5%', width: '90%', height: '500px', background: 'black', borderRadius: '20px' }}>
                <img src={algo} alt="" style={{ margin: '140px 0px 0px 5%', width: '20vw', height: '20vw' }}></img>
                <div></div>
            </div>
        </div>
    )
}