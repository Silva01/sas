/**
 * 
 */
package com.br.sas.rest.web;

import com.br.sas.bean.UsuarioBean;
import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;


/**
 * @author silva
 *
 */

public class Processamento {

	public UsuarioBean processarLogin(UsuarioBean login, DBCursor dados){
		
		Gson gson = new Gson();
		while (dados.hasNext()) {
			UsuarioBean usuario = gson.fromJson(dados.next().toString(), UsuarioBean.class);
			if (login.getUsuario().equals(usuario.getUsuario()) 
					&& login.getSenha().equals(usuario.getSenha())) {
				return usuario;
			}			
		}
		return new UsuarioBean();

	}
	
	public String verificarFaixa(String faixaUsuario, DBCursor cursor){
		BasicDBObject dadosBase;
		while (cursor.hasNext()) {
			dadosBase = (BasicDBObject) cursor.next();
			if (Long.parseLong(faixaUsuario.trim()) >= Long.parseLong(dadosBase.getString("faixaMin")) 
					&& Long.parseLong(faixaUsuario.trim()) <= Long.parseLong(dadosBase.getString("faixaMax"))) {
				return dadosBase.getString("informacao");
			}			
		}		
		return "0";
	}
}
