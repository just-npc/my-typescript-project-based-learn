#!/usr/bin/env node
import * as fs from "fs";
import {
  handleAddTask,
  handleDeleteTask,
  handleUpdateTask,
  markTaskDone,
  markTaskInProgress, showDoneTask, showInProgressTask, showTaskList, showTodoTask,
  TaskType
} from "./utils/utils";


const args = process.argv.slice(2);

const command = args[0];
const content = args.slice(1).join(" ");
const file = "./task.json";
enum CommandType {
  add = "add",
  update = "update",
  delete = "delete",
  markInProgress = "mark-in-progress",
  markDone = "mark-done",
  list = "list",
  listDone = "list-done",
  listTodo = "list-todo",
  listInProgress = "list-in-progress",
}
const commandCheck: boolean = command === CommandType.add || command === CommandType.update || command === CommandType.delete || command === CommandType.markDone || command === CommandType.markInProgress;

if (commandCheck && args.length < 2) {
  console.log('Usage: task-cli add "Your Task" ');
  process.exit(1);
}

if (!fs.existsSync(file)) {
  fs.writeFileSync(file, "[]", "utf-8");
}

const tasks: TaskType[] = JSON.parse(fs.readFileSync(file, "utf-8"));

const taskId : number = Number(args[1]);
const  index: number = tasks.findIndex((task) => task.id === taskId);
const  newTaskDescription: string = args.slice(2).join(" ");

switch (command) {
  case CommandType.add:
    handleAddTask(tasks, content);
    break;

  case CommandType.update:
    handleUpdateTask(index, newTaskDescription, tasks);
    break;

  case CommandType.delete:
    handleDeleteTask(index, tasks);
    break;

  case CommandType.markInProgress:
    markTaskInProgress(index, tasks);
    break;

  case CommandType.markDone:
    markTaskDone(index, tasks);
    break;

  case CommandType.list:
    showTaskList();
    break;

  case CommandType.listDone:
    showDoneTask();
    break;

  case CommandType.listTodo:
    showTodoTask();
    break;

  case CommandType.listInProgress:
    showInProgressTask();
    break;

  default:
    console.log("write the right command! \n use 'task-cli help' to see command list");
}
