/**
 * 
 */
package com.br.sas.resouce;

import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


/**
 * @author Daniel Silva
 *
 */
public class Resource {

	@Produces
	@PersistenceContext
	private EntityManager em;
}
