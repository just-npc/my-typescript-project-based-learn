import { Command } from "commander";

export const helpCommand: Command = new Command()
    .command("help")
    .description("command to see list of available commands with exampe")
    .action(() => {
      console.log(`to add expense use "expense-tracker add --description "(describe your expense)" --amount (put the mount of your expense) --category "(put category for your expense based on description before like hobby, food, utility, etc)"`);
      console.log(`if you want to set a budget for your expense use "expense-tracker set --budget (budget) \n⚠️ note that if you use this it will give an update about your expense when you use this cli app"`);
      console.log(`to see list of your expense use "expense-tracker list" and if you want to see just some specific category you can use "expense-tracker --category "food"`);
      console.log(`to see how much your expense use "expense-tracker summary" and if you want to see summary from specific month use "expense-tracker summary --month" and if just want to see form specific category use "expense-tracker summary --category" `);
      console.log(`to delete the expense you put before use "expense-tracker delete --id (expense id)"`);
      console.log(`if you want to make csv file use "expense-tracker makeCsv"`);
    })
