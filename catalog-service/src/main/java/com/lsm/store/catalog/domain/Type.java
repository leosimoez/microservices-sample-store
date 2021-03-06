package com.lsm.store.catalog.domain;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.TextScore;

import lombok.Builder;
import lombok.Data;

@Data @Builder @Document(collection = "catalog.types")
public class Type {
	
	@Id
	private String id;
	
	@NotEmpty @Size(min=3)
	@TextIndexed
	private String type;
	
	@TextScore
    private Float score;

}
