package org.capstone.my_supplier.supplier;

import org.springframework.data.annotation.Id;

public record Product(
        @Id
        String productId,
        String productName,
        String itemNumber,
        String description,
        Category category
) {
}
