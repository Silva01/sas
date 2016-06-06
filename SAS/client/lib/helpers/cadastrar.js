Template.table.helpers({
	cadastros: function(){
		return Cadastro.find({});
	}
});

Template.formularioAtualizar.helpers({
	dados: function(){
		return Cadastro.find({_id: idDados});
	}
});