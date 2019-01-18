fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
### fasttest
```
fastlane fasttest
```
Prints Data Loaded by Fastlane
### resetIcons
```
fastlane resetIcons
```
Reset App Icons after Badge

----

## iOS
### ios certificates
```
fastlane ios certificates
```
Update Match Certificates
### ios dev
```
fastlane ios dev
```
iOS Dev Build
### ios stage
```
fastlane ios stage
```
Stage and Release on App Center

----

## Android
### android test
```
fastlane android test
```
Runs all the tests
### android install
```
fastlane android install
```
Install App on Device/Sim
### android dev
```
fastlane android dev
```
Android Dev Build
### android stage
```
fastlane android stage
```
Stage and Release on App Center
### android install_release
```
fastlane android install_release
```
Install Release on Device

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).