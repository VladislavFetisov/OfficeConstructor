package sevice.app.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import sevice.app.trasfer.BuildingDto;
import sevice.app.trasfer.ProjectDto;

import javax.persistence.*;
import java.util.Set;

@Data
@DynamicInsert
@DynamicUpdate
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "buildings")
@EqualsAndHashCode(exclude = {"floors"})
@ToString(exclude = {"floors"})
public class Building  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long buildingId;

    private String buildingName;


    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "project_id")
    @JsonBackReference(value = "project-buildings")
    private Project project;

    @OneToMany(mappedBy = "building", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    @JsonManagedReference(value = "building-floors")
    private Set<Floor> floors;

    public static Building from(BuildingDto buildingDto){
        return  Building.builder()
                .buildingName(buildingDto.getBuildingName())
                .build();
    }
}