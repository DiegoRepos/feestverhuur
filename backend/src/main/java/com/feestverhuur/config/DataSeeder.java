package com.feestverhuur.config;

import com.feestverhuur.entity.*;
import com.feestverhuur.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataSeeder {

    @Bean
    public CommandLineRunner seedData(CategoryRepository categoryRepo,
                                      ItemRepository itemRepo,
                                      PackageRepository packageRepo) {
        return args -> {
            if (categoryRepo.count() > 0) return;

            log.info("Seed data aanmaken...");

            Category kinderfeest = cat(categoryRepo, "KINDERFEEST", "Kinderfeest Pakketten",
                    "Voor verjaardagen en themafeestjes");
            Category sweet16 = cat(categoryRepo, "SWEET_16", "Sweet 16 • 18 • 21 Jaar",
                    "Voor feestjes met een moderne en feestelijke uitstraling");
            Category eventStyling = cat(categoryRepo, "EVENT_STYLING", "Event Styling (Volwassenen)",
                    "Voor stijlvolle en aangeklede feesten");
            Category simpleParty = cat(categoryRepo, "SIMPLE_PARTY", "Simple Party Setups",
                    "Voor snelle en praktische feestjes");
            Category extra = cat(categoryRepo, "EXTRA", "Extra Opties",
                    "Aanvullingen voor alle pakketten");

            // Losse artikelen
            Item tent3x3 = item(itemRepo, extra, "Tent 3x3m", "Professionele partytent 3x3 meter",
                    new BigDecimal("25.00"), new BigDecimal("100.00"), 5);
            Item tent6x3 = item(itemRepo, extra, "Tent 6x3m", "Grote partytent 6x3 meter",
                    new BigDecimal("45.00"), new BigDecimal("150.00"), 3);
            Item lichtSet = item(itemRepo, extra, "Licht & Geluid Set", "Complete licht- en geluidsinstallatie",
                    new BigDecimal("75.00"), new BigDecimal("200.00"), 2);
            Item ballonInstallatie = item(itemRepo, extra, "Balloninstallatie", "Grote ballondecoratie op maat",
                    new BigDecimal("35.00"), new BigDecimal("50.00"), 10);
            Item personalisatie = item(itemRepo, extra, "Personalisatie (naam/leeftijd)",
                    "Gepersonaliseerde banner of decoratie met naam en leeftijd",
                    new BigDecimal("15.00"), new BigDecimal("25.00"), 20);
            Item leveringOpbouw = item(itemRepo, extra, "Levering & Opbouw",
                    "Levering en opbouw van het materiaal op locatie",
                    new BigDecimal("50.00"), new BigDecimal("0.00"), 99);
            Item tafel = item(itemRepo, extra, "Tafel (rechthoekig)", "Rechthoekige feestafel",
                    new BigDecimal("5.00"), new BigDecimal("20.00"), 50);
            Item stoel = item(itemRepo, extra, "Stoel", "Feestelijke stoel",
                    new BigDecimal("2.00"), new BigDecimal("5.00"), 250);

            // Kinderfeest pakketten
            pkg(packageRepo, kinderfeest, "Mini Party", "MINI",
                    "Basisopstelling voor een kleinschalig kinderfeestje tot 15 kinderen.",
                    new BigDecimal("149.00"),
                    List.of(new int[][]{{}, {}}));

            pkg(packageRepo, kinderfeest, "Party Plus", "PLUS",
                    "Uitgebreide opstelling voor een kinderfeest tot 25 kinderen inclusief thema en licht.",
                    new BigDecimal("249.00"), List.of());

            pkg(packageRepo, kinderfeest, "Party Experience", "EXPERIENCE",
                    "Het complete kinderfeest pakket voor tot 40 kinderen met thema, licht, geluid en decoratie.",
                    new BigDecimal("399.00"), List.of());

            // Sweet 16 pakketten
            pkg(packageRepo, sweet16, "Party Basic", "BASIC",
                    "Stijlvolle basisopstelling voor een Sweet 16/18/21 feest tot 50 personen.",
                    new BigDecimal("199.00"), List.of());

            pkg(packageRepo, sweet16, "Party Plus", "PLUS",
                    "Complete feestopstelling met licht en geluid voor tot 100 personen.",
                    new BigDecimal("349.00"), List.of());

            pkg(packageRepo, sweet16, "Party VIP", "VIP",
                    "Ultieme VIP beleving met premium licht, geluid en exclusieve decoratie voor tot 150 personen.",
                    new BigDecimal("599.00"), List.of());

            // Event Styling pakketten
            pkg(packageRepo, eventStyling, "Apero Setup", "APERO",
                    "Stijlvolle aperitief setup voor kleine events en borrels tot 30 personen.",
                    new BigDecimal("179.00"), List.of());

            pkg(packageRepo, eventStyling, "Garden / Dinner Style", "GARDEN",
                    "Elegante tuin- of dinersetup voor events tot 60 personen.",
                    new BigDecimal("299.00"), List.of());

            pkg(packageRepo, eventStyling, "Lounge & Evening Vibes", "LOUNGE",
                    "Sfeervolle loungesfeer met avondverlichting voor tot 80 personen.",
                    new BigDecimal("449.00"), List.of());

            pkg(packageRepo, eventStyling, "Signature Event", "SIGNATURE",
                    "Volledig op maat gemaakt signature event voor tot 150 personen.",
                    new BigDecimal("749.00"), List.of());

            // Simple Party pakketten
            pkg(packageRepo, simpleParty, "Basic Setup", "BASIC",
                    "Snelle en eenvoudige opstelling voor kleine tuinfeestjes tot 20 personen.",
                    new BigDecimal("99.00"), List.of());

            pkg(packageRepo, simpleParty, "Party Setup", "PARTY",
                    "Praktische feestopstelling voor events tot 40 personen.",
                    new BigDecimal("159.00"), List.of());

            pkg(packageRepo, simpleParty, "Party Setup Plus", "PLUS",
                    "Uitgebreidere opstelling met extra opties voor tot 60 personen.",
                    new BigDecimal("229.00"), List.of());

            log.info("Seed data aangemaakt.");
        };
    }

    private Category cat(CategoryRepository repo, String name, String displayName, String description) {
        Category c = new Category();
        c.setName(name);
        c.setDisplayName(displayName);
        c.setDescription(description);
        return repo.save(c);
    }

    private Item item(ItemRepository repo, Category category, String name, String description,
                      BigDecimal pricePerDay, BigDecimal deposit, int stock) {
        Item i = new Item();
        i.setName(name);
        i.setDescription(description);
        i.setPricePerDay(pricePerDay);
        i.setDeposit(deposit);
        i.setStock(stock);
        i.setIsAvailable(true);
        i.setCategory(category);
        return repo.save(i);
    }

    private RentalPackage pkg(PackageRepository repo, Category category, String name, String formula,
                               String description, BigDecimal priceFrom, List<?> ignored) {
        RentalPackage p = new RentalPackage();
        p.setName(name);
        p.setFormula(formula);
        p.setDescription(description);
        p.setPriceFrom(priceFrom);
        p.setIsActive(true);
        p.setCategory(category);
        return repo.save(p);
    }
}
