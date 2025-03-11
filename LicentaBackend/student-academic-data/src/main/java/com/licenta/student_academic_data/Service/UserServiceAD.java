package com.licenta.student_academic_data.Service;

import com.licenta.student_academic_data.Model.DatePersonale;
import com.licenta.student_academic_data.Model.DateScolarizare;
import com.licenta.student_academic_data.Model.UserAD;
import com.licenta.student_academic_data.Repository.DatePersonaleRepository;
import com.licenta.student_academic_data.Repository.DateScolarizareRepository;
import com.licenta.student_academic_data.Repository.UserADRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceAD {

    private final UserADRepository userRepository;
    private final DatePersonaleRepository datePersonaleRepository;
    private final DateScolarizareRepository dateScolarizareRepository;

    @Autowired
    public UserServiceAD(UserADRepository userRepository,
                         DatePersonaleRepository datePersonaleRepository,
                         DateScolarizareRepository dateScolarizareRepository) {
        this.userRepository = userRepository;
        this.datePersonaleRepository = datePersonaleRepository;
        this.dateScolarizareRepository = dateScolarizareRepository;
    }

    public Optional<UserAD> getUserById(Long id) {
        return userRepository.findByIdUsers(id);
    }

    public Optional<UserAD> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<DatePersonale> getDatePersonaleByUser(UserAD userAD) {
        return datePersonaleRepository.findByUser(userAD);
    }

    public Optional<DateScolarizare> getDateScolarizareByUser(UserAD userAD) {
        return dateScolarizareRepository.findByUser(userAD);
    }
}