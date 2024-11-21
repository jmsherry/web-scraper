import axios from "axios";
import fs from "fs";
import { JSDOM } from "jsdom";
import chalk from "chalk";
import cron from "node-cron";


const {
  URL = "https://www.thejump.tech",
  tags = "h1,h2,h3",
  crontab = "* * * * *",
} = process.env;

const scrape = async () => {
  try {
    // const response = await got(URL);
    // const dom = new JSDOM(response.body);
    const response = await axios(URL);
    if (response.status !== 200) throw new Error(`GET ${URL} failed`)
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

    // save to disk
    // create directory
    const dirName = `${Date.now()}`;
    fs.mkdir(`./scrapes/${dirName}`, (dirErr) => {
      if (dirErr) throw dirErr;
      fs.writeFile(
        `./scrapes/${dirName}/scrape.html`,
        response.data,
        (fileErr) => {
          if (fileErr) throw fileErr;
          console.log("The file has been saved!");
        }
      );
    });

    // dump html
  } catch (err) {
    console.log("err", err);
  }
};

scrape();

cron.schedule(crontab, () => {
  console.log("running a task every minute");
  scrape();
});
