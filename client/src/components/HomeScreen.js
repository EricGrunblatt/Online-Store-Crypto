import React from "react";
import { useState, useContext, useMemo } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import AccountErrorModal from "./AccountErrorModal";
import HomeProduct from "./HomeProduct";
import TextField from "@mui/material/TextField";
import { GlobalStoreContext } from '../store'
import Pagination from './Pagination';


export default function HomeScreen() {
    const { store } = useContext(GlobalStoreContext);

    const [openCat, setOpenCat] = useState("");
    const [openPrice, setOpenPrice] = useState("");
    const [openCon, setOpenCon] = useState("");
    const [checkedCat, setCheckedCat] = useState([]);
    const [checkedCon, setCheckedCon] = useState([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState("");

    // Makes an array to show the 3 newest items
    let newItems = store.catalogItems;
    if(newItems.length > 3) {
        newItems = store.catalogItems.slice(newItems.length-3, newItems.length);
        console.log(newItems);
    }

    /* FILTER BY CATEGORIES AND CHECK BOX FUNCTION */
    const categories = ["Clothing", "Electronics", "Fashion", "Furniture", "Hardware", "Home & Garden", "Music", "Office Supplies", "Other", "Photography & Video", "Sports Equipment", "Toys", "Video Games"];
    const conditions = ["Mint", "New", "Lightly Used", "Used"];

    let isCheckedCat = (item) => checkedCat.includes(item) ? "checked-item" : "not-checked-item";
    let isCheckedCon = (item) => checkedCon.includes(item) ? "checked-item" : "not-checked-item";

    // Looks at all filters for category
    const handleCatCheck = (event) => {
        let updatedList = checkedCat;
        if(event.target.checked) {
            updatedList.push(event.target.value);
        } else {
            updatedList.splice(checkedCat.indexOf(event.target.value), 1);
        }
        setCheckedCat(updatedList);
    };

    // LOOKS AT ALL CHECKED FILTERS FOR CONDITION
    const handleConCheck = (event) => {
        let updatedList = checkedCon;
        if(event.target.checked) {
            updatedList.push(event.target.value);
        } else {
            updatedList.splice(checkedCon.indexOf(event.target.value), 1);
        }
        setCheckedCon(updatedList);
    };


    /* OPEN/CLOSE FILTER BY CATEGORY SECTION */
    let catButton = "";
    let priceButton = "";
    let conButton = "";

    if(!openCat) {
        catButton = 
        <div style={{ height: '20px', display: 'flex', float: 'right' }}>
            <div style={{ display: 'flex', float: 'left', fontSize: '18px' }}>
                Category <br />
            </div>
            <div style={{ flexGrow: '1' }}></div>
            <Button style={{ maxHeight: '25px',  minHeight: '25px',  maxWidth: '25px',  minWidth: '25px' }} onClick={() => { handleOpenCategory() }}>
                <AddIcon style={{ color: 'black' }}></AddIcon>
            </Button>
        </div>
    } else {
        catButton = 
        <div style={{ height: '20px', display: 'flex', float: 'right' }}>
            <div style={{ display: 'flex', float: 'left', fontSize: '18px' }}>
                Category <br />
            </div>
            <div style={{ flexGrow: '1' }}></div>
            <Button style={{ maxHeight: '25px',  minHeight: '25px',  maxWidth: '25px',  minWidth: '25px' }} onClick={() => { handleOpenCategory() }}>
                <RemoveIcon style={{ color: 'black' }}></RemoveIcon>
            </Button>
        </div>
    }

    /* OPEN/CLOSE FILTER BY PRICE SECTION */
    if(!openPrice) {
        priceButton = 
        <div style={{ height: '20px', display: 'flex', float: 'right' }}>
            <div style={{ display: 'flex', float: 'left', fontSize: '18px' }}>
                Price
            </div>
            <div style={{ flexGrow: '1' }}></div>
            <Button style={{ maxHeight: '25px',  minHeight: '25px',  maxWidth: '25px',  minWidth: '25px' }} onClick={() => { handleOpenPrice() }}>
                <AddIcon style={{ color: 'black' }}></AddIcon>
            </Button>
        </div>
    } else {
        priceButton = 
        <div style={{ height: '20px', display: 'flex', float: 'right' }}>
            <div style={{ display: 'flex', float: 'left', fontSize: '18px' }}>
                Price
            </div>
            <div style={{ flexGrow: '1' }}></div>
            <Button style={{ maxHeight: '25px',  minHeight: '25px',  maxWidth: '25px',  minWidth: '25px' }} onClick={() => { handleOpenPrice() }}>
                <RemoveIcon style={{ color: 'black' }}></RemoveIcon>
            </Button>
        </div>
    }

    /* OPEN/CLOSE FILTER BY CONDITION SECTION */
    if(!openCon) {
        conButton = 
        <div style={{ height: '20px', display: 'flex' }}>
            <div style={{ display: 'flex', fontSize: '18px' }}>
                Condition
            </div>
            <div style={{ flexGrow: '1' }}></div>
            <Button style={{ margin: '0px 0px 0px 0px', maxHeight: '25px',  minHeight: '25px',  maxWidth: '25px',  minWidth: '25px' }} onClick={() => { handleOpenCondition() }}>
                <AddIcon style={{ color: 'black' }}></AddIcon>
            </Button>
        </div>
    } else {
        conButton = 
        <div style={{ height: '20px', display: 'flex' }}>
            <div style={{ display: 'flex', float: 'left', fontSize: '18px' }}>
                Condition
            </div>
            <div style={{ flexGrow: '1' }}></div>
            <Button style={{ display: 'flex', maxHeight: '25px',  minHeight: '25px',  maxWidth: '25px',  minWidth: '25px' }} onClick={() => { handleOpenCondition() }}>
                <RemoveIcon style={{ color: 'black' }}></RemoveIcon>
            </Button>
            
            
        </div>
    }

    /* FUNCTION TO OPEN CATEGORY FILTERING SECTION */
    function handleOpenCategory() {
        if(!openCat) {
            setOpenCat(
                <div className="filter-category-list" style={{ fontSize: '10px', paddingTop: '7px' }}>
                    {categories.map((item, index) => (
                        <div key={index}>
                            <input value={item} type="checkbox" onChange={handleCatCheck} />
                            <span className={isCheckedCat(item)}>{item}</span>
                        </div>
                    ))}
                </div>
            );
        } else {
            setOpenCat("");
        }
    }

    /* FUNCTIONS TO OPEN PRICE FILTERING SECTION */
    function handleOpenPrice() {
        if(!openPrice) {
            setOpenPrice(
                <div style={{ paddingTop: '7px'}}>
					<TextField className="price_from" sx={{ bgcolor:'white' }}
							inputProps={{style: {fontSize: 13}}}
							size = 'small'
							style={{ width: '6vw', float: 'left', borderRadius: '3px' }}
							placeholder="Min" 
                            onChange={(event) => { setMinPrice(event.target.value) }}>
					</TextField>
					<TextField className="price_to" sx={{ bgcolor:'white' }}
							inputProps={{style: {fontSize: 13}}}
							size = 'small'
							style={{ width: '6vw', float: 'right', borderRadius: '3px' }}
							placeholder="Max" 
                            onChange={(event) => { setMaxPrice(event.target.value) }}>
					</TextField>
				</div>
            );
        } else {
            setOpenPrice("");
        }
    }

    /* FUNCTION TO OPEN CONDITION FILTERING SECTION */
    function handleOpenCondition() {
        if(!openCon) {
            setOpenCon(
                <div className="filter-conditions-list" style={{ fontSize: '10px', paddingTop: '7px' }}>
                    {conditions.map((item, index) => (
                        <div key={index}>
                            <input value={item} type="checkbox" onChange={handleConCheck} />
                            <span className={isCheckedCon(item)}>{item}</span>
                        </div>
                    ))}
                </div>
            );
        } else {
            setOpenCon("");
        }
    }

    const handleResetFilter = async function () {
        setCheckedCat([]);
        setCheckedCon([]);

    }

    const handleFilter = async function (json) {
        store.loadItems(json);
        console.log("Items loaded with filter");
    }


    /* OPEN/CLOSE SORT MENU */
    const handleSortChange = (value) => {
        setSort(value);
        let sortBy = "";
        if(value === 1) {
            sortBy = "DATE_DESCENDING";
        } else if (value === 2) {
            sortBy = "DATE_ASCENDING";
        } else if (value === 3) {
            sortBy = "PRICE_ASCENDING";
        } else {
            sortBy = "PRICE_DESCENDING";
        }
        let json = {
            search: null, 
            categories: checkedCat, 
            conditions: checkedCon, 
            minPrice: minPrice, 
            maxPrice: maxPrice, 
            sortBy: sortBy
        }
        handleFilter(json);
    };

    const handleFilterSections = () => {
        let json = {
            search: null,
            categories: checkedCat,
            conditions: checkedCon,
            minPrice: minPrice,
            maxPrice: maxPrice,
            sortBy: null
        }
        handleFilter(json);
    }

    let allProducts = store.catalogItems;

    /* CUSTOM PAGINATION SETUP */
    let PageSize = 1;
    const [currentPage, setCurrentPage] = useState(1);
 
    let pageProductAll = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return allProducts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);


    let productCard = 
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 19vw)', gridTemplateRows: 'repeat(4, 25.5vw)' }}>
        {
            pageProductAll.map((index) => (
                <HomeProduct
                    style={{ position: 'absolute' }}
                    key={index._id}
                    product={index}
                />
            ))
        }    
        </div>;

    return (
        <Box className="homescreen" style={{ maxWidth: '99vw' }}>
            <div className="homescreen-category-bar" style={{ padding: '10px 0px 10px 10px'}}>
                <span style={{ paddingRight: '10px' }}> Electronics </span>
                <span style={{ paddingRight: '10px' }}> Clothing </span>
                <span style={{ paddingRight: '10px' }}> Furniture </span>
                <span style={{ paddingRight: '10px' }}> Sports Equipment </span>
                <span style={{ paddingRight: '10px' }}> Music </span>
                <span style={{ paddingRight: '10px' }}> Fashion </span>
            </div>
            <div className="homescreen-new-items" style={{ paddingTop: '5px', textAlign: 'center', height: '150px', backgroundColor: '#FFBD59', fontSize: '30px' }}>
                New Items
                <div style={{ paddingTop: '25px'}}>
                    <ArrowBackIosIcon style={{ margin: '0px 0vw 0px 6vw', display: 'flex', position: 'absolute' }}></ArrowBackIosIcon>
                    <div style={{ position: 'absolute', display: 'flex', margin: '0px 0vw 0px 1.75vw' }}>
                        {newItems.map((index) => (
                            <div style={{ display: 'inline-block', margin: '-20px 0vw 0px 20vw' }}>
                                <img src={`data:${index.image.mimetype};base64,${Buffer.from(index.image.data).toString('base64')}`} alt="" style={{ width: '100px', height: '100px', border: 'black 1px solid', borderRadius: '10px' }}></img>
                            </div>
                        ))}    
                    </div>
                    <ArrowForwardIosIcon style={{ margin: '0px 0px 0px 92vw', display: 'flex', position: 'absolute' }}></ArrowForwardIosIcon>
                </div>
                
            </div>
            <div className="homescreen-item-display" style={{ display: 'inline-block', backgroundColor: 'white' }}>
                <div className="homescreen-filter-by" style={{ padding: '10px 0px 0px 10px', fontSize: '25px', width: '16vw', display: 'grid', gridAutoColumns: 'auto' }}>
                    <div> Filter By </div>
                    <hr style={{ float: 'left', color: 'black', width: '16vw' }} />
                
                    {catButton}
                    {openCat}

                    <hr style={{ float: 'left', color: 'black', width: '16vw' }} />
                    
                    {priceButton}
                    {openPrice}

                    <hr style={{ float: 'left', color: 'black', width: '16vw' }} />
                    
                    {conButton}
                    {openCon}

                    <hr style={{ float: 'left', color: 'black', width: '16vw' }} />

                    <div style={{ textAlign: 'center' }}>
                        <Button onClick={() => { handleResetFilter() }} style={{ marginRight: '1vw', border: 'black 1px solid', borderRadius: '10px', color: 'black', fontFamily: 'Quicksand', width: '7vw' }}>
                            Reset
                        </Button>
                        <Button onClick={() => { handleFilterSections() }} style={{ border: 'black 1px solid', borderRadius: '10px', color: 'black', fontFamily: 'Quicksand', width: '7vw' }}>
                            Filter
                        </Button>
                    </div>
                </div>
            </div>
            <Box style={{ border: 'black 1px solid', borderRadius: '10px', width: '200px', height: '50px', display: 'inline-block', float: 'right', margin: '15px 60px 0px 0px' }}>
                <FormControl fullWidth>
                    <InputLabel style={{ color: 'black', margin: '-2px 0px 0px 0px' }} id="sort-by-menu">Sort By</InputLabel>
                    <Select style={{ borderRadius: '10px', height: '50px' }} 
                        labelId="sort-by-menu"
                        value={sort}
                        label="Sort By"
                        onChange={(event) => {handleSortChange(event.target.value)}}
                    >
                        <MenuItem value={1}>Newest Listings</MenuItem>
                        <MenuItem value={2}>Oldest Listings</MenuItem>
                        <MenuItem value={3}>Price (low to high)</MenuItem>
                        <MenuItem value={4}>Price (high to low)</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box style={{ position: 'absolute', margin: '-30px 0px 50px 20vw', background: 'white', top: '450px', width: '79%', minHeight: '1010px' }}>
                    <div>
                    {
                        productCard
                    }
                    </div>
            </Box>
            <Box style={{ margin: '100vw 0px 5vw 0vw', textAlign: 'center', alignContent: 'center', fontSize: '35px', width: '99%' }}>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={allProducts.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </Box>
            <LoginModal />
            <RegisterModal />
            <AccountErrorModal />
        </Box>  
    )
}


