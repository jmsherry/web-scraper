# Web Scraping

[Helpful article](https://www.twilio.com/blog/4-tools-for-web-scraping-in-node-js)

With web scraping we make a get request for a page then turn the HTML string into a dom (via some package) then search that DOM for our results.

## Usage
`npm start` will search {the jump} website for `h1`s, `h2`s and `h3`s.

`URL=<some site>  tags=<tags (comma-separated) e.g. h1,h2> crontab='* * * * *' npm start` allows you to scrape other sites for different tags at different intervals (See [Crontab Notation](https://crontab.guru/) and [node-cron](https://www.npmjs.com/package/node-cron) for more)