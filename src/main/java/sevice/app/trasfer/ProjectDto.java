package sevice.app.trasfer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import sevice.app.models.Project;
import sevice.app.models.enums.Role;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {
    Long projectId;
    String projectName;
    String userLogin;

    public static ProjectDto from(Project project) {
        return ProjectDto.builder()
                .projectId(project.getProjectId())
                .projectName(project.getProjectName())
                .build();
    }

    public static List<ProjectDto> from(List<Project> projects) {
        return projects.stream().map(ProjectDto::from).collect(Collectors.toList());
    }
}
