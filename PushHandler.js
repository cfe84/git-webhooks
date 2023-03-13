var exec = require('child_process').exec;

class PushHandler {
  constructor(repos) {
    this.repos = repos;
    this.onPushAsync = this.onPushAsync.bind(this);
  }

  onPushAsync(pushEvent) {
    const repoName = pushEvent?.repository.name;
    console.log(repoName);
    const repo = this.repos[repoName];
    const branch = pushEvent?.repository.default_branch;
    if (!repo) {
      console.log(`Ignored push event as repo ${repoName} is not configured`);
    }
    const path = repo.path;

    return new Promise((resolve, reject) => {
      exec(`cd ${path} && git pull origin ${branch}`,
      function (error, stdout, stderr) {
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          if (error !== null) {
              console.log('exec error: ' + error);
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