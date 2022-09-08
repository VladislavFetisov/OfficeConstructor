package sevice.app.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import sevice.app.models.enums.Role;
import sevice.app.models.enums.State;

import javax.persistence.*;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
@EqualsAndHashCode(exclude = {"projects"})
@ToString(exclude = {"projects"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String firstName;

    private String lastName;


    private String login;

    private String password;

    @Enumerated(value = EnumType.STRING)
    private Role role;
    @Enumerated(value = EnumType.STRING)
    private State state;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    @JsonManagedReference(value = "user-projects")
    private Set<Project> projects;
}