package com.example.oblig1_;

public class Billettene {
    private String film;
    private String antall;
    private String fornavn;
    private String etternavn;
    private String telefonnr;
    private String epost;

    public Billettene(String film, String antall, String fornavn, String etternavn, String telefonnr, String epost) {
        this.film = film;
        this.antall = antall;
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.telefonnr = telefonnr;
        this.epost = epost;

    }

    public String getFilm() {
        return film;
    }

    public void setFilm(String film) {
        this.film = film;
    }

    public String getAntall() {
        return antall;
    }

    public void setAntall(String antall) {
        this.antall = antall;
    }

    public String getFornavn() {
        return fornavn;
    }

    public String getEtternavn() {
        return etternavn;
    }

    public String getTelefonnr() {
        return telefonnr;
    }

    public String getEpost() {
        return epost;
    }

    public void setFornavn(String fornavn) {
        this.fornavn = fornavn;
    }

    public void setEtternavn(String etternavn) {
        this.etternavn = etternavn;
    }

    public void setTelefonnr(String telefonnr) {
        this.telefonnr = telefonnr;
    }

    public void setEpost(String epost) {
        this.epost = epost;
    }
}

