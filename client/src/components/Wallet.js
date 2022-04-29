import React from "react";
import algo from "../images/Algorand.png";
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from "react";
import api from '../api';

export default function Wallet() {
    const [wallets, setWallets] = useState([]);
    const [accountAddress, setAccountAddress] = useState("");

    /* GET WALLET BY USER ID */
    useEffect(() => {
        async function fetchData() {
            try{
                // GET WALLET INFO
                api.getWallets().then(function(result) {
                    console.log(result.data.wallets);
                    setWallets(result.data.wallets);
                });
            }
            catch{
            }
        }
        fetchData()
    },[]);

    const handleAddWallet = async function () {
        let json = {
            name: "My Wallet",
            type: "ALGO",
            address: accountAddress
        };
        let response = await api.addWallet(json);
        if(response.data.status === "OK") {
            alert("My Wallet successfully added");
			// GET WALLET AFTER ADD IT 
            api.getWallets().then(function(result) {
                console.log(result.data.wallets);
                setWallets(result.data.wallets);
            });
        } else if (response.data.status === "ERROR") {
            alert(response.data.errorMessage);
        }

    }

    const handleRemoveWallet = async function (id) {
        let json = {
            walletId: id
        };
        let response = await api.removeWallet(json);
        if(response.data.status === "OK") {
            alert("My Wallet successfully removed");
            // GET WALLET AFTER REMOVE IT
            api.getWallets().then(function(result) {
                console.log(result.data.wallets);
                setWallets(result.data.wallets);
            });
        } else if (response.data.status === "ERROR") {
            alert(response.data.errorMessage);
        }
    }

    return (
        <div className="wallet" style={{ margin: '50px 0% 0px 10%', width: '80%', height: '700px', border: 'black 2px solid', borderRadius: '20px' }}>
            <div className="display-name-wallet" style={{ margin: '20px 0% 0px 5%', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '65px', color: 'black' }}>
                <u> Wallet </u>
            </div>
            <div style={{ margin: '50px 0% 0px 5%', width: '90%', height: '500px', background: 'black', borderRadius: '20px', textAlign: 'center' }}>
                <div>
                    {wallets.length > 0 ? 
                        <div style={{ color: 'white', height: '40px', paddingTop: '35px', fontSize: '25px', fontFamily: 'Quicksand' }}>Account ID: {wallets[0]._id}</div>:
                        <TextField 
                            value={accountAddress}
                            onChange={(event) => { setAccountAddress(event.target.value) }}
                            style={{ marginTop: '20px', width: '350px', background: 'white' }}
                            placeholder="Enter Wallet ID">
                        </TextField>        
                    }
                </div>
                <img src={algo} alt="" style={{ margin: '50px 0px 0px 0%', width: '200px', height: '200px' }}></img>
                <div className="add-remove-wallet" style={{ justifyContent: 'center', textAlign: 'center', margin: '90px 0px 0px 0px' }}>
                    {wallets.length > 0 ? 
                        <Button onClick={() => { handleRemoveWallet(wallets[0]._id) }} style={{ background: 'white', color: 'black', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>
                            Remove Wallet
                        </Button>:
                        <Button onClick={() => { handleAddWallet() }} style={{ background: 'white', color: 'black', width: '30vw', height: '50px', borderRadius: '10px', fontFamily: 'Quicksand', fontSize: '20px', fontWeight: 'bold' }}>
                            Add Wallet
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}