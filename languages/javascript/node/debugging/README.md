# Debugging Node running on a remote server

tags: javascript, node, debugging

Node uses a [TCP interface](https://nodejs.org/api/debugger.html) for debugging, so if you can get a handle on the right port, you can debug apps running remotely. This means you can run through code on staging, Vagrant, etc. The following shows you how to start node with the debug flag and use an SSH tunnel to access the right port.

Things you need:
* ssh access to the server
* ability to restart node app with `--debug` flag or `node-inspector` installed on server

## Debugging using Visual Studio Code

1. Click on the Debug icon
1. In the upper dropdown, click "Add Configuration"
1. Select Node if needed
1. In the launch.json, pick "Attach by Process"
1. Start your app with the `--inspect` flag
1. Select "Attach by Process ID" right of the green play button
1. Click play button

Your launch.json should look something like:

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "attach",
            "name": "Attach by Process ID",
            "processId": "${command:PickProcess}"
        }
    ]
}
```

## Debugging using Webstorm

1. Stop the app
1. Restart with `--inspect` flag (and include any necessary env flags) (could setup a name pm2 for this)

    ```bash
    # example with an env variable sent int
    NODE_ENV=staging node --inspect /home/node_user/my-app
    ```

1. When it starts you should see something like `debugger listening on 5858`
1. Setup webstorm
    1. `Run > Debug... > Edit Configurations... > Add new configuration > Node.js Remote Debug`
    1. Host : `127.0.0.1` - Port : `5858`
1. Open SSH Tunnel to gain access to servers port 5858.

    ```bash
    # open an ssh tunnel, send it to the bg, and wait 10 seconds for connections
    # once all connections are closed after 10 seconds then close the tunnel
    ssh -f -o ExitOnForwardFailure=yes -L 5858:127.0.0.1:5858 node_user@168.144.24.98 sleep 10
    ```

1. Make sure you checkout the same code on your local machine as on the remote server.
1. Run the debugger in Webstorm (drop down in upper right next to the Bug icon - or the bug icon once you've run it once)

## Debugging using [Node Inspector](https://github.com/node-inspector/node-inspector)

You can follow similar instruction for using [node-inspector](https://github.com/node-inspector/node-inspector) just use port `8080` instead of `5858` and open Chrome at: http://127.0.0.1:8080/?ws=127.0.0.1:8080&port=5858 (you might want to use the `--debug-brk` flag instead of the `debug` flag if you can't set a breakpoint in time. Instead of starting with the debug flag, you woul install node incpector on the server and start the app using that.

In practice using Webstorm - port 5858 directly - seems to work much better.

## Last Steps

If needed don't forget to stop the app and restart without the debug flag.
