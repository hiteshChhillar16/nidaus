using MongoDB.Bson;
using System.Collections.Generic;

namespace nidaus
{

    public class MapTrip
    {
        //paste advanced as json class and it automatically creates class
        public ObjectId _id { get; set; }
        public string Name { get; set; }
        public List<Stop> listStops { get; set; }
    }

    public class Stop
    {
        public string StopId { get; set; }
        public string Lat { get; set; }
        public string Long { get; set; }
        public string Description { get; set; }
        public string Date { get; set; }
        public string FormattedAddress { get; set; }
    }

}