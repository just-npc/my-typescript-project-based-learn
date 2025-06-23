import Table from "cli-table3";
import {expenses, TrackerType} from "../utils/utils";
import { Command } from "commander";

const table = new Table({
  head: [ "ID", "Date", "Description", "Category", "Amount" ],
  colWidths: [ 5, 12, 40, 12, 10 ]
});

expenses.map((expense: TrackerType) => {
  table.push([expense.id, expense.date, expense.description, expense.category, expense.amount]);
});

const filteredTable = new Table({
  head: [ "ID", "Date", "Description", "Category", "Amount" ],
  colWidths: [ 5, 12, 40, 12, 10 ]
})

export const listExpense = new Command()
    .command("list")
    .description("List expense")
    .option("--category <category>", "to see list with category filter")
    .action((option) => {
      if (option.category) {
        const filteredData: TrackerType[] = expenses.filter((item) => item.category === option.category);
        filteredData.forEach((item: TrackerType) => {
          filteredTable.push([
              item.id,
              item.date,
              item.description,
              item.category,
              item.amount,
          ]);
        });
        console.log(filteredTable.toString());
      } else {
        console.log(table.toString());
      }
    });


