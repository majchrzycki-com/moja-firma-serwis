# Wynik kontrolny: agent zgłoszeń serwisowych

Liczby poniżej policzono niezależnie z plików w katalogu `dane-cwiczeniowe/`. Jeśli agent oddaje inne wartości, procedura nie działa poprawnie w Waszym narzędziu.

## Sprawdź wynik na danych kontrolnych

Porównaj odpowiedź z tabelą poniżej. Terminy policzyliśmy niezależnie z tych samych plików. Siódmy września 2026 to poniedziałek, szósty — niedziela.

| Zgłoszenie | Urządzenie | Klient / umowa | Priorytet | Start zegara | Termin reakcji | Uwaga agenta |
|---|---|---|---|---|---|---|
| Z-001 | PK-44120 lub PK-44121 | K-021 / U-2024-11 (Złoty, 4 h, 24/7) | krytyczny — produkcja stoi | 7.09 06:40 | 7.09 10:40 | dwa piece tego samego modelu w obiekcie — do dopytania; weszło telefonem do technika |
| Z-002 | BR-1092 | K-034 / U-2025-03 (Srebrny, 8 h, pn–pt 7–19) | wysoki — rampa nieczynna | 7.09 07:55 | 7.09 15:55 | piąte zgłoszenie w 12 miesięcy — zalecenie wymiany fotokomórki, do kierownika serwisu |
| Z-003 | CH-7790 | K-041 / U-2025-09 (Złoty, 4 h, 24/7) | krytyczny — temperatura produktu | 7.09 08:12 | 7.09 12:12 | alarm automatyczny — potwierdzić telefonicznie u klienta |
| Z-004 | DZ-5510 | K-008 / U-2023-07 (Brązowy, 24 h, pn–pt 8–16) | wysoki — dźwig pod dozorem, nikt nie uwięziony | 7.09 08:30 | 10.09 08:30 | rozliczenie za zlecenie — wycena przed wyjazdem; uprawnienia dźwigowe |
| Z-005 | jak Z-001 | K-021 / U-2024-11 | duplikat Z-001 | 7.09 06:40 | 7.09 10:40 | to samo zdarzenie innym kanałem — scalić ze Z-001 |
| Z-006 | brak w kartotece | brak umowy | poza umową | — | — | nowy klient — przyjąć za zlecenie z wyceną albo odmówić: kierownik serwisu |
| Z-007 | WZ-3300 | K-034 / U-2025-03 | przegląd planowy | — | termin przeglądu do końca września 2026 | zaplanować w oknie klienta z zestawem części; bez zegara awarii |
| Z-008 | WZ-3312 | K-041 / U-2025-09 (Złoty, 4 h, 24/7) | normalny — komfort | 6.09 23:50 | 7.09 03:50 | termin minął, zanim ktokolwiek przeczytał maila; „nie pilne” klienta nie zmienia SLA — decyzja dyspozytora |

Prawidłowa kolejność to **Z-003, Z-001 (ze scalonym Z-005), Z-002, Z-008, Z-004, Z-007, Z-006**. Komora chłodnicza idzie przed piecem, choć jej termin jest późniejszy, bo piekarnia czeka na odpowiedź, który piec stanął. Z-008 ląduje przed dźwigiem, bo jego termin już minął — niedzielny mail o 23:50 na umowie 24/7 to jedyne zgłoszenie z poranka, które jest przeterminowane, zanim dyspozytor usiadł do biurka. Dźwig ma czas do czwartku, bo umowa Brązowa liczy dobę reakcji tylko w godzinach 8–16 od poniedziałku do piątku.

Jeśli w tabeli Z-004 ma termin we wtorek, agent policzył dobę kalendarzową zamiast godzin obsługi. Jeśli Z-005 jest osobnym wierszem z własnym zegarem od 08:41, agent nie scalił duplikatu — a to oznacza dwa zlecenia i dwóch techników do jednego pieca. Jeśli liczby się nie zgadzają, sprawdź, czy rzeczywiście liczył kodem.

## Krok z rzeczywistością

Umowy się zmieniają, a agent musi to zauważyć bez zmiany instrukcji. Otwórz `umowy.xlsx`, w wierszu U-2023-07 (Hotel Pod Dębami) zmień godziny obsługi z `pn–pt 8:00–16:00` na `24/7`, zapisz i podmień plik w wiedzy projektu.

Zadaj w nowej rozmowie to samo pytanie. Termin reakcji dla Z-004 powinien przesunąć się z czwartku 10.09 08:30 na **wtorek 8.09 08:30**: ta sama doba reakcji, ale liczona kalendarzowo. Kolejność nie powinna się zmienić — dźwig nadal ma termin w kolejnym dniu, więc zostaje za zgłoszeniami z dzisiejszym i przekroczonym terminem.

Jedna komórka w umowie przesunęła termin o dwa dni. Właśnie dlatego godziny obsługi mają być w zapisie przy umowie, a nie w pamięci dyspozytora.
