Template.formulario.events({
	"submit": function(evento, template){
		evento.preventDefault();
		var info = evento.target.infor.value;
		var faixaMin = evento.target.faixaMinima.value;
		var faixaMax = evento.target.faixaMaxima.value;
		var classificacao = evento.target.classificar.value;
		localStorage.setItem("info", info);
		Cadastro.insert({faixaMin: faixaMin,
			faixaMax: faixaMax,
			classificacao: classificacao,
			informacao: info});

		Router.go('/');

	}
});
