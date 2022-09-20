package sevice.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import sevice.app.models.Wall;

import java.util.List;
@RepositoryRestResource
public interface WallRepository extends JpaRepository<Wall, Long> {


    List<Wall> findWallsByFloorFloorId(Long floorId);

    @Query(value = "delete from walls where wall_id=:wallId", nativeQuery = true)
    @Transactional
    @Modifying
    void deleteWallById(@Param("wallId") Long id);
}
