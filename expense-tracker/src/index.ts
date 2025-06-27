#!/usr/bin/env node

import * as fs from "fs";
import  { Command } from "commander";
import { args, checkBudget, file } from "./utils/utils";
import { addExpense } from "./commands/add.command";
import { listExpense } from "./commands/list.command";
import { expenseSummary } from "./commands/summary.command";
import { deleteExpense } from "./commands/delete.command";
import { setExpense } from "./commands/setExpense.command";
import {helpCommand} from "./commands/help.command";
import {makeCsv} from "./commands/exportCsv.command";

const program = new Command();

if (args.length < 2) {
  console.log('Type "expense-tracker --help" to see command list');
}

program
    .name("expense-tracker")
    .description("CLI tools to help you manage and tracking your expenses")
    .version("1.0.0");

if (!fs.existsSync(file)) {
  fs.writeFileSync(file, "[]", "utf-8");
}

program.addCommand(addExpense);
program.addCommand(listExpense);
program.addCommand(expenseSummary);
program.addCommand(deleteExpense);
program.addCommand(setExpense);
program.addCommand(helpCommand);
program.addCommand(makeCsv);


program.hook('postAction', () => {
  checkBudget();
})

program.parse();

