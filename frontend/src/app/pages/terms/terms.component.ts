import { Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  standalone: true,
  template: `
    <div class="bg-[#07071a] min-h-screen py-16">
      <div class="container max-w-3xl">

        <!-- Header -->
        <div class="mb-12">
          <p class="text-blue-400 text-sm font-bold tracking-widest uppercase mb-3">Juridisch</p>
          <h1 class="text-4xl font-bold text-white mb-4">Verhuurvoorwaarden</h1>
          <p class="text-gray-400 text-base leading-relaxed">
            Bij het huren van materiaal (licht, geluid, tafels en stoelen) gaat de huurder akkoord met onderstaande voorwaarden.
          </p>
        </div>

        <!-- Secties -->
        <div class="space-y-8">

          <section class="dark-card rounded-2xl p-6">
            <h2 class="text-lg font-bold text-white mb-3">Identificatie</h2>
            <p class="text-gray-400 text-sm mb-3">Bij elke verhuur registreren wij de volgende gegevens:</p>
            <ul class="space-y-1 mb-3">
              <li class="flex items-center gap-2 text-gray-400 text-sm">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>Naam en voornaam
              </li>
              <li class="flex items-center gap-2 text-gray-400 text-sm">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>Adres
              </li>
              <li class="flex items-center gap-2 text-gray-400 text-sm">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>Telefoonnummer
              </li>
              <li class="flex items-center gap-2 text-gray-400 text-sm">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>E-mailadres
              </li>
            </ul>
            <p class="text-gray-400 text-sm">Bij afhaling dient de huurder een geldig identiteitsbewijs te tonen ter controle.</p>
          </section>

          <section class="dark-card rounded-2xl p-6">
            <h2 class="text-lg font-bold text-white mb-3">Betaling</h2>
            <p class="text-gray-400 text-sm">De huurprijs dient betaald te worden bij afhaling, tenzij anders overeengekomen. Enkel na volledige betaling wordt het materiaal meegegeven.</p>
          </section>

          <section class="dark-card rounded-2xl p-6">
            <h2 class="text-lg font-bold text-white mb-3">Waarborg</h2>
            <p class="text-gray-400 text-sm">Voor elke verhuur wordt een waarborg gevraagd. Het bedrag is afhankelijk van het type en de waarde van het materiaal. De waarborg wordt terugbetaald na correcte en volledige terugkeer van het materiaal en na controle.</p>
          </section>

          <section class="dark-card rounded-2xl p-6">
            <h2 class="text-lg font-bold text-white mb-3">Huurperiode</h2>
            <p class="text-gray-400 text-sm">De huurperiode wordt vooraf afgesproken. Bij laattijdige teruggave kan een extra huurkost per dag aangerekend worden.</p>
          </section>

          <section class="dark-card rounded-2xl p-6">
            <h2 class="text-lg font-bold text-white mb-3">Annulatie</h2>
            <p class="text-gray-400 text-sm">Annulaties dienen tijdig gemeld te worden. Bij laattijdige annulatie behouden wij ons het recht voor om een deel of het volledige huurbedrag aan te rekenen.</p>
          </section>

          <section class="dark-card rounded-2xl p-6">
            <h2 class="text-lg font-bold text-white mb-3">Gebruik &amp; verantwoordelijkheid</h2>
            <p class="text-gray-400 text-sm mb-2">De huurder is volledig verantwoordelijk voor het gehuurde materiaal vanaf het moment van afhaling tot en met de terugname.</p>
            <p class="text-gray-400 text-sm">Het materiaal dient correct en volgens bestemming gebruikt te worden. De verhuurder is niet aansprakelijk voor schade of letsel voortvloeiend uit het gebruik van het materiaal.</p>
          </section>

          <section class="dark-card rounded-2xl p-6">
            <h2 class="text-lg font-bold text-white mb-3">Schade, verlies of diefstal</h2>
            <p class="text-gray-400 text-sm mb-3">Bij schade, verlies of diefstal:</p>
            <ul class="space-y-1 mb-3">
              <li class="flex items-center gap-2 text-gray-400 text-sm">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>wordt de waarborg (gedeeltelijk of volledig) ingehouden
              </li>
              <li class="flex items-center gap-2 text-gray-400 text-sm">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>en kunnen bijkomende kosten aangerekend worden
              </li>
            </ul>
            <p class="text-gray-400 text-sm">Indien materiaal niet wordt teruggebracht, wordt de volledige vervangingswaarde aangerekend.</p>
          </section>

          <section class="dark-card rounded-2xl p-6">
            <h2 class="text-lg font-bold text-white mb-3">Staat van het materiaal</h2>
            <p class="text-gray-400 text-sm mb-2">Het materiaal wordt geacht in goede staat ontvangen te zijn bij afhaling. Eventuele opmerkingen dienen onmiddellijk gemeld te worden.</p>
            <p class="text-gray-400 text-sm mb-2">Bij terugkeer wordt het materiaal gecontroleerd. Het dient in dezelfde staat teruggebracht te worden.</p>
            <p class="text-gray-400 text-sm">Bij sterke vervuiling kan een schoonmaakkost aangerekend worden.</p>
          </section>

          <section class="dark-card rounded-2xl p-6">
            <h2 class="text-lg font-bold text-white mb-3">Transport &amp; levering</h2>
            <p class="text-gray-400 text-sm">De huurder is verantwoordelijk voor het transport van het materiaal, tenzij levering anders werd afgesproken. Schade tijdens transport is ten laste van de huurder.</p>
          </section>

          <section class="dark-card rounded-2xl p-6">
            <h2 class="text-lg font-bold text-white mb-3">Overmacht</h2>
            <p class="text-gray-400 text-sm">De verhuurder kan niet aansprakelijk gesteld worden voor het niet nakomen van de overeenkomst in geval van overmacht (zoals technische storingen, extreme weersomstandigheden of andere onvoorziene situaties).</p>
          </section>

          <section class="dark-card rounded-2xl p-6">
            <h2 class="text-lg font-bold text-white mb-3">Privacy</h2>
            <p class="text-gray-400 text-sm">Persoonsgegevens worden enkel gebruikt voor de verwerking van de verhuur en worden niet gedeeld met derden. Wij respecteren de geldende privacywetgeving (GDPR).</p>
          </section>

          <section class="dark-card rounded-2xl p-6">
            <h2 class="text-lg font-bold text-white mb-3">Toepasselijk recht</h2>
            <p class="text-gray-400 text-sm">Op alle overeenkomsten is het Belgisch recht van toepassing. Bij betwistingen zijn de rechtbanken van de regio van de verhuurder bevoegd.</p>
          </section>

        </div>
      </div>
    </div>
  `
})
export class TermsComponent {}
