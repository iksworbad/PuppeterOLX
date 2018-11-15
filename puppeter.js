const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhonex = devices['iPhone 6'];


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulate(iPhonex);
  await page.goto('https://accounts.spotify.com/pl/login?continue=https:%2F%2Fopen.spotify.com%2Fbrowse&utm_source=webplayer&utm_medium=&utm_campaign=');
  await page.focus('#login-username');
  await page.keyboard.type('kamillo.dabrowski@wp.pl');
  await page.focus('#login-password');
  await page.keyboard.type('Testtest123');
  await page.evaluate( () =>
{
    Array.from( document.querySelectorAll( 'button' ) ).filter( element => element.textContent === 'Zaloguj się' )[0].click();
});


  await page.screenshot({path: 'spotifyFoto.png'});

  await browser.close();
})();