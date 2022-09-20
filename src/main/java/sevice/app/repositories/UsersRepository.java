package sevice.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import sevice.app.models.User;

import java.util.Optional;
@RepositoryRestResource
public interface UsersRepository extends JpaRepository<User,Long>, JpaSpecificationExecutor<User> {
    Optional<User> findOneByLogin(String login);

}
