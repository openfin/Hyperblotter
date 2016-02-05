#Hyperblotter Demo
--
Hyperblotter is a demonstration app to show the capabilities of both [OpenFin](http://openfin.co/) and [HyperGrid](https://github.com/openfin/fin-hypergrid).

Currently OpenFin applications only run in a Windows environment. They may be run on a Mac by using a Windows Virtual Machine (VM). Oracle's [Virtual Box](https://www.virtualbox.org/) is a free, open-source VM which may be used. 

## Demo Installer
On a Windows machine, you can install Hyperblotter via this installer:

[Hyperblotter](https://dl.openfin.co/services/download?fileName=Hyperblotter&config=http://cdn.openfin.co/demos/hyperblotter/app.json)

##Build and run demo from source on local machine:

Clone this Git repository and in the Terminal window, change directories into the created Directory 'Hyperblotter'. The following instructions are written in Unix syntax so it is recommended you use a compatible terminal app on a Windows machine, eg: [Git Bash](https://git-scm.com/downloads) or [Cmder](http://cmder.net/).

```
$ cd Hyperblotter
```
if Node and NPM are not installed, install them from [here](https://nodejs.org/en/). Node version 4.2.1 or higher is required.

Install dependencies using Node Package Manager:

```
$ npm install
```
NB: (the additional 'sudo' command may be required, eg. 'sudo npm install' at which point you will be prompted to enter your admin password). 
 
The app runs locally on a simple Node server and the code is compiled using [Gulp](http://gulpjs.com/) as a build tool. 

###Run app locally
The app must first be compiled. This only needs to be done the first time the app is run, but the app will need to be recompiled if modifications are made to the code.

Open two terminal windows and in both change the directory to the 'Hyperblotter' folder.

```
$ cd Hyperblotter
```
if the build tool gulp is not installed, install it globally.

```
$ npm install -g gulp
```
Once installed, in the first terminal window, build the project from the source files.

```
$ gulp build
```
Then start the local Node server.

NB for a production Node app this would require hosting remotely on Heroku, AWS or a similar platform. OpenFin is not designed to install apps locally.

```
$ gulp server
```
Once the message 'Express server is listening on port 5001' is shown in the terminal open the second terminal window (leave the first terminal window open, closing it will close the server). Launch Openfin.

```
$ gulp openfin
```
An executable should now be created an launch the Hyperblotter toolbar. 
 
