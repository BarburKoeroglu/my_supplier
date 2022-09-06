package org.capstone.my_supplier.exception;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(String productId) {
        super("Product with Id " + productId + "not found!");
    }
}
