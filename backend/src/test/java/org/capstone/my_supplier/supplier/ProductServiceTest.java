package org.capstone.my_supplier.supplier;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.data.mongodb.core.aggregation.ConditionalOperators.Cond.when;

class ProductServiceTest {

    private final ProductRepo productRepo = mock(ProductRepo.class);

    private final ProductService productService = new ProductService(productRepo);

    @Test
    void addProduct() {
        NewProduct newProduct = new NewProduct("Erdbeeren", "1515", "neue Ernte", Category.OBST);
        Product product = new Product("12", "Erdbeeren", "1515", "neue Ernte", Category.OBST);

        when(productRepo.save(newProduct)).
                thenReturn(product);

        Product actual = productService.addProduct(new NewProduct("Erdbeeren", "1515", "neue Ernte", Category.OBST));

        Assertions.assertEquals(product, actual);
    }
}