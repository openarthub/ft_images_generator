const puppeteer = require('puppeteer');         // Require Puppeteer module
// const puppeteerFirefox = require('puppeteer-firefox');
const url = "http://127.0.0.1:8770/";           // Set website you want to screenshot

const Screenshot = async (useModel3DViewPort=true) => {                // Define Screenshot function

   const browser = await puppeteer.launch({
       headless: false,
        executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
   });    // Launch a "browser"

   const page = await browser.newPage();

   const models3DViewPortSize = {
        width: 929,
        height: 929
   }
   const modelsVideoViewPortSize = {
        width: 711,
        height: 711
    }
    await page.setViewport(useModel3DViewPort ? models3DViewPortSize: modelsVideoViewPortSize);
   const collections = [
       // 3D_Card

       // 360_video
       {"item": "Pipe", "kind": "360_video", "metal": "Gold", "range_start": 1,  "range_end": 20, "timeOut": 2000},
       {"item": "Pipe", "kind": "360_video", "metal": "Silver", "range_start": 1,  "range_end": 30, "timeOut": 2000},
       {"item": "Pipe", "kind": "360_video", "metal": "Bronze", "range_start": 1,  "range_end": 50, "timeOut": 2000},

       {"item": "Folder", "kind": "360_video", "metal": "Gold", "range_start": 1,  "range_end": 20, "timeOut": 2000},
       {"item": "Folder", "kind": "360_video", "metal": "Silver", "range_start": 1,  "range_end": 30, "timeOut": 2000},
       {"item": "Folder", "kind": "360_video", "metal": "Bronze", "range_start": 1,  "range_end": 50, "timeOut": 2000},

       {"item": "Briefcase", "kind": "360_video", "metal": "Gold", "range_start": 1,  "range_end": 20, "timeOut": 2000},
       {"item": "Briefcase", "kind": "360_video", "metal": "Silver", "range_start": 1,  "range_end": 30, "timeOut": 2000},
       {"item": "Briefcase", "kind": "360_video", "metal": "Bronze", "range_start": 1,  "range_end": 50, "timeOut": 2000},

       // 2d_card_video_75
       {"item": "Pipe", "kind": "2d_card_video_75", "metal": "Gold", "range_start": 1,  "range_end": 20, "timeOut": 2000},
       {"item": "Pipe", "kind": "2d_card_video_75", "metal": "Silver", "range_start": 1,  "range_end": 30, "timeOut": 2000},
       {"item": "Pipe", "kind": "2d_card_video_75", "metal": "Bronze", "range_start": 1,  "range_end": 50, "timeOut": 2000},

       {"item": "Folder", "kind": "2d_card_video_75", "metal": "Gold", "range_start": 1,  "range_end": 20, "timeOut": 2000},
       {"item": "Folder", "kind": "2d_card_video_75", "metal": "Silver", "range_start": 1,  "range_end": 30, "timeOut": 2000},
       {"item": "Folder", "kind": "2d_card_video_75", "metal": "Bronze", "range_start": 1,  "range_end": 50, "timeOut": 2000},

       {"item": "Briefcase", "kind": "2d_card_video_75", "metal": "Gold", "range_start": 1,  "range_end": 20, "timeOut": 2000},
       {"item": "Briefcase", "kind": "2d_card_video_75", "metal": "Silver", "range_start": 1,  "range_end": 30, "timeOut": 2000},
       {"item": "Briefcase", "kind": "2d_card_video_75", "metal": "Bronze", "range_start": 1,  "range_end": 50, "timeOut": 2000},
       // {"item": "Ring", "kind": "card3D", "metal": "Gold", "range_start": 1,  "range_end": 20, "timeOut": 7000},
       // {"item": "Ring", "kind": "card3D", "metal": "Silver", "range_start": 1,  "range_end": 20, "timeOut": 7000},
       // {"item": "Ring", "kind": "card3D", "metal": "Bronze", "range_start": 1,  "range_end": 20, "timeOut": 7000},
       //  {"item": "Ring", "kind": "3d_card_video_360", "metal": "Gold", "range_start": 1,  "range_end": 20, "timeOut": 3000},
      //  {"item": "Ring", "kind": "2d_card_video_75", "metal": "Gold", "range_start": 1,  "range_end": 20, "timeOut": 3000},

       // {"item": "Pipe","folder_kind":"3D_Card", "folder_metal": "plata", "kind": "card3D", "metal": "Silver", "range_start": 1,  "range_end": 30, "timeOut": 3000},
     //  {"item": "Pipe", "kind": "card3D", "metal": "Silver", "range_start": 1,  "range_end": 30, "timeOut": 7000},
       // {"item": "Pipe", "kind": "360_video", "metal": "Silver", "range_start": 1,  "range_end": 30, "timeOut": 2000},
       // {"item": "Pipe", "kind": "2d_card_video_75", "metal": "Silver", "range_start": 1,  "range_end": 30, "timeOut": 2000},
       // {"item": "Pipe","folder_kind":"3D_Card", "folder_metal": "bronce", "kind": "card3D", "metal": "Bronze", "range_start": 1,  "range_end": 50, "timeOut": 3000},
    /*
       {"item": "ring", "kind": "3d_object", "metal": "Bronze", "range_start": 1,  "range_end": 50, "timeOut": 7000},
       {"item": "ring", "kind": "card3D", "metal": "Bronze", "range_start": 1,  "range_end": 50, "timeOut": 7000},
       {"item": "ring", "kind": "3d_card_video_360", "metal": "Bronze", "range_start": 1,  "range_end": 50, "timeOut": 3000},
       {"item": "ring", "kind": "2d_card_video_75", "metal": "Bronze", "range_start": 1,  "range_end": 50, "timeOut": 3000},

    */
   ]
   for(let collectionIdx=0; collectionIdx < collections.length; collectionIdx++){

        for(let counter=collections[collectionIdx].range_start; counter <= collections[collectionIdx].range_end; counter++){
            let params = `?item=${collections[collectionIdx].item}&format=${collections[collectionIdx].kind}&metal=${collections[collectionIdx].metal}&number=${counter}`
            await page.goto(`${url}${params}`);
            await page.waitForTimeout(collections[collectionIdx].timeOut)// Go to the website
            await page.screenshot({                      // Screenshot the website using defined options
                path: `../${collections[collectionIdx].item.toLowerCase()}/${collections[collectionIdx].folder_kind}/${collections[collectionIdx].folder_metal}/${counter}.jpg`,                   // Save the screenshot in current directory
                fullPage: true                              // take a fullpage screenshot
              });
        }
   }



  //await page.close();                           // Close the website

  //await browser.close();                        // Close the browser

}

// FT For 3D Models
// Screenshot();                                   // Call the Screenshot function

// FT For 2D Videos
Screenshot(false);                                   // Call the Screenshot function