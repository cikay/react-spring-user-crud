package com.example.restuser.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;


@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    public Long id;
    public String tckn;
    public String email;
    public String password;
    public String gsm;
    public String adress;

    public User() {
        super();
    }

    public User(String tckn, String email, String password, String gsm, String adress) {
        this.tckn = tckn;
        this.email = email;
        this.password = password;
        this.gsm = gsm;
        this.adress = adress;
    }

    @Column(name = "password", nullable = false)
    public String getPassword() { 
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "last_name", nullable = false)
    public String getEmail() { 
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Column(name = "tckn", nullable = false)
    public String getTckn() { 
        return tckn;
    }

    public void setTckn(String tckn) {
        this.tckn = tckn;
    }

    @Column(name = "gsm", nullable = false)
    public String getGsm() { 
        return gsm;
    }

    public void setGsm(String gsm) {
        this.gsm = gsm;
    }

    @Column(name = "adress", nullable = false)
    public String getAdress() { 
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

}