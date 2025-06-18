import { Command } from "commander";
import * as fs from "node:fs";

export interface TrackerType {
  id: number;
  date: string;
  description: string;
  amount: number;
}

const date = new Date();
const args = process.argv.slice(2);
const file: string = "./expense.json";
const expenses: TrackerType[] = JSON.parse(fs.readFileSync(file, "utf8"));

export { args , file, expenses, date}