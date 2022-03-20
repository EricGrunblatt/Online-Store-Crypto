import React from "react";
import { useState } from "react";
import { TextField, Box, Select, MenuItem } from '@mui/material';
import { FormControl, InputLabel, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom";

export default function ListItem() {
    const [category, setCategory] = useState("");
    const [condition, setCondition] = useState("");
    const history = useHistory();
    let bgColor = "white";
    let fontColor = "black";

    /* OPEN/CLOSE CATEGORY MENU */
    const handleCategory = (event) => {
        setCategory(event.target.value);
    };

    /* LISTS ITEM */
    function handleListItem() {
        history.push("/listings")
    }

    /* CHANGE COLOR OF BUTTON WHEN SELECTED */
    const handleConButton = (event) => {
        let conButtons = document.querySelectorAll('[data-con-button]');
        conButtons.forEach(button => {
            button.style.background = 'white';
            button.style.color = 'black';
        });
        event.target.style.background = 'black';
        event.target.style.color = 'white';
        setCondition(event.target.value);
    }

    return (
        <div className="list-item">
            <div className="item-name" style={{ margin: '20px 0px 0px 10%' }}>
                <div style={{ margin: '10px 2% 0px 0%', display: 'inline-block', fontFamily: 'Quicksand', fontWeight: 'bold', color: '#808080', fontSize: '25px' }}> Item Name: </div>
                <TextField style={{ margin: '0px 10% 0px 0px', width: '62vw', float: 'right' }}></TextField>
            </div>
            <div className="select-category" style={{ margin: '40px 0px 0px 10%' }}>
                <div style={{ margin: '6px 1% 0px 0%', display: 'inline-block', fontFamily: 'Quicksand', fontWeight: 'bold', color: '#808080', fontSize: '25px' }}> Select Category: </div>
                <Box style={{ margin: '0px 10% 0px 0px', border: 'black 1px solid', borderRadius: '10px', width: '55vw', height: '50px', display: 'inline-block', float: 'right' }}>
                    <FormControl fullWidth>
                        <InputLabel style={{ color: 'black', margin: '-2px 0px 0px 0px' }} id="category-menu">Select Category</InputLabel>
                        <Select style={{ borderRadius: '10px', height: '50px' }} 
                            labelId="category-menu"
                            value={category}
                            label="Sort By"
                            onChange={handleCategory}
                        >
                            <MenuItem value={1}>Clothing</MenuItem>
                            <MenuItem value={2}>Electronics</MenuItem>
                            <MenuItem value={3}>Fashion</MenuItem>
                            <MenuItem value={4}>Furniture</MenuItem>
                            <MenuItem value={5}>Hardware</MenuItem>
                            <MenuItem value={6}>Home & Garden</MenuItem>
                            <MenuItem value={7}>Music</MenuItem>
                            <MenuItem value={8}>Office Supplies</MenuItem>
                            <MenuItem value={9}>Other</MenuItem>
                            <MenuItem value={10}>Photography & Video</MenuItem>
                            <MenuItem value={11}>Sports Equipment</MenuItem>
                            <MenuItem value={12}>Toys</MenuItem>
                            <MenuItem value={13}>Video Games</MenuItem>
                            
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div className="display-name-photos" style={{ margin: '40px 0px 0px 10%' }}>
                <div style={{ margin: '10px 0% 0px 0%', display: 'inline-block', fontFamily: 'Quicksand', fontWeight: 'bold', color: '#808080', fontSize: '25px' }}>Photos (1-8):</div>
            </div>
            <div className="photo-container" style={{ margin: '40px 0px 0px 5vw', display: 'grid', gridTemplateColumns: 'repeat(4, 20vw)', gridTemplateRows: 'minmax(20vw, auto) repeat(2, 20vw)', justifyContent: 'center', alignContent: 'center'}}>
                <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px dashed', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
                    <AddIcon></AddIcon>
                </div>
                <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px dashed', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
                    <AddIcon></AddIcon>
                </div>
                <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px dashed', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
                    <AddIcon></AddIcon>
                </div>
                <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px dashed', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
                    <AddIcon></AddIcon>
                </div>
                <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px dashed', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
                    <AddIcon></AddIcon>
                </div>
                <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px dashed', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
                    <AddIcon></AddIcon>
                </div>
                <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px dashed', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
                    <AddIcon></AddIcon>
                </div>
                <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px dashed', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
                    <AddIcon></AddIcon>
                </div>
            </div>
            <div className="condition" style={{ margin: '-20vw 0px 0px 10%'}}>
                <div style={{ margin: '10px 0% 0px 0%', display: 'inline-block', fontFamily: 'Quicksand', fontWeight: 'bold', color: '#808080', fontSize: '25px' }}>Condition:</div>
                <div style={{ margin: '10px 0% 0px 1%', display: 'inline-block', fontFamily: 'Quicksand', fontWeight: 'bold', color: '#808080', fontSize: '25px' }}>{condition}</div>

            </div>
            <div className="condition-buttons" style={{ display: 'flex', flexDirection: 'row', margin: '20px 0px 0px 10%' }}>
                <Button data-con-button value="Mint" onClick={handleConButton} style={{ margin: '0px 4vw 0px 0px', width: '17vw', height: '45px', color: fontColor, background: bgColor, border: 'black 1px solid', borderRadius: '10px', fontFamily: 'Quicksand' }}>Mint</Button>
                <Button data-con-button value="New" onClick={handleConButton} style={{ margin: '0px 4vw 0px 0px', width: '17vw', height: '45px', color: fontColor, background: bgColor, border: 'black 1px solid', borderRadius: '10px', fontFamily: 'Quicksand' }}>New</Button>
                <Button data-con-button value="Lightly Used" onClick={handleConButton} style={{ margin: '0px 4vw 0px 0px', width: '17vw', height: '45px', color: fontColor, background: bgColor, border: 'black 1px solid', borderRadius: '10px', fontFamily: 'Quicksand' }}>Lightly Used</Button>
                <Button data-con-button value="Used" onClick={handleConButton} style={{ margin: '0px 4vw 0px 0px', width: '17vw', height: '45px', color: fontColor, background: bgColor, border: 'black 1px solid', borderRadius: '10px', fontFamily: 'Quicksand' }}>Used</Button>
            </div>
            <div className="description" style={{ margin: '40px 0px 0px 10%'}}>
                <div style={{ margin: '10px 0% 0px 0%', fontFamily: 'Quicksand', fontWeight: 'bold', color: '#808080', fontSize: '25px' }}>Description:</div>
            </div>
            <div className="description-textfield" style={{ margin: '10px 0px 0px 10%'}}>
                <TextField style={{ width: '90%' }}></TextField>
            </div>
            <div className="item-price" style={{ margin: '20px 0px 0px 10%' }}>
                <div style={{ margin: '10px 2% 0px 0%', display: 'inline-block', fontFamily: 'Quicksand', fontWeight: 'bold', color: '#808080', fontSize: '25px' }}> Item Price: </div>
                <TextField style={{ margin: '0px 0% 0px 0px', width: '22vw' }}></TextField>
                <div style={{ margin: '0px 0% 0px 1%', display: 'inline-block', fontFamily: 'Quicksand', fontWeight: 'bold', color: '#808080', fontSize: '25px' }}> Algo </div>
            </div>
            <div className="shipping" style={{ margin: '20px 0px 0px 10%' }}>
                <div style={{ margin: '10px 2% 20px 0%', fontFamily: 'Quicksand', fontWeight: 'bold', color: '#808080', fontSize: '25px' }}> Shipping: </div>
                <div style={{ display: 'inline-block', margin: '15px 0% 30px 5%', fontFamily: 'Quicksand', color: '#AEAEAE', fontSize: '20px' }}>Box Size:</div>
                <div style={{ display: 'flex', float: 'right', margin: '0px 10% 0px 0%' }}>
                    <TextField className="width" placeholder="Width (in.)" style={{ margin: '0px 0.5vw 0px 0px', width: '20vw' }}>
                    </TextField>
                    <TextField className="length" placeholder="Length (in.)" style={{ margin: '0px 0.5vw 0px 0px', width: '20vw' }}></TextField>
                    <TextField className="height" placeholder="Height (in.)" style={{ margin: '0px 0.5vw 0px 0px', width: '20vw' }}></TextField>
                </div>
                <div className="weight" style={{ margin: '15px 0vw 0px 5%', fontFamily: 'Quicksand', color: '#AEAEAE', fontSize: '20px' }}>Weight: </div>
                <div style={{ float: 'right', margin: '0px 10% 0px 0%' }}>
                    <TextField className="weight" placeholder="Weight (lbs)" style={{ margin: '-40px 41.5vw 0px 0px', float: 'right', width: '20vw' }}></TextField>
                </div>
                <div className="shipping-price" style={{ margin: '50px 0vw 0px 5%', fontFamily: 'Quicksand', color: '#AEAEAE', fontSize: '20px' }}>
                    <div style={{ display: 'inline-block', margin: '0px 2vw 0px 0px'}}>Shipping Price:</div> 
                    <div style={{ display: 'inline-block'}}>10 Algo</div>
                </div>
            </div>
            <div className="list-item-button" style={{ margin: '30px 0px 50px 0px', borderRadius: '10px', textAlign: 'center' }}>
                <Button onClick={handleListItem} style={{ textAlign: 'center', background: 'black', color: 'white', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '20px', width: '150px' }}>List Item</Button>
            </div>
        </div>
    )
}