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

export function handleUpdateTask(taskId: number, newTaskDescription: string, tasks: TaskType[]): void {
  const  index: number = tasks.findIndex((task) => task.id === taskId);

  if (index !== -1) {
    tasks[index].description = newTaskDescription;
    tasks[index].updatedAt = new Date().toISOString();
  }

  fs.writeFileSync("task.json", JSON.stringify(tasks, null, 2), "utf-8");
  console.log(tasks);
}