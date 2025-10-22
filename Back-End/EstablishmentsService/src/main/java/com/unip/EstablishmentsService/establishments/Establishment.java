package com.unip.EstablishmentsService.establishments;


import com.unip.EstablishmentsService.reviews.Review;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
    @NotNull
    private Double xCoords;
    @NotNull
    private Double yCoords;

    @OneToMany(mappedBy = "establishment")
    private List<Review> reviewList;


    public Establishment(UUID establishmentId){
        this.establishmentId = establishmentId;
    }


}

