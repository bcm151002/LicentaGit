package com.licenta.student_academic_data.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "date_personale")

@Getter
@Setter
public class DatePersonale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_datepersonale")
    private Long idDatePersonale;

    @Column(name = "nume", nullable = false)
    private String nume;

    @Column(name = "prenume", nullable = false)
    private String prenume;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "data_nastere")
    private Date dataNastere;

    @Column(name = "localitate_nastere")
    private String localitateNastere;

    @Column(name = "adresa")
    private String adresa;

    @Column(name = "localitate")
    private String localitate;

    @Column(name = "numar_telefon")
    private String numarTelefon;

    @Column(name = "fotografie")
    private byte[] fotografie;

    @OneToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id_users") // Legătura corectă cu UserAD
    @JsonBackReference
    private UserAD user;

}
