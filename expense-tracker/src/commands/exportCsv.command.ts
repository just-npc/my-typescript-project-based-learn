import { Command } from "commander";
import * as fs from "node:fs";
import {expenses} from "../utils/utils";

export const makeCsv: Command = new Command()
  .command("makeCsc")
  .description("make csv file")
  .action(() => {
    const filename: string = "expenses.csv";
    const header: string = "ID,Date,Description,Category,Amount";

    const rows = expenses.map((data) => {
      `${data.id},${data.date},"${data.description}",${data.category},${data.amount}`;
    });

    const csvContent = header + rows.join("\n");

    fs.writeFileSync(filename, csvContent, "utf-8");
    console.log(`✅ CSV file saved as ${filename}`);
  })