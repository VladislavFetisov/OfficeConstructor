package sevice.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import sevice.app.models.Building;

import java.util.List;

public interface BuildingRepository extends JpaRepository<Building, Long> {
    Building getBuildingByBuildingNameAndProjectProjectId(String buildingName, Long projectId);

    List<Building> getBuildingsByProjectProjectId(Long projectId);


    List<Building> findBuildingByBuildingNameContainsIgnoreCase(@Param("text") String text);

    @Query(value = "delete from buildings where building_id=:buildingId", nativeQuery = true)
    @Transactional
    @Modifying
    void deleteBuildingById(@Param("buildingId") Long id);



}
