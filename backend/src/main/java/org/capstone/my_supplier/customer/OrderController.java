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

    @GetMapping
    public List<Order> listAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{orderId}")
    public Order getSingleOrder(@PathVariable String orderId) {
        return orderService.getSingleOrder(orderId);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<Order> updatedOrder(@PathVariable String orderId,
                                              @RequestBody Order order) {
        Order updatedOrderDetails = orderService.editOrder(order);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(updatedOrderDetails);
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String orderId) {
        boolean deleteOrderSucceeded = orderService.deleteOrder(orderId);
        return new ResponseEntity<>(deleteOrderSucceeded ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND);
    }
}
