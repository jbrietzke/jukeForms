'use strict';

function getData (res) { return res.data; }

juke.factory('PlaylistFactory', function ($http, $q, $stateParams) {

    var PlaylistFactory = {};

    PlaylistFactory.create = function(name) {
        return $http.post('/api/playlists', name).then(getData)
    }

    PlaylistFactory.addSong = function(song) {
        return $http.post('/api/playlists/' + $stateParams.id + '/songs', song)
        .then(getData)
    }

    PlaylistFactory.allPlaylistSongs = function() {
        return $http.get('api/playlists/' + $stateParams.id + '/songs')
        .then(getData)
    }

    return PlaylistFactory
});

juke.factory('PlaylistViewsFactory', function ($http, $q) {

    var PlaylistViewsFactory = {};

    PlaylistViewsFactory.list = function(){
        return $http.get('/api/playlists')
        .then(getData)
    }

    PlaylistViewsFactory.single = function(id){
        return $http.get('api/playlists/' + id)
        .then(getData)
    }
    return PlaylistViewsFactory;
});
