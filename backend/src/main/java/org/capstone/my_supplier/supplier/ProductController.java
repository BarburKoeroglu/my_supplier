package org.capstone.my_supplier.supplier;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/supplier/products")
public class ProductController {

    private final ProductService productService;

    ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody NewProduct newProduct){
        Product savedProduct = productService.addProduct(newProduct);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedProduct);
    }
}
