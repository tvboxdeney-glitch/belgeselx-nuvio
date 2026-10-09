
function getStreams(tmdbId, mediaType, season, episode) {
  var pageUrl =
    "https://belgeselx.com/belgeseldizi/ucak-kazasi-raporu";

  return fetch(pageUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Referer": "https://belgeselx.com/"
    }
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (html) {
      var results = [];
      var matches = html.match(/https?:[^"' ]+\.(?:mp4|m3u8)(?:\?[^"' ]*)?/gi);

      if (matches) {
        matches.forEach(function (url) {
          if (results.some(function (item) {
            return item.url === url;
          })) {
            return;
          }

          results.push({
            name: "BelgeselX",
            title: "BelgeselX video",
            url: url,
            quality: "720p",
            headers: {
              "Referer": pageUrl,
              "User-Agent": "Mozilla/5.0"
            }
          });
        });
      }

      return results;
    })
    .catch(function () {
      return [];
    });
}

module.exports = { getStreams };
