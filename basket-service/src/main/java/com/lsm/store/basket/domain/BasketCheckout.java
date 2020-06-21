package com.lsm.store.basket.domain;

import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Data @Builder
public class BasketCheckout {
	
	private String city;

    private String street;

    private String state;

    private String country;

    private String zipCode;

    private String cardNumber;

    private String cardHolderName;

    private Date cardExpiration;

    private String cardSecurityNumber;

    private int cardTypeId;

    private String buyer;

//    private Guid RequestId;

}
