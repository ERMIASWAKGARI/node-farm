const fs = require('fs');
const http = require('http');
const url = require('url');

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
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    res.end('<h1>This is the OVERVIEW</h1>');
  } else if (pathName === '/product') {
    res.end('<h1>This is the PRODUCT</h1>');
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
      'Custom-Header': 'Hello World',
    });
    res.end('<h1>Page not found</h1>');
  }
});

server.listen(5000, '127.0.0.1', () => {
  console.log('Server is running on port 5000...');
});
