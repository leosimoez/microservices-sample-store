package com.lsm.store.catalog.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.lsm.store.catalog.domain.Product;
import com.lsm.store.catalog.repository.ProductRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("product")
public class ProductController {
	
	@Autowired
	ProductRepository repository;
	
	@PostMapping
	public ResponseEntity<Product> crate(@Validated @RequestBody Product product) {
		
		Product newProduct = repository.save(product);
		
		return ResponseEntity.ok(newProduct);
		
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Product> update(@PathVariable("id") String id, @Validated @RequestBody Product newState) {
		
		if(repository.existsById(id)) {
			
			repository.save(newState);
			
			return ResponseEntity.ok().build();
			
		} else {
			
			return ResponseEntity.notFound().build();
			
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Product> delete(@PathVariable("id") String id) {
		
		if(repository.existsById(id)) {
			
			repository.deleteById(id);
			
			return ResponseEntity.noContent().build();
			
		} else {
			
			return ResponseEntity.notFound().build();
			
		}
		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Product> read(@PathVariable("id") String id) {
		
		return ResponseEntity
				.of(repository.findById(id));
			
	}
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public Page<Product> readPaged(Pageable pageable, @RequestParam("q") Optional<String> query) {
		
		if(query.isPresent()) {
			
			TextCriteria criteria = TextCriteria
					.forDefaultLanguage()
					.caseSensitive(false)
					.matchingAny(query.get().split(" "));
			
			return repository.findAllByOrderByScoreDesc(criteria, pageable);
			
		} else {
			
			return repository.findAll(pageable);
			
		}
		
	}

}
