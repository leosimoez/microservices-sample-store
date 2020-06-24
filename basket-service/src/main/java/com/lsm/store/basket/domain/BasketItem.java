package com.lsm.store.basket.domain;

import java.math.BigDecimal;
import java.util.Date;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data @Builder @EqualsAndHashCode(of = "productId")
public class BasketItem implements Comparable<BasketItem> {

//	private String id;
    
	@NotEmpty
	private String productId;
    
	@NotEmpty
	private String productName;
    
	@NotNull @Min(1)
	private BigDecimal unitPrice;
    
	@NotNull @Min(1)
	private Integer quantity;
    
	private String pictureUri;
	
	public Date getLastAccess() {
		return new Date();
	}
	
	public void increase() {
		quantity += 1;
	}
	
	public void decrease() {
		if(quantity > 1)
			quantity -= 1;
	}
	
	public BigDecimal getItemValue() {
		return unitPrice.multiply(new BigDecimal(quantity));
	}

	@Override
	public int compareTo(BasketItem o) {
		return productId.compareTo(o.getProductId());
	}
	
}
