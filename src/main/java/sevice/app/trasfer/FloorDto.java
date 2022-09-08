package sevice.app.trasfer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import sevice.app.models.Floor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FloorDto {
    Long floorId;
    Long buildingId;
    Integer floorNumber;

    public static FloorDto from(Floor floor) {
        return FloorDto.builder()
                .floorId(floor.getFloorId())
                .floorNumber(floor.getFloorNumber())
                .build();
    }

    public static List<FloorDto> from(List<Floor> floors) {
        return floors.stream().map(FloorDto::from).collect(Collectors.toList());
    }
}
