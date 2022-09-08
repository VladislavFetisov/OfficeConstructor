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
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employeeId;

    private Integer x;

    private Integer y;

    private String personalData;

    private String post;

    private String phoneNumber;

    @Enumerated(value = EnumType.STRING)
    private State state;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "floor_employee_id")
    @JsonBackReference(value = "floor-employees")
    private Floor floor;

}
