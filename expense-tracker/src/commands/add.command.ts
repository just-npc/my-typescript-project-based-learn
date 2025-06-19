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
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const maxId = expenses.reduce((max, item) => item.id > max ? item.id : max, 0);

      const data: TrackerType = {
        id: maxId + 1,
        date: `${date.getFullYear()}-${month}-${date.getDate()}`,
        description: `${description}`,
        amount: parseInt(amount),
      }

      expenses.push(data);
      fs.writeFileSync("expense.json", JSON.stringify(expenses, null, 2), "utf8");
      const readfile:string = fs.readFileSync("expense.json", "utf8");
      console.log("✅ Expense successfully added");
      console.log(readfile);
    });
