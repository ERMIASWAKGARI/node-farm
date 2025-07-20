const fs = require('fs');

// const hello = 'Hello, World!'
// console.log(hello)

// Blocking code, Syncronous
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut, 'utf-8');

// console.log('File written successfully!');

//Non-blocking code, Asyncronous
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  if (err) return console.log('Error reading file:', err);

  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    if (err) return console.log('Error reading file:', err);

    fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
      if (err) return console.log('Error reading file:', err);
      // console.log(data1, data2, data3)
      const textOut = `${data2}. \n${data3} \nCreated on ${Date.now()}`;
      fs.writeFile('./txt/final.txt', textOut, 'utf-8', (err) => {
        if (err) return console.log('Error writing file:', err);
        console.log('File written successfully!');
      });
    });
  });
});
console.log('Reading file...');
