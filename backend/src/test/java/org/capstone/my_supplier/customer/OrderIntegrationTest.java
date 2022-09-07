package org.capstone.my_supplier.customer;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.capstone.my_supplier.supplier.Category;
import org.capstone.my_supplier.supplier.MeasurementUnit;
import org.capstone.my_supplier.supplier.Product;
import org.capstone.my_supplier.supplier.ProductRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class OrderIntegrationTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    ProductRepo productRepo;

    @DirtiesContext
    @Test
    void addOrder() throws Exception {

        Product product1 = new Product("22", "PName", "225588", "ddd", Category.OBST, "2", MeasurementUnit.BUND);
        Product product2 = new Product("23", "PName2", "225599", "ddd", Category.KRAEUTER, "2", MeasurementUnit.BUND);

        productRepo.save(product1);
        productRepo.save(product2);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/customer/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                ["22", "23"]
                                """))
                .andExpect(status().is(201))
                .andReturn();
        String content = result.getResponse().getContentAsString();
        String actualId = objectMapper.readValue(content, Order.class).orderId();
        Assertions.assertEquals("""
                {"orderId":"<ID>","products":[{"productId":"22","productName":"PName","itemNumber":"225588","description":"ddd","category":"OBST","quantity":"2","measurementUnit":"BUND"},{"productId":"23","productName":"PName2","itemNumber":"225599","description":"ddd","category":"KRAEUTER","quantity":"2","measurementUnit":"BUND"}]}""".replaceFirst("<ID>", actualId), content);
    }
}
