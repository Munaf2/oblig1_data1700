package com.example.oblig1_;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public class BillettRepository {

    @Autowired
    private JdbcTemplate db;

    private Logger logger = LoggerFactory.getLogger(BillettRepository.class);

    public boolean lagreBillett(Billettene innBillett){
        String sql = "INSERT INTO Billettene (film, antall, fornavn, etternavn, telefonnr, epost) VALUES (?,?,?,?,?,?)";

        try {
            db.update(sql, innBillett.getFilm(), innBillett.getAntall(), innBillett.getFornavn(), innBillett.getEtternavn(), innBillett.getTelefonnr(), innBillett.getEpost());
            return true;
        } catch (Exception e){
            logger.error("Feil i lagreBillett: "+e);
            return false;
        }
    }

    public List<Billettene> hentAlleBilletter(){
        String sql = "SELECT * FROM Billettene ORDER BY etternavn ASC";
        List<Billettene> alleBilletter = db.query(sql, new BeanPropertyRowMapper(Billettene.class));
        return alleBilletter;
    }

    //Angir ingenting så alle rader slettes
    public void slettAlleBilletter(){
        String sql = "DELETE FROM Billettene";
        db.update(sql);
    }
}
