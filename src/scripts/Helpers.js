const Helpers = {
    createMovieArray : function(items, limit) {
        
        return new Promise(
            function(resolve, reject) {
                var movieArray = [];
                for (var i = 0; i < limit; i++) {
                    var movie = items[i];
                    var newMovie = {
                        'id' : movie.id,
                        'poster_path' : movie.poster_path,
                        'title' : movie.title,
                        'overview' : movie.overview,
                        'video' : movie.video
                    };
                    movieArray.push(newMovie);
                }
                resolve(movieArray);
            }
        );
    },

    createTvShowsArray : function(items, limit) {
        return new Promise(
            function(resolve, reject) {
                var tvShowsArray = [];
                for (var i = 0; i < limit; i++) {
                    var tvShow = items[i];
                    var newTvShow = {
                        'id' : tvShow.id,
                        'original_name' : tvShow.original_name,
                        'overview' : tvShow.overview,
                        'poster_path' : tvShow.poster_path
                    };

                    tvShowsArray.push(newTvShow);
                }
                resolve(tvShowsArray);
            }
        );
    }
}

export default Helpers;