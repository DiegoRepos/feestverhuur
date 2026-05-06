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
import java.util.Map;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataSeeder {

    @Bean
    public CommandLineRunner seedData(CategoryRepository categoryRepo,
                                      ItemRepository itemRepo,
                                      PackageRepository packageRepo) {
        return args -> {
            if (categoryRepo.count() > 0) {
                seedGeluidLichtIfMissing(categoryRepo, itemRepo);
                seedTrouwfeestIfMissing(categoryRepo, packageRepo);
                updateImageUrls(itemRepo);
                return;
            }

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
            Category geluid = cat(categoryRepo, "GELUID", "Geluid",
                    "Professionele geluidsapparatuur");
            Category licht = cat(categoryRepo, "LICHT", "Licht",
                    "Professionele lichtapparatuur");
            Category effecten = cat(categoryRepo, "EFFECTEN", "Effecten",
                    "Sfeereffecten zoals fog en lasers");

            // Extra opties
            item(itemRepo, extra, "Tent 3x3m", "Professionele partytent 3x3 meter",
                    new BigDecimal("25.00"), null, null, new BigDecimal("100.00"), 5);
            item(itemRepo, extra, "Tent 6x3m", "Grote partytent 6x3 meter",
                    new BigDecimal("45.00"), null, null, new BigDecimal("150.00"), 3);
            item(itemRepo, extra, "Balloninstallatie", "Grote ballondecoratie op maat",
                    new BigDecimal("35.00"), null, null, new BigDecimal("50.00"), 10);
            item(itemRepo, extra, "Personalisatie (naam/leeftijd)",
                    "Gepersonaliseerde banner of decoratie met naam en leeftijd",
                    new BigDecimal("15.00"), null, null, new BigDecimal("25.00"), 20);
            item(itemRepo, extra, "Levering & Opbouw",
                    "Levering en opbouw van het materiaal op locatie",
                    new BigDecimal("50.00"), null, null, new BigDecimal("0.00"), 99);
            item(itemRepo, extra, "Tafel (rechthoekig)", "Rechthoekige feestafel",
                    new BigDecimal("5.00"), null, null, new BigDecimal("20.00"), 50);
            item(itemRepo, extra, "Stoel", "Feestelijke stoel",
                    new BigDecimal("2.00"), null, null, new BigDecimal("5.00"), 250);

            // Geluid
            item(itemRepo, geluid, "QSC K12.2", "12 inch actieve speaker — 2000W (132dB)",
                    new BigDecimal("35.00"), new BigDecimal("50.00"), new BigDecimal("105.00"), new BigDecimal("200.00"), 4);
            item(itemRepo, geluid, "QSC KS8.2", "8 inch actieve speaker — 2000W (128dB)",
                    new BigDecimal("30.00"), new BigDecimal("45.00"), new BigDecimal("90.00"), new BigDecimal("150.00"), 2);
            item(itemRepo, geluid, "QSC KS118", "18 inch actieve sub — 3600W (136dB)",
                    new BigDecimal("60.00"), new BigDecimal("90.00"), new BigDecimal("180.00"), new BigDecimal("300.00"), 2);

            // Licht
            item(itemRepo, licht, "Showtec Phantom 250 Spot", "Movinghead — 250W, 18,5kg",
                    new BigDecimal("30.00"), new BigDecimal("50.00"), new BigDecimal("90.00"), new BigDecimal("200.00"), 8);
            item(itemRepo, licht, "Showtec Expression 5000", "100W LED licht — 6,5kg",
                    new BigDecimal("25.00"), new BigDecimal("60.00"), new BigDecimal("90.00"), new BigDecimal("150.00"), 8);
            item(itemRepo, licht, "Beamz Panther 35 LED", "35W LED effect — 2,7kg",
                    new BigDecimal("15.00"), new BigDecimal("40.00"), new BigDecimal("60.00"), new BigDecimal("80.00"), 4);
            item(itemRepo, licht, "Expolite Tourbar 64", "250W lichtbar — 8,5kg",
                    new BigDecimal("40.00"), new BigDecimal("75.00"), new BigDecimal("150.00"), new BigDecimal("250.00"), 5);
            item(itemRepo, licht, "Algam Barwas 36", "35W lichtbar — 2,8kg",
                    new BigDecimal("10.00"), new BigDecimal("15.00"), new BigDecimal("30.00"), new BigDecimal("60.00"), 2);

            // Effecten
            item(itemRepo, effecten, "Fog Furt Jett ADJ", "Fogmachine — 750W, 36W licht, 7,1kg",
                    new BigDecimal("30.00"), new BigDecimal("45.00"), new BigDecimal("90.00"), new BigDecimal("100.00"), 1);

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

    private void seedGeluidLichtIfMissing(CategoryRepository categoryRepo, ItemRepository itemRepo) {
        if (categoryRepo.findByName("GELUID").isPresent()) return;
        log.info("Geluid/Licht/Effecten categorieën aanmaken...");
        Category geluid = cat(categoryRepo, "GELUID", "Geluid", "Professionele geluidsapparatuur");
        Category licht = cat(categoryRepo, "LICHT", "Licht", "Professionele lichtapparatuur");
        Category effecten = cat(categoryRepo, "EFFECTEN", "Effecten", "Sfeereffecten zoals fog en lasers");
        item(itemRepo, geluid, "QSC K12.2", "12 inch actieve speaker — 2000W (132dB)",
                new BigDecimal("35.00"), new BigDecimal("50.00"), new BigDecimal("105.00"), new BigDecimal("200.00"), 4);
        item(itemRepo, geluid, "QSC KS8.2", "8 inch actieve speaker — 2000W (128dB)",
                new BigDecimal("30.00"), new BigDecimal("45.00"), new BigDecimal("90.00"), new BigDecimal("150.00"), 2);
        item(itemRepo, geluid, "QSC KS118", "18 inch actieve sub — 3600W (136dB)",
                new BigDecimal("60.00"), new BigDecimal("90.00"), new BigDecimal("180.00"), new BigDecimal("300.00"), 2);
        item(itemRepo, licht, "Showtec Phantom 250 Spot", "Movinghead — 250W, 18,5kg",
                new BigDecimal("30.00"), new BigDecimal("50.00"), new BigDecimal("90.00"), new BigDecimal("200.00"), 8);
        item(itemRepo, licht, "Showtec Expression 5000", "100W LED licht — 6,5kg",
                new BigDecimal("25.00"), new BigDecimal("60.00"), new BigDecimal("90.00"), new BigDecimal("150.00"), 8);
        item(itemRepo, licht, "Beamz Panther 35 LED", "35W LED effect — 2,7kg",
                new BigDecimal("15.00"), new BigDecimal("40.00"), new BigDecimal("60.00"), new BigDecimal("80.00"), 4);
        item(itemRepo, licht, "Expolite Tourbar 64", "250W lichtbar — 8,5kg",
                new BigDecimal("40.00"), new BigDecimal("75.00"), new BigDecimal("150.00"), new BigDecimal("250.00"), 5);
        item(itemRepo, licht, "Algam Barwas 36", "35W lichtbar — 2,8kg",
                new BigDecimal("10.00"), new BigDecimal("15.00"), new BigDecimal("30.00"), new BigDecimal("60.00"), 2);
        item(itemRepo, effecten, "Fog Furt Jett ADJ", "Fogmachine — 750W, 36W licht, 7,1kg",
                new BigDecimal("30.00"), new BigDecimal("45.00"), new BigDecimal("90.00"), new BigDecimal("100.00"), 1);
    }

    private void seedTrouwfeestIfMissing(CategoryRepository categoryRepo, PackageRepository packageRepo) {
        if (categoryRepo.findByName("TROUWFEEST").isPresent()) return;
        log.info("Trouwfeest categorie aanmaken...");
        Category trouw = cat(categoryRepo, "TROUWFEEST", "Trouwfeest Pakketten",
                "Voor een onvergetelijke trouwdag");
        pkg(packageRepo, trouw, "Ceremony Basic", "BASIC",
                "Stijlvolle basisopstelling voor een intieme trouwceremonie tot 50 gasten.",
                new BigDecimal("299.00"), List.of());
        pkg(packageRepo, trouw, "Reception Plus", "PLUS",
                "Complete huwelijksreceptie met decoratie, licht en sfeer voor tot 100 gasten.",
                new BigDecimal("549.00"), List.of());
        pkg(packageRepo, trouw, "Wedding VIP", "VIP",
                "Alles-in-één premium trouwpakket met exclusieve decoratie en sound voor tot 200 gasten.",
                new BigDecimal("999.00"), List.of());
    }

    private Item item(ItemRepository repo, Category category, String name, String description,
                      BigDecimal pricePerDay, BigDecimal pricePerWeekend, BigDecimal pricePerWeek,
                      BigDecimal deposit, int stock) {
        Item i = new Item();
        i.setName(name);
        i.setDescription(description);
        i.setPricePerDay(pricePerDay);
        i.setPricePerWeekend(pricePerWeekend);
        i.setPricePerWeek(pricePerWeek);
        i.setDeposit(deposit);
        i.setStock(stock);
        i.setIsAvailable(true);
        i.setCategory(category);
        return repo.save(i);
    }

    private void updateImageUrls(ItemRepository itemRepo) {
        Map<String, String> images = Map.ofEntries(
            Map.entry("QSC K12.2",               "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_41/412319/12133622_800.jpg"),
            Map.entry("QSC KS8.2",               "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_41/412300/12133462_800.jpg"),
            Map.entry("QSC KS118",               "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_47/475495/14546523_800.jpg"),
            Map.entry("Showtec Phantom 250 Spot","https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_57/571784/18427382_800.jpg"),
            Map.entry("Showtec Expression 5000", "https://static.bax-shop.nl/image/product/35556/151335/aa747af7/450x450/Showtec_Expression_50000_LED_movinghead_angle.jpg"),
            Map.entry("Beamz Panther 35 LED",    "https://www.beamzlighting.com/wp-content/uploads/2019/07/150459_temp1-986x1500.jpg"),
            Map.entry("Expolite Tourbar 64",     "https://images.prolighting.de/imagesshop/webpXL/LED22115_1.jpg"),
            Map.entry("Algam Barwas 36",         "https://algam-lighting.com/36889-large_default/barwash-36-ii.jpg"),
            Map.entry("Fog Furt Jett ADJ",       "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_35/353583/11710233_800.jpg")
        );
        itemRepo.findAll().forEach(item -> {
            String url = images.get(item.getName());
            if (url != null && !url.equals(item.getImageUrl())) {
                item.setImageUrl(url);
                itemRepo.save(item);
            }
        });
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
