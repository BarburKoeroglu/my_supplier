package org.capstone.my_supplier.customer;

import org.capstone.my_supplier.supplier.Category;
import org.capstone.my_supplier.supplier.MeasurementUnit;
import org.capstone.my_supplier.supplier.Product;
import org.capstone.my_supplier.supplier.ProductService;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.mockito.Mockito.*;

class OrderServiceTest {

    @Test
    void addOrder() {
        //given
        ProductService productService = mock(ProductService.class);
        OrderRepo orderRepo = mock(OrderRepo.class);
        OrderService orderService = new OrderService(productService, orderRepo);
        when(productService.getSingleProduct("1a22")).thenReturn(new Product("1a22", "Apfel", "2255", "Beschreibung", Category.OBST, "5", MeasurementUnit.KG));
        when(productService.getSingleProduct("1a33")).thenReturn(new Product("1a33", "Zitrone", "3366", "Beschreibung", Category.OBST, "4", MeasurementUnit.STUECK));
        when(productService.getSingleProduct("1a44")).thenReturn(new Product("1a44", "Mandarine", "4488", "Beschreibung", Category.OBST, "20", MeasurementUnit.KG));

        //when
        orderService.addOrder("106", List.of("1a22", "1a33", "1a44"));

        //then
        verify(orderRepo).addOrder(new Order(
                "106",
                List.of(
                        new Product("1a22", "Apfel", "2255", "Beschreibung", Category.OBST, "5", MeasurementUnit.KG),
                        new Product("1a33", "Zitrone", "3366", "Beschreibung", Category.OBST, "4", MeasurementUnit.STUECK),
                        new Product("1a44", "Mandarine", "4488", "Beschreibung", Category.OBST, "20", MeasurementUnit.KG)
                )
        ));
    }
}