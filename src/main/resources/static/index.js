<!-- Array for å vise billetter  -->

<!-- Gir verdiene fra inputfeltene -->

let billetter=[];
function kjøpBillett(){
    let film = document.getElementById("valg").value;
    let antall = document.getElementById("antall").value;
    let fornavn = document.getElementById("fornavn").value;
    let etternavn = document.getElementById("etternavn").value;
    let telefonnr = document.getElementById("telefonnr").value;
    let epost = document.getElementById("epost").value;

    let feilmelding = false;

    // validering for inputfelt, dersom feltene er tomme skrives det ut feilmelding
    if (document.getElementById("valg").value === ""){
        document.getElementById("feilValg").innerHTML = "Velg en film!";
        feilmelding = true;
    }

    //validering for antall, dersom noe annet enn tall skrives kommer det opp feilmelding
    if (document.getElementById("antall").value === "" || isNaN(antall)){
        document.getElementById("feilAntall").innerHTML = "Skriv inn riktig antall!";
        feilmelding = true;
    }

    if (document.getElementById("fornavn").value === ""){
        document.getElementById("feilFornavn").innerHTML = "Skriv inn fornavn";
        feilmelding = true;
    }

    if (document.getElementById("etternavn").value === ""){
        document.getElementById("feilEtternavn").innerHTML = "Skriv inn etternavn";
        feilmelding = true;
    }

    //validering for telefonnr, dersom noe annet enn tall skrives kommer det opp feilmelding
    if (document.getElementById("telefonnr").value === "" || isNaN(telefonnr)){
        document.getElementById("feilTelefonnr").innerHTML = "Skriv inn tlf";
        feilmelding = true;
    }

    if (document.getElementById("epost").value === ""){
        document.getElementById("feilEpost").innerHTML = "Skriv inn epost";
        feilmelding = true;
    }

    // når alt er skrevet inn riktig i inputfeltene, skal billettene skrives ut
    if (!feilmelding){

        let enBillett = {
            valg : film,
            antall : antall,
            fornavn : fornavn,
            etternavn : etternavn,
            telefonnr : telefonnr,
            epost : epost
        };
        billetter.push(enBillett);
        visBilletter();

        //tømmer input felt etter at billettene er printet ut
        document.getElementById("valg").value="";
        document.getElementById("antall").value="";
        document.getElementById("fornavn").value="";
        document.getElementById("etternavn").value="";
        document.getElementById("telefonnr").value="";
        document.getElementById("epost").value="";
    }
}

// formatering for å vise billettene med tabell 
function visBilletter(){
    let ut = `<table><tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th></tr>`;
    for (let b of billetter){
        ut+="<tr>";
        ut+="<td>"+b.valg+"</td>"+"<td>"+b.antall+"</td>"+"<td>"+b.fornavn+"</td>"+"<td>"+b.etternavn+"</td>"+"<td>"+b.telefonnr+"</td>"+"<td>"+b.epost+"</td>";
        ut+="</tr>";
    }
    document.getElementById("visAlle").innerHTML=ut;
}

// sletter billettene etter at de er printet ut
function slettBilett(){
    billetter.length = 0;
    visBilletter();
}
