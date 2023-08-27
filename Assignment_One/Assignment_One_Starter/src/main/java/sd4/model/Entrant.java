package sd4.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
public class Entrant implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotNull
    @Min(0)
    @Column(name="venue_ID")
    private Integer venueID;

    @NotBlank(message = "{logoNotBlank}")
    private String logo;

    @NotBlank(message = "{hostCityNotBlank}")
    @Size(min = 3,message="{hostCityMin}")
    @Column(name="host_City")
    private String hostCity;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    @Column(name="date_Of_Final")
    private Date dateOfFinal;

    @NotBlank(message = "{hostCountryNotBlank}")
    @Size(min = 3,message="{hostCountryMin}")
    @Column(name="hostCountry")
    private String hostCountry;

    @NotBlank(message = "{sectionNotBlank}")
    @Size(min = 3,message="{sectionMin}")
    private String section;
    @NotBlank(message = "Artist cannot be empty")
    @Size(min = 3,message="{artistMin}")
    private String artist;
    @NotBlank(message = "Song cannot be empty")
    @Size(min = 3,message="{songMin}")
    private String song;

    @NotBlank(message = "{artistCountryNotBlank}")
    @Column(name="artist_Country")
    private String artistCountry;

    @NotBlank(message = "{runningOrderNotBlank}")
    @Column(name="running_Order")
    private String runningOrder;

    @Column(name="total_Points")
    @NotNull
    @Min(0)
    private Integer totalPoints;

    @NotBlank(message = "{rankNotBlank}")
    private String rank;
    @NotBlank(message = "{qualifiedNotBlank}")
    private String qualified;
}