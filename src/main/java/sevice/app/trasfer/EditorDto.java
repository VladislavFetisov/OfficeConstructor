package sevice.app.trasfer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import sevice.app.models.Area;
import sevice.app.models.Employee;
import sevice.app.models.Item;
import sevice.app.models.Wall;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EditorDto {
    Long floorId;
    List<Item> items;
    List<Wall> walls;
    List<Area> areas;
    List<Employee> employees;

    public static EditorDto from(Long floorId, List<Item> items, List<Wall> walls, List<Area> areas, List<Employee> employees) {
        return EditorDto.builder()
                .floorId(floorId)
                .items(items)
                .walls(walls)
                .areas(areas)
                .employees(employees)
                .build();
    }
}
