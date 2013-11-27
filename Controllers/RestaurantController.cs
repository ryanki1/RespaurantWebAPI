using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RespaurantWebAPI.Models.DAL;
using RespaurantWebAPI.Models;

namespace RespaurantWebAPI.Controllers
{
    [RoutePrefix("api/restaurant")]
    public class RestaurantController : ApiController
    {
        // GET api/restaurant/GetAddress1
        public System.Web.Http.Results.JsonResult<Models.Restaurant> GetAddress1()
        {
            var restaurant = new Models.Restaurant();
            var context = new EifelContext();
            restaurant = context.Restaurants.Single<Restaurant>(r => r.ID == 1);
            return this.Json<Models.Restaurant>(restaurant);
        }
        // GET api/restaurant/GetMySqlAddress1
        public System.Web.Http.Results.JsonResult<Models.Restaurant> GetMySqlAddress1()
        {
            var restaurant = new Models.Restaurant();
            var context = new EifelContext();
            restaurant = context.Restaurants.Single<Restaurant>(r => r.ID == 1);
            return this.Json<Models.Restaurant>(restaurant);
        }
        // GET api/restaurant/GetCouchDBAddress1
        public System.Web.Http.Results.JsonResult<Models.Restaurant> GetCouchDBAddress1()
        {
            var restaurant = new Models.Restaurant();
            var context = new EifelContext();
            restaurant = context.Restaurants.Single<Restaurant>(r => r.ID == 1);
            return this.Json<Models.Restaurant>(restaurant);
        }

    }
}