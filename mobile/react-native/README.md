# React native

tags: react-native, react, native, mobile, ios, android, js, javascript

## React native community
* Many of the react native core components have been extracted into individual repos hosted in the react native community group.
* Use the community component instead of the core component, unless otherwise specified.
* See list here for repos and activity state: https://github.com/react-native-community/.github/blob/master/MAINTAINERS.md

## Images
* Example:
  ```jsx
    import { Image } from "react-native"
    <Image source={require("./my-image.png")}/>
  ```
* Include base, 2x, and 3x sizes for devices with different screen densities. See full example here: https://reactnative.dev/docs/images
* `Image` supports png, jpg since that's what the native platforms support. svg support is possible via react native plugins, though prefer png, jpg.

## Icons
* use `react-native-vector-icons`.
* Use the built-in icon sets, e.g. Material, FontAwesome:
  ```jsx
  import Icon from "react-native-vector-icons/MaterialIcons"
  <Icon name="done" size={24} color="green" />
  ```
* Use custom icon sets from svg via icon tools like icomoon.io:
  ```jsx
  import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
  import icoMoonConfig from './selection.json' // Downloaded from icomoon.io after uploading svgs.

  const IconCustom = createIconSetFromIcoMoon(
    icoMoonConfig,
    'bliss',
    'bliss.ttf' // Downloaded from icomoon.io after uploading svgs, placed in assets folder.
  )

  <IconCustom name="shield" size={24} color="green"/>
  ```

## Navigation
* For common navigation patterns, e.g. top-level tabs, forward/back within series of screens, use `react-navigation`.
* Follow the installation intructions to install extra deps, and initialize lib: https://reactnavigation.org/docs/getting-started#installation
* Navigation container required to wrap your entire app:
  ```jsx
  import { NavigationContainer } from '@react-navigation/native';
  <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  ```
* Tab navigator, to add bottom tab navigation, which is used to change between top level sections of the app:
  ```jsx
  import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
  const Tab = createBottomTabNavigator()
  <Tab.Navigator>
    <Tab.Screen name="home" component={Home} /> // Home is a user-defined react component.
    <Tab.Screen name="account" component={Account} /> // Account is a user-defined react component.
  </Tab.Navigator>
  ```
* Stack navigator, to navigate forward/back within series of screens.
  ```jsx
  import { createStackNavigator } from "@react-navigation/stack"
  const Stack = createStackNavigator()
  const HomeStack = (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home}/> // Home is a user-defined react component.
      <Stack.Screen name="detail" component={Detail}/> // Detail is a user-defined react component.
    </Stack.Navigator>
  )
  ```
* Nested navigators, e.g. use stack navigator inside tab navigator:
  ```jsx
  <Tab.Navigator>
    <Tab.Screen name="home" component={HomeStack} /> // HomeStack defined above.
    <Tab.Screen name="account" component={Account} /> // Account is a user-defined react component.
  </Tab.Navigator>
  ```
* All components passed as `component` to `Stack.Screen` receive `navigation` as a prop, so then you can navigate with `props.navigation.navigate(/* Screen name. */ "detail")`.
* `react-navigation` also powers the header, with back button to return to previous screen in stack, title, and other actions. Header can be customized or removed if needed.

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
