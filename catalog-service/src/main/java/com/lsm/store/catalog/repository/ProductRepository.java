package com.lsm.store.catalog.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.lsm.store.catalog.domain.Brand;
import com.lsm.store.catalog.domain.Product;

public interface ProductRepository extends MongoRepository<Product, String>{
	

	Page<Product> findAllByOrderByScoreDesc(TextCriteria criteria, Pageable page);
	
	@Query("{ 'type.id' : ?0 }")
	Page<Product> findByTypeId(String typeId, Pageable page);
	
	@Query("{ 'brand.id' : ?0 }")
	Page<Product> findByBrandId(String brandId, Pageable page);
	
	Page<Product> findByBrand(Brand brand, Pageable page);
	
	
}
