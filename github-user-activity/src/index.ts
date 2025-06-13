#!/usr/bin/env node

// import * as fs from "fs";

const args = process.argv.slice(2);

enum GithubActivity {
  commit = "PushEvent",
  issues = "IssuesEvent",
  stars = "WatchEvent",
}
const keyword = args[0]?.toLocaleLowerCase();
const githubUsername: string = args[1];

async function getUserActivity(username: string): Promise<void> {
  const response = await fetch(
    `https://api.github.com/users/${username}/events/public`
  );
  const events = await response.json();

  for (const event of events.slice(0, 10)) {
    const repo = event.repo.name;

    switch (keyword) {
      case "commit":
        events
          .filter((e: { type: string }) => e.type === "PushEvent")
          .forEach((e: { repo: { name: any } }) => {
            console.log(`- Pushed commits to ${e.repo.name}`);
          });
        break;

      default:
        break;
    }
    // console.log(`Repo: ${event.repo.name}, Type: ${event.type}`);
  }
}

if (!githubUsername) {
  console.log("put the right username!");
} else {
  getUserActivity(githubUsername);
}
