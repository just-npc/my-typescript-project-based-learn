#!/usr/bin/env node

import * as fs from "fs";
import  { Command } from "commander";
import { args, file } from "./utils/utils";
import { addExpense } from "./commands/add.command";

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
program.parse();

