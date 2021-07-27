# Git It

## Summary

Git It is a full-stack PERN app designed as a mock coding-related merch site. The user is able to view products, add and delete items from their shopping cart and complete a demo checkout process.

The GitIt API utilizes GET, POST and DELETE endpoints along with the corresponding postgreSQL databases. The app's client-side was also written by me and can be viewed [here](https://github.com/SabrinaSides/git-it-client).

## See the App Live

[Check It Out Here](https://git-it-sabrinasides.vercel.app/)

## Tech Stack

**Client:** React, JavaScript, CSS

**Server:** Node, Express, PostgreSQL

[View the Client Repo](https://github.com/SabrinaSides/git-it-client)

## API Endpoints

### Product/Merch Related

**This API allows you to retrieve the products/merch available for purchase.**

Show Products: `GET /api/products`

Show Specific Product: `GET /api/products/:productId`

### Shopping Cart Related

**This API allows you to add products to the shopping cart and delete them.**

Show Items Added to Shopping Cart: `GET /api/shoppingCart`

Add Item to the Shopping Cart: `POST /api/shoppingCart`

Delete Entire Shopping Cart: `DELETE /api/shoppingCart`

Delete Specific Shopping Cart Item: `DELETE /api/shoppingCart/:cartItemId`

## Screenshots

### Home Page

![Home Page](src/screenshots/homepage.png)

### Category Page: Mugs

![Category Page](src/screenshots/category-page.png)

### Product Page

![Product Page](src/screenshots/product-page.png)

### Shopping Cart

![Shopping Cart](src/screenshots/shopping-cart.png)
