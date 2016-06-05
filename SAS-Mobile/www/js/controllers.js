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
    usuario: "",
    faixa : 0
  };

  $scope.enviar = function(){
    $scope.dadosRementente.nomeRementente = localStorage.getItem("nome");
    $scope.dadosRementente.emailRementente = localStorage.getItem("email");
    $scope.dadosRementente.telefoneRementente = localStorage.getItem("telefone");
    $scope.dadosRementente.usuario = localStorage.getItem("usuario");
    $http.post('/analise', JSON.stringify($scope.dadosRementente));
  };

  $scope.validarLogin = function(){
    $http.post('/login', $scope.loginDados).then(function(response){
      if((response.data.senha.localeCompare("")) > 0){
        localStorage.setItem("nome", response.data.nome);
        localStorage.setItem("telefone", response.data.telefone);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("usuario", response.data.usuario);
        window.location.href = "#/app/lista";
        window.location.reload();
      }
    });
  };

  $scope.carregarLista = function(){
    var user = localStorage.getItem("usuario");
    $http.post('/dados', user).then(function(response){
      $scope.lista = response.data;
    });
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
