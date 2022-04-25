import React from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { GlobalStoreContext } from '../store';

export default function HomeProduct(props) {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    const { product } = props;
    let image = product.image;
    let width = "17vw";
    let height = "120px";

    return (
        <div className="home-product">
            <div onClick={() => { store.loadProduct(product._id) }} className="home-product-picture" style={{ cursor: 'pointer', margin: '20px 0px 0px 20px', width: width, height: width, border: 'black 1px solid', borderRadius: '10px', boxShadow: '0px 2px 5px 2px rgba(0, 0, 0, 0.2)' }}>
                <img src={image} alt="" style={{ width: width, height: width, borderRadius: '10px'}}></img>
            </div>
            <div onClick={() => {history.push("/product")}} className="home-product-information" style={{ cursor: 'pointer', margin: '0px 0px 0px 20px', width: width, height: height, background: '#E1E1E1', border: 'grey 1px solid', borderRadius: '10px', boxShadow: '0px 2px 5px 2px rgba(0, 0, 0, 0.2)' }}>
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