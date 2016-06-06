/**
 * 
 */
package com.br.sas.rest.web;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import com.br.sas.bean.DadosBean;
import com.br.sas.util.PersistenceUtil;
import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;

/**
 * @author Daniel Silva
 * @version 1.0
 *
 */
@Path("analise")
@Stateless
public class AnaliseRest extends PersistenceUtil{
	
	private Gson gson;
	private MongoClient cliente;
	private DB db;
	private DBCursor cursor;
	
	@Inject
	private Processamento processamento;
	
	@SuppressWarnings("deprecation")
	public AnaliseRest() {
		cliente = new MongoClient("localhost", 3001);
		db = cliente.getDB("meteor");
		this.gson = new Gson();
	}
	
	@Override
	public String buscar(String user, String faixa) {
		return "";
	}
	
	@POST
	@Override
	public String cadastrar(String json) {return null;}
	
	@POST
	@Path("analisar")
	public void analisar(String json) {
		DadosBean dados = gson.fromJson(json, DadosBean.class);
		cursor = buscarDados(db, "cadastros");
		String resul = processamento.verificarFaixa(dados.getFaixa(), cursor);
		
		if (!resul.equals("0")) {
			if (isTemRegistro(dados)) {
				BasicDBObject novoRegistro = new BasicDBObject();
				novoRegistro.append("$set", new BasicDBObject().append("resposta", resul));			
				BasicDBObject filtro = new BasicDBObject().append("faixa", dados.getFaixa());
				atualizarDados(db, "resposta", novoRegistro, filtro);
			}
			else {
				BasicDBObject newResgistro = new BasicDBObject();
				newResgistro.put("usuario", dados.getUsuario());
				newResgistro.put("resposta", resul);
				newResgistro.put("faixa", dados.getFaixa());
				persistir(db, "resposta", newResgistro);

			}


		} else {
			if (!isTemRegistro(dados)) {
				BasicDBObject newResgistro = new BasicDBObject();
				newResgistro.put("usuario", dados.getUsuario());
				newResgistro.put("resposta", "Aguardando ....");
				newResgistro.put("faixa", dados.getFaixa());
				persistir(db, "resposta", newResgistro);
				BasicDBObject pendente = new BasicDBObject();
				pendente.put("nomeRementente", dados.getNomeRementente());
				pendente.put("faixa", dados.getFaixa());
				pendente.put("email", dados.getEmailRementente());
				pendente.put("status", dados.getStatus());
				persistir(db, "pendente", pendente);
			}
		}
	}
	
	@Override
	public String atualizar(String json) {return null;}
	
	@Override
	public void excluir(String id) {}
	
	public boolean isTemRegistro(DadosBean dados){
		BasicDBObject filtro = new BasicDBObject();
		filtro.put("usuario", dados.getUsuario());
		filtro.put("faixa", dados.getFaixa());
		DBCursor cursor = buscarDadosPorFiltro(db, "resposta", filtro);
		return cursor.hasNext();
	}
}
