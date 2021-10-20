# Web Scraping

[Helpful article](https://www.twilio.com/blog/4-tools-for-web-scraping-in-node-js)

With web scraping we make a get request for a page then turn the HTML string into a dom (via some package) then search that DOM for our results.

## Usage
`npm start` will search {the jump} website. `URL=<some site> npm start` allows you to scrape other sites