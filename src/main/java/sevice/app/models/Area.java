package sevice.app.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import sevice.app.models.enums.State;

import javax.persistence.*;

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "areas")
public class Area {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long areaId;

    private Integer x;

    private Integer y;

    private String areaName;

    @Enumerated(value = EnumType.STRING)
    private State state;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "floor_area_id")
    @JsonBackReference(value = "floor-areas")
    private Floor floor;
}