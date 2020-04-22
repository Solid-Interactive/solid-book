# React native

tags: react-native, react, native, mobile, ios, android, js, javascript

## React native libraries
* See helpful libraries with examples [here](/mobile/react-native/libraries).

## Images
* Example:
  ```jsx
    import { Image } from "react-native"
    <Image source={require("./my-image.png")}/>
  ```
* Include base, 2x, and 3x sizes for devices with different screen densities. See full example here: https://reactnative.dev/docs/images
* `Image` supports png, jpg since that's what the native platforms support. svg support is possible via react native plugins, though prefer png, jpg.

## Debug
* On the simulator, press `command + D`, then click Debug. This will open debugger in chrome devtools and you can look at console logs.

## Running on device
iOS
* Be sure your apple id is added as a developer to the apple developer team that manages the bundle id, and ensure you are given permission for certificates, so that you can create a development certificate. (Developers can't downlaod or manage the distribution certs, so you don't need to worry about access.)
* XCode > Preferences > Account > Add your apple id. Once added, your personal team and the development team you were added to should be listed.
* Select the development team, and select manage certificates..., then click the + in the bottom left, and select Apple development. This will add an apple development certificate to the development team.
* Then when signing builds, select automatically manage signing, and select the development team (not personal), and it should automatically select your new development cert, and create a provisioning profile.
* Plug in your device with usb.
* Select your device in the device selector in Xcode.
* Press Play button to build and run on device.

Android
* Much easier than ios. Basically enable usb debugging on device, plugin with usb and run `react-native android`.
* Full steps are clear here: https://reactnative.dev/docs/running-on-device
* If device doesn't show up with `adb devices`, unplug usb and reconnect.

## Assets
* Add path to assets folder to `react-native.config.js`, e.g.
  ```
    module.exports = {
        assets: ["./app/assets/fonts/"]
    }

  ```
* Run `react-native link` (NOTE: react-native@0.60 or greater automatically links native dependencies, so you don't have to run `react-native link <my-dep>`, but asset linking is different, and you have to do it even on >0.60)

## Fonts
* Use a separate `fontFamily` for each weight needed, e.g. `fontFamily: "OpenSans-Bold"`, not `fontFamily: "OpenSans", fontWeight: "bold"`. The platforms handle it differently, so the first method works consistently on both ios and android.
* On ios, the fontFamily should match the postscript name of the font. To check this, open the file in Font Book mac app, and select View > Show font info.
* On android, the fontFamily should match the file name. Ideally, this will match the postscript name, so that the same string can be used on ios and android.

## React Native Developer Resources
* https://www.reactnative.guide/

## Troubleshooting
Android build error: `Requested internal only, but not enough space`
* Close emulator.
* Open android studio > Configure > AVD Manager > (Virtual device dropdown on right) > Wipe data.

iOS build error: `multiple commands produced <file>`
This probably happened because you added files to xcode project manually, but react native >= v0.60 auto links files, resulting in duplicate files.
* Open project in Xcode.
* Select project in the project navigator left sidebar.
* Find the files you added manually and delete them.
* If needed, select Build Phases tab > Copy Bundle Resources, and delete files there too.

## Versioning
iOS
* Update properties in `ios/{project}/Info.plist`
  * CFBundleShortVersionString: string, e.g. "1.2"
  * CFBundleVersion: integer, incremented for each release, e.g. 12

Android
* Update properties in `android/app/build.gradle`
  * versionName: string, e.g. "1.2"
  * versionCode: integer, incremented for each release, e.g. 12

## Release
iOS
* Use an ios distribution certificate.
* Be sure the devices that will install the app are included in the provisioning profile.
* TODO: document release build via Xcode. All i've done currently is app center.

Android
* Follow steps here to create release signing key: https://reactnative.dev/docs/signed-apk-android.html
* TODO: document release build via Mac. All i've done currently is app center.
