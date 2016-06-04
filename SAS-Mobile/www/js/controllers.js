angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $timeout, $http, $state) {

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

  $scope.dadosRementente = {
    nomeRementente: "",
    emailRementente: "",
    telefoneRementente: "",
    status : "Pendente",
    faixa : 0
  };

  $scope.enviar = function(){
    $scope.dadosRementente.nomeRementente = localStorage.getItem("nome");
    $scope.dadosRementente.emailRementente = localStorage.getItem("email");
    $scope.dadosRementente.telefoneRementente = localStorage.getItem("telefone");
    $http.post('/analise', JSON.stringify($scope.dadosRementente));
  };

  $scope.validarLogin = function(){
    $http.post('/login', $scope.loginDados).then(function(response){
      if((response.data.senha.localeCompare("")) > 0){
        localStorage.setItem("nome", response.data.nome);
        localStorage.setItem("telefone", response.data.telefone);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("usuario", response.data.usuario);
        window.location.href = "#/app/search";
        window.location.reload();
      }
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
