package com.lsm.store.catalog.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.lsm.store.catalog.domain.Brand;

public interface BrandRepository extends MongoRepository<Brand, String>{
	

	Page<Brand> findAllByOrderByScoreDesc(TextCriteria criteria, Pageable page);
	
	
}