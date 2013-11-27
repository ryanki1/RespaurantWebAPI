using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RespaurantWebAPI.Models.DAL
{
    public class EifelInitializer: System.Data.Entity.DropCreateDatabaseIfModelChanges<EifelContext>
    {
        protected override void Seed(EifelContext context)
        {
            var restaurants = new List<Restaurant>
            {
                new Restaurant{Address1="48 Rathausgasse"}
            };

            restaurants.ForEach(s => context.Restaurants.Add(s));
            context.SaveChanges();
        }
    }
}