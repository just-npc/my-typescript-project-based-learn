#!/usr/bin/env node

const args = process.argv.slice(2);

const inputMap: Record<string, string> = {
  commit: "PushEvent",
  issues: "IssuesEvent",
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

    events.forEach((event) => {
      if (event.type !== selectedEvent) return;

      switch (event.type) {
        case "PushEvent":
          console.log(
            `Pushed ${event.payload.commits.length} commit to ${event.repo.name}`
          );
          break;

        case "CreateEvent":
          console.log(
            `Created ${event.payload.ref_type} "${event.payload.ref}"`
          );
          break;

        case "WatchEvent":
          console.log(`Starred ${event.repo.name} `);
          break;

        case "IssuesEvent":
          console.log(
            `${event.payload.action} issue #${event.payload.issue.number}: "${event.payload.title}"`
          );
          break;

        case "PullRequestEvent":
          console.log(
            `${event.payload.action} pull request #${event.payload.pull_request.number} in ${event.repo.name}/${event.payload.pull_request.title}`
          );
          break;

        case "ForkEvent":
          console.log(
            `Forked ${event.repo.name} to ${event.payload.forkee.full_name}`
          );
          break;

        case "IssueCommentEvent":
          console.log(
            `Commented on issue #${event.payload.issue.number} in ${event.repo.name}`
          );
          break;

        case "ReleaseEvent":
          console.log(
            `${event.payload.release.tag_name} in ${event.repo.name}`
          );
          break;

        default:
          console.log("nothing found!");
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
