import { Command } from "commander";
import {date, expenses} from "../utils/utils";

export const expenseSummary = new Command()
    .command("summary")
    .description("expenses summary")
    .option("--month <month>", "month you want to summary your expense")
    .action((option) => {
      if (option.month) {
        const month = String(option.month).padStart(2, "0");
        const getTime = `${date.getFullYear()}-${month}-${date.getDate()}`;
        const expenseFilter = expenses.filter((data) => data.date.startsWith(getTime));
        const totalExpenses = expenseFilter.reduce((acc, cur) => acc + cur.amount, 0);
        const sampleDate = new Date(`${date.getFullYear()}-${month}-01`)
        const monthName = sampleDate.toLocaleString('id-ID', { month: 'long' });
        console.log(`Total expenses for ${monthName}: ${totalExpenses} `);
      } else {
          const amount: number = expenses.reduce((acc, cur) => acc + cur.amount, 0);
          console.log(amount);
      }
    });