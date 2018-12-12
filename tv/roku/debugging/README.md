# Roku: Debugging

tags: roku, debugging

* Roku device exposes info on three ports. See ports, and commands available on each, here: https://sdkdocs.roku.com/display/sdkdoc/Debugging+Your+Application
* Connect to the device with a telnet client, e.g. `nc` on macOS ( or `brew install telnet` )
  ```bash
  $ nc <roku_ip> <port>
  ```
  Once connected, issue commands to get info:
  ```bash
  > loaded_textures
  ```
* Use the brightscript console to get info about brightscript variables, pause execution, and step through code.
  * The VSCode extension is great for setting breakpoints and stepping though code.
    * [BrightScript VS package](https://marketplace.visualstudio.com/items?itemName=celsoaf.brightscript)
    * Note that `v1.3.0` broke deploying. Hopefully open issue will be resolved soon. Use Previous version.
    * Set breakpoints in your code and execution will stop on those lines. Hover expressions to view their current value.
* Use the debug server to get non-brightscript info, like memory usage.
