import puppeteer, { Browser } from "puppeteer";

let browser: Browser;

// TODO:: IMPORTANT proxy, user agent, referer

// Connect and Reconnect puppeteer to a remote browser
export function getBrowser(): Promise<Browser> {
  return new Promise((resolve, reject) => {
    if (browser !== undefined && browser.isConnected()) {
      resolve(browser);
    } else {
      puppeteer
        .connect({
          browserWSEndpoint: "ws://imdb_browser:3000/"
        })
        .then((opened_browser) => {
          browser = opened_browser;
          resolve(opened_browser);
          console.log("Browser is open");
        })
        .catch((err) => {
          console.log("ERROR lunching browser: ", err);
          reject(err);
        });
    }
  });
}

// Return puppeteer chromium if exists.
export function getChromium(): Promise<Browser> {
  return new Promise((resolve, reject) => {
    if (browser !== undefined && browser.isConnected()) {
      resolve(browser);
    } else {
      puppeteer
        .launch({
          // headless: false,
          args: ["--window-size=1920x1080", "--no-sandbox"], // "--proxy-server=127.0.0.1:8118" use this arg as well
        })
        .then((opened_browser) => {
          browser = opened_browser;
          resolve(opened_browser);
          console.log("Browser has been opened");
        })
        .catch((err) => {
          console.log("ERROR lunching browser: ", err);
          reject(err);
        });
    }
  });
}
