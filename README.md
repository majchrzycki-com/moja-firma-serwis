# moja-firma-serwis

**Agent zgłoszeń serwisowych dla polskiej firmy: usługi techniczne i serwisowe.** Przypina zgłoszenia do urządzeń i umów SLA, liczy terminy reakcji w godzinach obsługi, scala duplikaty i proponuje dyspozytorowi kolejność obsługi.

Pakiet branżowy paczki [moja-firma](https://github.com/majchrzycki-com/moja-firma). Procedura w formacie [Agent Skills](https://agentskills.io/specification) (`SKILL.md`) działa w Anthropic Claude, OpenAI ChatGPT i OpenAI Codex, Microsoft 365 Copilot, Google Gemini oraz OpenClaw.

## Czego agent nie zrobi

Nie przydzieli technika i nie poinformuje klienta o terminie wizyty. Kolejność, którą proponuje, jest propozycją dla dyspozytora; o tym, czy jechać w nocy do usterki, którą klient sam nazwał „nie pilną”, choć umowa 24/7 tego nie rozróżnia, decyduje człowiek. Czy przyjąć klienta bez umowy i na jakich warunkach, rozstrzyga kierownik serwisu. Agent pokazuje, co jest w umowie i ile zostało do terminu, żeby te decyzje zapadły na danych, a nie na tym, kto głośniej dzwonił.

Nie zastąpi też porządku w kartotece. Jeśli urządzenia u klientów nie mają numerów seryjnych nigdzie poza zdjęciami w telefonach techników, agent nie ma do czego przypiąć zgłoszenia — i to jest najczęstszy powód, dla którego pierwsze podejście kończy się tabelą pełną „brak w kartotece”. W prawdziwej firmie zacznijcie od jednego arkusza z parkiem urządzeń: numer seryjny, model, klient, obiekt, umowa. Dopiero potem agent.

## Wypróbuj na danych ćwiczeniowych

W katalogu [`dane-cwiczeniowe/`](dane-cwiczeniowe/) są fikcyjne dane firmy: `umowy.csv`, `umowy.xlsx`, `urzadzenia.csv`, `urzadzenia.xlsx`, `zgloszenia.csv`, `zgloszenia.xlsx`. Pliki XLSX i CSV mają tę samą treść.

1. Zainstaluj procedurę `zgloszenie-serwisowe` (niżej).
2. Dodaj pliki ćwiczeniowe do wiedzy agenta albo załącz je do rozmowy.
3. Napisz:

```text
Dziś jest poniedziałek 7.09.2026, godzina 9:30. W załączniku zgłoszenia z ostatniej doby. Przeprowadź triage według instrukcji projektu, licząc kodem na plikach z wiedzy.
```

4. Porównaj odpowiedź z [WYNIK-KONTROLNY.md](WYNIK-KONTROLNY.md). Jest tam też „krok z rzeczywistością”: jedna zmiana w danych i wynik, który agent powinien po niej pokazać.

## Instalacja

### Anthropic Claude Code

```text
/plugin marketplace add majchrzycki-com/moja-firma
/plugin install moja-firma-serwis@moja-firma
```

### Pozostałe narzędzia

```bash
node scripts/build.mjs
```

Skrypt tworzy `dist/skills/` dla Anthropic Claude, OpenAI Codex, OpenClaw i Microsoft 365 Copilot Cowork oraz `dist/instrukcje/` z tekstem do wklejenia w agencie Microsoft 365 Copilot, Gemie Google Gemini albo projekcie OpenAI ChatGPT. Szczegóły instalacji w każdym narzędziu: [README rdzenia moja-firma](https://github.com/majchrzycki-com/moja-firma#instalacja).

## Ten sam agent krok po kroku

- [Agent zgłoszeń serwisowych w Anthropic Claude](https://majchrzycki.com/blog/agent-zgloszen-serwisowych-w-claude-krok-po-kroku?utm_source=github&utm_medium=referral&utm_campaign=moja-firma&utm_content=zgloszenie-serwisowe)
- [Agent zgłoszeń serwisowych w Microsoft 365 Copilot](https://majchrzycki.com/blog/agent-zgloszen-serwisowych-w-microsoft-365-copilot-krok-po-kroku?utm_source=github&utm_medium=referral&utm_campaign=moja-firma&utm_content=zgloszenie-serwisowe)
- [Agent zgłoszeń serwisowych w OpenAI ChatGPT](https://majchrzycki.com/blog/agent-zgloszen-serwisowych-w-chatgpt-krok-po-kroku?utm_source=github&utm_medium=referral&utm_campaign=moja-firma&utm_content=zgloszenie-serwisowe)
- [Agent zgłoszeń serwisowych w Google Gemini](https://majchrzycki.com/blog/agent-zgloszen-serwisowych-w-gemini-krok-po-kroku?utm_source=github&utm_medium=referral&utm_campaign=moja-firma&utm_content=zgloszenie-serwisowe)

Gdzie ten agent mieści się w całej firmie i jakich jeszcze agentów potrzebuje usługi techniczne i serwisowe: [darmowy poradnik branżowy](https://majchrzycki.com/transformacja-agenci-ai/uslugi-techniczne-i-serwisowe?utm_source=github&utm_medium=referral&utm_campaign=moja-firma&utm_content=zgloszenie-serwisowe#pobierz).

## Na własnych danych

Zacznij od procedury `kontrola-danych` z rdzenia moja-firma na eksporcie z Waszego programu. Jeśli kolumny nazywają się inaczej, agent pokaże przypisanie i poprosi o potwierdzenie. Pierwszy tydzień puść agenta obok normalnej pracy jednej osoby i porównuj wyniki.

Procedura nie jest poradą prawną, podatkową ani handlową. Wynik sprawdza osoba, która za niego odpowiada.

## Licencja

[MIT](LICENSE), dla procedur, skryptów i danych ćwiczeniowych.

Autor: [Krzysztof Majchrzycki](https://majchrzycki.com/o-mnie?utm_source=github&utm_medium=referral&utm_campaign=moja-firma&utm_content=zgloszenie-serwisowe), wdrożenia AI w polskich firmach.

---

**English:** moja-firma-serwis is an industry pack of the open [moja-firma](https://github.com/majchrzycki-com/moja-firma) Agent Skills for Polish SMBs. It contains one `SKILL.md` procedure (in Polish), fictional practice data and expected results. MIT licence.
