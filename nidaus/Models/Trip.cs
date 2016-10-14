using MongoDB.Bson;

namespace nidaus
{

    public class Trip
    {
        //paste advanced as json class and it automatically creates class
        public ObjectId _id { get; set; }
        public string Name { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        //public List<AdminStyleClass> socialInfo { get; set; }
    }

    //public class AdminStyleClass
    //{
    //    public string url { get; set; }
    //    public string icon { get; set; }
    //    public string classInfo { get; set; }
    //}

}