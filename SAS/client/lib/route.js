Router.configure({
	layoutTemplate: 'home'
});

Router.route('/', function(){
	this.render('table');
	this.layout('home');
});

Router.route('/pendentes', function(){
	this.render('analise');
	this.layout('home');
});

Router.route('/cadastrar', function(){
	this.render('formulario');
	this.layout('home');
});

Router.route('/atualizar', function(){
	this.render('formularioAtualizar');
	this.layout('home');
});
