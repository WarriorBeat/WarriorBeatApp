<img src="https://s3.amazonaws.com/warriorbeatapp-hosting-mobilehub-1527922673/imgs/logo.jpg" align="right" height="170" width=170>

# WarriorBeatApp

IOS/Android application for Warrior Beat</br>
Built with [React Native](https://facebook.github.io/react-native/)

## Tech Stack
* [React Native CLI](https://github.com/facebook/react-native)
* [MobX](https://github.com/mobxjs/mobx) - [How to Use](https://medium.com/react-native-training/ditching-setstate-for-mobx-766c165e4578)
* [Amazon Web Services](https://aws.amazon.com)
* [awsmobile-cli](https://github.com/aws/awsmobile-cli)
* [React Native Navigation v2](https://wix.github.io/react-native-navigation/v2/#/)


## Installation and Build

First, clone the repo:

```sh
$ clone https://github.com/WarriorBeat/WarriorBeatApp.git
$ cd WarriorBeatApp

```

Install Dependencies:

```sh
$ yarn install

```

If you do not have awsmobile installed, do so by executing the following:

```sh
$ yarn global add awsmobile

```

Connect to Amazon Web Services Backend:

```sh
$ awsmobile init < PROJECT ID > 

Then sync backend

$ awsmobile pull

```

Build with React Native:

```sh
$ react-native run-ios 

or

$ yarn run android

```

After building, launch Metro Bundler:

```sh
$ react-native start

or

$ yarn start

```

