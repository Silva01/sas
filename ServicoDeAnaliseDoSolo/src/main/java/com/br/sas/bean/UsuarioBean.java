/**
 * 
 */
package com.br.sas.bean;

/**
 * @author silva
 *
 */
public class UsuarioBean {

	private Object _id;
	private String nome;
	private String telefone;
	private String email;
	private String usuario;
	private String senha;
	
	public UsuarioBean() {
		nome = new String();
		telefone = new String();
		email = new String();
		usuario = new String();
		senha = new String();
	}
	
	
	public Object get_id() {
		return _id;
	}

	public void set_id(Object _id) {
		this._id = _id;
	}


	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getTelefone() {
		return telefone;
	}
	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUsuario() {
		return usuario;
	}
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	
	
}
