using MongoDB.Bson;
using System.Collections.Generic;

namespace nidaus
{

    public class AdminInfo
    {
        //paste advanced as json class and it automatically creates class
        public ObjectId _id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string MainText { get; set; }
        public string Description { get; set; }
        public List<AdminStyleClass> socialInfo { get; set; }
    }

    public class AdminStyleClass
    {
        public string url { get; set; }
        public string icon { get; set; }
        public string classInfo { get; set; }
    }

}