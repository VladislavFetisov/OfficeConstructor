package sevice.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sevice.app.models.Floor;
import sevice.app.repositories.BuildingRepository;
import sevice.app.repositories.FloorRepository;
import sevice.app.trasfer.FloorDto;

import java.util.List;
import java.util.Optional;

@Service
public class BuildingService {
    final
    FloorRepository floorRepository;

    final
    BuildingRepository buildingRepository;

    @Autowired
    public BuildingService(FloorRepository floorRepository,
                           BuildingRepository buildingRepository) {
        this.floorRepository = floorRepository;
        this.buildingRepository = buildingRepository;
    }

    public Floor saveFloor(FloorDto floorDto) {
        if (floorRepository.getFloorByFloorNumberAndBuildingBuildingId
                (floorDto.getFloorNumber(), floorDto.getBuildingId()) == null) {
            Floor floor = Floor.from(floorDto);
            floor.setBuilding(buildingRepository.findById(floorDto.getBuildingId()).get());
            return floorRepository.save(floor);
        }
        throw new IllegalArgumentException("Такой этаж уже есть");

    }

    public boolean deleteFloor(FloorDto floorDto) {
        Optional<Floor> floor = floorRepository.findById(floorDto.getFloorId());
        if (floor.isPresent()) {
            floorRepository.deleteFloorById(floor.get().getFloorId());
            return true;
        }
        return false;
    }

    public Floor getFloor(FloorDto floorDto) {
        return floorRepository.findById(floorDto.getFloorId()).get();
    }

    public List<FloorDto> getFloors(FloorDto floorDto) {
        return FloorDto.from(floorRepository.findFloorsByBuildingBuildingId(floorDto.getBuildingId()));
    }
}
