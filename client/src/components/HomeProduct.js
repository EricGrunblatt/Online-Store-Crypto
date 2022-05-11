import React from "react";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalStoreContext } from '../store';

export default function HomeProduct(props) {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    const { product } = props;
    let image = product.image;
    let width = "14vw";
    let height = "120px";
    let nameHeight = "65px";
    const [style, setStyle] = useState({ display: 'none' });
    const [border, setBorder] = useState('black 1px solid');
    const [infoBorder, setInfoBorder] = useState('grey 1px solid');

    return (
        <div className="home-product" onClick={() => { store.loadProduct(product._id) }}
            onMouseEnter={e => { setBorder('#FFBD59 1px solid'); setInfoBorder('#FFBD59 1px solid'); }}
            onMouseLeave={e => { setBorder('black 1px solid'); setInfoBorder('grey 1px solid'); }}>
            <div className="home-product-picture" style={{ cursor: 'pointer', margin: '20px 0px 0px 20px', width: width, height: width, borderRadius: '10px', border: border, boxShadow: '0px 2px 5px 2px rgba(0, 0, 0, 0.2)' }}>
                <img src={image} alt="" style={{ width: width, height: width, borderRadius: '10px' }}></img>
            </div>
            <div className="home-product-information" style={{ cursor: 'pointer', margin: '0px 0px 0px 20px', width: width, minHeight: nameHeight, maxHeight: height, color: 'rgba(0, 0, 0, 0.9)', background: 'rgba(0, 0, 0, 0.2)', border: infoBorder, borderRadius: '10px', boxShadow: '0px 2px 5px 2px rgba(0, 0, 0, 0.2)' }}>
                <div className="product-name" 
                    style={{ margin: '0px 5px 10px 5px', minHeight: '50px', maxHeight: nameHeight, fontFamily: 'Quicksand', fontSize: '25px', overflowY: 'hidden', overflowX: 'none', display: 'inline-block' }}
                    onMouseEnter={e => { if(product.name.length > 16){ setStyle({ margin: '-10px 0 2px 0px', position: 'fixed', background: 'white', fontSize: '15px', borderRadius: '5px', border: 'black 1px solid' }); }}}
                    onMouseLeave={e => { setStyle({ display: 'none'}); }}>
                    {product.name}
                </div>
                <div style={style}><div style={{ margin: '0 2px 0 2px' }}>{product.name}</div></div>
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