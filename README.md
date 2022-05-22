# Shopify-Coding-Challenge
This is the Shopify coding challenge for the backend developer intern position.
Challenge details can be found here: https://docs.google.com/document/d/1PoxpoaJymXmFB3iCMhGL6js-ibht7GO_DkCF2elCySU/edit

## Folder Structure
    .
    ├── views                             # Files containing pug files to produce product pages
          ├── productlist
          ├── products
    ├── public                            # Frontend handler file and html for adding a new product
          ├── index.html
          ├── product.js
    ├── package.json/package-lock.json    # Used to install node modules on local machine
    ├── store.js                          # Initialize server
    └── README.md

## Usage
### Local Testing
Since the package.json files are included, all you need to do to install the needed modules is go to the folder with them in it and use:
```
npm install
```
Then, MongoDB Daemon must be running before starting server, so you first need any version of MongoDB installed (I used 4.2) then open a command line to the bin folder:
```
"MongoDB\Server\4.2\bin"
```
Then to run the Daemon:
```
.\mongod --dbpath "Path to the folder you store your database in"
```
Finally we can start the server with:
```
node store.js
```
## Hosting
Since the original code is using MongoDB locally, it is hosted on your personal computer. But, if run on Replit, it uses MongoDB Atlas to host the DB.
With that, the code on Replit is changed so it uses the Replit host name as opposed to 'localhost' in the original code. The server can be ran, connected to MongoDB Atlas, here: https://replit.com/@adamyous99/Shopify-Coding-Challenge#store.js

## Testing 
Tests are intergral part of any good software. If I had more time to work on this project, I would have loved to intergrate a testing framework like [Jest](https://jestjs.io/) to test the individual components and functionality of the app on both the frontend and backend.

Sample Backend tests
```javascript
it('deletes products successfully ', () => {
   jest.mock('XMLHttpRequest');

    expect(open).toBeCalledWith('DELETE', 'http://example.com'](http://localhost:3000/products/${id}`, true);
    expect(send).toBeCalled();
});

```
