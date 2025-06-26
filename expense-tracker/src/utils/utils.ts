import * as fs from "node:fs";

export interface TrackerType {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
}

const date = new Date();
const args = process.argv.slice(2);
const file: string = "./expense.json";
const expenses: TrackerType[] = JSON.parse(fs.readFileSync(file, "utf8"));
let budget: number;

function setValue(value: number) {
  budget = value;
}

function checkBudget() {
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const currentDate = date.getDate();
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const filteredExpense = expenses.filter((data) => {
    const [year, month] = data.date.split("-").map(Number);
    return year === currentYear && month === currentMonth;
  });

  const total = filteredExpense.reduce((acc: number, cur: TrackerType) => acc + cur.amount, 0);

  if (total > budget && currentDate < endOfMonth.getDate()) {
    console.warn(`⚠️ Alert! This month's expenses (${total}) exceed the budget (${budget})`);
  } else {
    console.log(`Still within budget: ${total}`);
  }

  if (currentDate === endOfMonth.getDate()) {
    console.log("📊 End of month summary...");
  } else if (total > budget) {
    console.warn("⚠️ Warning! You have exceeded the budget!");
  } else {
    console.log("✅ The budget is still safe..");
  }

}

export { args , file, expenses, date, setValue, checkBudget};