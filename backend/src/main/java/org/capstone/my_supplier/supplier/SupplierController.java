package org.capstone.my_supplier.supplier;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SupplierController {
    @GetMapping("/api/supplier")
    String showSupplier(){
        return "Supplier One";
    }
}
