package org.capstone.my_supplier.exception;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(String productId) {
        super("Das Produkt mit der Artikelnummer " + productId + " wurde nicht gefunden!");
    }
}
