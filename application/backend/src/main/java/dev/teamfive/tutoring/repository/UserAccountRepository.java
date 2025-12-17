package dev.teamfive.tutoring.repository;

import dev.teamfive.tutoring.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * An interface defining ways to interact with UserAccount entities from the `user_account` database table.
 */
@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Long>
{
    // Spring can automatically determine correct mysql queries based on function names (this is insane)
    Optional<UserAccount> findByEmail(String email);
}
