using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using Newtonsoft.Json;

namespace Kark.PlainTileGenerator
{
    class Program
    {
        private const int TileSize = 91;

        static void Main(string[] args)
        {
            var tiles = JsonConvert.DeserializeObject<Dictionary<string, Tile>>(File.ReadAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "tiles.json")));
            var folderToSave = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "tiles");
            if (Directory.Exists(folderToSave))
            {
                Directory.Delete(folderToSave);
            }

            foreach (var tile in tiles)
            {
                using (Bitmap bmp = new Bitmap(TileSize, TileSize))
                {

                    bmp.Save(Path.Combine(folderToSave, $"{tile.Key}.png"), ImageFormat.Png);
                }
            }

            /*int width = 512;
            int height = 512;

            int x, y, w, h;
            x = y = 10;
            w = h = 100;

            using (Bitmap bmp = new Bitmap(width, height))
            {
                using (Graphics g = Graphics.FromImage(bmp))
                {

                    g.FillRectangle(
                        brush: new SolidBrush(
                            color: Color.Blue
                        ),
                        rect: new Rectangle(x, y, w, h)
                    );

                    g.DrawRectangle(
                        pen: new Pen(
                            color: Color.Black,
                            width: 3
                        ),
                        rect: new Rectangle(x, y, w, h)
                    );

                    bmp.Save(@"C:\temp\result.png", ImageFormat.Png);

                }
            }*/

        }
    }
}
