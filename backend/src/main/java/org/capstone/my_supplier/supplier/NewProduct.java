package org.capstone.my_supplier.supplier;

import org.capstone.my_supplier.customer.MeasurementUnit;

public record NewProduct (String productName, String itemNumber, String description, Category category, String quantity,
                          MeasurementUnit measurementUnit){
}
