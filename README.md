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
| `index.html` | Početna: hero sa SVG telefonom, mreža ponude (8 „signal chip" kartica), zašto mi, proces servisa, brendovi, utisci |
| `ponuda.html` | Detaljna ponuda i usluge, cenovnik servisa (okvirno), „kako ide servis" u 4 koraka, vodič za procenu stanja pri otkupu |
| `o-nama.html` | O radnji, čemu dajemo prednost, utisci |
| `kontakt.html` | Radno vreme, Google Maps embed, kontakt formular sa JS validacijom |
| `styles.css` | Zajednički stil za sve stranice |
| `main.js` | Sticky header, mobilni meni, scroll reveal, hero animacija, validacija formulara |
| `assets/` | `favicon.svg`, `og-image.svg` |

## Napomene za vlasnika pre objave

- **Radno vreme** nije zvanično potvrđeno. Trenutno je unet razuman placeholder
  (Pon–Pet 09–20h, Subota 09–15h, Nedelja ne radi). Označeno je HTML komentarom
  u `kontakt.html` i u footeru svake stranice — proveriti i ispraviti.
- **Cene servisa** u `ponuda.html` su okvirne; uskladiti sa aktuelnim cenovnikom.
- Kontakt formular ne šalje podatke serveru — prikazuje samo lokalno „uspešno"
  stanje. Za produkciju povezati sa backendom ili servisom za slanje mejlova.
- `og:image` i `canonical` koriste `https://www.xlmobil.rs/` kao placeholder domen —
  zameniti stvarnim domenom.

## Fotografije

Sve fotografije su sa Unsplash-a (besplatne za korišćenje), sa autorstvom
navedenim u HTML komentaru iznad svake `<img>`. Korišćene su 3 fotografije.

## Pristupačnost

- Skip link, vidljivi focus okviri na svim interaktivnim elementima
- `aria-current="page"` na aktivnoj stavci navigacije
- Sva polja formulara imaju povezan `<label for>` i poruke greške preko `aria-live`
- Poštuje `prefers-reduced-motion` — sve animacije i reveal efekti se gase
