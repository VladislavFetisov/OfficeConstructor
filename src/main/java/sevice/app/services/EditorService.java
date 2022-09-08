package sevice.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sevice.app.models.*;
import sevice.app.repositories.*;
import sevice.app.trasfer.EditorDto;

import static sevice.app.models.enums.State.*;

@Service
public class EditorService {
    final
    FloorRepository floorRepository;

    final
    AreaRepository areaRepository;

    final
    WallRepository wallRepository;

    final
    ItemRepository itemRepository;

    final
    EmployeeRepository employeeRepository;

    @Autowired
    public EditorService(FloorRepository floorRepository,
                         AreaRepository areaRepository,
                         WallRepository wallRepository,
                         ItemRepository itemRepository,
                         EmployeeRepository employeeRepository) {

        this.floorRepository = floorRepository;
        this.areaRepository = areaRepository;
        this.wallRepository = wallRepository;
        this.itemRepository = itemRepository;
        this.employeeRepository = employeeRepository;
    }

    public Floor updateEditor(EditorDto editorDto) {
        Floor floorFromDb = floorRepository.findById(editorDto.getFloorId()).get();

        if (editorDto.getAreas() != null) {
            for (Area area : editorDto.getAreas()) {
                switch (area.getState()) {
                    case NEW:
                        area.setState(ACTIVE);
                        area.setFloor(floorFromDb);
                        areaRepository.save(area);
                        break;
                    case DELETED:
                        Area areaInDb = areaRepository.findById(area.getAreaId()).get();
                        areaRepository.deleteAreaById(areaInDb.getAreaId());
                        break;
                    case ACTIVE:
                        areaInDb = areaRepository.findById(area.getAreaId()).get();
                        if (!areaInDb.equals(area)) {
                            areaInDb.setX(area.getX());
                            areaInDb.setY(area.getY());
                        }
                        break;
                }
            }
        }
        if (editorDto.getItems() != null) {
            for (Item item : editorDto.getItems()) {
                switch (item.getState()) {
                    case NEW:
                        item.setState(ACTIVE);
                        item.setFloor(floorFromDb);
                        itemRepository.save(item);
                        break;
                    case DELETED:
                        Item itemInDb = itemRepository.findById(item.getItemId()).get();
                        itemRepository.deleteItemById(itemInDb.getItemId());
                        break;
                    case ACTIVE:
                        itemInDb = itemRepository.findById(item.getItemId()).get();
                        if (!itemInDb.equals(item)) {
                            itemInDb.setX(item.getX());
                            itemInDb.setY(item.getY());
                            itemInDb.setAngle(item.getAngle());
                            itemInDb.setDescription(item.getDescription());
                        }
                        break;
                }
            }
        }
        if (editorDto.getWalls() != null) {
            for (Wall wall : editorDto.getWalls()) {
                switch (wall.getState()) {
                    case NEW:
                        wall.setState(ACTIVE);
                        wall.setFloor(floorFromDb);
                        wallRepository.save(wall);
                        break;
                    case DELETED:
                        Wall wallInDb = wallRepository.findById(wall.getWallId()).get();
                        wallRepository.deleteWallById(wallInDb.getWallId());
                        break;
                    case ACTIVE:
                        wallInDb = wallRepository.findById(wall.getWallId()).get();
                        if (!wallInDb.equals(wall)) {
                            wallInDb.setX(wall.getX());
                            wallInDb.setY(wall.getY());
                            wallInDb.setDx(wall.getDx());
                            wallInDb.setDy(wall.getDy());
                        }
                        break;

                }
            }
        }
        if (editorDto.getEmployees() != null) {
            for (Employee employee : editorDto.getEmployees()) {
                switch (employee.getState()) {
                    case NEW:
                        employee.setState(ACTIVE);
                        employee.setFloor(floorFromDb);
                        employeeRepository.save(employee);
                        break;
                    case DELETED:
                        Employee employeeInDb = employeeRepository.findById(employee.getEmployeeId()).get();
                        employeeRepository.deleteEmployeeById(employeeInDb.getEmployeeId());
                        break;
                    case ACTIVE:
                        employeeInDb = employeeRepository.findById(employee.getEmployeeId()).get();
                        if (!employeeInDb.equals(employee)) {
                            employeeInDb.setX(employee.getX());
                            employeeInDb.setY(employee.getY());
                            employeeInDb.setPersonalData(employee.getPersonalData());
                            employeeInDb.setPhoneNumber(employee.getPhoneNumber());
                            employeeInDb.setPost(employee.getPost());
                        }
                        break;

                }
            }
        }
        return floorFromDb;
    }

    public EditorDto getEditor(EditorDto editorDto) {
        return EditorDto.from(editorDto.getFloorId()
                , itemRepository.findItemsByFloorFloorId(editorDto.getFloorId())
                , wallRepository.findWallsByFloorFloorId(editorDto.getFloorId())
                , areaRepository.findAreasByFloorFloorId(editorDto.getFloorId())
                , employeeRepository.findEmployeesByFloorFloorId(editorDto.getFloorId()));
    }
}
