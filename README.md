# KAJ - Tower Defense

## Popis
Klasická tower defense hra. Umožňuje hráč umístit věže různě po mapě. Úkolem je umístit věže tak, aby ubránily kuličky pohybující po vyznačené trasy k cíli. Každé věže mají své vlastní vlastnosti (rozsah, poškození). Každá kulička mají určitý počet životů, pokud jeho počet životů klesne pod nulou, kulička z trasy zmizí. Za každou setřílenou kuličku dostane hráč 1 bod. Cílem je dostat co nejvíce bodů.

## Ovládání

### Start Page

Hráč může zadávat své jméno a stiskne tlačítko **start game**
Show tutorial zobrazí video tutoriál

### Game Page

Přetáhnutím jednotlivé věže z levé menu na dané místo v canvasu umístí hráč věž na mapu
Přejetí myší po jednolivé věže, zobrazí hráč jeho vlastnosti
**Next Wave** - vygeneruje 1 vlna kuliček
**Reset** - resetovat hra na začátku
**Audio** - vypnout zvuk hry
**Back to menu** - vrátí na Start Page

### Game Over Page

**Restart** - restartuje hra
**Exit game** - vrátí na Start Page

## Implementace

Hra je implementována v Javascriptu, veškeré objekty hry jsou vykreslovány pomocí canvasu.
HTML a CSS - pro GUI, animace

## Instalace

Spustit index.html pomocí Liveserver

