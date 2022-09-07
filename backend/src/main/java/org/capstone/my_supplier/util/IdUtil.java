package org.capstone.my_supplier.util;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class IdUtil {
    public String generateUUId() {
        return UUID.randomUUID().toString();
    }
}
