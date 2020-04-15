# React native libraries

tags: react-native, react, native, mobile, ios, android, js, javascript

## React native community
* Many of the react native core components have been extracted into individual repos hosted in the react native community group.
* Use the community component instead of the core component, unless otherwise specified.
* See list here for repos and activity state: https://github.com/react-native-community/.github/blob/master/MAINTAINERS.md

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

