const fs = require("fs");
const csv = require("csv-parser");

const inputFile = "input_countries.csv";
const canadaFile = "canada.txt";
const usaFile = "usa.txt";

// a) Delete output files if they exist
if (fs.existsSync(canadaFile)) fs.unlinkSync(canadaFile);
if (fs.existsSync(usaFile)) fs.unlinkSync(usaFile);

// Create write streams + header
const canadaStream = fs.createWriteStream(canadaFile, { flags: "a" });
const usaStream = fs.createWriteStream(usaFile, { flags: "a" });

canadaStream.write("country,year,population\n");
usaStream.write("country,year,population\n");

// b/c) Read CSV and filter
fs.createReadStream(inputFile)
  .pipe(csv())
  .on("data", (row) => {
    if (row.country === "Canada") {
      canadaStream.write(`${row.country},${row.year},${row.population}\n`);
    }
    if (row.country === "United States") {
      usaStream.write(`${row.country},${row.year},${row.population}\n`);
    }
  })
  .on("end", () => {
    canadaStream.end();
    usaStream.end();
    console.log("Done");
  });
