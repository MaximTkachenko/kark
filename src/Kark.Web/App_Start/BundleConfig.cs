using System.Collections.Generic;
using System.Web.Optimization;

namespace Kark.Web
{
    public class BundleConfig
    {
        public static class Scripts
        {
            public const string MainJs = "~/bundles/mainjs";
        }

        public static class Styles
        {
            public const string MainCss = "~/Content/css";
        }

        public static void RegisterBundles(BundleCollection bundles)
        {
            var mainBundle = new ScriptBundle(Scripts.MainJs).Include(
                "~/Scripts/app/errors.js",
                "~/Scripts/app/metadata.js",
                "~/Scripts/app/globalConstants.js",
                "~/Scripts/app/metadataCalculator.js",
                "~/Scripts/app/utils.js",
                "~/Scripts/app/phaserSpriteExtension.js",
                "~/Scripts/app/tileObjectsService.js",
                "~/Scripts/app/tileQueueService.js",
                "~/Scripts/app/playerService.js",
                "~/Scripts/app/main.js");
            mainBundle.Orderer = new NonOrderingBundleOrderer();
            bundles.Add(mainBundle);
            
            bundles.Add(new StyleBundle(Styles.MainCss).Include("~/Content/style.css"));

#if DEBUG
            BundleTable.EnableOptimizations = false;
#else
            BundleTable.EnableOptimizations = true;
#endif
        }

        private class NonOrderingBundleOrderer : IBundleOrderer
        {
            public IEnumerable<BundleFile> OrderFiles(BundleContext context, IEnumerable<BundleFile> files)
            {
                return files;
            }
        }
    }
}