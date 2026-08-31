# XL Mobil — sajt

Marketing sajt za XL Mobil, prodaju i servis mobilnih telefona u Loznici.
Čist HTML, CSS i vanilla JavaScript — bez frejmvorka, bez build koraka.

## Pokretanje lokalno

**Najlakše:** dvoklik na `index.html` — sajt radi direktno iz fajl sistema.

**Preko lokalnog servera** (preporučeno, da Google Maps iframe i relativne putanje rade bez ograničenja):

```bash
# Python 3
python -m http.server 8000
# pa otvoriti http://localhost:8000
```

ili

```bash
npx serve .
```

## Struktura

| Fajl | Sadržaj |
|------|---------|
| `index.html` | Početna: hero sa fotografijom radnje, mreža ponude (6 „signal chip" kartica), zašto mi, proces servisa, brendovi, utisci |
| `ponuda.html` | Detaljna ponuda i usluge, cenovnik servisa (okvirno), „kako ide servis" u 4 koraka, vodič za procenu stanja pri otkupu |
| `o-nama.html` | O radnji, čemu dajemo prednost, utisci |
| `kontakt.html` | Radno vreme, Google Maps embed, kontakt formular sa JS validacijom |
| `styles.css` | Zajednički stil za sve stranice |
| `main.js` | Sticky header, mobilni meni, scroll reveal, hero animacija, validacija formulara |
| `assets/` | `favicon.svg`, `og-image.svg`, `SlikaRadnje.jpeg` (glavna fotografija na početnoj — vidi ispod) |

## Napomene za vlasnika pre objave

- **Radno vreme** uneto po dogovoru sa vlasnikom: Pon–Pet 09–17h, subota 10–15h,
  nedeljom ne radimo. Menja se u footeru svake stranice i u tabeli u `kontakt.html`.
- **Cene servisa** u `ponuda.html` su okvirne; uskladiti sa aktuelnim cenovnikom.
- Kontakt formular ne šalje podatke serveru — prikazuje samo lokalno „uspešno"
  stanje. Za produkciju povezati sa backendom ili servisom za slanje mejlova.
- `og:image` i `canonical` koriste `https://www.xlmobil.rs/` kao placeholder domen —
  zameniti stvarnim domenom.

## Fotografije

### Glavna fotografija na početnoj strani

Hero sekcija na `index.html` ima rezervisano mesto za vašu fotografiju. Da biste je
ubacili, dovoljno je da sliku sačuvate kao **`assets/SlikaRadnje.jpeg`** — ništa se ne menja
u kodu. Preporuka: portretna orijentacija oko **4:5** (npr. 1200×1500 px), do ~400 KB.

Dok taj fajl ne postoji, na tom mestu se prikazuje isprekidani okvir sa uputstvom,
pa se odmah vidi gde slika ide. Ako želite drugo ime ili format (npr. `.webp`),
promenite `src` i `alt` u bloku označenom komentarom `MESTO ZA FOTOGRAFIJU` u
`index.html`.

Ostale fotografije su sa Unsplash-a (besplatne za korišćenje), sa autorstvom
navedenim u HTML komentaru iznad svake `<img>`.

## Pristupačnost

- Skip link, vidljivi focus okviri na svim interaktivnim elementima
- `aria-current="page"` na aktivnoj stavci navigacije
- Sva polja formulara imaju povezan `<label for>` i poruke greške preko `aria-live`
- Poštuje `prefers-reduced-motion` — sve animacije i reveal efekti se gase
