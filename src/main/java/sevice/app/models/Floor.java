
package sevice.app.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import sevice.app.trasfer.FloorDto;

import javax.persistence.*;
import java.util.Set;

@Data
@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "floors")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"items", "areas", "walls", "employees"})
@ToString(exclude = {"items", "areas", "walls","employees"})
public class Floor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long floorId;

    private Integer floorNumber;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "building_id")
    @JsonBackReference(value = "building-floors")
    private Building building;

    @OneToMany(mappedBy = "floor", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    @JsonManagedReference(value = "floor-items")
    private Set<Item> items;

    @OneToMany(mappedBy = "floor", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    @JsonManagedReference(value = "floor-areas")
    private Set<Area> areas;

    @OneToMany(mappedBy = "floor", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    @JsonManagedReference(value = "floor-walls")
    private Set<Wall> walls;

    @OneToMany(mappedBy = "floor", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    @JsonManagedReference(value = "floor-employees")
    private Set<Employee> employees;


    public static Floor from(FloorDto floorDto) {
        return Floor.builder()
                .floorNumber(floorDto.getFloorNumber())
                .build();
    }
}