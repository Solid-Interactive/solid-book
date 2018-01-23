# Universal Windows Platform (UWP) Development (Web-based)

tags: uwp, web, js, html, xbox

[Overview](https://docs.microsoft.com/en-us/windows/uwp/)

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
* Mount shared folder from host to guest according to [this stackoverflow answer](https://stackoverflow.com/a/32534378/4713163)

## Xbox Development
[Overview](https://docs.microsoft.com/en-us/windows/uwp/xbox-apps/getting-started)

### Activate Dev Mode on Xbox
* Prereq - Microsoft dev account - one-time $99 fee for organization ($19 for individual)
* Download the Dev Mode Activation app on the xbox app store
* Input the code displayed in the app in your dev account in the dev center
* Restart the console in dev mode
* Connect to network again
* Sign in to Microsoft account
* Note Xbox IP address

### Run UWP app on Xbox
* In Visual Studio, right click project in `Solution Explorer` > `Properties` > `Debugging`
* `Debugger to launch:` > `Remote Machine`
* `Machine Name` > Enter Xbox IP
* `Require Authentication` > `Universal (Unecrypted Protocol)`
* Click `Apply` or `OK`
* In the top menu bar, select `x64` from the platform dropdown
* Click green arrow to debug > Enter pin from Xbox
* App will launch on Xbox

### Windows APIs
The core UWP apis are exposed to the global scope in javascript as `Windows`. [Namspace reference](https://docs.microsoft.com/en-us/uwp/api/)

The only caveat is that casing needs to be changed when using the apis from js. Basically, methods and enum members need to be camelCased, but look at this [reference](https://docs.microsoft.com/en-us/scripting/jswinrt/using-the-windows-runtime-in-javascript) for all the details.

### Directional Navigation
Use the helper supplied by Microsoft:
* [file](https://github.com/Microsoft/TVHelpers/blob/master/tvjs/src/DirectionalNavigation/directionalnavigation-1.0.0.0.js)
* [Repo](https://github.com/Microsoft/TVHelpers)

Use default focusable HTML elements, e.g. `button`, for out-of-the-box directional navigation. To focus any other element, just use `tabindex="0"` attribute.

### Overscan
Some TVs use overscan, which zooms the content, cutting off the top, bottom, and sides. UWP apps display in TV-safe area by default. But apps should draw to edge of screen, and the developer should keep the app content within in the TV-safe area.

Disable overscan
```js
Windows.UI.ViewManagement.ApplicationView.getForCurrentView().setDesiredBoundsMode(Windows.UI.ViewManagement.ApplicationViewBoundsMode.useCoreWindow);
```
Then apply this css to content container according to [TV-safe area guide](https://docs.microsoft.com/en-us/windows/uwp/design/devices/designing-for-tv#tv-safe-area)
```css
margin: 27px 48px;
```

### Scaling
By default, UWP apps (HTML) are scaled by 150%.

### Accessibility
Use default focusable HTML elements for out-of-the-box screen reader support. The system reader, Narrator, will read button content and role when focus is gained.

### Links
* [Best practices](https://docs.microsoft.com/en-us/windows/uwp/xbox-apps/tailoring-for-xbox)
