import axios from "axios";
import * as cheerio from 'cheerio';
import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.set('view engine', 'ejs');

app.get("/api/scrape", (request, response) =>  {
    const searchKeyword = request.query.keyword;

    axios.get(`https://www.amazon.com/s?k=${searchKeyword}`,{ //Getting the page info with axios (searchKeyword from the endpoint);
        headers: { //Setting up the headers for the request so it looks like its coming from a browser (was getting a 503 before this);
            Accept : '*/*',
            Host : 'www.amazon.com',
            'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            Pragma: 'no-cache',
        }
    })
    .then(res => {
        const htmlData = res.data; //res is the response (html page) from axios.get on line 11;
        const $ = cheerio.load(htmlData); //Load the data we got from axios with cheerio to parse what we need;
        const itens = []; //Declaring a list to put the objects representing each search result;

        $('.puisg-row', htmlData).each((index, item) => { //Foreach loop to get the data from each product found on page 1;

            //Basically digging through divs to get the information we need, from my understanding find() will get the next element with the matching class name/id no matter how 
            //deeply nested it is, while children() will get the element only if its a direct child;
            const title = $(item).find('.puis-list-col-right').find('h2').children('.a-link-normal').children('span').text();
            const rating = $(item).find('.puis-list-col-right').find('.a-spacing-top-micro').children('.a-size-small').children('span').eq(0).attr('aria-label');
            const reviewsCount = $(item).find('.puis-list-col-right').find('.a-spacing-top-micro').children('.a-size-small').children('span').eq(1).attr('aria-label');
            const productImageURL = $(item).find('.puis-list-col-left').find('.s-image').attr('src');

            if(title != '') {                                                                                                 
                itens.push({
                    title : title,
                    rating : rating,
                    reviews : reviewsCount,
                    image : productImageURL,
                });
            }
        }
        );
        response.send(JSON.stringify(itens));
    }).catch (err => {
            console.error(err);
            response.send(JSON.stringify(err));
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});

app.get("/", (request, response) => {
    response.render('index');
});


