import { Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  standalone: true,
  template: `
    <div class="container py-12 max-w-3xl prose prose-slate">
      <h1 class="text-4xl font-bold mb-2">Verhuurvoorwaarden</h1>
      <p class="text-gray-500 mb-10">Bij het huren van materiaal (licht, geluid, tafels en stoelen) gaat de huurder akkoord met onderstaande voorwaarden.</p>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-3">Identificatie</h2>
        <p class="text-gray-700">Bij elke verhuur registreren wij: naam en voornaam, adres, telefoonnummer en e-mailadres. Bij afhaling dient de huurder een geldig identiteitsbewijs te tonen ter controle.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-3">Betaling</h2>
        <p class="text-gray-700">De huurprijs dient betaald te worden bij afhaling, tenzij anders overeengekomen. Enkel na volledige betaling wordt het materiaal meegegeven.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-3">Waarborg</h2>
        <p class="text-gray-700">Voor elke verhuur wordt een waarborg gevraagd. Het bedrag is afhankelijk van het type en de waarde van het materiaal. De waarborg wordt terugbetaald na correcte en volledige terugkeer van het materiaal en na controle.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-3">Huurperiode</h2>
        <p class="text-gray-700">De huurperiode wordt vooraf afgesproken. Bij laattijdige teruggave kan een extra huurkost per dag aangerekend worden.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-3">Annulatie</h2>
        <p class="text-gray-700">Annulaties dienen tijdig gemeld te worden. Bij laattijdige annulatie behouden wij ons het recht voor om een deel of het volledige huurbedrag aan te rekenen.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-3">Gebruik & verantwoordelijkheid</h2>
        <p class="text-gray-700">De huurder is volledig verantwoordelijk voor het gehuurde materiaal vanaf het moment van afhaling tot en met de terugname. Het materiaal dient correct en volgens bestemming gebruikt te worden. De verhuurder is niet aansprakelijk voor schade of letsel voortvloeiend uit het gebruik van het materiaal.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-3">Schade, verlies of diefstal</h2>
        <p class="text-gray-700">Bij schade, verlies of diefstal wordt de waarborg (gedeeltelijk of volledig) ingehouden en kunnen bijkomende kosten aangerekend worden. Indien materiaal niet wordt teruggebracht, wordt de volledige vervangingswaarde aangerekend.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-3">Staat van het materiaal</h2>
        <p class="text-gray-700">Het materiaal wordt geacht in goede staat ontvangen te zijn bij afhaling. Eventuele opmerkingen dienen onmiddellijk gemeld te worden. Bij terugkeer wordt het materiaal gecontroleerd. Het dient in dezelfde staat teruggebracht te worden. Bij sterke vervuiling kan een schoonmaakkost aangerekend worden.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-3">Transport & levering</h2>
        <p class="text-gray-700">De huurder is verantwoordelijk voor het transport van het materiaal, tenzij levering anders werd afgesproken. Schade tijdens transport is ten laste van de huurder.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-3">Overmacht</h2>
        <p class="text-gray-700">De verhuurder kan niet aansprakelijk gesteld worden voor het niet nakomen van de overeenkomst in geval van overmacht (zoals technische storingen, extreme weersomstandigheden of andere onvoorziene situaties).</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-3">Privacy (GDPR)</h2>
        <p class="text-gray-700">Persoonsgegevens worden enkel gebruikt voor de verwerking van de verhuur en worden niet gedeeld met derden. Wij respecteren de geldende privacywetgeving (GDPR).</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-3">Toepasselijk recht</h2>
        <p class="text-gray-700">Op alle overeenkomsten is het Belgisch recht van toepassing. Bij betwistingen zijn de rechtbanken van de regio van de verhuurder bevoegd.</p>
      </section>
    </div>
  `
})
export class TermsComponent {}
