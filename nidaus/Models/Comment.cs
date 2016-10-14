using MongoDB.Bson;

namespace nidaus
{

    public class Comment
    {
        //paste advanced as json class and it automatically creates class
        public ObjectId _id { get; set; }
        public string UserId { get; set; }
        public string Text { get; set; }
        public string Type { get; set; }
    }

}