package com.licenta.student_academic_data;

import com.licenta.login.Config.JwtFilter;
import com.licenta.login.Model.User;
import com.licenta.login.Service.JwtUtil;
import com.licenta.login.Service.UserService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

@SpringBootApplication
//@Import({JwtFilter.class, JwtUtil.class, UserService.class})
@ComponentScan(basePackages = {
		"com.licenta.student_academic_data",
		"com.licenta.login"
})
@EntityScan(basePackages = {
		"com.licenta.student_academic_data.Model",
		"com.licenta.login.Model"
})
public class StudentAcademicDataApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentAcademicDataApplication.class, args);
	}

}
