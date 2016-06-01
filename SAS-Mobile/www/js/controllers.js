angular.module('starter.controllers', []).constant ( 'ApiEndpoint' , {
  url: 'http://localhost:8100'
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $location) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.loginDados = {
    usuario: "",
    senha: ""
  };

  $scope.enviar = function(){
    /*var config = {
      headers:{'Content-Type': undefined}
    };*/
  //  $http.post('http://localhost:8080/ServicoDeAnaliseDoSolo/rest/usuario', JSON.stringify($scope.loginDados), config);
  };

  $scope.validarLogin = function(){
    /*var config = {
      headers:{
        'Content-Type': undefined
      }
    };*/
    //$location.path("/app/search");

    $http.get('/login').then(function(response){
      //if(data.data.length == 0){
        $scope.dados = response.data.profile.name;
        alert($scope.dados);
    //  }
    });

  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
