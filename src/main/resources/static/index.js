
$(function (){
    hentAlleFilmer();
});

function hentAlleFilmer(){
    $.get("/hentAlleFilmer", function (enFilm){
        formaterFilmer(enFilm);
    });
}

//dropdown for film
function formaterFilmer(enFilm){
    console.log(enFilm);
    let ut = "<select id='valgtFilm'>";
    ut += "<option>Velg film</option>";

    for (const film of enFilm){
        ut+="<option>"+film.film+"</option>";
    }
    ut+= "</select>";
    $("#film").html(ut);
}

//Array for å vise billetter
let billetter=[];

//Gir verdiene fra inputfeltene
function kjøpBillett(){
    let valgtFilm = document.getElementById("valgtFilm").value;
    let antall = document.getElementById("antall").value;
    let fornavn = document.getElementById("fornavn").value;
    let etternavn = document.getElementById("etternavn").value;
    let telefonnr = document.getElementById("telefonnr").value;
    let epost = document.getElementById("epost").value;


    let feilmelding = false;

    // validering for inputfelt, dersom feltene er tomme skrives det ut feilmelding
    if (document.getElementById("valgtFilm").value === ""){
        document.getElementById("feilValg").innerHTML = "Velg en film";
        feilmelding = true;
    }

    //validering for antall, dersom noe annet enn tall skrives kommer det opp feilmelding
    let antallBilletter = document.getElementById("antall").value;
    if (antallBilletter === "" || isNaN(antall) || antallBilletter <= 0) {
        document.getElementById("feilAntall").innerHTML = "Skriv inn riktig antall";
        feilmelding = true;
    }

    if (document.getElementById("fornavn").value === ""){
        document.getElementById("feilFornavn").innerHTML = "Skriv inn fornavn";
        feilmelding = true;
    }

    if (document.getElementById("etternavn").value === ""){
        document.getElementById("feilEtternavn").innerHTML = "Skriv inn etternavn <br>";
        feilmelding = true;
    }

     // telefonnummer på 8 siffer
    let telefonnrPattern = /^\d{8}$/;
    if (telefonnr === "" || !telefonnrPattern.test(telefonnr)){
        document.getElementById("feilTelefonnr").innerHTML = "Skriv inn gyldig telefonnr: xxxxxxxx";
        feilmelding = true;
    }

    //Kilde til regex: https://regexr.com/?fbclid=IwAR2bGyQfo45_TVhlQ_3gdQi_UUIlhBpNXEoHbqWsxL2cSeagVYn7W3ZFrCo
    let epostPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (epost === "" || !epostPattern.test(epost)){
        document.getElementById("feilEpost").innerHTML = "Skriv inn gyldig epost";
        feilmelding = true;
    }

    // når alt er skrevet inn riktig i inputfeltene, skal billettene skrives ut
    if (!feilmelding){

        let enBillett = {
            film : valgtFilm,
            antall : antall,
            fornavn : fornavn,
            etternavn : etternavn,
            telefonnr : telefonnr,
            epost : epost
        };
        billetter.push(enBillett);
        visBilletter();

        console.log(enBillett)
        $.post("/lagre", enBillett, function (){
            hentAlle();
        }).fail(function (jqXHR){
            const json = $.parseJSON(jqXHR.responseText);

            $("#feil").html(json.message);
        });


        //tømmer alle input felt etter billettkjøp
        document.getElementById("valgtFilm").value="";
        document.getElementById("antall").value="";
        document.getElementById("fornavn").value="";
        document.getElementById("etternavn").value="";
        document.getElementById("telefonnr").value="";
        document.getElementById("epost").value="";

        //tømmer alle error messages etter billettkjøp
        document.getElementById("feilValg").innerHTML = "";
        document.getElementById("feilAntall").innerHTML = "";
        document.getElementById("feilFornavn").innerHTML = "";
        document.getElementById("feilEtternavn").innerHTML = "";
        document.getElementById("feilTelefonnr").innerHTML = "";
        document.getElementById("feilEpost").innerHTML = "";
    }
}

// denne gir ut billettene med all informasjon om billetten, legger dette etter validering så alt blir validert før det hentes ut
function hentAlle(){
    $.get("/hentAlle", function (enFilm){
        visBilletter(enFilm);
    });
}

// formatering for å vise billettene med tabell, formatert med bootstrap
function visBilletter(){
    let ut = `<table class="table table-striped"><tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th></tr>`;
    for (let b of billetter){
        ut+="<tr>";
        ut+="<td>"+b.film+"</td>"+"<td>"+b.antall+"</td>"+"<td>"+b.fornavn+"</td>"+"<td>"+b.etternavn+"</td>"+"<td>"+b.telefonnr+"</td>"+"<td>"+b.epost+"</td>";
        ut+="</tr>";
    }
    document.getElementById("visAlle").innerHTML=ut;
}

// sletter billettene etter at de er printet ut
function slettBilett(){
    billetter.length = 0;
    visBilletter();

    $.get("/slettAlle", function (){
        hentAlle();
    });
}
