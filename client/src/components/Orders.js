import React from "react";
import OrderProduct from "./OrderProduct";

export default function Orders() {
    return (
        <div className="orders" style={{ margin: '50px 0% 0px 10%', width: '80%', height: '700px', border: 'black 2px solid', borderRadius: '20px' }}>
            <div className="display-name-orders" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                <u> Orders </u>
            </div>
            <OrderProduct />
        </div>
    )
}