# Hyperblotter Demo


Hyperblotter is a demonstration app to show the capabilities of both [OpenFin](http://openfin.co/) and [HyperGrid](https://github.com/openfin/fin-hypergrid). Additionally it illustrates how to [co-deploy traditional desktop applications](wpf-integration-notes.md), in this case .NET, with an OpenFin App, and how to embed HTML5 content into WPF.

Currently OpenFin applications only run in a Windows environment. Applications may also be run on Mac or Linux by either using a Windows Virtual Machine (VM) or an NPM install. Oracle's [Virtual Box](https://www.virtualbox.org/) is a free, open-source VM which may be used. 

## Demo Installer

On a Windows machine, you can install Hyperblotter via this installer:

[Hyperblotter](https://install.openfin.co/download?fileName=Hyperblotter&config=http://cdn.openfin.co/demos/hyperblotter/app.json)

On a Mac machine, you can install hyperblotter via a terminal command with these 2 steps:

```
$ npm install -g openfin-cli 
$ openfin --launch --config http://cdn.openfin.co/demos/hyperblotter/app.json
```

## Build and run demo from source on local machine:

Clone this Git repository and in the Terminal window, change directories into the created Directory 'Hyperblotter'. The following instructions are written in Unix syntax so it is recommended you use a compatible terminal app on a Windows machine, eg: [Git Bash](https://git-scm.com/downloads) or [Cmder](http://cmder.net/).

```
$ cd Hyperblotter
```

If Node and NPM are not installed, install them from [here](https://nodejs.org/en/). Node version 4.2.1 or higher is required.

If yarn is not installed, install from [here](https://yarnpkg.com/lang/en/docs/install/#windows-tab) or with npm

```
$ npm install -g yarn
```

### Run app locally

Open a terminal window and change the directory to the 'Hyperblotter' folder.

```
$ cd Hyperblotter
```

In the terminal window, install dependencies using yarn:

```
$ yarn install
```

NB: (the additional 'sudo' command may be required, eg. 'sudo yarn install' at which point you will be prompted to enter your admin password).

The app runs locally on a simple Node server and the code is compiled using [Gulp](http://gulpjs.com/) as a build tool.

The app must first be compiled. This only needs to be done the first time the app is run, but the app will need to be recompiled if modifications are made to the code.

In the terminal, build the project from the source files:

```
$ yarn build
```

Then start the app:

NB for a production Node app this would require hosting remotely on Heroku, AWS or a similar platform. OpenFin is not designed to install apps locally.

```
$ yarn start
```

`yarn start` starts the server and launches OpenFin.

An executable should now be created and launched.

## License 
MIT


The code in this repository is covered by the included license.

However, if you run this code, it may call on the OpenFin RVM or OpenFin Runtime, which are covered by OpenFin’s Developer, Community, and Enterprise licenses. You can learn more about OpenFin licensing at the links listed below or just email us at support@openfin.co with questions.

https://openfin.co/developer-agreement/ <br/>
https://openfin.co/licensing/
