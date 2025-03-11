package com.licenta.student_academic_data.Repository;

import com.licenta.student_academic_data.Model.DatePersonale;
import com.licenta.student_academic_data.Model.UserAD;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DatePersonaleRepository extends JpaRepository<DatePersonale, Integer> {
    Optional<DatePersonale> findByUser(UserAD user);
}
