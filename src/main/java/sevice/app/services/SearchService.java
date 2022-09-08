package sevice.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import sevice.app.models.*;
import sevice.app.repositories.*;
import sevice.app.trasfer.FloorDto;
import sevice.app.trasfer.ProjectDto;
import sevice.app.trasfer.SearchDto;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchService {
    final FloorRepository floorRepository;

    final BuildingRepository buildingRepository;

    final ProjectRepository projectRepository;

    final AreaRepository areaRepository;

    final ItemRepository itemRepository;

    final EmployeeRepository employeeRepository;


    @Autowired
    public SearchService(FloorRepository floorRepository, BuildingRepository buildingRepository, ProjectRepository projectRepository, AreaRepository areaRepository, ItemRepository itemRepository, EmployeeRepository employeeRepository) {
        this.floorRepository = floorRepository;
        this.buildingRepository = buildingRepository;
        this.projectRepository = projectRepository;
        this.areaRepository = areaRepository;
        this.itemRepository = itemRepository;
        this.employeeRepository = employeeRepository;
    }

    public List<ProjectDto> getListOfProjects(String text) {
        List<Project> projects = projectRepository.findProjectByProjectNameContainingIgnoreCase(text);
        List<Building> buildings = buildingRepository.findBuildingByBuildingNameContainsIgnoreCase(text);
        List<Area> areas = areaRepository.findAreasByAreaNameContainsIgnoreCase(text);

        for (Area area : areas) {
            buildings.add(area.getFloor().getBuilding());
        }

        for (Building building : buildings) {
            if (!projects.contains(building.getProject()))
                projects.add(building.getProject());
        }
        return ProjectDto.from(projects);
    }

    public List<Pair<Integer, Integer>> getPositionOfItemsAndEmployeeAndAreas(SearchDto searchDto) {
        List<Pair<Integer, Integer>> result = new ArrayList<>();

        List<Item> listOfItem =
                itemRepository.
                        findItemsByDescriptionContainingAndFloorFloorId(
                                searchDto.getText().getText(), searchDto.getFloorId());

        for (Item item : listOfItem) {
            result.add(Pair.of(item.getX(), item.getY()));
        }

        List<Employee> employeeList = employeeRepository
                .findEmployeesByPersonalDataContainingIgnoreCaseAndFloorFloorId(
                        searchDto.getText().getText(), searchDto.getFloorId());


        for (Employee employee : employeeList) {
            result.add(Pair.of(employee.getX(), employee.getY()));
        }

        List<Area> areaList = areaRepository.
                findAreasByAreaNameContainsIgnoreCaseAndFloorFloorId(
                        searchDto.getText().getText(), searchDto.getFloorId());

        for (Area area : areaList){
            result.add(Pair.of(area.getX(),area.getY()));
        }

        return result;
    }
}
