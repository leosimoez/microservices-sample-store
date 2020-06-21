package com.lsm.store.basket.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lsm.store.basket.domain.BasketItem;
import com.lsm.store.basket.domain.CustomerBasket;
import com.lsm.store.basket.repository.BasketRepository;

@RestController
@CrossOrigin
@RequestMapping("basket")
public class BasketController {
	
	@Autowired
	private BasketRepository repository;
	
	
	@PostMapping
	public ResponseEntity<CustomerBasket> crate() {
		
		CustomerBasket basket = CustomerBasket.newInstance();
		
		CustomerBasket newCustomerBasket = repository.save(basket);
		
		return ResponseEntity.ok(newCustomerBasket);
		
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<CustomerBasket> delete(@PathVariable("id") String id) {
		
		if(repository.existsById(id)) {
			
			repository.deleteById(id);
			
			return ResponseEntity.noContent().build();
			
		} else {
			
			return ResponseEntity.notFound().build();
			
		}
		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CustomerBasket> read(@PathVariable("id") String id) {
		
		return ResponseEntity
				.of(repository.findById(id));
			
	}
	
	@PostMapping("/{id}/checkout")
	public ResponseEntity<CustomerBasket> checkout(@PathVariable("id") String id) {
		
		return ResponseEntity.ok().build();
		
	}
	
	@PostMapping("/{id}/item")
	public ResponseEntity<CustomerBasket> addItem(@PathVariable("id") String id, @Validated @RequestBody BasketItem item) {
		
		Optional<CustomerBasket> basket = repository.findById(id);
		
		if(basket.isPresent()) {
			basket.get().addItem(item);
			CustomerBasket save = repository.save(basket.get());
			return ResponseEntity.ok(save);
		}
		
		return ResponseEntity.notFound().build();
		
	}
	
	@DeleteMapping("/{id}/item/{productId}")
	public ResponseEntity<CustomerBasket> removeItem(@PathVariable("id") String id, @PathVariable("productId") String productId) {
		
		Optional<CustomerBasket> basket = repository.findById(id);
		
		if(basket.isPresent()) {
			basket.get().removeItem(productId);
			CustomerBasket save = repository.save(basket.get());
			return ResponseEntity.noContent().build();
		}
		
		return ResponseEntity.notFound().build();
		
	}
	
}
