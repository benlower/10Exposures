      $(document).ready(function() {
        var appid = "528b4a1361a14d689cf1b0db8bb234e5";
        var apikey = "c803c6aa2f3943dca564d2c67d3ea68f";

        cloudmine.init({app_id: appid, api_key: apikey});

        var getAlbumInfo = function(){
          // hash looks like: url#/userid/albumid
          var hash = window.location.hash.split('/');
          var userid = hash[1];
          var albumid = hash[2];

          // todo: error checking
          return {
            userId: userid,
            albumId: albumid
          }
        }

        var buildSearchQueryWithParams = function(album_info){
          return '[type = "photo", userId = ' + album_info.userId + ', albumId=' + album_info.albumId + ']';
        }

        var albumInfo = getAlbumInfo();
        var searchString = buildSearchQueryWithParams(albumInfo);

        console.log("using search string: " + searchString);

        cloudmine.search(searchString, function(result){
          console.log(result);
	  var i = 0;
          result.success.forEach(function(key, value){
            $("#img" + i).attr('src', cloudmine.getFileURL(value.fileId));
	    i++;
          });
        });
      });
