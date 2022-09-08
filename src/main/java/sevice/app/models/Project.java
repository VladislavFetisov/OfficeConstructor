package sevice.app.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import sevice.app.trasfer.ProjectDto;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@Table(name = "projects")
@NoArgsConstructor
@Builder
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
@EqualsAndHashCode(exclude = {"buildings"})
@ToString(exclude = {"buildings"})
public class Project  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;

    private String projectName;


    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL )
    @JsonManagedReference(value = "project-buildings")
    private Set<Building> buildings;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference(value = "user-projects")
    private User user;

    public static Project from(ProjectDto projectDto){
        return  Project.builder()
                .projectName(projectDto.getProjectName())
                .build();
    }
}
