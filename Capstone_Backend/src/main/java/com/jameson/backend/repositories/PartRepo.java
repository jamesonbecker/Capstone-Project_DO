package com.jameson.backend.repositories;

import com.jameson.backend.entities.Part;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PartRepo extends JpaRepository<Part, Long> {
}
