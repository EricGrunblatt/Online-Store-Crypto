import React from "react";
import { useHistory } from "react-router-dom";

export default function HomeProduct(props) {
    const history = useHistory();
    const { product } = props;
    console.log(product.image)
    let image = product.imageIds[0];
    console.log(image);

    return (
        <div className="home-product">
            <div onClick={() => {history.push("/product")}} className="home-product-picture" style={{ cursor: 'pointer', margin: '20px 0px 0px 20px', width: '300px', height: '300px', border: 'black 1px solid', borderRadius: '10px', boxShadow: '0px 2px 5px 2px rgba(0, 0, 0, 0.2)' }}>

            </div>
            <div onClick={() => {history.push("/product")}} className="home-product-information" style={{ cursor: 'pointer', margin: '0px 0px 0px 20px', width: '300px', height: '120px', background: '#B1B1B1', border: 'grey 1px solid', borderRadius: '10px', boxShadow: '0px 2px 5px 2px rgba(0, 0, 0, 0.2)' }}>
                <div className="product-name" style={{ margin: '0px 5px 20px 5px', fontFamily: 'Quicksand', fontSize: '25px'}}>
                    {product.name}
                </div>
                <div className="product-price" style={{ marginBottom: '50px', fontFamily: 'Quicksand', fontSize: '20px' }}>
                    <div style={{ display: 'inline-block', margin: '0px 5px 0px 5px'}}>
                        {product.price}
                    </div>
                    <div style={{ display: 'inline-block' }}>Algo</div>
                </div>
            </div>
        </div>
    )
}