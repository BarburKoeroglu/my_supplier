package org.capstone.my_supplier.customer;

import org.capstone.my_supplier.supplier.*;
import org.capstone.my_supplier.util.IdUtil;
import org.junit.jupiter.api.Test;
import org.mockito.internal.matchers.Or;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
class OrderServiceTest {

    ProductService productService = mock(ProductService.class);
    OrderRepo orderRepo = mock(OrderRepo.class);
    IdUtil idUtil = mock(IdUtil.class);
    OrderService orderService = new OrderService(productService, orderRepo, idUtil);

    @Test
    void addOrder() {
        //given

        Product product1 = new Product("1a44", "Mandarine", "4488", "Beschreibung", Category.OBST, "20", MeasurementUnit.KG);
        Product product2 = new Product("1a33", "Zitrone", "3366", "Beschreibung", Category.OBST, "4", MeasurementUnit.STUECK);

        when(idUtil.generateUUId()).thenReturn("999");
        when(orderRepo.save(new Order("999", List.of(product1, product2)))).thenReturn(new Order("999", List.of(product1, product2)));
        when(productService.getSingleProduct("1a33")).thenReturn(product2);
        when(productService.getSingleProduct("1a44")).thenReturn(product1);

        //when
        Order order = orderService.addOrder(List.of("1a44", "1a33"));

        //then
        verify(orderRepo).save(new Order(
                "999",
                List.of(product1, product2)
        ));
    }

    @Test
    void getAllOrders() {

        Product product1 = new Product("1a22", "Mandarine", "2244", "Beschreibung", Category.OBST, "20", MeasurementUnit.KG);
        Product product2 = new Product("1a33", "Zitrone", "3366", "Beschreibung", Category.OBST, "4", MeasurementUnit.STUECK);
        Product product3 = new Product("1a44", "Erdbeeren", "4488", "Beschreibung", Category.OBST, "8", MeasurementUnit.KISTE);

        List<Order> orders = List.of(
                new Order("8825", (List.of(product1, product3))),
                new Order("8826", (List.of(product2, product3))),
                new Order("8827", (List.of(product1, product2, product3)))
        );

        OrderRepo orderRepo = mock(OrderRepo.class);
        when(orderRepo.findAll()).thenReturn(orders);
        OrderService orderService = new OrderService(productService, orderRepo, idUtil);

        List<Order> actualResult = orderService.getAllOrders();
        List<Order> expectedResult = List.of(
                new Order("8825", (List.of(product1, product3))),
                new Order("8826", (List.of(product2, product3))),
                new Order("8827", (List.of(product1, product2, product3)))
        );

        assertThat(actualResult).isEqualTo(expectedResult);
    }

    @Test
    void editOrder() {
        Product product1 = new Product("122", "Mango", "2288", "Beschreibung1", Category.OBST, "4", MeasurementUnit.KISTE);
        Product product2 = new Product("133", "Kiwi", "3399", "Beschreibung2", Category.OBST, "8", MeasurementUnit.KG);
        Product product3 = new Product("14", "Möhren", "4411", "Beschreibung3", Category.OBST, "5", MeasurementUnit.STUECK);

        Order order = new Order("6789", (List.of(product1, product2)));

        OrderRepo orderRepo = mock(OrderRepo.class);
        when(orderRepo.existsById(order.orderId())).thenReturn(true);

        when(orderRepo.save(order))
                .thenReturn(order);

        OrderService orderService = new OrderService(productService, orderRepo, idUtil);
        Order updatedOrder = new Order("6789", (List.of(product1, product3)));
        Order actualOrderResult = orderService.editOrder(updatedOrder);

        assertThat(actualOrderResult).isEqualTo(updatedOrder);
    }

    @Test
    void deleteOrder() {
        Product product1 = new Product("122", "Mango", "2288", "Beschreibung1", Category.OBST, "4", MeasurementUnit.KISTE);
        Product product2 = new Product("133", "Kiwi", "3399", "Beschreibung2", Category.OBST, "8", MeasurementUnit.KG);

        Order order = new Order("6789", (List.of(product1, product2)));

        OrderRepo orderRepo = mock(OrderRepo.class);
        when(orderRepo.existsById(order.orderId())).thenReturn(true);

        doNothing().when(orderRepo).deleteById(order.orderId());

        OrderService orderService = new OrderService(productService, orderRepo, idUtil);

        orderService.deleteOrder(order.orderId());
        verify(orderRepo).deleteById(order.orderId());
    }
}
