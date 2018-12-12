# Roku: Development and Deploying

tags: roku, development

There are several options for deploying. All options require you to activate developer mode. To enable development mode, 
enter the remote control sequence: `🏠🏠🏠 ↑↑ → ← → ← →`.  The entire sequence must be entered within 10 seconds.

### Using a packaged zip file

* [Manually at the Roku's IP with a zip file](https://sdkdocs.roku.com/display/sdkdoc/Loading+and+Running+Your+Application)

### Using code

* [roku-deploy npm](https://www.npmjs.com/package/roku-deploy) - IDE Agnostic
* [Roku Development VisualStudio Code Package](https://marketplace.visualstudio.com/items?itemName=fuzecc.roku-development)
  * Setup configs per readme and the `Cmd-Shift-P` to issue commands
  * Note that you have to open your projects directory that contains only the Roku files, since this Package bundles up the currently root directory
* [BrightScript VisulStudioCode package](https://marketplace.visualstudio.com/items?itemName=celsoaf.brightscript)
  * Note that `v1.3.0` does not work for deploying. The highlight does work.

### VIM

Via [Vundle](https://github.com/VundleVim/Vundle.vim): Add `Plugin 'chooh/brightscript.vim'` to your `.vimrc` and run `:PluginInstall`