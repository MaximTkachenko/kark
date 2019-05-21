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
        private const int CellSize = 18;
        private const int RightCellSize = CellSize + 1;
        private const int MaxCellNumber = 4;
        private static readonly Dictionary<string, Color> Colors = new Dictionary<string, Color>
        {
            { "r", Color.White },
            { "t", Color.Brown },
            { "f", Color.Green },
            { "c", Color.Brown },
            { "e", Color.Black },
        };

        static void Main()
        {
            var tiles = JsonConvert.DeserializeObject<Dictionary<string, Tile>>(File.ReadAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "tiles.json")));

            var folderToSave = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "tiles");
            if (Directory.Exists(folderToSave))
            {
                Directory.Delete(folderToSave, true);
            }
            Directory.CreateDirectory(folderToSave);

            foreach (var tile in tiles)
            {
                using (Bitmap bmp = new Bitmap(TileSize, TileSize))
                using (Graphics graph = Graphics.FromImage(bmp))
                {
                    for (int i = 0; i < tile.Value.Content.GetLength(0); i++)
                    for (int j = 0; j < tile.Value.Content.GetLength(1); j++)
                    {
                        var data = tile.Value.Content[i, j];
                        if (string.IsNullOrEmpty(data))
                        {
                            continue;
                        }

                        graph.FillRectangle(
                            brush: new SolidBrush(
                                color: Colors[data.Substring(0, 1)]
                            ),
                            rect: new Rectangle(i * CellSize, j * CellSize, 
                                i == MaxCellNumber ? RightCellSize : CellSize, j == MaxCellNumber ? RightCellSize : CellSize)
                        );

                        //var img = Image.FromFile(@"C:\temp\hut.png");
                        //graph.DrawImage(img, new Point(0, 0));
                        //img.Dispose();
                    }
                    
                    bmp.Save(Path.Combine(folderToSave, $"{tile.Key}.jpg"), ImageFormat.Jpeg);
                }
            }
        }
    }
}
