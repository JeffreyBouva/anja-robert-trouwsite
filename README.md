# Trouwsite Robert & Anja

Statische trouwwebsite (29 augustus 2026, De Kruitfabriek Muiden) met wachtwoordbeveiliging via Vercel Edge Middleware. Geen framework, geen build-stap.

## Structuur

- `index.html` — de uitnodiging (programma, locatie, cadeau, RSVP-formulier)
- `login.html` — wachtwoordpagina
- `style.css` — vormgeving (nagebouwde Twenty Twenty-Five-look)
- `middleware.js` — Edge Middleware: zonder geldige cookie word je naar de loginpagina gestuurd
- `api/login.js` — controleert het wachtwoord en zet een httpOnly-cookie (1 jaar geldig)
- `foto.jpg` — de foto op de uitnodiging

## Deployen op Vercel

1. Push deze map naar een (privé) GitHub-repository en importeer hem op [vercel.com/new](https://vercel.com/new), **of** draai `npx vercel` in deze map.
2. Zet in Vercel de omgevingsvariabele in: **Settings → Environment Variables**
   - Naam: `WEDDING_PASSWORD`
   - Waarde: `kruitfabriek2026` (of iets anders — hoofdletters maken niet uit bij het inloggen)
3. Deploy (opnieuw) — klaar.

Zonder `WEDDING_PASSWORD` blijft de site volledig op slot, dus vergeet stap 2 niet.

## RSVP-formulier (Formspree)

Het formulier verstuurt aanmeldingen per e-mail via Formspree:

1. Maak een gratis account op [formspree.io](https://formspree.io) met het e-mailadres waar de aanmeldingen heen moeten.
2. Maak een nieuw formulier aan; je krijgt een ID zoals `xqkrgabc`.
3. Vervang in `index.html` de tekst `JOUW_FORM_ID` door dat ID (regel met `https://formspree.io/f/JOUW_FORM_ID`).

Elke inzending (naam, e-mail, komt wel/niet, opmerkingen, dieetwensen) komt dan als e-mail binnen. In het gratis Formspree-dashboard kun je alle inzendingen ook teruglezen.

## Wachtwoord wijzigen

Pas de waarde van `WEDDING_PASSWORD` aan in Vercel en deploy opnieuw. Gasten die al ingelogd waren moeten dan opnieuw inloggen.
