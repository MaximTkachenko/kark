using Newtonsoft.Json;

namespace Kark.PlainTileGenerator
{
    class Tile
    {
        [JsonProperty("content")]
        public string[,] Content { get; set; }
    }
}
