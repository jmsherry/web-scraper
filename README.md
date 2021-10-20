# Web Scraping

[Helpful article](https://www.twilio.com/blog/4-tools-for-web-scraping-in-node-js)

With web scraping we make a get request for a page then turn the HTML string into a dom (via some package) then search that DOM for our results.

## Usage
`npm start` will search {the jump} website for `h1`s, `h2`s and `h3`s.

`URL=<some site>  tags=<tags e.g. h1,h2> npm start` allows you to scrape other sites for 