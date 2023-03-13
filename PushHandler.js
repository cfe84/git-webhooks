var exec = require('child_process').exec;

class PushHandler {
  constructor(repos) {
    this.repos = repos;
    this.onPushAsync = this.onPushAsync.bind(this);
  }

  onPushAsync(pushEvent) {
    const repoName = pushEvent?.repository.name;
    const repo = this.repos.find(repo => repo.name === repoName);
    const branch = pushEvent?.repository.default_branch;
    if (!repo) {
      console.log(`Ignored push event as repo ${repoName} is not configured`);
      return Promise.resolve();
    }
    const path = repo.path;

    return new Promise((resolve, reject) => {
      exec(`cd ${path} && git pull origin ${branch}`,
      function (error, stdout, stderr) {
          console.log('stdout: ' + stdout);
          if (error !== null) {
              console.error('exec error: ' + error);
              console.error('stderr: ' + stderr);
              reject(error);
          } else {
            resolve();
          }
      });
    })

  }
}

module.exports = {
  PushHandler 
}