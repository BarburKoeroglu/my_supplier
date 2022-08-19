package org.capstone.my_supplier.supplier;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


class ProductServiceTest {

    ProductRepo productRepo = mock(ProductRepo.class);

    ProductService productService = new ProductService(productRepo);

    @Test
    void addProduct() {

        Product product = new Product(UUID.randomUUID().toString(), "Erdbeeren", "1515", "neue Ernte", Category.OBST);

        when(productRepo.save(any(Product.class)))
                .thenReturn(product);

        Product actual = productService.addProduct(new NewProduct("Erdbeeren", "1515", "neue Ernte", Category.OBST));
        Assertions.assertEquals(product, actual);
    }
}
