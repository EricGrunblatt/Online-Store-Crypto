import React from "react";
import { useState } from "react";
import { TextareaAutosize, TextField, Box, Select, MenuItem } from '@mui/material';
import { FormControl, InputLabel, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom";
import { addListingProduct } from "../api"

export default function ListItem(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [condition, setCondition] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    const [image0, setImage0] = useState(null);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);
    const [image6, setImage6] = useState(null);
    const [image7, setImage7] = useState(null);

    const history = useHistory();
    let bgColor = "white";
    let fontColor = "black";
    let regexp = /^[0-9\b]+$/;

    /* OPEN/CLOSE CATEGORY MENU */
    const handleCategory = (event) => {
        setCategory(event.target.value);
    };

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

    // BOX0
    let box0 = "";

    const onImageChange0 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage0(URL.createObjectURL(event.target.files[0]));
        }
    }
    if(!image0) {
        box0 = 
        <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px dashed', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
            <label for='image0' style={{ cursor: 'pointer' }}>
                <AddIcon></AddIcon>
            </label>
            <input type='file' name='image0' id='image0' onChange={onImageChange0} style={{ display: 'none', visibility: 'none' }}></input>
        </div>
    } else {
        box0 = 
        <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px solid', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
        <label for='image0' style={{ cursor: 'pointer' }}>
            <img src={image0} alt="preview image0" style={{ width: '17vw', height: '17vw', border: 'black 1px solid', borderRadius: '10px'}}/>
        </label>
        <input type='file' name='image0' id='image0' onChange={onImageChange0} style={{ display: 'none', visibility: 'none' }}></input>
    </div>
    }

    // BOX1
    let box1 = "";
        
    const onImageChange1 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage1(URL.createObjectURL(event.target.files[0]));
        }
    }
    if(!image1) {
        box1 = 
        <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px dashed', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
            <label for='image1' style={{ cursor: 'pointer' }}>
                <AddIcon></AddIcon>
            </label>
            <input type='file' name='image1' id='image1' onChange={onImageChange1} style={{ display: 'none', visibility: 'none' }}></input>
        </div>
    } else {
        box1 = 
        <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px solid', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
        <label for='image1' style={{ cursor: 'pointer' }}>
            <img src={image1} alt="preview image1" style={{ width: '17vw', height: '17vw', border: 'black 1px solid', borderRadius: '10px'}}/>
        </label>
        <input type='file' name='image1' id='image1' onChange={onImageChange1} style={{ display: 'none', visibility: 'none' }}></input>
    </div>
    }

    // BOX2
    let box2 = "";
    
    const onImageChange2 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage2(URL.createObjectURL(event.target.files[0]));
        }
    }
    if(!image2) {
        box2 = 
        <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px dashed', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
            <label for='image2' style={{ cursor: 'pointer' }}>
                <AddIcon></AddIcon>
            </label>
            <input type='file' name='image2' id='image2' onChange={onImageChange2} style={{ display: 'none', visibility: 'none' }}></input>
        </div>
    } else {
        box2 = 
        <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px solid', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
           <label for='image2' style={{ cursor: 'pointer' }}>
               <img src={image2} alt="preview image2" style={{ width: '17vw', height: '17vw', border: 'black 1px solid', borderRadius: '10px'}}/>
           </label>
           <input type='file' name='image2' id='image2' onChange={onImageChange2} style={{ display: 'none', visibility: 'none' }}></input>
       </div>
    }

    // BOX3
    let box3 = "";
    
    const onImageChange3 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage3(URL.createObjectURL(event.target.files[0]));
        }
    }
    if(!image3) {
        box3 = 
        <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px dashed', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
            <label for='image3' style={{ cursor: 'pointer' }}>
                <AddIcon></AddIcon>
            </label>
            <input type='file' name='image3' id='image3' onChange={onImageChange3} style={{ display: 'none', visibility: 'none' }}></input>
        </div>
    } else {
        box3 = 
        <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px solid', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
           <label for='image3' style={{ cursor: 'pointer' }}>
               <img src={image3} alt="preview image3" style={{ width: '17vw', height: '17vw', border: 'black 1px solid', borderRadius: '10px'}}/>
           </label>
           <input type='file' name='image3' id='image3' onChange={onImageChange3} style={{ display: 'none', visibility: 'none' }}></input>
       </div>
    }

    // BOX4
    let box4 = "";
    
    const onImageChange4 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage4(URL.createObjectURL(event.target.files[0]));
        }
    }
    if(!image4) {
        box4 = 
        <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px dashed', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
            <label for='image4' style={{ cursor: 'pointer' }}>
                <AddIcon></AddIcon>
            </label>
            <input type='file' name='image4' id='image4' onChange={onImageChange4} style={{ display: 'none', visibility: 'none' }}></input>
        </div>
    } else {
        box4 = 
        <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px solid', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
           <label for='image4' style={{ cursor: 'pointer' }}>
               <img src={image4} alt="preview image4" style={{ width: '17vw', height: '17vw', border: 'black 1px solid', borderRadius: '10px'}}/>
           </label>
           <input type='file' name='image4' id='image4' onChange={onImageChange4} style={{ display: 'none', visibility: 'none' }}></input>
       </div>
    }

    // BOX5
    let box5 = "";
    
    const onImageChange5 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage5(URL.createObjectURL(event.target.files[0]));
        }
    }
    if(!image5) {
        box5 = 
        <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px dashed', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
            <label for='image5' style={{ cursor: 'pointer' }}>
                <AddIcon></AddIcon>
            </label>
            <input type='file' name='image5' id='image5' onChange={onImageChange5} style={{ display: 'none', visibility: 'none' }}></input>
        </div>
    } else {
        box5 = 
        <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px solid', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
           <label for='image5' style={{ cursor: 'pointer' }}>
               <img src={image5} alt="preview image5" style={{ width: '17vw', height: '17vw', border: 'black 1px solid', borderRadius: '10px'}}/>
           </label>
           <input type='file' name='image5' id='image5' onChange={onImageChange5} style={{ display: 'none', visibility: 'none' }}></input>
       </div>
    }

   // BOX6
   let box6 = "";
    
   const onImageChange6 = (event) => {
       if (event.target.files && event.target.files[0]) {
           setImage6(URL.createObjectURL(event.target.files[0]));
       }
   }
   if(!image6) {
       box6 = 
       <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px dashed', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
           <label for='image6' style={{ cursor: 'pointer' }}>
               <AddIcon></AddIcon>
           </label>
           <input type='file' name='image6' id='image6' onChange={onImageChange6} style={{ display: 'none', visibility: 'none' }}></input>
       </div>
   } else {
       box6 = 
       <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px solid', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
          <label for='image6' style={{ cursor: 'pointer' }}>
              <img src={image6} alt="preview image6" style={{ width: '17vw', height: '17vw', border: 'black 1px solid', borderRadius: '10px'}}/>
          </label>
          <input type='file' name='image6' id='image6' onChange={onImageChange6} style={{ display: 'none', visibility: 'none' }}></input>
      </div>
   }
    // BOX7
    let box7 = "";
    
    const onImageChange7 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage7(URL.createObjectURL(event.target.files[0]));
        }
    }
    if(!image7) {
        box7 = 
        <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px dashed', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
            <label for='image7' style={{ cursor: 'pointer' }}>
                <AddIcon></AddIcon>
            </label>
            <input type='file' name='image7' id='image7' onChange={onImageChange7} style={{ display: 'none', visibility: 'none' }}></input>
        </div>
    } else {
        box7 = 
        <div style={{ display: 'flex', width: '17vw', height: '17vw', border: 'black 1px solid', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
           <label for='image7' style={{ cursor: 'pointer' }}>
               <img src={image7} alt="preview image7" style={{ width: '17vw', height: '17vw', border: 'black 1px solid', borderRadius: '10px'}}/>
           </label>
           <input type='file' name='image7' id='image7' onChange={onImageChange7} style={{ display: 'none', visibility: 'none' }}></input>
       </div>
    }

    const handleListItem = async function() {

        var categoryTxts = ["Clothing", "Electronics", "Fashion", "Furniture", "Hardware",
        "Home & Garden", "Music", "Office Supplies", "Other", "Photography & Video", "Sports Equipment", "Toys", "Video Games"]
        var categoryTxt = categoryTxts[category - 1]
        var formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("condition", condition);
        formData.append("category", categoryTxt);
        formData.append("price", price);
        formData.append("boxLength", length);
        formData.append("boxWidth", width);
        formData.append("boxHeight", height);
        formData.append("boxWeight", weight);

        const element0 = document.getElementById('image0')
        const file0 = element0.files[0]

        const element1 = document.getElementById('image1')
        const file1 = element1.files[0]

        const element2 = document.getElementById('image2')
        const file2 = element2.files[0]

        const element3 = document.getElementById('image3')
        const file3 = element3.files[0]

        const element4 = document.getElementById('image4')
        const file4 = element4.files[0]

        const element5 = document.getElementById('image5')
        const file5 = element5.files[0]

        const element6 = document.getElementById('image6')
        const file6 = element6.files[0]

        const element7 = document.getElementById('image7')
        const file7 = element7.files[0]

        // HTML file input, chosen by user
        formData.append("image0", file0);
        formData.append("image1", file1);
        formData.append("image2", file2);
        formData.append("image3", file3);
        formData.append("image4", file4);
        formData.append("image5", file5);
        formData.append("image6", file6);
        formData.append("image7", file7);

        addListingProduct(formData);
    }

    return (
        <div className="list-item">
            <div className="item-name" style={{ margin: '20px 0px 0px 10%' }}>
                <div for="name" style={{ margin: '10px 2% 0px 0%', display: 'inline-block', fontFamily: 'Quicksand', fontWeight: 'bold', color: '#808080', fontSize: '25px' }}> Item Name: </div>
                    <TextField value={name} onChange={(event) => { setName(event.target.value) }}  style={{ margin: '0px 10% 0px 0px', width: '62vw', float: 'right' }}></TextField>
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
                    {box0}
                    {box1}
                    {box2}
                    {box3}
                    {box4}
                    {box5}
                    {box6}
                    {box7}
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
                    <TextareaAutosize value={description} onChange={(event) => { setDescription(event.target.value) }} style={{ minWidth: '90%', minHeight: '200px', maxWidth: '90%', maxHeight: '200px', fontSize: '20px' }}></TextareaAutosize>
                </div>
                <div className="item-price" style={{ margin: '20px 0px 0px 10%' }}>
                    <div style={{ margin: '10px 2% 0px 0%', display: 'inline-block', fontFamily: 'Quicksand', fontWeight: 'bold', color: '#808080', fontSize: '25px' }}> Item Price: </div>
                    <TextField value={price} onChange={(event) => { 
                        if(event.target.value === '' || regexp.test(event.target.value)) {
                            setPrice(event.target.value)
                        } 
                    }} style={{ margin: '0px 0% 0px 0px', width: '22vw' }}></TextField>
                    <div style={{ margin: '0px 0% 0px 1%', display: 'inline-block', fontFamily: 'Quicksand', fontWeight: 'bold', color: '#808080', fontSize: '25px' }}> Algo </div>
                </div>
                <div className="shipping" style={{ margin: '20px 0px 0px 10%' }}>
                    <div style={{ margin: '10px 2% 20px 0%', fontFamily: 'Quicksand', fontWeight: 'bold', color: '#808080', fontSize: '25px' }}> Shipping: </div>
                    <div style={{ display: 'inline-block', margin: '15px 0% 30px 5%', fontFamily: 'Quicksand', color: '#AEAEAE', fontSize: '20px' }}>Box Size:</div>
                    <div style={{ display: 'flex', float: 'right', margin: '0px 10% 0px 0%' }}>
                        <TextField value={width} onChange={(event) => { 
                            if(event.target.value === '' || regexp.test(event.target.value)) {
                                setWidth(event.target.value) 
                            }
                        }} className="width" placeholder="Width (in.)" style={{ margin: '0px 0.5vw 0px 0px', width: '20vw' }}></TextField>
                        <TextField value={length} onChange={(event) => { 
                            if(event.target.value === '' || regexp.test(event.target.value)) {
                                setLength(event.target.value) 
                            }
                        }}className="length" placeholder="Length (in.)" style={{ margin: '0px 0.5vw 0px 0px', width: '20vw' }}></TextField>
                        <TextField value={height} onChange={(event) => {
                            if(event.target.value === '' || regexp.test(event.target.value)) { 
                                setHeight(event.target.value) 
                            }
                        }} className="height" placeholder="Height (in.)" style={{ margin: '0px 0.5vw 0px 0px', width: '20vw' }}></TextField>
                    </div>
                    <div className="weight" style={{ margin: '15px 0vw 0px 5%', fontFamily: 'Quicksand', color: '#AEAEAE', fontSize: '20px' }}>Weight: </div>
                    <div style={{ float: 'right', margin: '0px 10% 0px 0%' }}>
                        <TextField value={weight} onChange={(event) => {
                            if(event.target.value === '' || regexp.test(event.target.value)) { 
                                setWeight(event.target.value) 
                            }
                        }} className="weight" placeholder="Weight (lbs)" style={{ margin: '-40px 41.5vw 0px 0px', float: 'right', width: '20vw' }}></TextField>
                    </div>
                </div>
                <div className="list-item-button" style={{ margin: '50px 0px 50px 0px', borderRadius: '10px', textAlign: 'center' }}>
                    <Button type="submit" onClick={handleListItem} style={{ textAlign: 'center', background: 'black', color: 'white', fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: '20px', width: '150px' }}>List Item</Button>
                </div> 
        </div>
    )
}


