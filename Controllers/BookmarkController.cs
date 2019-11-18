using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace rep_search_api2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookmarkController : ControllerBase
    {
        const string SessionKeyBookmarks = "_Bookmarks"; 

        private readonly ILogger<BookmarkController> _logger;

        public BookmarkController(ILogger<BookmarkController> logger)
        {
            _logger = logger;
             HttpContext.Session.Set<List<Bookmark>>(SessionKeyBookmarks, new List<Bookmark>()); 
        }

        [HttpGet]
        public List<Bookmark> Get()
        {
            List<Bookmark> _bookmarks = HttpContext.Session.Get<List<Bookmark>>(SessionKeyBookmarks); 
            return _bookmarks;
        }

        [HttpPost]
        public Int32 Post(Bookmark bookmark)
        {
            List<Bookmark> _bookmarks = HttpContext.Session.Get<List<Bookmark>>(SessionKeyBookmarks); 
            _bookmarks.Add(bookmark);
            HttpContext.Session.Set<List<Bookmark>>(SessionKeyBookmarks, _bookmarks); 
            return _bookmarks.Count();
        }

    }

    public static class SessionExtensions 
        { 
            public static void Set<T>(this ISession session, string key, T value) 
            { 
                session.SetString(key, JsonConvert.SerializeObject(value)); 
            } 
            
            public static T Get<T>(this ISession session, string key) 
            { 
                var value = session.GetString(key); 
                return value == null ? default(T) : 
                JsonConvert.DeserializeObject<T>(value); 
            } 
        } 
}
