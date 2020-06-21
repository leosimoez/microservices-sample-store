package com.lsm.store.basket.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @RedisHash("basket") @NoArgsConstructor @AllArgsConstructor
public class CustomerBasket implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	private String id;
	
	private Date createdAt;
	
	@Builder.Default
    private Set<BasketItem> items = new HashSet<BasketItem>();
	
	public static CustomerBasket newInstance() {

		return CustomerBasket.builder()
				.id(generateUUID())
				.createdAt(new Date())
				.build();
		
	}
	
	public Date getLastAccess() {
		return new Date();
	}
	
	public BigDecimal getTotal() {
		return items.stream()
			.map(i -> i.getItemValue())
			.reduce(BigDecimal.ZERO, BigDecimal::add);
	}
	
	private static String generateUUID() {
		return UUID.randomUUID().toString();
	}
	

	public void addItem(BasketItem item) {
		if(items == null)
			items = new HashSet<BasketItem>();
		items.remove(item);//add not override on add
		items.add(item);		
	}
	
	public void removeItem(String productId) {
		items.removeIf(item -> item.getProductId().equals(productId));
	}

}
