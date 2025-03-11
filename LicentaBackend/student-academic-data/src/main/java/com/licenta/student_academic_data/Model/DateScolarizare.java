package com.licenta.student_academic_data.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "date_scolarizare")
public class DateScolarizare {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_datescolarizare")
    private Integer idDateScolarizare;

    @Column(name = "id_facultate")
    private Integer idFacultate;

    @Column(name = "specializare")
    private String specializare;

    @Column(name = "promotie")
    private String promotie;

    @Column(name = "grupa")
    private String grupa;

    @Column(name = "forma_finantare")
    private String formaFinantare;

    @OneToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id_users") // Legătura corectă cu UserAD
    @JsonBackReference
    private UserAD user;
}
