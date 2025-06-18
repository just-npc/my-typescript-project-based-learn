import { Command } from "commander";
import fs from "node:fs";
import {expenses, date , TrackerType} from "../utils/utils";


export const addExpense = new Command()
    .command("add")
    .description("add expense")
    .requiredOption("--description <desc>", "expense description")
    .requiredOption("--amount <amount>", "expense amount")
    .action((option) => {
      const { description, amount } = option;
      const data: TrackerType = {
        id: expenses.length + 1,
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        description: `${description}`,
        amount: parseInt(amount),
      }

      expenses.push(data);
      fs.writeFileSync("expense.json", JSON.stringify(expenses, null, 2), "utf8");
      const readfile:string = fs.readFileSync("expense.json", "utf8");
      console.log("✅ Expense successfully added");
      console.log(readfile);
    });
