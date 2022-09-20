package sevice.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import sevice.app.models.Floor;

import java.util.List;
@RepositoryRestResource
public interface FloorRepository extends JpaRepository<Floor, Long>, JpaSpecificationExecutor<Floor> {
    Floor getFloorByFloorNumberAndBuildingBuildingId(Integer floorNumber, Long buildingId);

    List<Floor> findFloorsByBuildingBuildingId(Long buildingId);

    @Query(value = "delete from floors where floor_id=:floorId", nativeQuery = true)
    @Transactional
    @Modifying
    void deleteFloorById(@Param("floorId") Long id);

}
