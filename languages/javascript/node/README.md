# node

Here is a way to run an array of shell commands in order:

```javascript
function runCommands(commands, done, cwd) {
  var childProcess,
      command;

  while (command = commands.shift()) {
    childProcess = exec(command, {
      cwd: cwd,
      customFds: [0, 1, 2]
    }, function(err) {
      console.log('done with:', command);
      if (err) {
        console.log('try the command again. there was an error:', err);

        // stop and call done on the next iteration.
        commands = [];
      }
    });
  }

  done();
}
```

```javascript
function runCommands(commands, done, cwd) {
    var childProcess,
        command = commands.shift();

    if (!command) {
        done();
    } else {
        childProcess = exec(command, {
            cwd: cwd,
            customFds: [0,1,2]
        }, function(err) {
            console.log('done with', command);
            if (err) {
                console.log('try the command again. there was an error:', err);
                commands = [];
                done();
            } else {
                runCommands(commands, done, cwd);
            }
        });
        captureOutput(childProcess);
    }
}


function captureOutput(childProcess) {
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    return childProcess;
}
```

Example usage:

```

```
