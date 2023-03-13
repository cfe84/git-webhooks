var exec = require('child_process').exec;

class PushHandler {
  constructor(repos) {
    this.repos = repos;
    this.onPush = this.onPush.bind(this);
  }

  onPush(pushEvent) {
    const repoName = pushEvent.repository.name;
    const repo = this.repos[repoName];
    const branch = pushEvent.repository.default_branch;
    if (!repo) {
      console.log(`Ignored push event as repo ${repoName} is not configured`);
    }
    const path = repo.path;

    exec(`cd ${path} && git pull origin ${branch}`,
      function (error, stdout, stderr) {
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          if (error !== null) {
              console.log('exec error: ' + error);
          }
      });
  }
}

module.exports = {
  PushHandler 
}