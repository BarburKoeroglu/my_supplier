package org.capstone.my_supplier.customer;

import org.capstone.my_supplier.supplier.Product;

import java.util.List;

public record Order(String orderId, List<Product> products) {
}
