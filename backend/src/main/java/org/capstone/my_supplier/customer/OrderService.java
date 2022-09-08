package org.capstone.my_supplier.customer;

import org.capstone.my_supplier.supplier.Product;
import org.capstone.my_supplier.supplier.ProductService;
import org.capstone.my_supplier.util.IdUtil;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    private final ProductService productService;
    private final OrderRepo orderRepo;
    private final IdUtil idUtil;

    public OrderService(
            ProductService productService,
            OrderRepo orderRepo, IdUtil idUtil) {
        this.productService = productService;
        this.orderRepo = orderRepo;
        this.idUtil = idUtil;
    }

    public Order addOrder(List<String> productIds) {
        List<Product> products = new ArrayList<>();
        for (String productId : productIds) {
            Product product = productService.getSingleProduct(productId);
            products.add(product);
        }
        String orderId = idUtil.generateUUId();
        Order order = new Order(orderId, products);

        return orderRepo.save(order);
    }

    public Order getSingleOrder(String orderId) {
        return orderRepo.findById(orderId).orElseThrow(() -> new RuntimeException(orderId));
    }

    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }
}
