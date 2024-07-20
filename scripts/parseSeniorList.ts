/**
 * This script parses the senior list and outputs a JSON file
 * Requires a list of senior first,last and email in csv
 * ex. CSV row: ,Li,Peng Cheng,plXXXXX@pausd.us,XXXX@gmail.com,
 * you WILL need to change the first column to (if you are pulling from the senior gown list)
 * Ordered,first,last,email,parentEmail,notes
 */
import csv from "csv-parser";
import { createReadStream, readFileSync, writeFileSync } from "fs";
import { join } from "path";
console.log(__dirname);
type SeniorData = {
  Ordered: any; //Ignore
  first: string;
  last: string;
  email: string;
  parentEmail: any; // Ignore
  notes: string;
};
const seniors = new Promise((resolve, reject) => {
  const res = [] as SeniorData[];
  const csvList = createReadStream(
    join(__dirname, `../scriptAssets/seniorList.csv`),
    "utf-8"
  )
    .pipe(csv())
    .on("data", (data) => res.push(data))
    .on("end", () => {
      resolve(res);
    });
}) as Promise<SeniorData[]>;

(async () => {
  const res = await seniors.then((sm) =>
    sm.map((s) => ({
      firstName: s.first,
      lastName: s.last,
      classOf: 2023, //!TODO change this to current year
      //email is jl38768, studentID is 95038768
      studentID: `950${s.email.split("@")[0].slice(2, 7)}`,
    }))
  );
  console.log(res);
  writeFileSync(
    join(__dirname, `../scriptAssets/seniorListTotal.json`),
    JSON.stringify(res)
  );
})();

export {};
