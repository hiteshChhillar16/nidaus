using MongoDB.Bson; //handle bson specifications
using MongoDB.Driver; // connect execute commands
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace nidaus
{
    public class CommentsController : ApiController
    {

        public IEnumerable<Comment> GetComments()
        {
            MongoClient mc = new MongoClient();

            var db = mc.GetDatabase("NidausDb");
            var coll = db.GetCollection<Comment>("Comment");

            var id = new ObjectId("57f3e52ee88d7feef2ae34d0");
            var query = from c in coll.AsQueryable<Comment>()
                        where c.Type == "Review"
                        select c;

            return query;
        }


        public AdminInfo GetAdminInfo()
        {
            MongoClient mc = new MongoClient();

            var db = mc.GetDatabase("NidausDb");
            var coll = db.GetCollection<AdminInfo>("AdminInfo");

            var query = from c in coll.AsQueryable<AdminInfo>()
                        select c;

            return query.FirstOrDefault();
        }


        [HttpPost]
        public async Task<Comment> Save(Comment model)
        {
            MongoClient mc = new MongoClient();

            var db = mc.GetDatabase("NidausDb");
            var coll = db.GetCollection<Comment>("Comment");


            await coll.InsertOneAsync(model);
            return model;
        }




    }
}
