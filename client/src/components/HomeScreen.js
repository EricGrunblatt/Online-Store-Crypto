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
import { useHistory } from "react-router-dom";


export default function HomeScreen() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    const [openCat, setOpenCat] = useState("");
    const [openPrice, setOpenPrice] = useState("");
    const [openCon, setOpenCon] = useState("");
    const [checkedCat, setCheckedCat] = useState([]);
    const [checkedCon, setCheckedCon] = useState([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState("");

    /* MAKES AN ARRAY TO SHOW THE 3 NEWEST ITEMS */
    let fullNewItems = store.newItems;
    
    // Calculate number of pages and set length of newItems
    let numPages = Math.ceil(fullNewItems.length/3);
    if(numPages > 3) {
        numPages = 3;
        fullNewItems = fullNewItems.slice(0, 9);
    } else if (numPages < 1) {
        numPages = 1;
    } 
    const [index, setIndex] = useState(0);

    const handleNewLeft = () => {
        let newIndex = index - 1;
        setIndex(newIndex);
    }

    const handleNewRight = () => {
        let newIndex = index + 1;
        setIndex(newIndex);
    }

    const newItems = useMemo(() => {
        return fullNewItems.slice(3*(index), 3*(index+1));
    }, [index, fullNewItems])


    // CREATE THE DOTS FOR THE NUMBER OF PAGES
    let dotsArray = [];
    for(let i = 0; i < numPages; i++) {
        dotsArray[i] = i;
    }
    let margin = 0;
    if(numPages === 3) {
        margin = 50;
    } else if (numPages === 2) {
        margin = 37;
    } else if (numPages === 1) {
        margin = 20;
    }
    let dotMarginRight = "-" + margin.toString() + "px";

    /* FILTER BY CATEGORIES AND CHECK BOX FUNCTION */
    const categories = ["Clothing", "Electronics", "Fashion", "Furniture", "Hardware", "Home & Garden", "Music", "Office Supplies", "Other", "Photography & Video", "Sports Equipment", "Toys", "Video Games"];
    const conditions = ["Mint", "New", "Lightly Used", "Used"];

    let isCheckedCat = (item) => checkedCat.includes(item) ? "checked-item" : "not-checked-item";
    let isCheckedCon = (item) => checkedCon.includes(item) ? "checked-item" : "not-checked-item";

    /* Looks at all filters for category */
    const handleCatCheck = (event) => {
        let updatedList = checkedCat;
        if(event.target.checked) {
            updatedList.push(event.target.value);
        } else {
            updatedList.splice(checkedCat.indexOf(event.target.value), 1);
        }
        setCheckedCat(updatedList);
    };

    /* LOOKS AT ALL CHECKED FILTERS FOR CONDITION */
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

    /* OPEN/CLOSE FILTER BY CATEGORY SECTION */
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

    /* RESETS ALL VALUES IN FILTER */ 
    const handleResetFilter = async function () {
        setCheckedCat([]);
        setCheckedCon([]);
        setMaxPrice("");
        setMinPrice("");
        setOpenCat("");
        setOpenPrice("");
        setOpenCon("");
        store.initialLoad();
    }

    /* APPLIES FILTER OR SORT AFTER EITHER IS CHANGED */
    const handleFilter = async function (json) {
        store.loadItems(json);
    }

    /* HANDLES CHANGE IN SORT MENU */
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
        let min = minPrice;
        if(min === '') {
            min = undefined;
        }
        let max = maxPrice;
        if(max === '') {
            max = undefined;
        }
        let json = {
            search: null, 
            categories: checkedCat, 
            conditions: checkedCon, 
            minPrice: min, 
            maxPrice: max, 
            sortBy: sortBy
        }
        handleFilter(json);
    };

    /* HANDLES FILTERING WHEN FILTER BUTTON IS PRESSED */
    const handleFilterSections = () => {
        let min = minPrice;
        if(min === '') {
            min = undefined;
        }
        let max = maxPrice;
        if(max === '') {
            max = undefined;
        }
        let json = {
            search: null,
            categories: checkedCat,
            conditions: checkedCon,
            minPrice: min,
            maxPrice: max,
            sortBy: null
        }
        handleFilter(json);
    }

    /* CUSTOM PAGINATION SETUP */
    let allProducts = store.catalogItems;
    let PageSize = 16;
    const [currentPage, setCurrentPage] = useState(1);
 
    let pageProductAll = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return allProducts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, allProducts]);


    let productCard = 
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 19vw)', gridTemplateRows: 'auto' }}>
        {
            pageProductAll.map((index) => (
                <HomeProduct
                    style={{ position: 'absolute' }}
                    key={index._id + "homeProduct"}
                    product={index}
                />
            ))
        }    
        </div>;

    const handleTopFilterButton = (cat) => {
        let json = {
            search: null,
            categories: [cat],
            conditions: null,
            minPrice: undefined,
            maxPrice: undefined,
            sortBy: null
        }
        handleFilter(json);
    }

    return (
        <Box className="homescreen" style={{ maxWidth: '99vw' }}>
            <div className="homescreen-category-bar" style={{ padding: '10px 0px 10px 10px'}}>
            <span style={{ paddingRight: '10px' }}><Button onClick={() => { store.initialLoad() }} style={{ color: 'black', fontFamily: 'Quicksand', textTransform: 'none', fontSize: '15px' }}>No Filter</Button></span>
                <span style={{ paddingRight: '10px' }}><Button onClick={() => { handleTopFilterButton("Clothing") }} style={{ color: 'black', fontFamily: 'Quicksand', textTransform: 'none', fontSize: '15px' }}>Clothing</Button></span>
                <span style={{ paddingRight: '10px' }}><Button onClick={() => { handleTopFilterButton("Electronics") }} style={{ color: 'black', fontFamily: 'Quicksand', textTransform: 'none', fontSize: '15px' }}>Electronics</Button></span>
                <span style={{ paddingRight: '10px' }}><Button onClick={() => { handleTopFilterButton("Fashion") }} style={{ color: 'black', fontFamily: 'Quicksand', textTransform: 'none', fontSize: '15px' }}>Fashion</Button> </span>
                <span style={{ paddingRight: '10px' }}><Button onClick={() => { handleTopFilterButton("Furniture") }} style={{ color: 'black', fontFamily: 'Quicksand', textTransform: 'none', fontSize: '15px' }}>Furniture</Button></span>
                <span style={{ paddingRight: '10px' }}><Button onClick={() => { handleTopFilterButton("Music") }} style={{ color: 'black', fontFamily: 'Quicksand', textTransform: 'none', fontSize: '15px' }}>Music</Button></span>
                <span style={{ paddingRight: '10px' }}><Button onClick={() => { handleTopFilterButton("Sports Equipment") }} style={{ color: 'black', fontFamily: 'Quicksand', textTransform: 'none', fontSize: '15px' }}>Sports Equipment</Button></span>
            </div>
            <div className="homescreen-new-items" style={{ paddingTop: '5px', textAlign: 'center', height: '180px', backgroundColor: '#FFBD59', fontSize: '30px' }}>
                New Items
                <div style={{ paddingTop: '25px'}}>
                    <Button data-left-new-arrow disabled={index===0} onClick={() => { handleNewLeft() }} style={{ color: index === 0 ? "rgba(0, 0, 0, 0.3)" : "black", cursor: 'pointer', margin: '10px 0px 0px 6vw', display: 'flex', position: 'absolute', minWidth: '30px', maxWidth: '30px' }}>
                        <ArrowBackIosIcon style={{ margin: '0px 0px 0px 10px' }}></ArrowBackIosIcon>
                    </Button>
                    <div style={{ position: 'absolute', display: 'flex', margin: '0px 0vw 0px -8.5vw', left: '20vw', width: '70vw' }}>
                        {newItems.map((index) => (
                            <div key={index._id + "newItem"} onClick={() => {history.push("/product/"+index._id)}} style={{ cursor: 'pointer', display: 'inline-block', margin: '-20px 10vw 0px 10vw' }}>
                                <img src={`data:${index.image.mimetype};base64,${Buffer.from(index.image.data).toString('base64')}`} alt="" style={{ width: '100px', height: '100px', border: 'black 1px solid', borderRadius: '10px' }}></img>
                            </div>
                        ))}    
                    </div>
                    <Button data-right-new-arrow disabled={index===2} onClick={() => { handleNewRight() }} style={{ color: index === 2 ? "rgba(0, 0, 0, 0.3)" : "black", cursor: 'pointer', margin: '10px 0px 0px 92vw', display: 'flex', position: 'absolute', minWidth: '30px', maxWidth: '30px' }}>
                        <ArrowForwardIosIcon></ArrowForwardIosIcon>
                    </Button>
                      
                </div>
                <div style={{ marginTop: '75px', marginLeft: dotMarginRight, textAlign: 'center', display: 'inline-block', position: 'absolute' }}>
                    {dotsArray.map((dot) => (
                        <div key={dot + "newItemDot"} style={{ background: index === dot ? "black": "#FFBD59", width: '10px', height: '10px', border: 'black 1px solid', borderRadius: '50%', margin: '0px 10px 0px 10px', display: 'inline-block' }}></div>
                    ))}
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
            <Box style={{ zIndex: 1, margin: '-150px 0px 50px 20vw', background: 'white', top: '450px', width: '79%', minHeight: '350px' }}>
                <div>
                {
                    productCard
                }
                </div>
            </Box>
            <Box style={{ zIndex: 1, whiteSpace: 'nowrap', margin: '10vw 0px 5vw 0vw', justifyContent: 'center', fontSize: '35px', width: '100%' }}>
                <Pagination
                    key="pagination"
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


