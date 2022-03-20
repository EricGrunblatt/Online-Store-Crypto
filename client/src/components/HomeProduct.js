import React from "react";

export default function HomeProduct() {
    return (
        <div className="home-product">
            <div className="home-product-picture" style={{ margin: '2vw 0px 0px 2vw', width: '15vw', height: '15vw', border: 'black 1px solid', borderRadius: '10px', boxShadow: '0px 2px 5px 2px rgba(0, 0, 0, 0.2)' }}>

            </div>
            <div className="home-product-information" style={{ margin: '1px 0px 0px 2vw', width: '15vw', height: '8vw', background: '#B1B1B1', border: 'grey 1px solid', borderRadius: '10px', boxShadow: '0px 2px 5px 2px rgba(0, 0, 0, 0.2)' }}>
                <div className="product-name">
                    Chair
                </div>
                <div className="product-price">
                    <div style={{ display: 'inline-block', margin: '0px 0.5vw 0px 0px'}}>
                        500
                    </div>
                    <div style={{ display: 'inline-block' }}>Algo</div>
                </div>
            </div>
        </div>
    )
}