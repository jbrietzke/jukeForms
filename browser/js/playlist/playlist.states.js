juke.config(function ($stateProvider) {

  $stateProvider.state('newPlayList', {
    url: '/playlists/new',
    templateUrl: '/js/playlist/templates/playlist.html',
    controller: 'PlaylistCtrl'
  });

  $stateProvider.state('singlePlayList', {
    url: '/playlists/:id',
    templateUrl: '/js/playlist/templates/singlePlaylist.html',
    controller: 'PlaylistCtrl',
    // resolve: {
    //     thePlaylist: function(PlaylistViewsFactory, $stateParams) {
    //         return PlaylistViewsFactory.single($stateParams.id)
    //     }
    // }
  });
});
