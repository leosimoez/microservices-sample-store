package com.lsm.store.catalog.domain;

import java.math.BigDecimal;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.TextScore;

import com.lsm.store.catalog.exception.CatalogDomainException;

import lombok.Builder;
import lombok.Data;

@Data @Builder @Document(collection = "catalog.product")
public class Product {
	
	@Id
    private String id;

	@NotEmpty @Size(min = 3)
	@TextIndexed(weight = 3)
    private String name;

	@NotEmpty @Size(min=3)
	@TextIndexed(weight = 2)
    private String description;

	@DecimalMin("0.0")
	@Indexed
    private BigDecimal price;

    private String pictureFileName;

    private String pictureUri;

//    @TextIndexed(weight = 2)
    @DBRef(lazy = false)
    private Type type;

//    @TextIndexed(weight = 1)
    @DBRef(lazy = false)
    private Brand brand;

    private Integer availableStock;

    private int restockThreshold;

    private int maxStockThreshold;

    private Boolean onReorder;
    
    @TextScore
    private Float score;
    
    public int removeStock(int quantityDesired) throws CatalogDomainException
    {
        if (availableStock == 0)
        {
            throw new CatalogDomainException("Empty stock, product item "+name+" is sold out");
        }

        if (quantityDesired <= 0)
        {
            throw new CatalogDomainException("Item units desired should be greater than zero");
        }

        int removed = Math.min(quantityDesired, availableStock);

        this.availableStock -= removed;

        return removed;
    }
    
    public int addStock(int quantity)
    {
        int original = this.availableStock;

        // The quantity that the client is trying to add to stock is greater than what can be physically accommodated in the Warehouse
        if ((availableStock + quantity) > maxStockThreshold)
        {
            // For now, this method only adds new units up maximum stock threshold. In an expanded version of this application, we
            //could include tracking for the remaining units and store information about overstock elsewhere. 
            availableStock += (maxStockThreshold - availableStock);
        }
        else
        {
            availableStock += quantity;
        }

        onReorder = false;

        return availableStock - original;
    }

}
