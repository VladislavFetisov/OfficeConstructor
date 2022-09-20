package sevice.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import sevice.app.models.Area;

import java.util.List;
@RepositoryRestResource
public interface AreaRepository extends JpaRepository<Area, Long> {

    List<Area> findAreasByFloorFloorId(Long floorId);

    List<Area> findAreasByAreaNameContainsIgnoreCase(@Param("text") String text);

    List<Area> findAreasByAreaNameContainsIgnoreCaseAndFloorFloorId(@Param("area_name") String areaName, Long floorId);

    @Query(value = "delete from areas where area_id=:areaId", nativeQuery = true)
    @Transactional
    @Modifying
    void deleteAreaById(@Param("areaId") Long id);
}
