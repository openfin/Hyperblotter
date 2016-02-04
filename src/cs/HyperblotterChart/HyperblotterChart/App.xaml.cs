using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Windows;

namespace ChartIQDemo
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        public static string ParentAppUuid { get; protected set; }

        public static string RuntimeVersion { get; protected set; }

        public static string SecurityRealm { get; protected set; }

        public static bool StartHidden { get; protected set; }

        public static double StartPositionTop { get; protected set; } = double.NaN;

        public static double StartPositionLeft { get; protected set; } = double.NaN;

        private void Application_Startup(object sender, StartupEventArgs e)
        {
            ProcessCommandLineArgs(e.Args);

            if (string.IsNullOrEmpty(RuntimeVersion))
                RuntimeVersion = "stable";
        }

        private void ProcessCommandLineArgs(string[] args)
        {
            foreach (var arg in args)
            {
                if (arg.StartsWith("-"))
                {
                    var tokens = arg.Split(new[] { '=' }, 2);

                    if (tokens.Length == 2)
                    {
                        var key = tokens[0].TrimStart('-').ToLowerInvariant();
                        var value = tokens[1];
                        switch (key)
                        {
                            case "parentuuid":
                                ParentAppUuid = value;
                                break;
                            case "runtimeversion":
                                RuntimeVersion = value;
                                break;
                            case "securityrealm":
                                SecurityRealm = value;
                                break;
                            case "hidden":
                                StartHidden = (value.ToLowerInvariant() == "true");
                                break;
                            case "top":
                                double top;
                                if (double.TryParse(value, out top))
                                    StartPositionTop = top;
                                break;
                            case "left":
                                double left;
                                if (double.TryParse(value, out left))
                                    StartPositionLeft = left;
                                break;
                        }
                    }
                }
            }
        }
    }
}
