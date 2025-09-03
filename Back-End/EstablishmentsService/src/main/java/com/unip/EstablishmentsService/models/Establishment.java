package com.unip.EstablishmentsService.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "establishments")
@Data@AllArgsConstructor@NoArgsConstructor
public class Establishment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID establishmentId;

    private String name;
    private String address;
    private Double xCoords;
    private Double yCoords;

    @OneToMany(mappedBy = "establishment")
    private List<Review> reviewList;




}

