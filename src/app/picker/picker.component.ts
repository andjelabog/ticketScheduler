import { Component, OnInit, Inject } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Router } from '@angular/router';
// import * as $ from "jquery";

declare var $: any

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnInit {

  textToShow = "<strong>Lottery scheduling</strong> je probabilistički algoritam za dodeljivanje procesa u operativnom sistemu. <br>"
    + "Procesima se dodeljuje određeni broj tiketa, a raspoređivač bira nasumičan tiket da bi se izabrao sledeći proces koji će dobiti procesorsko vreme.<br>"
    + "Distribucija tiketa ne mora biti uniformna, dodeljivanje procesu vise tiketa, pruža mu relativno veću šansu da bude izabran. <br>"

  shown: boolean = false;

  max: number;
  min: number;
  step: number;
  thumbLabel: boolean;
  value: number = 5;
  seconds: number = 2;

  private _tickInterval = 1;
  get tickInterval(): number | 'auto' {
    return this._tickInterval;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  constructor(private router: Router) { }

  ngOnInit() {
    $('#myModal').modal({ show: true, focus: true })
    this.resetData();
  }

  resetData() {
    this.max = 10;
    this.min = 1;
    this.step = 1;
    this.thumbLabel = true;
    this.value = 5;
    this.seconds = 2;
  }
  valuechange(event: any) {
    if (this.min > this.max)
      this.max = this.min;
  }
  valuechangeMax(event: any) {
    if (this.max < this.min)
      this.min = this.max
  }


  watchSimulation() {
    localStorage.setItem("seconds", this.seconds.toString());
    localStorage.setItem("numberOfProcesses", this.value.toString());
    localStorage.setItem("maxNumber", this.max.toString());
    this.router.navigate(['simulation'])
  }


  showMore(): void {
    this.textToShow = "<strong>Lottery scheduling</strong> je probabilistički algoritam za dodeljivanje procesa u operativnom sistemu. <br>"
      + "Procesima se dodeljuje određeni broj tiketa, a raspoređivač bira nasumičan tiket da bi se izabrao sledeći proces koji će dobiti procesorsko vreme.<br>"
      + "Distribucija tiketa ne mora biti uniformna, dodeljivanje procesu vise tiketa, pruža mu relativno veću šansu da bude izabran. <br>"
      + "<strong>Osnovni koncept lottery-scheduling-a </strong> <br> Tiketi,se koriste za predstavljanje porcije resursa koji proces (ili korisnik ili šta god) treba da primi. Procenat tiketa koje proces ima predstavlja svoje učešće u resursima sistema. <br>"
      + "<br><strong>Manipulacija</strong><br>Lottery-scheduling takođe pruža brojne mehanizme za manipulaciju tiketa na različite i ponekad korisne načine. <br>Jedan način je sa konceptom <strong>vrednosti</strong> tiketa. Vrednost dozvoljava korisniku da set tiketa dodeli među svojim poslovima u bilo kojoj valuti; sistem tada automatski pretvara pomenutu vrednost u ispravnu globalnu vrednost.<br>"
      + "Još jedan koristan mehanizam je <strong>transfer</strong> tiketa. Sa transferima, proces može privremeno predati svoje karte drugim procesima. Ovaj mehanizam je posebno koristan u <i>klijent / server podešavanjima</i>, gde klijentski proces šalje poruku na server tražeći od njega da uradi neki posao u ime klijenta. Da bi ubrzao rad, klijent može da prosledi tikete serveru i tako pokuša maksimizovati performanse servera dok server rešava zahteve klijenta. Kada završi, server zatim vraća tikete klijentu i sve se vraća na staro.<br> Konačno, <strong>inflacija</strong> tiketa ponekad može biti korisna tehnika. Sa inflacijom, proces može privremeno povećati ili smanjiti broj tiketa koji poseduje. Naravno, u takmičarskom scenariju sa procesima koji ne veruju jedni drugima, to nema mnogo smisla; mogao bi da ima jedan pohlepni proces koji dodeli sebi ogroman broj tiketa i preuzme mašinu. Umesto toga, inflacija se može primeniti u okruženju gde grupa procesa veruje jedan drugom; u tom slučaju, ako bilo koji proces zna da mu treba više CPU vremena, može povećati vrednost tiketa kao način da se ta potreba zadovolji bez komunikacije sa bilo kojim drugim procesima.<br><br>"
      + "<strong>Implementacija</strong><br>Verovatno najneverovatnija stvar u vezi sa lottery-scheduling algoritmom je jednostavnost njegove implementacije. Sve što vam treba je dobar nasumični generator brojeva koji bira dobitnu kartu, strukturu podataka za praćenje procesa sistema (npr. listu) i ukupan broj tiketa.<br>"
      + "<br><strong>Problem</strong><br>Jedan od problema s kojim se nismo bavili je: kako raspodeliti tikete procesima? Ovaj problem je težak, naravno, kako se sistem ponaša, u velikoj meri zavisi od načina na koji se dodeljuju tiketi. Jedan pristup je pretpostaviti da korisnici najbolje znaju; u takvom slučaju, svakom korisniku se daje određeni broj tiketa, a korisnik može da dodeli tikete procesima po želji. Međutim, ovo rešenje je nelogično: zaista vam ne govori šta da radite. Tako, s obzirom na skup poslova, „problem sa raspodelom tiketa“ ostaje otvoren.<br>"
      + "<br><strong>Sažetak</strong><br>Lottery-scheduling koristi nasumičnost na pametan način za postizanje proporcionalnog učešća; korak je deterministički. Nijedan planer nije savršen, a raspoređivači fair-share imaju dosta problema. Jedno pitanje je kako takvi pristupi povezuju U/I kao što je gore pomenuto, poslovi koji obavljaju U/I povremeno možda neće dobiti svoj udeo u CPU-u. Još jedno pitanje je zašto oni ostavljaju otvoren problem sa tiketima ili prioritom, tj. kako znate koliko tiketa treba da bude dodeljeno vašem procesu? Drugi raspoređivači opšte namene rešavaju ove probleme automatski i mogu se lakše primeniti"
    this.shown = true;
  }
}
