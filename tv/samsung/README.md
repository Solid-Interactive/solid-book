# Samsung SmartTV Dev

tags: samsung, smart-tv, ott

## Steps
  * Download [tizen studio](http://developer.samsung.com/tv/develop/tools/tizen-studio/)
  * Check tv model no. against [this list](http://developer.samsung.com/tv/develop/specification/tv-model-lineup) to install the correct tizen studio tv-extension version.
    * At one point archive versions could be downloaded, but right now only the latest, 4.0, is available. 
  * Download the correct tv-extension version from the [archive page](http://developer.samsung.com/tv/develop/tools/tv-extension/archive)
  * Install the extension with the tizen studio package manager according to [this guide](http://developer.samsung.com/tv/develop/getting-started/setting-up-sdk/installing-tv-sdk#install_from_image)
  * Set your tv to [developer mode](http://developer.samsung.com/tv/develop/getting-started/using-sdk/tv-device). If dev mode popup does not appear, or if dev mode status does not stay applied after turning it on, try unplugging the tv to reset
  * Connect to the tv through tizen studio
    * Open the dropdown in the main toolbar and select Launch remote device manager
  * [Create a certificate profile](http://developer.samsung.com/tv/develop/getting-started/setting-up-sdk/creating-certificates) (used to push cert to tv and sign packaged apps before installation)
    * Profile includes:
      * Author certificate
      * Distributor certificate 
        * This is where the tv device DUID is specified.
        * DUID will autopopulate from TV if currently connected. 
        * To get the DUID manually: Connect to the device, Tools > Device Manager
    * Notes:
      * Certificate docs say to create a samsung certificate, but this has proved to be faulty with tizen studio 2.0 and tv extension 4.0. Instead, choose Tizen when creating a certificate.
  * Deploy from Tizen Studio
    * When you update code, right click the project in Tizen Studio and select Refresh. This will load the new code changes and check the device connectivity. 
    * Ensure the device is connected. See notes above.
    * Right click project and select Debug > Tizen web application. This will push the app to the tv. You should get some output on what’s happening in the tizen studio log.
    * If deploy fails, up the log level, Preferences > Tizen Studio > Logging, and move slider to DEBUG. Then investigate logs in ~/tizen-studio-data/ide/logs/ for more info on what might be going wrong

===== Notes =====
  * Installation failure cases
    * 118 - likely a certificate issue, check privileges used and privileges of certificate profile
    * nullPointerException - could indicate tv disconnected during launch. This might lock the app in launch mode and prohibit subsequent builds with error “could not launch because the app is in launch mode.” if this happens, unplug tv and restart tizen studio.
    * Tizen studio 2.0, tv extension 4.0 try using a tizen certificate rather than a samsung certificate - https://stackoverflow.com/questions/47424846/error-when-deploying-tizen-app-failed-to-get-a-device-information
    * Else, try unplugging the tv
  * CLI workflow:
    * The entire project creation, tv connection, cert installation, packaging, signing, and installation process can theoretically be achieved with the tizen cli instead of using the tizen studio ide (Under the hood the studio is just using the cli commands anyway), but there seems to be a disconnect in the docs and all the steps don’t seem to work as expected. 
    * More info here: http://stackoverflow.com/questions/38308306/how-to-install-apps-on-samsung-tizen-tv-from-command-line
    * Cli docs: https://developer.tizen.org/development/tizen-studio/web-tools/cli
    * Good goal would be to get this setup to eliminate the need for the ide
    * Examples
      * Install: `~/tizen-studio/tools/ide/bin/tizen install -n deluxetizen.wgt -s 10.1.10.32:26101`
      * Device capability - `~/tizen-studio/tools/sdb capability`
  * Logging:
    * Right click package in ide and select Debug > Debug as Tizen application
    * Logs do not appear until you acknowledge the prompt on the tv first
    * Logs are logged to console in ide, but it’s better to view them in the dev tools opened by the ide
  * Samsung apis
    * Docs: http://developer.samsung.com/tv/develop/api-references/samsung-product-api-references
    * NOTE: always add the required privilege to config.xml before attempting to use a specific api
