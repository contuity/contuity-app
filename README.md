# Contuity
A people-oriented note taking tool 💡

## Setup

#### Install some stuff

1. Install [Xcode 10](https://developer.apple.com/xcode/)
2. Install [HomeBrew](http://brew.sh/)

#### Build locally

Run the following commands in a Terminal or Bash window on your computer.

1. `brew install yarn`
2. `yarn global add react-native-cli`
3. `git clone https://github.com/contuity/contuity-app.git`
4. `cd contuity-app`
5. `yarn`
6. `react-native run-ios`

You can also install this package, which may help development.

- `yarn global add react-devtools`

After a few moments, an iPhone simulator should appear on your screen with the app running! 🏃‍♀️

## Source file structure

    |
    +--src         
       +--components      # reusable React components 
       +--database        
          +--models       # object classes and schemas
          +--services     # services that query our Realm database
          +--realm.js     # creates Realm instance
       +--screens         # all full screens
    +--App.js             # entry-point into app
    +--package.json       # dependencies
    |
    # all other files at this level are React Native boilerplate code
    |

## Resources

- [Using Realm with React Native](https://realm.io/docs/javascript/latest/)
- [React Native Elements](https://react-native-training.github.io/react-native-elements/) (component library)
- [Building the app onto device](https://facebook.github.io/react-native/docs/running-on-device) 
