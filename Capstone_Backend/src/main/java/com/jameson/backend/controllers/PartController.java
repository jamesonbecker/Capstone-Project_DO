package com.jameson.backend.controllers;

import com.jameson.backend.entities.Part;
import com.jameson.backend.services.PartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
public class PartController {

    private final PartService partService;

    public PartController(PartService partService) {
        this.partService = partService;
    }

    @GetMapping
    public List<Part> getAllParts() {
        return partService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Part> getPartById(@PathVariable Long id) {
        return partService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Part createPart(@RequestBody Part part) {
        return partService.save(part);
    }

    @PutMapping("/{partId}")
    public ResponseEntity<Part> updatePart(@PathVariable Long partId, @RequestBody Part part) {
        return ResponseEntity.ok(partService.update(partId, part));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePart(@PathVariable Long id) {
        partService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
