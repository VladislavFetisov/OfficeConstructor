package sevice.app.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import sevice.app.models.enums.ItemType;
import sevice.app.models.enums.State;

import javax.persistence.*;

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    private Integer x;

    private Integer y;

    @Enumerated(value = EnumType.STRING)
    private ItemType itemType;

    @Enumerated(value = EnumType.STRING)
    private State state;

    private String description;

    private Integer angle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "floor_item_id")
    @JsonBackReference(value = "floor-items")
    private Floor floor;

}