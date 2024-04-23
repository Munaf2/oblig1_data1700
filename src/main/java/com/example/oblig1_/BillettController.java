package com.example.oblig1_;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class BillettController {

    @Autowired
    BillettRepository rep;
    public final List<Filmvalg> filmer = new ArrayList<>();


    public BillettController(){
        Filmvalg film1 = new Filmvalg("Barbie");
        filmer.add(film1);
        Filmvalg film2 = new Filmvalg("Rush Hour");
        filmer.add(film2);
        Filmvalg film3 = new Filmvalg("Wonka");
        filmer.add(film3);
        Filmvalg film4 = new Filmvalg("Bukkene bruse");
        filmer.add(film4);
        Filmvalg film5 = new Filmvalg("Titanic");
        filmer.add(film5);
    }

    // henter alle tilgjengelige filmvalg
    @GetMapping("/hentAlleFilmer")
    public List<Filmvalg> hentFilmer(){
        return filmer;
    }

    @PostMapping("/lagre")
    public void lagreBilletter(Billettene innBillett, HttpServletResponse response) throws IOException {

        if (!rep.lagreBillett(innBillett)){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Feil i DB - prøv igjen senere");
        }
    }

    @GetMapping("/hentAlle")
    public List<Billettene> hentAlle(){
        return rep.hentAlleBilletter();
    }

    @GetMapping("/slettAlle")
    public void slettAlle(){
        rep.slettAlleBilletter();
    }
}
