const fs = require("fs");
const http = require("http");
const url = require("url");

/////////////////////// File System Module

// const hello = 'Hello, World!'
// console.log(hello)

// Blocking code, Syncronous
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut, 'utf-8');

// console.log('File written successfully!');

//Non-blocking code, Asyncronous
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('Error reading file:', err);

//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     if (err) return console.log('Error reading file:', err);

//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       if (err) return console.log('Error reading file:', err);
//       // console.log(data1, data2, data3)
//       const textOut = `${data2}. \n${data3} \nCreated on ${Date.now()}`;
//       fs.writeFile('./txt/final.txt', textOut, 'utf-8', (err) => {
//         if (err) return console.log('Error writing file:', err);
//         console.log('File written successfully!');
//       });
//     });
//   });
// });
// console.log('Reading file...');

/////////////////////// HTTP Module

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
};

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    res.end(output);

    //product page
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //API
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(data);

    // Not Found
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "Custom-Header": "Hello World",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server is running on port 5000...");
});
