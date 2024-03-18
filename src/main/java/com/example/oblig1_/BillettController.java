package com.example.oblig1_;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BillettController {

    private final List<Billettene> alleBilletter = new ArrayList<>();

    @GetMapping("/hentFilmer")
    public List<Filmvalg> hentfilmer(){
        final List<Filmvalg> filmer = new ArrayList<>();
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
        return filmer;
    }

    @PostMapping("/lagre")
    public void lagreBilletter(Billettene innBillett){
        alleBilletter.add(innBillett);
    }

    @GetMapping("/hentAlle")
    public List<Billettene> hentAlle(){
        return alleBilletter;
    }

    @GetMapping("/slettAlle")
    public void slettAlle(){
        alleBilletter.clear();
    }
}
