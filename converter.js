let csvToJson = require('convert-csv-to-json');

let fileInputName = 'books.csv';
let fileOutputName = 'books.json';

csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
