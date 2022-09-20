package sevice.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import sevice.app.models.Employee;

import java.util.List;
@RepositoryRestResource
public interface EmployeeRepository extends JpaRepository<Employee,Long> {

    List<Employee> findEmployeesByFloorFloorId(Long floorId);

    List<Employee> findEmployeesByPersonalDataContainingIgnoreCaseAndFloorFloorId(@Param("personalData") String personalData, Long id);

    @Query(value = "delete from employees where employee_id=:employeeId", nativeQuery = true)
    @Transactional
    @Modifying
    void deleteEmployeeById(@Param("employeeId") Long id);
}
