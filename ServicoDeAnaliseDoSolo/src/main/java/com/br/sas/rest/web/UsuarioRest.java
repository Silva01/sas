/**
 * 
 */
package com.br.sas.rest.web;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.bson.types.ObjectId;

import com.br.sas.bean.UsuarioBean;
import com.br.sas.util.PersistenceUtil;
import com.google.gson.Gson;
import com.google.gson.internal.StringMap;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;

/**
 * @author Daniel Silva
 *
 */
@Path("usuario")
@Stateless
public class UsuarioRest extends PersistenceUtil {
	
	private Gson gson;	
	private MongoClient cliente;
	private DB db;
	@Inject
	private Processamento processamento;
	
	@SuppressWarnings("deprecation")
	public UsuarioRest() {
		cliente = new MongoClient("localhost", 3001);
		db = cliente.getDB("meteor");
		gson = new Gson();
	}	
	
	@Override
	public String buscar(String user, String faixa) {
		return null;
	}
	
	@POST
	@Path("cadastrar")
	@Override
	public String cadastrar(String json) {		
		UsuarioBean novoUsuario = gson.fromJson(json, UsuarioBean.class);
		BasicDBObject buscar = new BasicDBObject();
		buscar.put("usuario", novoUsuario.getUsuario());
		DBCursor cursor = buscarDadosPorFiltro(db, "mobile", buscar);
		if (cursor.hasNext()) {
			return gson.toJson("Usuário já cadastrado, escolha outro nome de usuário");
		} else {
			BasicDBObject novoCadastro = new BasicDBObject();
			novoCadastro.put("nome", novoUsuario.getNome());
			novoCadastro.put("usuario", novoUsuario.getUsuario());
			novoCadastro.put("senha", novoUsuario.getSenha());
			novoCadastro.put("telefone", novoUsuario.getTelefone());
			novoCadastro.put("email", novoUsuario.getEmail());
			persistir(db, "mobile", novoCadastro);
			return gson.toJson("Cadastrado com Sucesso");
		}
	}
	
	@PUT	
	@Override
	public String atualizar(String json) {
		UsuarioBean novoUsuario = gson.fromJson(json, UsuarioBean.class);
		BasicDBObject buscar = new BasicDBObject();
		buscar.put("usuario", novoUsuario.getUsuario());
		DBCursor cursor = buscarDadosPorFiltro(db, "mobile", buscar);		
		if (cursor.hasNext()) {
			UsuarioBean base = gson.fromJson(cursor.next().toString(), UsuarioBean.class);
			StringMap<String> map = (StringMap<String>) base.get_id();
			String oidBase = map.get("$oid");
			String oidUsuario = novoUsuario.get_id().toString();
			if (oidBase.equals(oidUsuario)) {
				BasicDBObject novoCadastro = new BasicDBObject();
				novoCadastro.put("nome", novoUsuario.getNome());
				novoCadastro.put("usuario", novoUsuario.getUsuario());
				novoCadastro.put("senha", novoUsuario.getSenha());
				novoCadastro.put("telefone", novoUsuario.getTelefone());
				novoCadastro.put("email", novoUsuario.getEmail());
				BasicDBObject filtro = new BasicDBObject().append("$set", novoCadastro);
				ObjectId id = new ObjectId(novoUsuario.get_id().toString());
				BasicDBObject procura = new BasicDBObject().append("_id", id);
				atualizarDados(db, "mobile", filtro, procura);
				BasicDBObject resposta = new BasicDBObject();
				resposta.append("$set", new BasicDBObject().append("usuario", novoUsuario.getUsuario()));
				BasicDBObject filtroResposta = new BasicDBObject().append("usuario", base.getUsuario());
				atualizarDadosMulti(db, "resposta", resposta, filtroResposta);
				return "1";
			} else {				
				return "0";
			}
			
		} else {
			ObjectId id2 = new ObjectId(novoUsuario.get_id().toString());
			DBCursor cursor2 = buscarDadosPorFiltro(db, "mobile", new BasicDBObject().append("_id", id2));
			UsuarioBean user = gson.fromJson(cursor2.next().toString(), UsuarioBean.class);
			BasicDBObject novoCadastro = new BasicDBObject();
			novoCadastro.put("nome", novoUsuario.getNome());
			novoCadastro.put("usuario", novoUsuario.getUsuario());
			novoCadastro.put("senha", novoUsuario.getSenha());
			novoCadastro.put("telefone", novoUsuario.getTelefone());
			novoCadastro.put("email", novoUsuario.getEmail());
			BasicDBObject filtro = new BasicDBObject().append("$set", novoCadastro);
			ObjectId id = new ObjectId(novoUsuario.get_id().toString());
			BasicDBObject procura = new BasicDBObject().append("_id", id);
			atualizarDados(db, "mobile", filtro, procura);
			BasicDBObject resposta = new BasicDBObject();
			resposta.append("$set", new BasicDBObject().append("usuario", novoUsuario.getUsuario()));
			BasicDBObject filtroResposta = new BasicDBObject().append("usuario", user.getUsuario());
			atualizarDadosMulti(db, "resposta", resposta, filtroResposta);
			return "1";
		}
		
	}
	
	@DELETE
	@Path("/{user}")
	@Override
	public void excluir(@PathParam("user") String json) {
		BasicDBObject filtro = new BasicDBObject();
		filtro.put("usuario", json);
		deletarDados(db, "mobile", filtro);
		deletarDados(db, "resposta", filtro);
	}
	
	@POST
	@Path("login")
	@Produces("application/json")
	public String buscarLogin(String usuario) {		
		DBCursor cursor = buscarDados(db, "mobile");
		UsuarioBean login = gson.fromJson(usuario, UsuarioBean.class);
		return gson.toJson(processamento.processarLogin(login, cursor));		
	}
	
	@POST
	@Path("carregar")
	public String buscar(String json){
		BasicDBObject filtro = new BasicDBObject();
		filtro.put("usuario", json);
		DBCursor cursor = buscarDadosPorFiltro(db, "mobile", filtro);
		UsuarioBean usuario = gson.fromJson(cursor.next().toString(), UsuarioBean.class);
		return gson.toJson(usuario);
	}
}
