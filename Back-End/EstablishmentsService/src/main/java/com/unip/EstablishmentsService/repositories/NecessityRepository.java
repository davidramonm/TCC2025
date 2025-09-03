package com.unip.EstablishmentsService.repositories;

import com.unip.EstablishmentsService.models.Necessity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NecessityRepository extends JpaRepository<Necessity, UUID> {
}