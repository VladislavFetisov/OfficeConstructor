package sevice.app.trasfer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import sevice.app.models.Building;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuildingDto {
    Long buildingId;
    Long projectId;
    String buildingName;

    public static BuildingDto from(Building building) {
        return BuildingDto.builder()
                .buildingId(building.getBuildingId())
                .buildingName(building.getBuildingName())
                .build();
    }

    public static List<BuildingDto> from(List<Building> buildings) {
        return buildings.stream().map(BuildingDto::from).collect(Collectors.toList());
    }
}
