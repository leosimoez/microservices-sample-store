package com.lsm.store.catalog.exception;

public class CatalogDomainException extends Exception {

	private static final long serialVersionUID = 1L;

	public CatalogDomainException() {
		super();
	}

	public CatalogDomainException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public CatalogDomainException(String message, Throwable cause) {
		super(message, cause);
	}

	public CatalogDomainException(String message) {
		super(message);
	}

	public CatalogDomainException(Throwable cause) {
		super(cause);
	}
	
	

}
