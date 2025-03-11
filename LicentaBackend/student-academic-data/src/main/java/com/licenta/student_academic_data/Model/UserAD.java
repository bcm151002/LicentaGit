package com.licenta.student_academic_data.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "users")
public class UserAD {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_users")
    private Long idUsers;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "id_datepersonale", referencedColumnName = "id_datepersonale")
    @JsonManagedReference
    private DatePersonale datePersonale;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "id_datescolarizare", referencedColumnName = "id_datescolarizare")
    @JsonManagedReference
    private DateScolarizare dateScolarizare;

    @Column(nullable = false, unique = true)
    private String username;

    private Integer role;

    @Column(nullable = false)
    private String password;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Timestamp createdAt;

    private Integer rate;

    @Column(nullable = false)
    private String email;

    private String resetToken;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @CreationTimestamp
    private Date resetTokenExpiry;

    @Column(nullable = false)
    private boolean resetTokenAvailability = false;


}
