package org.capstone.my_supplier.supplier;

import org.springframework.data.annotation.Id;

public record Product(
        @Id
        String id,
        String productName,
        String itemNumber,
        String category
) {
}
