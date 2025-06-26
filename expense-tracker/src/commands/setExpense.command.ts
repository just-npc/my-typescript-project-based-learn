import { Command } from "commander";
import { setValue } from "../utils/utils";

export const setExpense = new Command()
    .command("set")
    .description("set budget for each month")
    .requiredOption("--set <set>", "set your budget")
    .action((option) => {
      const setBudget: number = parseInt(option.set);
      setValue(setBudget);
    });