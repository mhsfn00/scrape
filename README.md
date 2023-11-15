Project made with Node.js(express, axios and cheerio) for the backend
HTML, css and javascript for the front-end (No css library needed)

Installing node: (there are multiple ways of doing this)
    npm install -g npm          

If you got these files from github this is a must:
    npm i express               (to install express for node.js)
    npm i axios                 (to axios express for node.js)
    npm i cheerio               (to cheerio express for node.js)

    npm i nodemon --save-dev    (nodemon to use with npm run dev)

Products are being scraped from amazon.com

To run, make sure you are in this project's directory and enter
    npm run dev

The default url is localhost:5000 (can be modyfied in index.js)

If you get a 503 error  trying to search for the product again 
might solve it.

It seems to be returning few products or sometimes no products at
all unless the product is related to technology (pc parts, peripherals,
cellphones). 
My guess is that this is happening because of the way the html page
 structure for a certain type of product.#