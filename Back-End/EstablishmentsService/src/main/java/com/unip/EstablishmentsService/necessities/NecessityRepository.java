package com.unip.EstablishmentsService.necessities;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NecessityRepository extends JpaRepository<Necessity, UUID> {
}