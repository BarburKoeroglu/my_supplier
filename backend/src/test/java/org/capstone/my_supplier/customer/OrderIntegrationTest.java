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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
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
        MvcResult result = mockMvc.perform(post("/customer/orders")
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

    @DirtiesContext
    @Test
    void listAllOrders() throws Exception {
        mockMvc.perform(get("/customer/orders"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @DirtiesContext
    @Test
    void getSingleOrder() throws Exception {

        Product product1 = new Product("2255", "Name1", "5588", "ddd", Category.OBST, "2", MeasurementUnit.BUND);
        Product product2 = new Product("2366", "Name2", "6699", "xxx", Category.KRAEUTER, "5", MeasurementUnit.STUECK);
        Product product3 = new Product("2477", "Name3", "7711", "yyy", Category.TROCKENSORTIMENT, "12", MeasurementUnit.KISTE);

        productRepo.save(product1);
        productRepo.save(product2);
        productRepo.save(product3);

        MvcResult orderResult = mockMvc.perform(
                        post("/customer/orders")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        ["2255", "2366", "2477"]
                                        """))
                .andExpect(status().isCreated())
                .andReturn();

        String content = orderResult.getResponse().getContentAsString();
        String orderId = objectMapper.readValue(content, Order.class).orderId();
        System.out.println(orderId);

        mockMvc.perform(get("/customer/orders/" + orderId))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"orderId":"<ID>","products":[{"productId":"2255","productName":"Name1","itemNumber":"5588","description":"ddd","category":"OBST","quantity":"2","measurementUnit":"BUND"},
                        {"productId":"2366","productName":"Name2","itemNumber":"6699","description":"xxx","category":"KRAEUTER","quantity":"5","measurementUnit":"STUECK"},
                        {"productId":"2477","productName":"Name3","itemNumber":"7711","description":"yyy","category":"TROCKENSORTIMENT","quantity":"12","measurementUnit":"KISTE"}]}
                        """.replaceFirst("<ID>", orderId)));
    }

    @DirtiesContext
    @Test
    void editOrder() throws Exception {
        Product product1 = new Product("2211", "Name1", "5588", "ddd", Category.OBST, "2", MeasurementUnit.BUND);
        Product product2 = new Product("3322", "Name2", "6699", "xxx", Category.KRAEUTER, "5", MeasurementUnit.STUECK);
        Product product3 = new Product("4433", "Name3", "7711", "yyy", Category.TROCKENSORTIMENT, "12", MeasurementUnit.KISTE);

        productRepo.save(product1);
        productRepo.save(product2);
        productRepo.save(product3);

        MvcResult orderResult = mockMvc.perform(
                        post("/customer/orders")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        ["2211", "3322", "4433"]
                                        """))
                .andExpect(status().isCreated())
                .andReturn();

        String content = orderResult.getResponse().getContentAsString();
        String orderId = objectMapper.readValue(content, Order.class).orderId();

        mockMvc.perform(put("/customer/orders/" + orderId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"orderId":"<ID>","products":[{"productId":"2211","productName":"Name1","itemNumber":"5588","description":"ddd","category":"OBST","quantity":"2","measurementUnit":"BUND"},
                                {"productId":"3322","productName":"Name2","itemNumber":"6699","description":"xxx","category":"KRAEUTER","quantity":"5","measurementUnit":"STUECK"},
                                {"productId":"4433","productName":"Name3","itemNumber":"7711","description":"yyy","category":"TROCKENSORTIMENT","quantity":"12","measurementUnit":"KISTE"}]}
                                """.replaceFirst("<ID>", orderId))
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"orderId":"<ID>","products":[{"productId":"2211","productName":"Name1","itemNumber":"5588","description":"ddd","category":"OBST","quantity":"2","measurementUnit":"BUND"},
                        {"productId":"3322","productName":"Name2","itemNumber":"6699","description":"xxx","category":"KRAEUTER","quantity":"5","measurementUnit":"STUECK"},
                        {"productId":"4433","productName":"Name3","itemNumber":"7711","description":"yyy","category":"TROCKENSORTIMENT","quantity":"12","measurementUnit":"KISTE"}]}
                        """.replaceFirst("<ID>", orderId)));
    }

    @DirtiesContext
    @Test
    void deleteOrder() throws Exception {
        Product product1 = new Product("111", "Name1", "5588", "ddd", Category.OBST, "2", MeasurementUnit.BUND);
        Product product2 = new Product("222", "Name2", "6699", "xxx", Category.KRAEUTER, "5", MeasurementUnit.STUECK);
        Product product3 = new Product("333", "Name3", "7711", "yyy", Category.TROCKENSORTIMENT, "12", MeasurementUnit.KISTE);

        productRepo.save(product1);
        productRepo.save(product2);
        productRepo.save(product3);

        MvcResult orderResult = mockMvc.perform(
                        post("/customer/orders")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        ["111", "222", "333"]
                                        """))
                .andExpect(status().isCreated())
                .andReturn();

        String content = orderResult.getResponse().getContentAsString();
        String orderId = objectMapper.readValue(content, Order.class).orderId();

        mockMvc.perform(delete("http://localhost:8080/customer/orders/" + orderId))
                .andExpect(status().is(204));
    }
}
