package com.unip.EstablishmentsService.reviews;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unip.EstablishmentsService.establishments.Establishment;
import com.unip.EstablishmentsService.users.User;
import com.unip.EstablishmentsService.necessities.Necessity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
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


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "necessities_reviews",
            joinColumns = @JoinColumn(name = "review_id"),
            inverseJoinColumns = @JoinColumn(name = "necessity_id")
    )
    List<Necessity> necessities;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    private String comment;
    private Integer rating;



}
