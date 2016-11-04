using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;


namespace nidaus
{

    public class ValuesController : ApiController
    {
        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        public IEnumerable<AdminInfo> GetAdminInfo()
        {
            MongoClient mc = new MongoClient();

            var db = mc.GetDatabase("NidausDb");
            var coll = db.GetCollection<AdminInfo>("AdminInfo");

            var query = from c in coll.AsQueryable<AdminInfo>()
                        select c;

            return query;
        }


        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }

    }

}
