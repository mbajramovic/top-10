import Helpers from './Helpers';
const axios = require('axios');
const apiKey = require('./config.json').api_key;

const TheMovieDB = {
    getTopTenMovies : function() {
        return new Promise(
            function(resolve, reject) {
                axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKey.value + "&language=en-US&page=1")
                .then(response => {
                    if (response.status === 200 && response.statusText === "OK") {
                        var results = response.data.results;
                        Helpers.createMovieArray(results, 10)
                        .then(movieArray => {
                            resolve(movieArray);
                        })
                        .catch(error => {
                            resolve([]); // empty
                        });
                    }
                    else {
                        resolve([]); 
                    }
                })
                .catch(error => {
                    resolve([]);
                });
            }
        );
    },

    getTopTenTvShows : function() {
        return new Promise(
            function(resolve, reject) {
                axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key=" + apiKey.value + "&language=en-US&page=1")
                .then(response => {
                    if (response.status === 200 && response.statusText === "OK") {
                        var results = response.data.results;
                        Helpers.createTvShowsArray(results, 10)
                        .then(tvShowsArray => {
                            resolve(tvShowsArray);
                        })
                        .catch(error => {
                            resolve([]);
                        });
                    }
                    else {
                        resolve([]);
                    }
                })
                .catch(error => {
                    resolve([]);
                });
            }
        );
    },

    searchForMovies : function(query) {
        return new Promise(
            function(resolve, reject) {
                axios.get("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey.value + "&language=en-US&query=" + query + "&page=1&include_adult=false")
                .then(response => {
                    if (response.status === 200 && response.statusText === "OK") {
                        var results = response.data.results;
                        Helpers.createMovieArray(results, results.length)
                        .then(moviesArray => {
                            resolve(moviesArray);
                        })
                        .catch(error => {
                            resolve([]);
                        });
                    }
                    else
                        resolve([]);
                })
                .catch(error => {
                    resolve([]);
                });
            }
        );
    },

    searchForTvShows : function(query) {
        return new Promise(
            function(resolve, reject) {
                axios.get("https://api.themoviedb.org/3/search/tv?api_key=" + apiKey.value + "&language=en-US&query="+ query + "&page=1")
                .then(response => {
                    if (response.status === 200 && response.statusText === "OK") {
                        var results = response.data.results;
                        Helpers.createTvShowsArray(results, results.length)
                        .then(tvShows => {
                            resolve(tvShows);
                        })
                        .catch(error => {
                            resolve([]);
                        });
                    }
                    else
                        resolve([]);
                })
                .catch(error => {
                    resolve([]);
                });
            }
        )
    },

    getVideo : function(id) {
        return new Promise(
            function(resolve, reject) {
                axios.get("https://api.themoviedb.org/3/movie/" + id +"/videos?api_key=" + apiKey.value + "&language=en-US")
                .then(response => {
                    if (response.status === 200 && response.statusText === "OK") {
                        var results = response.data.results;
                        if (results.length > 0) 
                            resolve(results[0].key);
                        else
                            resolve(null);
                    }
                    else
                        resolve(null);
                });
            }
        )
    }
}

export default TheMovieDB;


  
    


