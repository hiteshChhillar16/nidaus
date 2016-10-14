using System.Web.Optimization;

namespace nidaus
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            //<--------Material Bootstrap 4 Bundle --->
            bundles.Add(new ScriptBundle("~/bundles/material").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/tether.js",
                        "~/Scripts/bootstrap.js",
                        "~/Scripts/mdb.js",
                        "~/Scripts/respond.js"
                       ));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            //<------Angular Scripts---------->
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/Scripts/angular.js",
                        "~/Scripts/angular-route.js",
                        "~/Scripts/angular-resource.min.js",
                        "~/Scripts/angular-animate.js",
                        "~/Scripts/angular-touch.js",
                        "~/Scripts/angular-aria.js",
                //"~/Scripts/angular-map.js",
                        "~/Scripts/ui-grid.js"
                       ));

            //<------Common Scripts---------->
            bundles.Add(new ScriptBundle("~/bundles/common").Include(
                        "~/Scripts/common.js"
                       ));


            //<------YouTube Scripts---------->
            bundles.Add(new ScriptBundle("~/bundles/youtube").Include(
                        "~/Scripts/angular-youtube-embed.js"
                       ));

            //<------Module Scripts---------->
            bundles.Add(new ScriptBundle("~/bundles/module").Include(
                        "~/Scripts/site.js",
                        "~/angular/app.module.js"
                       ));

            //<------Directives/Services Scripts---------->
            bundles.Add(new ScriptBundle("~/bundles/services").Include(
                        "~/angular/config.js",
                        "~/angular/AngularConstant.js",
                        "~/angular/services/VideoUtility.js",
                        "~/angular/services/listYouTube.js",
                        "~/angular/services/rating.js",
                        "~/angular/services/apiCallService.js"
                       ));

            //<------Controller Scripts---------->
            bundles.Add(new ScriptBundle("~/bundles/controllers").Include(
                        "~/angular/mainController.js",
                        "~/angular/controllers/loginController.js",
                        "~/angular/controllers/aboutMeController.js",
                        "~/angular/controllers/commentController.js",
                        "~/angular/controllers/contactInfoController.js",
                        "~/angular/controllers/courseController.js",
                        "~/angular/controllers/playtubeController.js",
                        "~/angular/controllers/tripController.js"
                       ));


            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/mdb.css",
                      "~/Content/site-theme.css",
                      "~/Content/font-awesome.css",
                      "~/Content/ui-grid.css"
                      ));
        }
    }
}
