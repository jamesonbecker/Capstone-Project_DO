package com.jameson.backend.services;

import com.jameson.backend.entities.Part;

import java.util.List;
import java.util.Optional;

// Polymorphism
public interface PartService {

    List<Part> findAll();
    Optional<Part> findById(Long id);
    Part save(Part part);
    Part update(Long partId, Part part);
    void delete(Long id);
}
