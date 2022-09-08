package sevice.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import sevice.app.models.Project;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Project findProjectByProjectNameAndUserLogin(String projectName, String userLogin);

    List<Project> findProjectsByUserLogin(String userLogin);

    List<Project> findProjectByProjectNameContainingIgnoreCase(@Param("text") String text);

    @Query(value = "delete from projects where project_id=:projectId", nativeQuery = true)
    @Transactional
    @Modifying
    void deleteProjectById(@Param("projectId") Long id);
}
