const axios = require("axios");
const got = require("got");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const { URL = "https://www.thejump.tech" } = process.env;

(async () => {
  try {
    // const response = await got(URL);
    // const dom = new JSDOM(response.body);
    const response = await axios(URL);
    const dom = new JSDOM(response.data);

    const nodeList = [
      ...dom.window.document.querySelectorAll("h1"),
      ...dom.window.document.querySelectorAll("h2"),
      ...dom.window.document.querySelectorAll("h3"),
    ];

    nodeList.forEach((heading) => {
      console.log(`Heading text: ${heading.textContent}`);
    });
    console.log(`${nodeList.length} headings found`);
  } catch (err) {
    console.log("err", err);
  }
})();
