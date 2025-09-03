package com.unip.EstablishmentsService.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;


@Entity
@Table(name = "necessities")
@Data@AllArgsConstructor@NoArgsConstructor
public class Necessity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID necessityId;

    private String name;
    private String description;
    private String nGroup;


}
