package sevice.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import sevice.app.models.Building;
import sevice.app.models.Floor;
import sevice.app.models.Project;
import sevice.app.models.Text;
import sevice.app.services.*;
import sevice.app.trasfer.*;

import java.util.List;

@RestController
@RequestMapping(value = "/main")
public class ObjectsController {

    final UserService userService;

    final ProjectService projectService;

    final BuildingService buildingService;

    final EditorService editorService;

    final SearchService searchService;



    @Autowired
    public ObjectsController(UserService userService,
                             ProjectService projectService,
                             BuildingService buildingService,
                             EditorService editorService,
                             SearchService searchService) {
        this.userService = userService;
        this.projectService = projectService;
        this.buildingService = buildingService;
        this.editorService = editorService;
        this.searchService = searchService;
    }

    @PostMapping("/saveProject")
    @Transactional
    public Project saveProject(@RequestBody ProjectDto projectDto) {
        return userService.saveProject(projectDto);
    }

    @DeleteMapping("/project")
    @Transactional
    public boolean deleteProject(@RequestBody ProjectDto projectDto) {
        return userService.deleteProject(projectDto);
    }

    @PostMapping("/project")
    public Project getProject(@RequestBody ProjectDto projectDto) {
        return userService.getProject(projectDto);
    }

    @PostMapping("/projects")
    public UserDto getProjects(@RequestBody ProjectDto projectDto) {
        return userService.getProjects(projectDto);
    }

    @PostMapping("/renameProject")
    @Transactional
    public ProjectDto renameProject(@RequestBody ProjectDto projectDto) {
        return userService.renameProject(projectDto);
    }
    @PostMapping("/search")
    public List<ProjectDto> findListOfProjects(@RequestBody Text text) {
        return searchService.getListOfProjects(text.getText());
    }
    @PostMapping("/searchInFloor")
    public List<Pair<Integer,Integer>> findListOfProjects(@RequestBody SearchDto searchDto) {
        return searchService.getPositionOfItemsAndEmployeeAndAreas(searchDto);
    }

    @PostMapping("/saveBuilding")
    @Transactional
    public Building saveBuilding(@RequestBody BuildingDto buildingDto) {
        return projectService.saveBuilding(buildingDto);
    }
    @PostMapping("/renameBuilding")
    @Transactional
    public BuildingDto renameBuilding(@RequestBody BuildingDto buildingDto) {
        return projectService.renameBuilding(buildingDto);
    }

    @DeleteMapping("/building")
    @Transactional
    public boolean deleteBuilding(@RequestBody BuildingDto buildingDto) {
        return projectService.deleteBuilding(buildingDto);
    }

    @PostMapping("/building")
    public Building getBuilding(@RequestBody BuildingDto buildingDto) {
        return projectService.getBuilding(buildingDto);
    }

    @PostMapping("/buildings")
    public List<BuildingDto> getBuildings(@RequestBody BuildingDto buildingDto) {
        return projectService.getBuildings(buildingDto);
    }

    @PostMapping("/saveFloor")
    @Transactional
    public Floor saveFloor(@RequestBody FloorDto floorDto) {
        return buildingService.saveFloor(floorDto);
    }

    @DeleteMapping("/floor")
    @Transactional
    public boolean deleteFloor(@RequestBody FloorDto floorDto) {
        return buildingService.deleteFloor(floorDto);
    }

    @PostMapping("/floor")
    public Floor getFloor(@RequestBody FloorDto floorDto) {
        return buildingService.getFloor(floorDto);
    }

    @PostMapping("/floors")
    public List<FloorDto> getFloors(@RequestBody FloorDto floorDto) {

        return buildingService.getFloors(floorDto);
    }

    @PostMapping("/updateEditor")
    @Transactional
    public Floor updateEditor(@RequestBody EditorDto editorDto) {
        return editorService.updateEditor(editorDto);
    }

    @PostMapping("/editor")
    public EditorDto getEditor(@RequestBody EditorDto editorDto) {
        return editorService.getEditor(editorDto);
    }
}

