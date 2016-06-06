/**
 * 
 */
package com.br.sas.bean;

/**
 * @author silva
 *
 */
public class DadosBean {

	private String faixa;
	private String nomeRementente;
	private String emailRementente;
	private String telefoneRementente;
	private String status;
	private String usuario;
	
	
	public String getUsuario() {
		return usuario;
	}
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	public String getFaixa() {
		return faixa;
	}
	public void setFaixa(String faixa) {
		this.faixa = faixa;
	}
	public String getNomeRementente() {
		return nomeRementente;
	}
	public void setNomeRementente(String nomeRementente) {
		this.nomeRementente = nomeRementente;
	}
	public String getEmailRementente() {
		return emailRementente;
	}
	public void setEmailRementente(String emailRementente) {
		this.emailRementente = emailRementente;
	}
	public String getTelefoneRementente() {
		return telefoneRementente;
	}
	public void setTelefoneRementente(String telefoneRementente) {
		this.telefoneRementente = telefoneRementente;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}	
}
