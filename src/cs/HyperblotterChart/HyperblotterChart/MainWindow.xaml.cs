using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.IO;
using Fin = Openfin.Desktop;

namespace ChartIQDemo
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        #region Fields

        double _height = 0;
        double _width = 0;
        double _top = 0;
        double _left = 0;
        bool _softHidden = false;

        Fin.Runtime _runtime;

        #endregion

        #region Constructors
        public MainWindow()
        {
            InitializeComponent();

            // Connect to the runtime
            var runtimeOptions = new Fin.RuntimeOptions()
            {
                Version = string.IsNullOrEmpty(App.RuntimeVersion) ? "stable" : App.RuntimeVersion,
                SecurityRealm = string.IsNullOrEmpty(App.SecurityRealm) ? null : App.SecurityRealm
            };

            _runtime = Fin.Runtime.GetRuntimeInstance(runtimeOptions);
            _runtime.Connect(RuntimeConnectedCallback);

            // Initialize the embedded view
            var htmlRootPath = Path.GetFullPath(@"chartiq-html\stx-basic.html");
            var htmlRootUrl = new Uri(htmlRootPath).ToString();

            var appOptions = new Fin.ApplicationOptions("chartIQDemo", "chartIQUuid", htmlRootPath);

            embeddedview.Initialize(runtimeOptions, appOptions);

            embeddedview.OnReady += embeddedView_OnReady;
        }

        #endregion

        #region UI Event Handlers

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            Top = App.StartPositionTop;
            Left = App.StartPositionLeft;

            if (App.StartHidden)
            {
                SoftHide();
            }
        }

        private void TitleBar_MouseDown(object sender, MouseButtonEventArgs e)
        {
            if (e.ChangedButton == MouseButton.Left)
            {
                Application.Current.MainWindow.DragMove();
            }
        }

        private void CloseButton_Click(object sender, RoutedEventArgs e)
        {
            if (Keyboard.IsKeyDown(Key.LeftCtrl) || Keyboard.IsKeyDown(Key.RightCtrl))
            {
                Application.Current.Shutdown();
            }
            else
            {
                Visibility = Visibility.Hidden;
            }
        }

        private void AboutButton_Click(object sender, RoutedEventArgs e)
        {
            (new AboutWindow(CreateAboutMessage()) { Owner = this }).ShowDialog();
        }

        private void MenuItem_Click(object sender, RoutedEventArgs e)
        {
            embeddedview.OpenfinWindow.showDeveloperTools();
        }

        private void embeddedView_OnReady(object sender, EventArgs e)
        {
            Dispatcher.Invoke(new Action(() =>
            {
                showDeveloperToolsItem.IsEnabled = true;
            }));
        }

        #endregion

        #region Methods
        private string CreateAboutMessage()
        {
            var message = new StringBuilder();

            message.AppendLine("OpenFin Embedded ChartIQ Demo");
            message.AppendLine();
            message.AppendLine($"Product Version: 1.0.0.0");
            message.AppendLine();
            message.AppendLine($".NET Version: {Environment.Version}");
            message.AppendLine($"OS Version: {Environment.OSVersion}");
            message.AppendLine($"Process Type: {(Environment.Is64BitProcess ? "64-bit" : "32-bit")}");
            message.AppendLine();
            message.AppendLine($"OpenFin Runtime: {App.RuntimeVersion}");
            message.AppendLine($"Parent App UUID: {App.ParentAppUuid}");

            return message.ToString();
        }

        private void SoftHide()
        {
            using (var d = Dispatcher.DisableProcessing())
            {
                _height = Height;
                _width = Width;
                _top = Top;
                _left = Left;
                Height = 0;
                Width = 0;
                Top = 0;
                Left = 0;

                ShowInTaskbar = false;
                _softHidden = true;
            }
        }

        private void SoftShow()
        {
            using (var d = Dispatcher.DisableProcessing())
            {
                Top = _top;
                Left = _left;
                Height = _height;
                Width = _width;
                
                ShowInTaskbar = true;
                _softHidden = false;
            }
        }

        private void ShowAndActivate()
        {
            if (_softHidden)
            {
                Visibility = Visibility.Hidden;
                SoftShow();
                System.Threading.Thread.Sleep(500);
            }

            Visibility = Visibility.Visible;

            Activate();
        }

        private void RuntimeConnectedCallback()
        {
            if (!string.IsNullOrEmpty(App.ParentAppUuid))
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

        #endregion
    }
}
