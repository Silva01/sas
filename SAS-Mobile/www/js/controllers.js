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

  $scope.cadastro = {
    _id: "",
    nome: "",
    telefone: "",
    email: "",
    usuario: "",
    senha: ""
  };

  $scope.enviar = function(){
    $scope.dadosRementente.nomeRementente = localStorage.getItem("nome");
    $scope.dadosRementente.emailRementente = localStorage.getItem("email");
    $scope.dadosRementente.telefoneRementente = localStorage.getItem("telefone");
    $scope.dadosRementente.usuario = localStorage.getItem("usuario");
    $http.post('/analise', JSON.stringify($scope.dadosRementente)).then(function(){
      window.location.reload();
    });
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

  $scope.formCadastro = function(){
    window.location.href = "#/app/cadastrar";
  };

  $scope.cadastrar = function(){
    $http.post('/cadastrar', $scope.cadastro).then(function(response){
      alert(response.data);
      $scope.cadastro = {
        _id: "",
        nome: "",
        telefone: "",
        email: "",
        usuario: "",
        senha: ""
      };
      window.location.href = "#/app/login";
    });
  };

  $scope.carregar = function(){
    var user = localStorage.getItem("usuario");
    $http.post('/carregar', user).then(function(response){
      $scope.cadastro = response.data;
    });
  };

  $scope.atualizar = function(){
    $http.put('/atualizar', $scope.cadastro).then(function(){
      localStorage.setItem("nome", $scope.cadastro.nome);
      localStorage.setItem("telefone", $scope.cadastro.telefone);
      localStorage.setItem("email", $scope.cadastro.email);
      localStorage.setItem("usuario", $scope.cadastro.usuario);
      $scope.cadastro = {
        _id: "",
        nome: "",
        telefone: "",
        email: "",
        usuario: "",
        senha: ""
      };
      window.location.reload();
    });
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
