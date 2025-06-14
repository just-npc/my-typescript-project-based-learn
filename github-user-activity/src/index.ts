#!/usr/bin/env node

const args = process.argv.slice(2);

const inputMap: Record<string, string> = {
  commit: "PushEvent",
  issues:"IssuesEvent",
  stars: "WatchEvent",
  comment: "IssueCommentEvent",
  pr: "PullRequestEvent",
  fork: "ForkEvent",
  create: "CreateEvent",
  release: "ReleaseEvent",
};

const keyword = args[0]?.toLocaleLowerCase();
const selectedEvent = inputMap[keyword];
const githubUsername: string = args[1];

async function getUserActivity(username: string): Promise<void> {
  try {
    const response = await fetch(
        `https://api.github.com/users/${username}/events/public`
    );
    const events: any[] = await response.json();


    events.forEach(event => {

      if (event.type !== selectedEvent) return;

      switch (event.type) {
        case "PushEvent":
          console.log(`Pushed ${event.payload.commits.length} commit to ${event.repo.name}`);
          break;

        case "CreateEvent":
          console.log(`Created ${event.payload.ref_type} "${event.payload.ref}"`);
          break;

        case "WatchEvent":
          console.log(`Starred ${event.repo.name} `);
          break;

        case "IssuesEvent":
          console.log(`${event.payload.action} issue with #${event.payload.issue.number}`);
          break;

        default:
          break;
      }
    });
  } catch (error) {
    console.error(error);
  }
}

if (!githubUsername) {
  console.log("put the right username!");
} else {
  getUserActivity(githubUsername).catch(console.error);
}
