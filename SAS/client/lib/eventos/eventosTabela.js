Template.table.events({
	'click .atualizar': function(){
		idDados = this._id;
	}
});

Template.table.events({
	'click .delete': function(){
		Cadastro.remove(this._id);
	}
});