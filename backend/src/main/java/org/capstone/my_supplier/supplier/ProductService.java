package org.capstone.my_supplier.supplier;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProductService {

    private final ProductRepo productRepo;

    ProductService(ProductRepo productRepo){
        this.productRepo = productRepo;
    }

    public Product addProduct(NewProduct newProduct) {
        return productRepo.save(new Product(
                UUID.randomUUID().toString(),
                newProduct.productName(),
                newProduct.itemNumber(),
                newProduct.description(),
                newProduct.category()
        ));
    }

    public List<Product> getAllProducts(){
        return productRepo.findAll();
    }

    public Product editProduct(Product updatedProduct){

        productRepo.deleteById(updatedProduct.id());
        productRepo.save(updatedProduct);

        return updatedProduct;

    }

    public boolean deleteProduct(String id) {
        if (productRepo.existsById(id)) {
            productRepo.deleteById(id);
            return true;
        }
        return false;
    }
}
