package org.capstone.my_supplier.exception;

public class OrderNotFoundException extends RuntimeException {

    public OrderNotFoundException(String orderId) {
        super("Die Bestellung mit der Bestell-Id " + orderId + " wurde nicht gefunden!");
    }
}
