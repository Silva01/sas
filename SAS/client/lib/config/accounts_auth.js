Accounts.ui.config({
	extraSignupFields:[{
		fieldName:'name',
		fieldLabel:'Nome'
	},{
		fieldName:'cpf',
		fieldLabel:'CPF'
	}],
	requestPermissions:{
		facebook:['email', 'user_about_me']
	}
});