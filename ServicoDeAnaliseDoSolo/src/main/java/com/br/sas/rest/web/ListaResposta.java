/**
 * 
 */
package com.br.sas.rest.web;

import javax.ejb.Stateless;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import com.br.sas.bean.RespostaBean;
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
@Path("informativa")
@Stateless
public class ListaResposta extends PersistenceUtil {	
	
	private Gson gson;
	private MongoClient cliente;
	private DB db;
	
	@SuppressWarnings("deprecation")
	public ListaResposta() {
		cliente = new MongoClient("localhost", 3001);
		db = cliente.getDB("meteor");
		gson = new Gson();
	}
	
	@Override
	public String buscar(String user, String faixa) {
		return "";
	}
	
	@Override
	public String cadastrar(String json) {return null;}
	
	@Override
	public String atualizar(String json) {return null;}
	
	@Override
	public void excluir(String id) {}
	
	@POST
	@Path("lista")
	public String buscarListaPendente(String json){
		BasicDBObject filtro = new BasicDBObject();
		filtro.put("usuario", json);
		DBCursor cursor = buscarDadosPorFiltro(db, "resposta", filtro);
		return gson.toJson(cursor.toArray());
	}
	
	@DELETE
	@Path("{user}/{faixa}")
	public String excluirResposta(@PathParam("user") String user, @PathParam("faixa") String faixa){
		BasicDBObject dados = new BasicDBObject();
		dados.put("usuario", user);
		dados.put("faixa", faixa);
		deletarDados(db, "resposta", dados);
		return gson.toJson("Excluido com Sucesso");
	}
}
