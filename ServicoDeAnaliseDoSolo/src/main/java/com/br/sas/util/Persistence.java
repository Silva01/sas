package com.br.sas.util;


public interface Persistence {

	String buscar(String user, String faixa);	
	
	String cadastrar(String json);
	
	String atualizar(String json);
	
	void excluir(String id);
}
