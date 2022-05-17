const puppeteer = require('puppeteer');         // Require Puppeteer module
// const puppeteerFirefox = require('puppeteer-firefox');
const url = "http://127.0.0.1:8770/";           // Set website you want to screenshot

const Screenshot = async (useModel3DViewPort=true) => {                // Define Screenshot function

   const browser = await puppeteer.launch({
       headless: true,
        executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
   });    // Launch a "browser"

   const page = await browser.newPage();

   const models3DViewPortSize = {
        width: 929,
        height: 929
   }
   const modelsVideoViewPortSize = {
        width: 1280,
        height: 1280
    }
    await page.setViewport(useModel3DViewPort ? models3DViewPortSize: modelsVideoViewPortSize);
   const folderKind = {
        "360_video": "3D_Video",
        "2d_card_video_75": "2d_Card_Video_75",
       "3d_object": "3D_Object",
       "card3D": "3D_Card"
   }

   const folder_name = {
       "oro": "oro",
       "silver": "plata",
       "bronce": "bronce"
   }

   const collections = [
       // 3D_Object
       // {"item": "pipa", "item_folder":"pipe", "kind": "3d_object", "metal": "oro", "range_start": 1,  "range_end": 20, "timeOut": 7000},
       // {"item": "pipa", "item_folder":"pipe", "kind": "3d_object", "metal": "silver", "range_start": 1,  "range_end": 30, "timeOut": 7000},
       // {"item": "pipa", "item_folder":"pipe", "kind": "3d_object", "metal": "bronce", "range_start": 1,  "range_end": 50, "timeOut": 7000},

       // {"item": "briefcase", "item_folder":"maletin", "kind": "3d_object", "metal": "oro", "range_start": 1,  "range_end": 20, "timeOut": 7000},
       // {"item": "briefcase", "item_folder":"maletin", "kind": "3d_object", "metal": "silver", "range_start": 1,  "range_end": 30, "timeOut": 7000},
       // {"item": "briefcase", "item_folder":"maletin", "kind": "3d_object", "metal": "bronce", "range_start": 1,  "range_end": 50, "timeOut": 7000},

       // {"item": "folder", "item_folder":"carpeta", "kind": "3d_object", "metal": "oro", "range_start": 1,  "range_end": 20, "timeOut": 7000},
       // {"item": "folder", "item_folder":"carpeta", "kind": "3d_object", "metal": "silver", "range_start": 1,  "range_end": 30, "timeOut": 7000},
       // {"item": "folder", "item_folder":"carpeta", "kind": "3d_object", "metal": "bronce", "range_start": 1,  "range_end": 50, "timeOut": 7000},

       // 3D_Card
       // {"item": "pipa", "item_folder":"pipa", "kind": "card3D", "metal": "oro", "range_start": 1,  "range_end": 20, "timeOut": 3000},
       // {"item": "pipa", "item_folder":"pipa", "kind": "card3D", "metal": "silver", "range_start": 1,  "range_end": 30, "timeOut": 3000},
       // {"item": "pipa", "item_folder":"pipa", "kind": "card3D", "metal": "bronce", "range_start": 1,  "range_end": 50, "timeOut": 3000},

       // {"item": "briefcase", "item_folder":"maletin", "kind": "card3D", "metal": "oro", "range_start": 1,  "range_end": 20, "timeOut": 3000},
       // {"item": "briefcase", "item_folder":"maletin", "kind": "card3D", "metal": "silver", "range_start": 1,  "range_end": 30, "timeOut": 3000},
       // {"item": "briefcase", "item_folder":"maletin", "kind": "card3D", "metal": "bronce", "range_start": 1,  "range_end": 50, "timeOut": 3000},

       // {"item": "folder", "item_folder":"carpeta", "kind": "card3D", "metal": "oro", "range_start": 1,  "range_end": 20, "timeOut": 3000},
       // {"item": "folder", "item_folder":"carpeta", "kind": "card3D", "metal": "silver", "range_start": 1,  "range_end": 30, "timeOut": 3000},
       // {"item": "folder", "item_folder":"carpeta", "kind": "card3D", "metal": "bronce", "range_start": 1,  "range_end": 50, "timeOut": 3000},

       // 360_video
        /*
       {"item": "pipa", "kind": "360_video", "metal": "oro", "range_start": 1,  "range_end": 20, "timeOut": 2000},
       {"item": "pipa", "kind": "360_video", "metal": "plata", "range_start": 1,  "range_end": 30, "timeOut": 2000},
       {"item": "pipa", "kind": "360_video", "metal": "bronce", "range_start": 1,  "range_end": 50, "timeOut": 2000},

       {"item": "carpeta", "kind": "360_video", "metal": "oro", "range_start": 1,  "range_end": 20, "timeOut": 2000},
       {"item": "carpeta", "kind": "360_video", "metal": "plata", "range_start": 1,  "range_end": 30, "timeOut": 2000},
       {"item": "carpeta", "kind": "360_video", "metal": "bronce", "range_start": 1,  "range_end": 50, "timeOut": 2000},

       {"item": "maletin", "kind": "360_video", "metal": "oro", "range_start": 1,  "range_end": 20, "timeOut": 2000},
       {"item": "maletin", "kind": "360_video", "metal": "plata", "range_start": 1,  "range_end": 30, "timeOut": 2000},
       {"item": "maletin", "kind": "360_video", "metal": "bronce", "range_start": 1,  "range_end": 50, "timeOut": 2000},
        */
       // 2d_card_video_75

       {"item": "pipa", "item_folder":"pipa", "kind": "2d_card_video_75", "metal": "oro", "range_start": 1,  "range_end": 20, "timeOut": 2000},
       {"item": "pipa", "item_folder":"pipa", "kind": "2d_card_video_75", "metal": "silver", "range_start": 1,  "range_end": 30, "timeOut": 2000},
       {"item": "pipa", "item_folder":"pipa", "kind": "2d_card_video_75", "metal": "bronce", "range_start": 1,  "range_end": 50, "timeOut": 2000},

       {"item": "carpeta", "item_folder":"carpeta", "kind": "2d_card_video_75", "metal": "oro", "range_start": 1,  "range_end": 20, "timeOut": 2000},
       {"item": "carpeta", "item_folder":"carpeta", "kind": "2d_card_video_75", "metal": "silver", "range_start": 1,  "range_end": 30, "timeOut": 2000},
       {"item": "carpeta", "item_folder":"carpeta", "kind": "2d_card_video_75", "metal": "bronce", "range_start": 1,  "range_end": 50, "timeOut": 2000},
        /*
       {"item": "maletin", "kind": "2d_card_video_75", "metal": "oro", "range_start": 1,  "range_end": 20, "timeOut": 2000},
       {"item": "maletin", "kind": "2d_card_video_75", "metal": "plata", "range_start": 1,  "range_end": 30, "timeOut": 2000},
       {"item": "maletin", "kind": "2d_card_video_75", "metal": "bronce", "range_start": 1,  "range_end": 50, "timeOut": 2000},
       */

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
                path: `../Releasing/${collections[collectionIdx].item_folder.toLowerCase()}/${folderKind[collections[collectionIdx].kind]}/${folder_name[collections[collectionIdx].metal]}/${counter}.jpg`,                   // Save the screenshot in current directory
                fullPage: true                              // take a fullpage screenshot
              });

            console.log(`${collections[collectionIdx].item.toLowerCase()}-${folderKind[collections[collectionIdx].kind]}-${collections[collectionIdx].metal}-${counter}`)
        }
   }



  //await page.close();                           // Close the website

  //await browser.close();                        // Close the browser

}

// FT For 3D Models
Screenshot();                                   // Call the Screenshot function

// FT For 2D Videos
// Screenshot(false);                                   // Call the Screenshot function