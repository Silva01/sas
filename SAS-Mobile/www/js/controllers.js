angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $timeout, $http, $state, $ionicModal) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.alerta = "Você Realmente Deseja Excluir Seu Perfil ?";

  $ionicModal.fromTemplateUrl('templates/modais/avisoUser.html', {
   scope: $scope,
   animation: 'slide-in-up',
  }).then(function(modal) {
     $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modais/respostaGeral.html', {
   scope: $scope,
   animation: 'slide-in-up',
 }).then(function(modalResposta) {
     $scope.modalResposta = modalResposta;
  });

  $ionicModal.fromTemplateUrl('templates/modais/modalResposta.html', {
   scope: $scope,
   animation: 'slide-in-up',
  }).then(function(modalResposta) {
     $scope.respostaModal = modalResposta;
  });

  $ionicModal.fromTemplateUrl('templates/modais/confirmarExclusaoResposta.html', {
   scope: $scope,
   animation: 'slide-in-up',
  }).then(function(modalResposta) {
     $scope.confirmarExclusaoResposta = modalResposta;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.fechar = function(){
    $scope.modal.hide();
  };

  $scope.fecharModalResposta = function(){
    $scope.modalResposta.hide();
    if($scope.recarregar == 1){
      window.location.reload();
    }

    $scope.recarregar = 0;
  };

  $scope.abrirModalResposta = function(resposta, faixa){
    $scope.resposta = resposta;
    $scope.faixaResposta = faixa;
    $scope.respostaModal.show();
  };

  $scope.fecharRespostaModal = function(){
    $scope.respostaModal.hide();
  }

  $scope.abrirAvisoResposta = function(){
    $scope.alerta = "Deseja Excluir essa Resposta ?"
    $scope.respostaModal.hide();
    $scope.confirmarExclusaoResposta.show();
  }

  $scope.fecharAvisoResposta = function(){
    $scope.confirmarExclusaoResposta.hide();
  }

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

  $scope.cadastroAtualizar = {
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
    $http.post('http://192.168.0.101:8080/ServicoDeAnaliseDoSolo/rest/analise/analisar', JSON.stringify($scope.dadosRementente)).then(function(){
      $scope.resposta = "Faixa Enviada com Sucesso"
      $scope.recarregar = 1;
      $scope.modalResposta.show();
    });
  };

  $scope.validarLogin = function(){
    $http.post('http://192.168.0.101:8080/ServicoDeAnaliseDoSolo/rest/usuario/login', $scope.loginDados).then(function(response){
      if((response.data.senha.localeCompare("")) > 0){
        localStorage.setItem("nome", response.data.nome);
        localStorage.setItem("telefone", response.data.telefone);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("usuario", response.data.usuario);
        window.location.href = "#/app/lista";
        window.location.reload();
      } else {
        $scope.resposta = "Usuário ou Senha Inválida";
        $scope.modalResposta.show();
      }
    });
  };

  $scope.carregarLista = function(){
    var user = localStorage.getItem("usuario");
    $http.post('http://192.168.0.101:8080/ServicoDeAnaliseDoSolo/rest/informativa/lista', user).then(function(response){
      $scope.lista = response.data;
    });
  };

  $scope.formCadastro = function(){
    window.location.href = "#/app/cadastrar";
  };

  $scope.cadastrar = function(){
    $http.post('http://192.168.0.101:8080/ServicoDeAnaliseDoSolo/rest/usuario/cadastrar', $scope.cadastro).then(function(response){
      $scope.cadastro = {
        _id: "",
        nome: "",
        telefone: "",
        email: "",
        usuario: "",
        senha: ""
      };
      $scope.resposta = response.data;
      $scope.modalResposta.show();
      window.location.href = "#/app/login";
    });
  };

  $scope.carregar = function(){
    var user = localStorage.getItem("usuario");
    $http.post('http://192.168.0.101:8080/ServicoDeAnaliseDoSolo/rest/usuario/carregar', user).then(function(response){
      $scope.cadastroAtualizar = response.data;
      $scope.cadastroAtualizar._id = response.data._id.$oid;
    });
  };

  $scope.atualizar = function(){
    $http.put('http://192.168.0.101:8080/ServicoDeAnaliseDoSolo/rest/usuario', $scope.cadastroAtualizar).then(function(response){
      if (response.data == "1") {
        $scope.resposta = "Atualizado com Sucesso, Por favor Logue Novamente para Confirmar as Alterações";
        $scope.modalResposta.show();
        window.location.href = "#/app/login"
      }
      else {
        $scope.resposta = "Usuário já cadastrado, escolha outro nome de usuário";
        $scope.modalResposta.show();
      }
    });
  };

  $scope.deletar = function(){
    $scope.data = localStorage.getItem("usuario");
    $http.delete('http://192.168.0.101:8080/ServicoDeAnaliseDoSolo/rest/usuario'+'/'+ $scope.data).then(function(){
      $scope.alerta = "Excluido com Sucesso";
      window.location.href = "#/app/login";
      $scope.modal.hide();
    });
  };

  $scope.deletarResposta = function(){
    var user = localStorage.getItem("usuario");
    $http.delete('http://192.168.0.101:8080/ServicoDeAnaliseDoSolo/rest/informativa' + '/' + user + '/' + $scope.faixaResposta )
    .then(function(response){
      $scope.resposta = response.data;
      $scope.recarregar = 1;
      $scope.confirmarExclusaoResposta.hide();
      $scope.modalResposta.show();
    });
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
