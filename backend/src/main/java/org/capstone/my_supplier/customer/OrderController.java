package org.capstone.my_supplier.customer;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping()
    public ResponseEntity<Order> addOrder(@RequestBody List<String> productIds) {
        Order savedOrder = orderService.addOrder(productIds);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedOrder);
    }
}
