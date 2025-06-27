import { Command } from "commander";
import { setValue } from "../utils/utils";

export const setExpense = new Command()
    .command("set")
    .description("set budget for each month")
    .requiredOption("--budget <budget>", "set your budget")
    .action((option) => {
      const setBudget: number = parseInt(option.budget);
      setValue(setBudget);
      console.log("✅ Budget has completely set");
    });