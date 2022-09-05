package org.capstone.my_supplier.customer;

import org.capstone.my_supplier.supplier.Product;
import org.capstone.my_supplier.supplier.ProductService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
        private final ProductService productService;
        private final OrderRepo orderRepo;

        public OrderService(
                ProductService productService,
                OrderRepo orderRepo) {
            this.productService = productService;
            this.orderRepo = orderRepo;
        }

        public void addOrder(String orderId, List<String> productIds) {
            List<Product> products = new ArrayList<>();
            for(String productId : productIds) {
                Product product = productService.getSingleProduct(productId);
                products.add(product);
            }

            Order order = new Order(orderId, products);

            orderRepo.addOrder(order);
        }
}
