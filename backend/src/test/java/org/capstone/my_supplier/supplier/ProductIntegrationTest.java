package org.capstone.my_supplier.supplier;

import com.fasterxml.jackson.databind.ObjectMapper;
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

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ProductIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @DirtiesContext
    @Test
    void addProduct() throws Exception{

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/supplier/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {"productName":"Erdbeeren"}
                        """))
                .andExpect(status().is(201))
                .andReturn();
        String content = result.getResponse().getContentAsString();
        Assertions.assertTrue(content.contains("Erdbeeren"));
    }
}
