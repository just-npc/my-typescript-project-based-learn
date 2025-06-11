#!/usr/bin/env node
import * as fs from "fs";
import {handleAddTask, handleUpdateTask, TaskType} from "./utils/utils";

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

const taskId : number = Number(args[1]);
const  newTaskDescription: string = args.slice(2).join(" ");

switch (command) {
  case "add":
    handleAddTask(tasks, content)
    break;

  case "update":
    handleUpdateTask(taskId, newTaskDescription, tasks);
    break
}
