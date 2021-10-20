const axios = require("axios");
const jsdom = require("jsdom");
const chalk = require("chalk");
const { JSDOM } = jsdom;

const { URL = "https://www.thejump.tech", tags = "h1,h2,h3" } = process.env;

(async () => {
  try {
    // const response = await got(URL);
    // const dom = new JSDOM(response.body);
    const response = await axios(URL);
    const dom = new JSDOM(response.data);

    let nodeList = {};
    let nodeCount = 0;

    const tagsToSearch = tags.split(",");

    for (const tag of tagsToSearch) {
      nodeList[tag] = {
        nodes: [...dom.window.document.querySelectorAll(tag)],
      };
      nodeCount += nodeList[tag].nodes.length;
    }

    for (const tag of tagsToSearch) {
      console.log(chalk.blue(`${tag.toUpperCase()}s found:`));
      const { nodes } = nodeList[tag];
      for (const node of nodes) {
        console.log(chalk.green("Heading text:"), node.textContent.trim());
      }
      console.log(`\n`);
    }

    console.log(chalk.yellow(`${nodeCount} headings found\n`));
  } catch (err) {
    console.log("err", err);
  }
})();
