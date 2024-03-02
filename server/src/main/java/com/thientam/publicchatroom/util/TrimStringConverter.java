package com.thientam.publicchatroom.util;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class TrimStringConverter implements AttributeConverter<String, String> {

    @Override
    public String convertToDatabaseColumn(String s) {
        if (s == null) {
            return null;
        }
        return s.trim();
    }

    @Override
    public String convertToEntityAttribute(String s) {
        return s;
    }

}
