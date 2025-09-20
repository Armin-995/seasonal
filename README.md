# Was ist wild und in Saison?

Eine wunderschöne, moderne statische Website, die Besuchern zeigt, welche wilden Früchte und Kräuter derzeit in Saison sind. Mit einer naturinspirierten Gestaltung mit abstrakten Elementen und einer umfassenden Admin-Oberfläche zur Verwaltung saisonaler Elemente.

## Features

- 🌿 **Saisonale Anzeige**: Zeigt automatisch an, was derzeit in Saison ist, basierend auf dem gewählten Monat
- 🎨 **Naturinspirierte Gestaltung**: Bunte, abstrakte Gestaltung mit schwebenden Elementen und organischen Formen
- 📱 **Responsive Layout**: Funktioniert perfekt auf allen Geräten
- 🖼️ **Bildunterstützung**: Jedes Element kann sein eigenes Bild haben (mit Emoji-Fallback)
- 🔧 **Admin-Oberfläche**: Benutzerfreundliche Admin-Oberfläche zum Hinzufügen/Bearbeiten saisonaler Elemente
- 💾 **Local Storage**: Daten werden im Browser-LocalStorage gespeichert (kein Server erforderlich!)
- 🚀 **Statische Website**: Kein Server erforderlich - einfach HTML-Dateien in jedem Browser öffnen
- 🇩🇪 **Deutsche Sprache**: Vollständig auf Deutsch übersetzt
- 📊 **Tabellen-Layout**: Übersichtliche Tabellenansicht mit allen wichtigen Informationen
- 📖 **Blog-Style Seiten**: Individuelle Detailseiten für jedes Element mit umfassenden Informationen
- 🔍 **Zoom-Funktionalität**: Bilder können vergrößert und in Galerie-Ansicht betrachtet werden
- 📝 **Detaillierte Inhalte**: Rezepte, Verwechslungsmöglichkeiten, Fundorte und Saison-Informationen
s
## Screenshots

Die Anwendung bietet:
- Schöne Hero-Sektion mit Monats- und Länderauswahl
- Tabellen-Layout für saisonale Elemente mit Hover-Effekten
- Kategorie-Badges (Früchte, Kräuter, Nüsse, Pilze)
- Admin-Panel mit Formular zum Hinzufügen neuer Elemente
- Responsive Design, das auf allen Bildschirmgrößen funktioniert
- Instagram-Links im Footer

## Technologie-Stack

- **Frontend**: Reines HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Benutzerdefiniertes CSS mit naturinspirierter Farbpalette
- **Animationen**: CSS-Animationen und JavaScript-Interaktionen
- **Datenspeicherung**: Browser LocalStorage (keine Datenbank erforderlich!)
- **Deployment**: Statische Dateien - funktioniert auf jedem Webserver oder lokal

## Installation & Setup

### Lokale Entwicklung

1. **Projektdateien herunterladen**

2. **Website öffnen**:
   - Einfach `index.html` in jedem modernen Webbrowser öffnen
   - Oder mit einem lokalen Webserver bereitstellen:
     ```bash
     # Mit Python
     python -m http.server 8000
     
     # Mit Node.js
     npx serve .
     
     # Mit PHP
     php -S localhost:8000
     ```

3. **Admin-Oberfläche zugreifen**:
   - `admin.html` in Ihrem Browser öffnen
   - Saisonale Elemente hinzufügen, bearbeiten oder löschen
   - Änderungen werden automatisch im LocalStorage gespeichert

### Webserver-Deployment

Da dies eine statische Website ist, können Sie sie auf jedem Webserver bereitstellen:

1. **Dateien hochladen** auf Ihren Webserver
2. **Stellen Sie sicher, dass beide Dateien** (`index.html` und `admin.html`) zugänglich sind
3. **Das war's!** Keine serverseitige Konfiguration erforderlich

## Projektstruktur

```
seasonal/
├── index.html              # Hauptwebsite (standalone HTML-Datei)
├── admin.html              # Admin-Panel (standalone HTML-Datei)
├── style.css               # Hauptstylesheet
├── script.js               # JavaScript-Funktionalität
└── README.md               # Diese Datei
```

## Verwendung

### Für Besucher

1. Öffnen Sie `index.html` in Ihrem Browser
2. Wählen Sie ein Land (aktuell nur Deutschland verfügbar)
3. Wählen Sie einen Monat aus dem Dropdown-Menü
4. Sehen Sie, welche wilden Früchte und Kräuter in diesem Monat verfügbar sind
5. **Klicken Sie auf den Namen einer Pflanze** um zur Detailseite zu gelangen
6. **Betrachten Sie die Bilder** - klicken Sie auf sie zum Vergrößern
7. Erfahren Sie mehr über Standorte, Nutzen, Rezepte und Verwechslungsmöglichkeiten

### Blog-Style Detailseiten

Jede Pflanze hat eine eigene Detailseite mit:
- **Bildergalerie**: Alle 3 Bilder in großer Ansicht mit Zoom-Funktionalität
- **Detaillierte Beschreibung**: Umfassende Informationen über die Pflanze
- **Fundorte**: Wo und wie Sie die Pflanze finden können
- **Saison-Informationen**: Wann die Pflanze verfügbar ist
- **Rezepte**: Praktische Anwendungen und Zubereitungsarten
- **Verwechslungsmöglichkeiten**: Sicherheitshinweise und ähnliche Pflanzen

### Für Administratoren

1. Öffnen Sie `admin.html` in Ihrem Browser
2. Fügen Sie neue saisonale Elemente hinzu mit:
   - Name und Beschreibung
   - Kategorie (Früchte, Kräuter, Nüsse, Pilze)
   - Monat der Verfügbarkeit
   - Reifezeitpunkt
   - Standort
   - Grund zum Sammeln
3. Löschen Sie vorhandene Elemente nach Bedarf
4. Alle Änderungen werden automatisch im LocalStorage gespeichert
5. Aktualisieren Sie `index.html`, um Ihre Änderungen zu sehen

## Datenverwaltung

### Wie Daten gespeichert werden

- Alle Daten werden im Browser-LocalStorage gespeichert
- Jeder Browser verwaltet seine eigenen Daten
- Daten bleiben zwischen Sitzungen erhalten
- Kein Server oder Datenbank erforderlich

### Daten zurücksetzen

Um zu den Standarddaten zurückzukehren:
1. Browser-Entwicklertools öffnen (F12)
2. Zum Application/Storage-Tab gehen
3. LocalStorage finden und den `seasonal_items`-Eintrag löschen
4. Seite aktualisieren

### Daten zwischen Geräten teilen

Da Daten lokal gespeichert werden, müssen Sie Daten manuell zwischen Geräten kopieren:
1. Daten von einem Gerät exportieren (aus LocalStorage kopieren)
2. Daten auf einem anderen Gerät importieren (in LocalStorage einfügen)

## Anpassung

### Farben und Design

Das Design verwendet eine naturinspirierte Farbpalette:
- **Frühling**: Frische Grüntöne und Gelbtöne
- **Sommer**: Warme Orangetöne und helles Grün
- **Herbst**: Reiche Orangetöne und Lila
- **Winter**: Kühle Blautöne und Grautöne

### Neue Kategorien hinzufügen

Um neue Kategorien hinzuzufügen, bearbeiten Sie die `admin.html`-Datei und fügen Sie Optionen zum Kategorie-Dropdown hinzu.

### Design modifizieren

Das CSS ist in externe Dateien aufgeteilt und in logische Abschnitte organisiert:
- Hintergrundelemente und Animationen
- Layout und Typografie
- Komponenten-Styles (Karten, Formulare, Tabellen)
- Responsive Design-Regeln

## Beispiel-Daten

Die Anwendung kommt mit Beispieldaten für häufige wilde Früchte und Kräuter in Deutschland:

### Januar
- Wacholderbeeren, Fichtennadeln, Birkenwasser, Efeu, Kiefernnadeln, Mistel, Tannenknospen, Lärchennadeln, Eichenrinde, Weidenrinde

### Februar
- Haselnussblüten, Erlenkätzchen, Weidenkätzchen, Schneeglöckchen, Krokus, Winterlinge, Christrosen, Mahonien, Zaubernuss, Kornelkirsche

### März
- Bärlauch, Löwenzahn, Brennnessel, Giersch, Gundermann, Scharbockskraut, Huflattich, Vogelmiere, Gänseblümchen, Sauerampfer

### April
- Waldmeister, Gundelrebe, Spitzwegerich, Breitwegerich, Schafgarbe, Wiesenkerbel, Wiesenbärenklau, Wiesenknopf, Wiesenmargerite, Wiesenkümmel

### Mai
- Maiglöckchen, Waldmeister, Holunderblüten, Lindenblüten, Robinienblüten, Flieder, Löwenzahn, Gänseblümchen, Sauerampfer, Brennnessel

### Juni
- Holunderblüten, Lindenblüten, Wildrose, Kamille, Schafgarbe, Spitzwegerich, Breitwegerich, Gundelrebe, Wiesenkerbel, Wiesenbärenklau

### Juli
- Brombeeren, Himbeeren, Johannisbeeren, Stachelbeeren, Waldmeister, Kamille, Schafgarbe, Spitzwegerich, Breitwegerich, Gundelrebe

### August
- Brombeeren, Himbeeren, Johannisbeeren, Stachelbeeren, Holunderbeeren, Schlehen, Hagebutten, Ebereschen, Kornelkirschen, Wildbirnen

### September
- Brombeeren, Holunderbeeren, Schlehen, Hagebutten, Ebereschen, Kornelkirschen, Wildbirnen, Wildäpfel, Walnüsse, Haselnüsse

### Oktober
- Hagebutten, Wildäpfel, Walnüsse, Haselnüsse, Kastanien, Eicheln, Bucheckern, Schlehen, Holunderbeeren, Brombeeren

### November
- Kastanien, Eicheln, Bucheckern, Walnüsse, Haselnüsse, Hagebutten, Wacholderbeeren, Fichtennadeln, Efeu, Kiefernnadeln

### Dezember
- Wacholderbeeren, Fichtennadeln, Efeu, Kiefernnadeln, Mistel, Lärchennadeln, Eichenrinde, Weidenrinde, Kastanien, Walnüsse

## Browser-Unterstützung

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Vorteile des statischen Ansatzes

- **Kein Server erforderlich**: Funktioniert auf jedem Webserver oder lokal
- **Schnelles Laden**: Keine serverseitige Verarbeitung
- **Einfaches Deployment**: Einfach HTML-Dateien hochladen
- **Offline-fähig**: Funktioniert ohne Internetverbindung
- **Keine Abhängigkeiten**: Kein Python, Node.js oder Datenbank-Setup erforderlich
- **Sicher**: Keine serverseitigen Sicherheitslücken
- **Kosteneffektiv**: Kann auf kostenlosen statischen Hosting-Diensten gehostet werden

## Beitragen

Gerne können Sie Issues, Feature-Requests oder Pull-Requests einreichen, um die Anwendung zu verbessern.

## Lizenz

Dieses Projekt ist Open Source und unter der MIT-Lizenz verfügbar.

## Support

Da dies eine statische Website ist, gibt es keine serverseitigen Probleme zu debuggen. Falls Sie Probleme haben:
1. Browser-Konsole auf JavaScript-Fehler überprüfen
2. Stellen Sie sicher, dass Sie einen modernen Browser verwenden
3. Versuchen Sie, den LocalStorage zu löschen und die Seite zu aktualisieren