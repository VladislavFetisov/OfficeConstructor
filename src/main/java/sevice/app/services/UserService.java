package sevice.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sevice.app.models.Project;
import sevice.app.models.User;
import sevice.app.repositories.ProjectRepository;
import sevice.app.repositories.UsersRepository;
import sevice.app.trasfer.ProjectDto;
import sevice.app.trasfer.UserDto;

import java.util.Optional;

@Service
public class UserService {

    final ProjectRepository projectRepository;

    final UsersRepository usersRepository;

    @Autowired
    public UserService(ProjectRepository projectRepository, UsersRepository usersRepository) {
        this.projectRepository = projectRepository;
        this.usersRepository = usersRepository;
    }


    public Project saveProject(ProjectDto projectDto) {
        Project project = Project.from(projectDto);
        project.setUser(usersRepository.findOneByLogin(projectDto.getUserLogin()).get());
        return projectRepository.save(project);
    }

    public boolean deleteProject(ProjectDto projectDto) {
        Optional<Project> project = projectRepository.findById(projectDto.getProjectId());
        if (project.isPresent()) {
            projectRepository.deleteProjectById(project.get().getProjectId());
            return true;
        }
        return false;
    }
     public ProjectDto renameProject(ProjectDto projectDto){
        Project project=projectRepository.findById(projectDto.getProjectId()).get();
        project.setProjectName(projectDto.getProjectName());
        return ProjectDto.from(project);
     }
    public Project getProject(ProjectDto projectDto) {
        return projectRepository.findById(projectDto.getProjectId()).get();
    }

    public UserDto getProjects(ProjectDto projectDto) {
        User userFromDb = usersRepository.findOneByLogin(projectDto.getUserLogin()).get();
        return new UserDto(userFromDb.getRole(), ProjectDto.from(projectRepository.findAll()));
    }

}
