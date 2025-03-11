package com.licenta.student_academic_data.Repository;

import com.licenta.student_academic_data.Model.UserAD;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserADRepository extends JpaRepository<UserAD, Long> {
    Optional<UserAD> findByUsername(String username);
    Optional<UserAD> findByEmail(String email);
    Optional<UserAD> findByIdUsers(Long idUsers);
}