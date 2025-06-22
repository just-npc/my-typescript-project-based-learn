import { Command } from "commander";
import {expenses} from "../utils/utils";
import fs from "node:fs";

export const deleteExpense = new Command()
    .command("delete")
    .description("expenses summary")
    .requiredOption("--id <id>", "id expense that want to delete")
    .action((options) => {
      const id: number = parseInt(options.id);
      const expenseId: number = expenses.findIndex((expense) => expense.id === id);
      if (expenseId === -1) {
        console.error("Expense not found.");
        return
      }
      expenses.splice(expenseId, 1);
      fs.writeFileSync("expense.json", JSON.stringify(expenses, null, 2), "utf8");
      const readfile:string = fs.readFileSync("expense.json", "utf8");
      console.log("expense deleted successfully.");
      console.log(readfile);
    });