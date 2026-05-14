# ZYVENTO Feestverhuur — Claude Code Context

## Project

ZYVENTO is een echte feestverhuur-website voor België (Jordy's bedrijf). Communiceer altijd in het **Nederlands**. Jordy is geen developer.

**GitHub:** https://github.com/DiegoRepos/feestverhuur  
**Git user:** DiegoRepos / DiegoRussottoPXL

---

## Stack

- **Frontend:** Angular 17+ (standalone components) + Tailwind CSS + Angular Material
- **Backend:** Spring Boot 3.5.0 + PostgreSQL
- **Deployment:** Railway (backend) + Vercel (frontend, nog te doen) + Combell DNS (nog te doen)

---

## Opstarten (lokaal)

**Backend** (in eigen PowerShell-venster):
```
cd backend
mvnw clean package -DskipTests
java -jar target\backend-0.0.1-SNAPSHOT.jar --spring.config.location=file:src/main/resources/application.properties
```

**Frontend** (in eigen PowerShell-venster):
```
cd frontend
npm start
```

> Gebruik altijd `Start-Process powershell` om beide in een apart zichtbaar venster te starten.

### application.properties (NIET in git)
```
spring.datasource.url=jdbc:postgresql://localhost:5432/feestverhuur
spring.datasource.username=postgres
spring.datasource.password=admin
spring.mail.username=gamzeh8@gmail.com
spring.mail.password=yssf pbzg dyjs smuy
jwt.secret=feestverhuurSuperSecretKeyMinimum32CharactersLong!
admin.username=admin
admin.password=ChangeMe123!
app.base-url=http://localhost:4200
```

---

## Design — Dark Theme

- **Pagina achtergrond:** `#07071a`
- **Footer:** `#0f0a2e` (dark purple)
- **Hero secties:** class `hero-dark` met radial gradient spotlights
- **H1:** `text-white` | Subtitles: `text-blue-300` | Muted: `text-gray-400` | Accent/links: `text-blue-400`
- **Cards:** class `dark-card`
- **Knoppen:** `bg-blue-600 hover:bg-blue-700` (primary) of `border border-white/30` (outline)
- Nooit lichte achtergronden op publieke pagina's

### Verplichte page-wrapper
```html
<div class="bg-[#07071a] min-h-screen">
```

### Hero sectie patroon
```html
<div class="hero-dark border-b border-white/5">
  <div class="container py-8 relative z-10">  <!-- z-10 is VERPLICHT -->
```
`relative z-10` is verplicht — anders blokkeert het `::before` pseudo-element de klikken op links.

---

## Categorieën

**Pakketten:** KINDERFEEST, SWEET_16, EVENT_STYLING, TROUWFEEST, SIMPLE_PARTY  
**Artikelen:** GELUID, LICHT, EFFECTEN  
**Verborgen overal:** EXTRA

---

## Pagina's (gebouwd)

Home, Pakketten, Artikelen, Contact, Winkelwagen (`/winkelwagen`), Boeking, Package Detail, Item Detail, Payment Success/Cancelled, Verhuurvoorwaarden, Admin (login + pakketten + artikelen + boekingen), Partners overzicht (`/partners`), PeMa Foodtruck detail (`/partners/pema-foodtruck`)

---

## Admin Panel

- Sidebar layout: `w-60 fixed` met ZYVENTO logo + "Admin Panel" badge
- Header en footer zijn **verborgen** op `/admin/**` routes via `isAdminRoute` getter
- Boekingen: stats-rij, statusfilter-knoppen, tabel met status-select per rij
- Artikelen: stock-kleurcodering (groen >2, geel ≤2, rood =0)

---

## Bekende bugs & vaste patronen

### Angular Material — gebruik native HTML
`mat-select` rendert opties onderaan de pagina. `mat-datepicker` opent onder de footer.  
**Altijd vervangen door:** native `<select>` en `<input type="date">`.

### Spring Boot 3.5.0 maven plugin bug
`spring-boot:run` crasht met "Index 6 out of bounds". Gebruik altijd `mvnw clean package` + `java -jar`.

### SecurityConfig patroon
```
login permitAll → /api/admin/** hasRole ADMIN → anyRequest().permitAll()
```
Methode-specifieke matchers werken niet betrouwbaar in deze versie.

### JwtFilter — GEEN @Component
`JwtFilter` heeft geen `@Component`. Wordt handmatig aangemaakt in SecurityConfig.

### combineLatest voor queryParams + API
```typescript
combineLatest([getCategories(), getPackages(), route.queryParams])
```
Voorkomt race conditions.

### Assets locatie
Bestanden staan in `frontend/public/` (NIET in `src/assets/`). Paden zonder leading slash: `partners/pema.jpeg`.

### Product foto's
Witte productachtergronden: container `bg-white` + `mix-blend-multiply` op `<img>` + `object-contain p-1`.

### Cart gedrag
- Pakketten: vaste hoeveelheid 1, geen +/- knoppen
- Artikelen: +/- met stock-limiet (gecapped via `Math.min`)
- Foto's en namen in winkelwagen zijn klikbaar via routerLink

### Rate limiting
Bucket4j beschermt `/api/contact` (5/15min) en `/api/bookings` (10/uur) per IP.

### Mollie (placeholder)
BookingController heeft try-catch rond Mollie. Bij fout: boeking opgeslagen met `checkoutUrl = null`, frontend gaat naar successpagina.

---

## Partners pagina

`/partners` — PeMa Foodtruck (routerLink naar `/partners/pema-foodtruck`) en Wonka Events (href nog op `#`).  
Foto's in `frontend/public/partners/`.

---

## Deployment status

- **Railway:** backend live (Dockerfile + app.jar, Java 21)
- **Vercel:** frontend nog te deployen
- **Combell DNS:** nog te koppelen
