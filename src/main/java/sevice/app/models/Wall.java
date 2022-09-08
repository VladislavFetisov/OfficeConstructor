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
@Table(name = "walls")
public class Wall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wallId;

    private Integer x;

    private Integer y;

    private Integer dx;

    private Integer dy;

    @Enumerated(value = EnumType.STRING)
    private State state;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "floor_wall_id")
    @JsonBackReference(value = "floor-walls")
    private Floor floor;
}