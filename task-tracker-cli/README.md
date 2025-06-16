# task-tracker-cli
project-url: https://github.com/just-npc/my-typescript-project-based-learn/tree/main/task-tracker-cli

### important things to setup the project on your computer
- clone the main repo.
- go to the repository directory or this task-tracker folder on terminal like this
```
cd my-task-typescript-project-based-learn/task-tracker-cli
```
- after you go to that directory run this command
- 
```
 chmod +x dist/index.js
```

> this important to give permission to execute the file.
- after you do that you can use this project to your computer

### Task-cli command list
- use this command to add task
```
task-cli add "add your content here"  
```

- to update task
```
task-cli update 9840328492894<task id> "your new content"
```
> give the valid id by run this command "task-cli list" and copy it or copy the id after you add the task, you'll see the task id

- to delete task
```
task-cli delete 65765657657<task id>
```

- marking task to in-progress
```
task-cli mark-in-progress 272872847917<task id>
```

- marking task to done
```
task-cli mark-done 748279874834234<task id>
```

- to see all task list you have
```
task-cli list
```

- to see all task list with done status
```
task-cli list-done
```

- to see all task list with todo status
```
task-cli list-todo
```

- to see all task list with in progress status
```
task-cli list-in-progress
```

