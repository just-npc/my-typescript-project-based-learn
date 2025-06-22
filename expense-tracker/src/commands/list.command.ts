import Table from "cli-table3";
import {expenses, TrackerType} from "../utils/utils";
import { Command } from "commander";

const table = new Table({
  head: [ "ID", "Date", "Description", "Amount" ],
  colWidths: [ 5, 12, 40, 10 ]
});

expenses.map((expense: TrackerType) => {
  table.push([expense.id, expense.date, expense.description, expense.amount]);
});

export const listExpense = new Command()
    .command("list")
    .description("List expense")
    .action(() => {
      console.log(table.toString());
    });


