package org.capstone.my_supplier.customer;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {this.orderService = orderService;}

    @PostMapping("{orderId}")
    public void addOrder(
            @PathVariable String orderId,
            @RequestBody List<String> productIds) {
        orderService.addOrder(orderId, productIds);
    }
}
