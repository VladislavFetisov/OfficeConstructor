package sevice.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sevice.app.models.*;
import sevice.app.repositories.BuildingRepository;
import sevice.app.repositories.FloorRepository;
import sevice.app.repositories.ProjectRepository;
import sevice.app.trasfer.BuildingDto;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    final BuildingRepository buildingRepository;

    final ProjectRepository projectRepository;

    final FloorRepository floorRepository;

    @Autowired
    public ProjectService(BuildingRepository buildingRepository,
                          ProjectRepository projectRepository,
                          FloorRepository floorRepository) {
        this.buildingRepository = buildingRepository;
        this.projectRepository = projectRepository;
        this.floorRepository = floorRepository;
    }

    public Building saveBuilding(BuildingDto buildingDto) {
        if (buildingRepository.getBuildingByBuildingNameAndProjectProjectId
                (buildingDto.getBuildingName(), buildingDto.getProjectId()) == null) {
            Building building = Building.from(buildingDto);
            building.setProject(projectRepository.findById(buildingDto.getProjectId()).get());
            Building building1 = buildingRepository.save(building);
            Floor floor = new Floor();
            floor.setBuilding(building1);
            floor.setFloorNumber(1);
            building1.setFloors(Collections.singleton(floorRepository.save(floor)));
            return building1;
        }
        throw new IllegalArgumentException("Такое здание уже есть в базе данных");
    }

    public Building getBuilding(BuildingDto buildingDto) {
        return buildingRepository.findById(buildingDto.getBuildingId()).get();
    }
    public BuildingDto renameBuilding(BuildingDto buildingDto){
       Building building= buildingRepository.findById(buildingDto.getBuildingId()).get();
       building.setBuildingName(buildingDto.getBuildingName());
       return BuildingDto.from(building);
    }

    public List<BuildingDto> getBuildings(BuildingDto buildingDto) {
        return BuildingDto.from(buildingRepository.getBuildingsByProjectProjectId(buildingDto.getProjectId()));
    }

    public boolean deleteBuilding(BuildingDto buildingDto) {
        Optional<Building> building = buildingRepository.findById(buildingDto.getBuildingId());
        if (building.isPresent()) {
            buildingRepository.deleteBuildingById(building.get().getBuildingId());
            return true;
        }
        return false;
    }
}
