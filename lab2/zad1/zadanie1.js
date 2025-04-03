function funkcja_zwrotna() {
    var formularz = document.forms[0];
    var tekst = formularz.elements["pole_tekstowe"].value;
    var liczba = formularz.elements["pole_liczbowe"].value;

    console.log(tekst + ":" + typeof tekst);
    console.log(liczba + ":" + typeof liczba);
}
