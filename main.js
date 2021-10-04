const puppeteer = require('puppeteer');
const https = require('https');
const fs = require('fs');
const readline = require("readline-sync");
const { randomInt } = require('crypto');


const numsAndLetters = ['1','2','3','4','5','6','7','8','9','0','m','n','b','v','c','x','z','l','k','j','h','g','f','d','s','a','p','o','i','u','y','t','r','e','w','q',];

let current = ['','','','','',''];


(async() =>{
    const browser = await puppeteer.launch();
    

    while(true){
        
        
        length = current.length;

        for(let i = 0; i <  current.length;i++){
            current[i] = numsAndLetters[randomInt(numsAndLetters.length-1)];
        }
        console.log(`http://prnt.sc/${current.join('')}`);
        page = await browser.newPage();
        
        await page.goto(`http://prnt.sc/${current.join('')}`, {waitUntil: 'load'});
        const newPage = await page.evaluate(async  () => {
            if (document.querySelector("#screenshot-image"))
                return document.querySelector("#screenshot-image").src;
            return false

        });
        page.close()
        if (newPage){
            const file = fs.createWriteStream("file.jpg");
            const request = await https.get(newPage, async function(response) {
                response.pipe(file);
            }); 
        }
    }
})()
