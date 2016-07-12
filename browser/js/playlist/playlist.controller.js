juke.controller('PlaylistCtrl', function($scope, $log, $state, $stateParams, PlayerFactory, PlaylistFactory, PlaylistViewsFactory, SongFactory){
    $scope.submit = function() {
        PlaylistFactory.create($scope.playlist)
        .then(function(res) {
            $scope.playlist.name = ""
            $scope.playlistForm.$setPristine()
            $state.go('singlePlayList', { id: res.id })
        })
        .catch($log.error)
    }

    $scope.add = function() {
        PlaylistFactory.addSong($scope.selected)
        .then(function(res) {
            $scope.selected = ""
            return PlaylistFactory.allPlaylistSongs()
        })
        .then(function(res) {
            // updating song list
            $scope.playlist.songs = res
            $scope.playlist.songs.map(function(song) {
                return SongFactory.convert(song)
            })
        })
        .catch($log.error)
    }

    PlaylistViewsFactory.single($stateParams.id)
    .then(function(res) {
        $scope.playlist = res
        $scope.playlist.songs.map(function(song) {
            return SongFactory.convert(song)
        })
    })

    SongFactory.getAllSongs()
    .then(function(res){
        $scope.allSongs =  res;
    })
    .catch($log.error)


    $scope.toggle = function (song) {
      if (song !== PlayerFactory.getCurrentSong()) {
        PlayerFactory.start(song, $scope.playlist.songs);
      } else if ( PlayerFactory.isPlaying() ) {
        PlayerFactory.pause();
      } else {
        PlayerFactory.resume();
      }
    };

    $scope.getCurrentSong = function () {
      return PlayerFactory.getCurrentSong();
    };

    $scope.isPlaying = function (song) {
      return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
    };

});

juke.controller('PlaylistViewsCtrl', function($scope, $log, PlayerFactory, PlaylistViewsFactory,  SongFactory, $stateParams){
    // Why is the PlaylistViewsCtrl run twice? Once for the sidebar, once for the single playlist page.
    // why is this value undefined the first time it runs? Because the ui-router has not resolve to /playlist/2, therefore it cannot fetch $stateParams.id
    // console.log($stateParams.id)

    PlaylistViewsFactory.list()
    .then(function(result){

        $scope.list = result;
    })
    .catch($log.error)

});
