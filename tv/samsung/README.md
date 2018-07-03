# Samsung Smart TV (Tizen) Dev

tags: samsung, tizen

## Prereqs
* TV
  * Activate developer mode, and enter your dev machine’s ip
    * [docs](http://developer.samsung.com/tv/develop/getting-started/using-sdk/tv-device)
  * Note tv’s ip from tv network settings. Will use later to connect from dev machine
* Dev machine
  * JDK 8
    * [download](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* Ensure dev machine and tv are on same network

## Tizen studio installation
* [docs](http://developer.samsung.com/tv/develop/getting-started/setting-up-sdk/installing-tv-sdk)
* Install latest tizen studio (2.1 known to work)
* Open package manager (installation process will prompt this when finished)
  * Click extensions tab and install
    * samsung certificate extension
    * samsung tv extension (4.0 known to work, even for targeting previous tizen versions)

## Tizen studio workflow
### Connect to device
* [docs](http://developer.samsung.com/tv/develop/getting-started/using-sdk/tv-device)
* In tizen studio Tools > device manager
* Scan for devices
* Connect to device that pops up (should work if prereqs completed)

### Create Certificate profile
* [docs](http://developer.samsung.com/tv/develop/getting-started/setting-up-sdk/creating-certificates)
* In tizen studio Tools > certificate manager
* Click + to add new profile
* Select Samsung
* Select TV
* Select Create new profile
* Select Create new author cert
* Sign into samsung account (can be created for free)
* Select Create new distributor cert
* Under privilege, select Partner (certain tizen apis require partner level privilege)
* DUID of device should auto populate if you are connected to device
* The profile will now be set as active, meaning it will be used to sign apps before installation to devices.
* Close certificate manager

### Permit to install applications
* In tizen studio Tools > device manager
* Right click the connected device
* Select “Permit to install applications”
  * This will push the device-profile.xml from the active certificate profile to the device
* Close device manager.

### Create or Import project into tizen studio
* [docs](http://developer.samsung.com/tv/develop/getting-started/creating-tv-applications)
* In tizen studio File > Import
* Select Tizen > Tizen Project
* Select Root directory
* Select the directory that contains your `config.xml`
* You probably installed the latest samsung tv extensions (4.0) which is fine even if you are targeting a device that runs lower e.g. 2.4. Select the version that will allow you to import and you should be good to go.

### Run application
* Right click project in project explorer and click "Run as tizen web application”
* This will build, sign, and install the app to the tv and run it.

### Debug application
* Right click project in project explorer and click "Debug as tizen web application
* This will build, sign, and install the app to the tv and run it, and open an instance of chrome devtools connected to the remote app.

## Terminology
* Certificate Profile
  * Created from certificate manager tool in tizen studio
  * A profile consists of:
    * author certificate
    * distributor certificate
    * Device profile
       * Push this to the device to allow applications to install
  * Profiles are stored in ~/SamsungCertificate
  * profiles.xml
    * Location: tizen-studio-data/profiles/profiles.xml
    * Lists certificate profiles
    * `active` attribute on root profiles node is where active profile is set
    * This is how tizen studio knows which profile to sign the packages with
* SDB
  * Software development bridge
  * Cli tool used by tizen studio to:
    * connect to devices
    * Transfer files to devices (primarily the device-profile.xml)
  * Location: ~/tizen-studio/tools/sdb
* Privilege
  * You are required to declare use of certain tizen apis in your `config.xml`.
  * Certain apis are only available to "Partner"s. Ensure your certificate profile is set as Partner if you need to use these apis.
* Partner
  * A privilege level required by certain tizen apis. See Privilege Term.
* Please add more...

## Development
* When you update code (js, csss, html), right click the project in Tizen Studio and select Refresh. This will load the new code changes and check the device connectivity.
* Ensure the device is connected.
* Right click project and select run. This will push the app to the tv. You should get some output on what’s happening in the tizen studio log.
* If deploy fails, up the log level, Preferences > Tizen Studio > Logging, and move slider to DEBUG. Then investigate logs in ~/tizen-studio-data/ide/logs/ for more info on what might be going wrong

## Troubleshooting
* 118 - likely a certificate issue, check privileges used and privileges of certificate profile
* nullPointerException - could indicate tv disconnected during launch. This might lock the app in launch mode and prohibit subsequent builds with error “could not launch because the app is in launch mode.” if this happens, unplug tv and restart tizen studio.
* Tizen studio 2.0, tv extension 4.0 try using a tizen certificate rather than a samsung certificate - https://stackoverflow.com/questions/47424846/error-when-deploying-tizen-app-failed-to-get-a-device-information
* Else, try unplugging the tv
* Logging:
  * Right click package in ide and select Debug > Debug as Tizen application
  * Logs do not appear until you acknowledge the prompt on the tv first
  * Logs are logged to console in ide, but it’s better to view them in the dev tools opened by the ide

## CLI workflow (incomplete)
The entire project creation, tv connection, cert installation, packaging, signing, and installation process can theoretically be achieved with the tizen cli instead of using the tizen studio ide (Under the hood the studio is just using the cli commands anyway), but there seems to be a disconnect in the docs and all the steps don’t seem to work as expected. Good goal would be to get this setup to eliminate the need for the ide.

* [More info here](http://stackoverflow.com/questions/38308306/how-to-install-apps-on-samsung-tizen-tv-from-command-line)
* [Cli docs](https://developer.tizen.org/development/tizen-studio/web-tools/cli)
* [Installation](https://developer.tizen.org/development/tizen-studio/download/installing-tizen-studio#cli_installer)
* Example commands known to work:
  * Connect to device: `~/tizen-studio/tools/sdb connect <tv-ip>:26101`
  * Device capability: `~/tizen-studio/tools/sdb capability`
  * Create cert profile: tbd
  * Permit to install applications: `~/tizen-studio/tools/sdb push ~/SamsungCertificate/<certificate-profile-name>/device-profile.xml /home/developer`
  * Build and sign app package: tbd
  * Install app: `~/tizen-studio/tools/ide/bin/tizen install -n <package-name>.wgt -s <tv-ip>:26101`

## Publish
* Sign in to the [online portal](https://seller.samsungapps.com/tv/portal/main) with your Samsung account.
* Partner level membership requires commercial agreement.
* Seller portal includes helpful checklist for certification requirements.

## Reference
* [Samsung tv api docs](http://developer.samsung.com/tv/develop/api-references/samsung-product-api-references)
  * always add the required privilege to `config.xml` before attempting to use a specific api
* [Tizen Cli Tutorial](https://developer.tizen.org/community/tip-tech/sample-web-application-development-using-command-line-interface)
* Package manager cli executable is located at: `~/tizen-studio/package-manager/package-manager-cli.bin`
* [tizentv vscode extension](https://marketplace.visualstudio.com/items?itemName=tizensdk.tizentv)
* [Node cli proxy of tizen cli](https://github.com/reaktor/tizendev)
  * have not tested
  * could potentially use instead of studio
* [Other tizen tools](https://developer.tizen.org/community/tizen-projects)
  * see items tagged as Tools
