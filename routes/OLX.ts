const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhonex = devices['iPhone 6'];
 

async function asyncFunc(selector){
    return  Array.from(document.querySelectorAll(selector))
  .map(val => val.innerText);
} 

async function getTextData(page,selector) {
    return await page.evaluate ( asyncFunc(selector));
    
}

 const getData = async (login , password ) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.olx.pl/konto/?ref%5B0%5D%5Baction%5D=myaccount&ref%5B0%5D%5Bmethod%5D=index');
  await page.focus('#userEmail');
  await page.keyboard.type(login);
  await page.focus('#userPass');
  await page.keyboard.type(password);
  await page.click('#se_userLogin');
  await page.emulate(iPhonex);
  await page.goto('https://m.olx.pl/obserwowane/', {"waitUntil" : "networkidle0"});

  
  const titles = 
  //getTextData(await page, 'h3');
  
  await page.evaluate(()=> {
    return Array.from(document.querySelectorAll('h3'))
    .map(val => val.innerText);
  }); // próbowałem related data ale nie odnajdowało mi ich
  const place = await page.evaluate(()=> {
    return Array.from(document.querySelectorAll('span.qa-location'))
    .map(  val => val.innerHTML);
  });
  const price = await page.evaluate(()=> {
    return Array.from(document.querySelectorAll('span.c-ad-price__regular'))
    .map( val  =>  val.innerHTML.split('<')[0]);
  });
  const time = await page.evaluate(()=> {
    return Array.from(document.querySelectorAll('.c-date__left_text span'))
    .map(val => val.innerHTML);
  });
  const img   = await page.evaluate(()=> {
    return Array.from(document.querySelectorAll('.c-observedlistbox__photo'))
    .map(val => val.innerHTML.split('url(&quot;')[1].split('&quot;')[0]);
  });
  let fullArr = [];
  for (let i = 0; i < titles.length; i++) {
    fullArr[i]= {
      "title":titles[i],
      "place" : place[i],
      "price" :price[i],
      "img": img[i],
      "date": time[i]}
  } 
    // const fullfullArr = await page.evaluate(() => 
    //   Array.from(document.querySelectorAll('')).map(val => ({
    //     'title': val.querySelector('h3').innerText,
    //     'place': val.querySelectorAll('span.qa-location').innerText,
    //     'price': val.querySelector('span.c-ad-price__regular').innerText,
    //     'date': val.querySelectorAll('.c-date__left_text span').innerText,
    //     'img': val.querySelectorAll('.c-observedlistbox__photo')
    //     .split('url(&quot;')[1].split('&quot;')[0]
        
    //     }))
    // ).catch(er=> console.log(er));

  console.log(fullArr);
  
  //await page.screenshot({path: 'olxFoto.png', fullPage:true});
  await browser.close();
  return fullArr;

 };



module.exports = getData;
