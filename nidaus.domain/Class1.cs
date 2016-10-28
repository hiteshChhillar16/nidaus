using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using MongoDB.Bson;

namespace nidaus
{
    public class Class1
    {
        public static string URI = "";
        public static string Key = "";
        public static DocumentClient dc = new DocumentClient(new Uri(URI), Key);
    }


    public class AdminInfo1
    {
        //paste advanced as json class and it automatically creates class
        public ObjectId _id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string MainText { get; set; }
        public string Description { get; set; }
        public List<AdminStyleClass1> socialInfo { get; set; }
    }

    public class AdminStyleClass1
    {
        public string url { get; set; }
        public string icon { get; set; }
        public string classInfo { get; set; }
    }
}
