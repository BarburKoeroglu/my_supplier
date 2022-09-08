package org.capstone.my_supplier.customer;

import org.capstone.my_supplier.supplier.Product;
import org.springframework.data.annotation.Id;

import java.util.List;

public record Order(@Id String orderId, List<Product> products) {
}
