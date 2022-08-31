package org.capstone.my_supplier.supplier;

import jdk.jfr.Description;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
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


    @Test
    void getAllProducts(){
        List<Product> products = List.of(
                new Product("1122", "Mango", "3344", "Flugmango", Category.OBST),
                new Product("1133", "Broccoli", "3355", "Spargelbroccoli", Category.GEMUESE),
                new Product("1144", "Kirschen", "3366", "Knubber", Category.OBST),
                new Product("1155", "Tomaten", "3377", "San Marzano", Category.GEMUESE)
        );
        ProductRepo productRepo = mock(ProductRepo.class);
        when(productRepo.findAll()).thenReturn(products);

        ProductService productService = new ProductService(productRepo);

        List<Product> actualResult = productService.getAllProducts();
        List<Product> expectedResult = List.of(
                new Product("1122", "Mango", "3344", "Flugmango", Category.OBST),
                new Product("1133", "Broccoli", "3355", "Spargelbroccoli", Category.GEMUESE),
                new Product("1144", "Kirschen", "3366", "Knubber", Category.OBST),
                new Product("1155", "Tomaten", "3377", "San Marzano", Category.GEMUESE)
        );

        assertThat(actualResult).hasSameElementsAs(expectedResult);

    }

    @Test
    void editProduct() {
        Product product = new Product("1122", "Mango", "3344", "Flugmango", Category.OBST);

        ProductRepo productRepo = mock(ProductRepo.class);
        when(productRepo.existsById(product.id())).thenReturn(true);

        when(productRepo.save(any(Product.class)))
                .thenReturn(product);

        ProductService productService = new ProductService(productRepo);
        Product actualResult = productService.editProduct(product);

        assertThat(actualResult).isEqualTo(product);
    }

    @Test
    void deleteProduct() {
        Product product = new Product("8899 ", "Oregano", "6868", "Bio", Category.KRAEUTER);

        ProductRepo productRepo = mock(ProductRepo.class);
        when(productRepo.existsById(product.id())).thenReturn(true);

        doNothing().when(productRepo).deleteById(product.id());

        ProductService productService = new ProductService(productRepo);

        productService.deleteProduct(product.id());
        verify(productRepo).deleteById(product.id());
    }
}
