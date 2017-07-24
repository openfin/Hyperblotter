# HyperblotterChart View

The HyperblotterChart view is a standalone WPF application which hosts a ChartIQ (HTML5) page which is fully controllable from the standard Hyperblotter UI. Hyperblotter deploys this tool as a third-party asset (external application) and then communicates with the WPF host and its HTML5 content over the OpenFin InterApplicationBus. The following code snippets highlight the key integration points in the code:

### Deploying and Launching a WPF Application from an OpenFin App

Applications are co-deployed with OpenFin Apps by declaring them in the application manifest file as an `appAsset` entry. In this demo, the following entry has been added to the app.json file:

*app.json*
```json
  "appAssets": [
    {
      "src": "http://localhost:5001/assets/HyperblotterChart.zip",
      "alias": "hyperblotter-chart",
      "target": "HyperblotterChart.exe",
      "version": "1.0.0"
    }
  ]
```

This establishes that the external application is contained in a zip file available at the specified URL. The runtime will download and extract the zip file and then invoke the target .exe file via alias. In Hyperblotter, this call is added to the startup logic for faster load times.

In order for Hyperblotter to communicate with the WPF application, the two must be connected to the same instance of the runtime be aware of Hyperblotter's application UUID. As illustrated in the code sample, below, this information is passed to HyperblotterChart.exe as command line arguments:

*src\javascript\components\main.js*

```javascript
  var initWpfChart = function(){
    fin.desktop.Application.getCurrent().getManifest(function (manifest) {
      var version = manifest.runtime.version;
      var appUuid = manifest.startup_app.uuid;

      var args = '--parentuuid=' + appUuid + ' --runtimeversion=' + version + ' --hidden=true';

      fin.desktop.System.launchExternalProcess({
        alias: 'hyperblotter-chart',
        arguments: args
      });
    });
  }
```

### Connecting to the Runtime and Embedding the ChartIQ Content from WPF

When the WPF application launches, it parses the command line arguments and saves them to local static variable (code not shown). Upon creation of the main window, the WPF application then connects to the runtime as follows:

*src\cs\HyperblotterChart\HyperblotterChart\MainWindow.xaml.cs*

```csharp
  using Fin = Openfin.Desktop;

  // Additional namespace and class declarations...

  public MainWindow()
  {
      InitializeComponent();

      var runtimeOptions = new Fin.RuntimeOptions()
      {
          Version = string.IsNullOrEmpty(App.RuntimeVersion) ? "stable" : App.RuntimeVersion, // From command line args
      };

      _runtime = Fin.Runtime.GetRuntimeInstance(runtimeOptions);
      _runtime.Connect(RuntimeConnectedCallback);

      // Continued, below
```

Embedding the HTML5 content within WPF is a fairly straightforward application of the OpenFin WPF `EmbeddedView` control. For this demo, all necessary content files are packaged with the .NET application, but alternatively they could also be hosted on a remote server. The remaining initializaiton code is as follows:

*src\cs\HyperblotterChart\HyperblotterChart\MainWindow.xaml.cs*

```csharp
    // Continued, from above

    var htmlRootPath = Path.GetFullPath(@"chartiq-html\stx-basic.html");
    var htmlRootUrl = new Uri(htmlRootPath).ToString();

    var appOptions = new Fin.ApplicationOptions("chartIQDemo", "chartIQUuid", htmlRootPath);

    embeddedview.Initialize(runtimeOptions, appOptions);

    embeddedview.OnReady += embeddedView_OnReady;
}
```

### Controlling ChartIQ and the WPF Application from Hyperblotter

Hyperblotter was modified to give each ticker tile a chart button, that when clicked publishes the ticker symbol name on the InterApplicationBus:

*src\javascript\components\trade-view.js*

```javascript
  openDetailedChartWindow: function(){
    console.log("openDetailedChartWindow [" + this.state.ticker + "]");

    fin.desktop.InterApplicationBus.publish('tickerSelection', {
      symbolName: this.state.ticker
    });
  }
```

The WPF application now needs to automatically unhide anytime a ticker selection is made in Hyperblotter. This is accomplished by subscribing to the same topic on the `InterApplicationBus` from the supplied parent UUID. Additionally, the application should close whenever Hyperblotter does.

*src\cs\HyperblotterChart\HyperblotterChart\MainWindow.xaml.cs*

```csharp
  private void RuntimeConnectedCallback()
  {
    if (!string.IsNullOrEmpty(App.ParentAppUuid)) // From command line args
    {
      var parentAppUuid = App.ParentAppUuid;
      var parentApp = Fin.Application.wrap(parentAppUuid, _runtime.DesktopConnection);

      parentApp.addEventListener("closed", (ack) =>
      {
          Dispatcher.Invoke(new Action(Application.Current.Shutdown));
      });

      _runtime.InterApplicationBus.subscribe(parentAppUuid, "tickerSelection", (sourceUuid, topic, message) =>
      {
          Dispatcher.Invoke(new Action(ShowAndActivate));
      });
    }
  }
```

The final remaining piece is to update the ChartIQ content to accept tickers from Hyperblotter and update the chart accordingly. This can be done by adding an extra Javascript file to ChartIQ and then including a link to that file in the chart HTML page:

*src\cs\HyperblotterChart\HyperblotterChart\chartiq-html\js\openfin.js*

```javascript
  (function () {
    'use strict';
    var subscribeToInterAppBus = function () {
      fin.desktop.InterApplicationBus.subscribe('*', 'tickerSelection', function (msg) {
        console.log('Message Received: ' + msg.symbolName);
          stxx.newChart(msg.symbolName);
      });
    };

    //event listeners.
    document.addEventListener('DOMContentLoaded', function () {
      //OpenFin is ready
      fin.desktop.main(function () {
        subscribeToInterAppBus();
      });
    });
  }());
```
