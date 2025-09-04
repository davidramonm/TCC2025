package com.unip.EstablishmentsService.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "reviews")
@Data@AllArgsConstructor@NoArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID reviewId;

    @ManyToOne
    @JoinColumn(name = "establishment_id")
    @JsonIgnore
    private Establishment establishment;


    @ManyToOne
    @JoinColumn(name = "necessity_id")
    @JsonIgnore
    private Necessity necessity;

    private Boolean attends;




}
