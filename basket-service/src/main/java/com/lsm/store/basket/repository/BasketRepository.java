package com.lsm.store.basket.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.lsm.store.basket.domain.CustomerBasket;

@Repository
public interface BasketRepository extends CrudRepository<CustomerBasket, String> {
	

	
	
}