package org.capstone.my_supplier.customer;

import org.capstone.my_supplier.supplier.Category;
import org.capstone.my_supplier.supplier.MeasurementUnit;
import org.capstone.my_supplier.supplier.Product;
import org.capstone.my_supplier.supplier.ProductService;
import org.capstone.my_supplier.util.IdUtil;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

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
}
