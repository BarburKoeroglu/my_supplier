package org.capstone.my_supplier.supplier;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/supplier/products")
public class ProductController {

    private final ProductService productService;

    ProductController(ProductService productService){
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody NewProduct newProduct){
        Product savedProduct = productService.addProduct(newProduct);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedProduct);
    }

    @GetMapping
    public List<Product> listAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{productId}")
    public Product getSingleProduct(@PathVariable String productId) {
        return productService.getSingleProduct(productId);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<Product> updatedProduct(
            @PathVariable String productId,
            @RequestBody Product product) {
        Product updatedProductDetails = productService.editProduct(product);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(updatedProductDetails);
    }

    @DeleteMapping("{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String productId) {
        boolean deleteSucceeded = productService.deleteProduct(productId);
        return new ResponseEntity<>(deleteSucceeded ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND);
    }
}
