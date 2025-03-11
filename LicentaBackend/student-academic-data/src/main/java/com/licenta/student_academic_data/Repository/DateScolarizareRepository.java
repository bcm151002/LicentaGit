package com.licenta.student_academic_data.Repository;

import com.licenta.student_academic_data.Model.UserAD;
import com.licenta.student_academic_data.Model.DateScolarizare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DateScolarizareRepository extends JpaRepository<DateScolarizare, Integer> {
    Optional<DateScolarizare> findByUser(UserAD user);
}
