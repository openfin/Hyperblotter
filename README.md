## Hyperblotter Trader Demo
Hyperblotter is a demonstration app to show the capabilities of both [OpenFin](http://openfin.co/) and [HyperGrid](https://github.com/openfin/fin-hypergrid).

Currently OpenFin applications only run in a Windows evvironment. They may be run on a Mac by using a Windows Virtual Machine (VM). Oracle's Virtual Box is a free, open-souce VM which may be used. 

To build and run the demo from source on your local machine:

Clone this Git repository and, in the Terminal window, change directories into the created Directory 'Hyperblotter'. The follwing instructions are written in Unix syntax so it is recommended you use a compatible terminal app on a Windows machine, eg: [Git Bash](https://git-scm.com/downloads) or [Cmder](http://cmder.net/) 

```
$ cd Hyperblotter
```
if Node and NPM are not installed, insatll them from [here](https://nodejs.org/en/).

Install dependencies:

```
$ npm install
```
NB: (the additional 'sudo' command may be required, eg. 'sudo npm install' at which point you will be prompted to enter your admin password). 
 
The app runs locally on a simple Node server and the code is compiled using [Gulp](http://gulpjs.com/) as a build tool. 
 

###Installer
https://dl.openfin.co/services/download?fileName=hyperblotter-demo&config=http://cdn.openfin.co/hyperblotter/app.json

##Web Version
http://cdn.openfin.co/hyperblotter/
