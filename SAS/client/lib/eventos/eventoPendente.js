Template.analise.events({
  'click .baixa': function(){
    /* Variaveis Locais */
    var param = "Aguardando ....";
    var res = localStorage.getItem("info");
    /* Busca Quantidade de Faixas */
    var faixas = Respostas.find({faixa: this.faixa}).count();
    /* Loop para atualizar todas as faixas e gerar uma Resposta */
    for (var i = 0; i < faixas; i++) {
      var userResposta = Respostas.findOne({faixa: this.faixa, resposta: param});
      Respostas.update({_id: userResposta._id}, {$set : {resposta: res}});
    }

    var pendencias = Pendente.find({faixa: this.faixa}).count();
    alert(pendencias);
    for (var i = 0; i < pendencias; i++) {
      var dados = Pendente.findOne({faixa: this.faixa});
      Pendente.remove(dados._id);
    }
  }
})
