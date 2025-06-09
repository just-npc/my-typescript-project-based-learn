#!/usr/bin/env node
import * as fs from "fs";
import { generateId, TaskType } from "./utils/utils";

const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Usage: task-cli add "Your Task" ');
  process.exit(1);
}

const command = args[0];
const content = args.slice(1).join(" ");
const file = "./task.json";

if (!fs.existsSync(file)) {
  fs.writeFileSync(file, "[]", "utf-8");
}

const tasks: TaskType[] = JSON.parse(fs.readFileSync(file, "utf-8"));

if (command === "add") {
  const task: TaskType = {
    id: generateId(),
    description: content,
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(task);
  fs.writeFileSync("task.json", JSON.stringify(tasks, null, 2), "utf-8");
  console.log(`✅ Task added: ${task.description}`);
}
