package com.jameson.backend.controllers;

import com.jameson.backend.dto.InventoryDto;
import com.jameson.backend.dto.Mapper;
import com.jameson.backend.entities.Inventory;
import com.jameson.backend.services.InventoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;
    private final Mapper mapper;

    public InventoryController(InventoryService inventoryService, Mapper mapper) {
        this.inventoryService = inventoryService;
        this.mapper = mapper;
    }

    @GetMapping
    public List<InventoryDto> getInventory() {
        return inventoryService.findAll()
                .stream()
                .map(mapper::inventoryToDto)
                .collect(toList());
    }

    @GetMapping("/reports/{limit}")
    public List<InventoryDto> getInventoryReports(@PathVariable int limit) {
        return inventoryService.findTopFive(limit)
                .stream()
                .map(mapper::inventoryToDto)
                .collect(toList());
    }

    @GetMapping("/products/{productId}")
    public List<Inventory> getInventoryByProductId(@PathVariable Long productId) {
        return inventoryService.findByProductId(productId);
    }

    @PostMapping("/products/{productId}")
    public Inventory addLine(@RequestBody Inventory inventory, @PathVariable Long productId) {
        return inventoryService.save(inventory, productId);
    }
}