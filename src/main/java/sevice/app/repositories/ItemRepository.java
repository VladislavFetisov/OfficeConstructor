package sevice.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import sevice.app.models.Item;

import java.util.List;
@RepositoryRestResource
public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findItemsByFloorFloorId(Long floorId);

    List<Item> findItemsByDescriptionContainingAndFloorFloorId(@Param("description") String description, Long id);

    @Query(value = "delete from items where item_id=:itemId", nativeQuery = true)
    @Transactional
    @Modifying
    void deleteItemById(@Param("itemId") Long id);
}
