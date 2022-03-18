import React from "react";
import Button from '@mui/material/Button'
import { useHistory } from "react-router-dom";

export default function Listings() {
    const history = useHistory();
    return (
        <div style={{ margin: '30px 0px 0px 30px', width: '300px', height: '300px', background: 'black' }}>
            <Button onClick={() => {history.push("/listitem")}} style={{ margin: '30px 0px 0px 30px', background: 'white', color: 'black', width: '150px', height: '30px' }}>
                List Item
            </Button>
        </div>
    )
}