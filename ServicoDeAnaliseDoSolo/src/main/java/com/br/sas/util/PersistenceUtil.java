/**
 * 
 */
package com.br.sas.util;

import javax.ejb.Stateless;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;

/**
 * @author Daniel Silva
 * 
 *
 */
@Stateless
public abstract class PersistenceUtil implements Persistence {
	
	private DBCollection colecao;
	
	public <T> void persistir(DB database, String base, BasicDBObject dados){
		colecao = database.getCollection(base);
		colecao.insert(dados);
	}
	
	public <T> DBCursor buscarDados(DB dataBase ,String base){
		colecao = dataBase.getCollection(base);
		return colecao.find();
	}
	
	public <T> void atualizarDados(DB dataBase, String base, BasicDBObject novoDado, BasicDBObject dadoPesquisa){
		colecao = dataBase.getCollection(base);
		colecao.update(dadoPesquisa, novoDado);
	}
	
	public <T> void atualizarDadosMulti(DB dataBase, String base, BasicDBObject novoDado, BasicDBObject dadoPesquisa){
		colecao = dataBase.getCollection(base);
		colecao.update(dadoPesquisa, novoDado, false, true);
	}
	
	public void deletarDados(DB database, String base, BasicDBObject filtro){
		colecao = database.getCollection(base);
		colecao.remove(filtro);
	}
	
	public DBCursor buscarDadosPorFiltro(DB database, String base, BasicDBObject filtro){
		colecao = database.getCollection(base);
		return colecao.find(filtro);
	}
}
