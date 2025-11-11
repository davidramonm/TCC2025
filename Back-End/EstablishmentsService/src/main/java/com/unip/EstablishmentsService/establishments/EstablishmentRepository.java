package com.unip.EstablishmentsService.establishments;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EstablishmentRepository extends JpaRepository<Establishment, UUID> {

    List<Establishment> findByNameContainingIgnoreCaseOrAddressContainingIgnoreCase(String name, String address);

    Optional<Establishment> findByNameAndAddress(String name, String address);
}
