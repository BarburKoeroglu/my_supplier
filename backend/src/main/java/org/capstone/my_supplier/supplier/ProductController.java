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
    public List<Product> listAllProducts(){
        return productService.getAllProducts();
    }

    @PutMapping("/supplier/products/{id}")
    public ResponseEntity<Product> updatedProduct(
            @PathVariable String id,
            @RequestBody Product updatedProduct) {
        Product updatedProductDetails = productService.editProduct(updatedProduct);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(updatedProductDetails);
    }


    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        boolean deleteSucceeded = productService.deleteProduct(id);
        return new ResponseEntity<>(deleteSucceeded ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND);
    }
}
