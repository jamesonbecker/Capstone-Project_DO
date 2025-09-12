package com.jameson.backend.services;

import com.jameson.backend.entities.Part;
import com.jameson.backend.repositories.PartRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Polymorphism
@Service
public class PartServiceImpl implements PartService {

    private final PartRepo partRepo;

    public PartServiceImpl(PartRepo partRepo) {
        this.partRepo = partRepo;
    }

    @Override
    public List<Part> findAll() {
        return partRepo.findAll();
    }

    @Override
    public Optional<Part> findById(Long id) {
        return partRepo.findById(id);
    }

    @Override
    public Part save(Part part) {
        return partRepo.save(part);
    }

    @Override
    public Part update(Long partId, Part updatedPart) {
        Part part = partRepo.findById(partId)
                .orElseThrow(() -> new RuntimeException("Part not found"));

        part.setSku(updatedPart.getSku());
        part.setName(updatedPart.getName());
        part.setDescription(updatedPart.getDescription());
        part.setPrice(updatedPart.getPrice());
        part.setLocation(updatedPart.getLocation());

        return partRepo.save(part);
    }

    @Override
    public void delete(Long id) {
        partRepo.deleteById(id);
    }
}
