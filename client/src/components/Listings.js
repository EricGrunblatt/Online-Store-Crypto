import React from "react";
import Button from '@mui/material/Button'
import { useHistory } from "react-router-dom";

export default function Listings() {
    const history = useHistory();
    return (
        <div>
            <div className="listings" style={{ margin: '50px 0% 0px 10%', width: '80%', height: '600px', border: 'black 2px solid', borderRadius: '20px' }}>
                <div className="display-name-listings" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                    <u> Listings </u>
                </div>
            </div>
            <div className="back-to-profile" style={{ justifyContent: 'center', textAlign: 'center', margin: '50px 0px 50px 0px' }}>
                <Button onClick={() => { history.push("/listitem") }} className="back-to-profile-button" style={{ background: 'black', color: 'white', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>
                    List Item
                </Button>
            </div>
        </div>
    )
}