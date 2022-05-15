# :moneybag:Cryptorium

https://cryptorium.herokuapp.com/

Platform for online shoppers looking to buy everyday items with cryptocurrency, or selling to receive cryptocurrency.


## Project Status
This project is currently in development. Users can sell and buy items. Paying to the seller is in progress.


## Project Screen Shot

![image](https://user-images.githubusercontent.com/51501680/168487001-cb8ab80a-8aa3-45f6-8f5a-4b30acc2ff1a.png)


## Features

- Create an account to shop, sell products, and set up a virtual wallet
- View products on the website without having to sign in (login as guest)
- Show all products listed before filtering
- Filter products by name by using the search bar
- Filter products by certain criteria other than name (price within certain range, etc.)
- Sort products in order based on certain criteria (newest posts, oldest posts, etc.)
- View items in their cart and delete any items 
- Sell products by including detailed descriptions and pictures for others to view
- Purchase items using cryptocurrency


## Installation and Setup Instructions

Clone down this repository. You will need `mongodb`, `node` and `npm` installed globally on your machine.  

Installation:

```
cd client

npm install 

npm install --save-dev node-sass

npm install classnames

npm i use-places-autocomplete

npm i react-cool-onclickoutside
```
```
cd server

npm install

npm install cors
```
```
cd search

pip3 install -r requirements.txt
```

To Run This Program Locally:  
```
cd client

npm start
```


To Start Server:
```
cd search

python3 index.py
```

```
cd server

nodemon index.js
```

To Visit App:

`http://localhost:3000/`  
