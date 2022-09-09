package org.capstone.my_supplier.supplier;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ProductIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    ProductRepo productRepo;

    @DirtiesContext
    @Test
    void addProduct() throws Exception {

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/supplier/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "productName":"Erdbeeren",
                                "itemNumber": "225588",
                                "description": "ddd",
                                "category": "OBST",
                                "quantity": "2",
                                "measurementUnit": "BUND"
                                }
                                """))
                .andExpect(status().isCreated())
                .andReturn();
        String content = result.getResponse().getContentAsString();
        String actualId = objectMapper.readValue(content, Product.class).productId();
        assertThat("""
                {"productId":"<ID>","productName":"Erdbeeren","itemNumber":"225588","description":"ddd","category":"OBST","quantity":"2","measurementUnit":"BUND"}""".replaceFirst("<ID>", actualId)).isEqualTo(content);
    }

    @DirtiesContext
    @Test
    void listAllProducts() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.get("/supplier/products"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    void getSingleProduct() throws Exception {
        String saveResult = mockMvc.perform(
                        post("/supplier/products")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                        "productName": "Erdbeeren",
                                        "itemNumber": "5566",
                                        "description": "Herkunft Deutschland",
                                        "category": "OBST"
                                        }
                                        """)
                ).andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Product saveProductResult = objectMapper.readValue(saveResult, Product.class);
        String productId = saveProductResult.productId();

        mockMvc.perform(MockMvcRequestBuilders.get("/supplier/products/" + productId))
                .andExpect(status().is(200))
                .andExpect(content().json("""
                        {
                            "productId": "<ID>",
                            "productName": "Erdbeeren",
                            "itemNumber": "5566",
                            "description": "Herkunft Deutschland",
                            "category": "OBST"
                        }
                        """.replaceFirst("<ID>", productId)));
    }

    @DirtiesContext
    @Test
    void editProduct() throws Exception {
        String saveResult = mockMvc.perform(
                        post("/supplier/products")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                        "productName": "Erdbeeren",
                                        "itemNumber": "5566",
                                        "description": "Herkunft Deutschland",
                                        "category": "OBST"
                                        }
                                        """)
                ).andExpect(status().isCreated())
                .andExpect(content().json("""
                        {
                        "productName": "Erdbeeren",
                        "itemNumber": "5566",
                        "description": "Herkunft Deutschland",
                        "category": "OBST"
                        }
                        """))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Product saveProductResult = objectMapper.readValue(saveResult, Product.class);
        String productId = saveProductResult.productId();

        mockMvc.perform(
                        put("/supplier/products/" + productId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                        "productId": "<ID>",
                                        "productName": "Erdbeeren",
                                        "itemNumber": "5566",
                                        "description": "neue Beschreibung",
                                        "category": "OBST"
                                        }
                                         """.replaceFirst("<ID>", productId))
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                                {
                                "productId": "<ID>",
                                "productName": "Erdbeeren",
                                "itemNumber": "5566",
                                "description": "neue Beschreibung",
                                "category": "OBST"
                                }
                        """.replaceFirst("<ID>", productId)));
    }

    @DirtiesContext
    @Test
    void deleteProduct() throws Exception {

        String saveResult = mockMvc.perform(post(
                "/supplier/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                        "productName": "Erdbeeren",
                        "itemNumber": "5566",
                        "description": "Herkunft Deutschland",
                        "Category": "OBST"
                        }
                        """)
        ).andReturn().getResponse().getContentAsString();

        Product saveProductResult = objectMapper.readValue(saveResult, Product.class);
        String productId = saveProductResult.productId();

        mockMvc.perform(delete("http://localhost:8080/supplier/products/" + productId))
                .andExpect(status().is(204));

        mockMvc.perform(get("http://localhost:8080/supplier/products"))
                .andExpect(status().is(200))
                .andExpect(content().json("""
                        []
                        """));
    }
}
