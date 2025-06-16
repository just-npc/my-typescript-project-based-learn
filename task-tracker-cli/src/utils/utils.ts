import  * as  fs from "fs";

export interface TaskType {
  id: number;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

function generateId() {
  return Number(new Date());
}

export function handleAddTask(tasks: TaskType[], content: string): void {
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

export function handleUpdateTask(index: number, newTaskDescription: string, tasks: TaskType[]): void {
  if (index !== -1) {
    tasks[index].description = newTaskDescription;
    tasks[index].updatedAt = new Date().toISOString();
  }

  fs.writeFileSync("task.json", JSON.stringify(tasks, null, 2), "utf-8");
  console.log(tasks);
}

export function handleDeleteTask(index: number, tasks: TaskType[]): void {
  if (index !== -1) {
    tasks.splice(index, 1);
  }

  fs.writeFileSync("task.json", JSON.stringify(tasks, null, 2), "utf-8");
  console.log("🗑️  Task removed");
}

export function markTaskInProgress(index: number, tasks: TaskType[]): void {
  if (index !== -1) {
    tasks[index].status = "in-progress";
  }

  fs.writeFileSync("task.json", JSON.stringify(tasks, null, 2), "utf-8");
  console.log("👨‍💻  Task marked as in-progress");
}

export function markTaskDone(index: number, tasks: TaskType[]): void {
  if (index !== -1) {
    tasks[index].status = "done";
  }

  fs.writeFileSync("task.json", JSON.stringify(tasks, null, 2), "utf-8");
  console.log("✔️  Task marked as done");
}

const taskList = fs.readFileSync("task.json", "utf8");

export function showTaskList(): void {
  console.log(taskList);
}

export function showDoneTask(): void {
  const task = JSON.parse(taskList);
  const doneTask = task.filter((task: TaskType) => task.status === "done");
  console.log(doneTask);
}

export function showTodoTask(): void {
  const task = JSON.parse(taskList);
  const todoTask = task.filter((task: TaskType) => task.status === "todo");
  console.log(todoTask);
}

export function showInProgressTask(): void {
  const task = JSON.parse(taskList);
  const inProgressTask = task.filter((task: TaskType) => task.status === "in-progress");
  console.log(inProgressTask);
}
