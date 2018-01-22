# Universal Windows Platform (UWP) Development (Web-based)

tags: uwp, web, js, html, xbox

## Development
* Prereq - Windows 10
* Prereq - Enable developer mode
* Prereq - Visual Studio

If on macOS, microsoft provides a virtual machine with visual studio installed and developer mode activated:
* [Download](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines)
* Install virtualbox
* Import machine into virtualbox
    * Extract contents of download
    * In virtualbox
        * `File` > `Import`
        * Select the `.ovf` file
        * Select Import
* Open Visual studio
* Sign in to Microsoft account
* `File` > `New` > `Project`
    * `Javascript` > `Windows Universal` > `Blank App (Universal Windows)`

## Xbox Development
### Activate Dev Mode on Xbox
* Prereq - Microsoft dev account - one-time $99 fee for organization ($19 for individual)
* Download the Dev Mode Activation app on the xbox app store
* Input the code displayed in the app in your dev account in the dev center
* Restart the console in dev mode
* Connect to network again
* Sign in to Microsoft account
* Note Xbox IP address

### Run UWP on Xbox
* In Visual Studio, right click project in `Solution Explorer` > `Properties` > `Debugging`
* `Debugger to launch:` > `Remote Machine`
* `Machine Name` > Enter Xbox IP
* `Require Authentication` > `Universal (Unecrypted Protocol)`
* Click `Apply` or `OK`
* Click green arrow to debug > Enter pin from Xbox
* App will launch on Xbox

## Docs
[Microsoft UWP docs](https://docs.microsoft.com/en-us/windows/uwp/) are very thorough.
