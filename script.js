// Storage key for seasonal items
const STORAGE_KEY = 'seasonal_items';

// German seasonal items data by month
const germanItems = {
    1: [ // Januar
        { name: 'Wacholderbeeren', category: 'Fruits', ripeness: 'Ganzjährig', location: 'Heidegebiete, Kiefernwälder', whyCollect: 'Für Gin, Gewürze und Heilmittel', images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'] },
        { name: 'Fichtennadeln', category: 'Herbs', ripeness: 'Ganzjährig', location: 'Nadelwälder', whyCollect: 'Vitamin C, Tee, Hustensaft' },
        { name: 'Birkenwasser', category: 'Herbs', ripeness: 'Frühjahr', location: 'Birkenwälder', whyCollect: 'Entgiftung, Mineralstoffe' },
        { name: 'Efeu', category: 'Herbs', ripeness: 'Ganzjährig', location: 'Wälder, Mauern', whyCollect: 'Hustentee, äußerliche Anwendung' },
        { name: 'Kiefernnadeln', category: 'Herbs', ripeness: 'Ganzjährig', location: 'Kiefernwälder', whyCollect: 'Tee, Badezusatz, Inhalation' },
        { name: 'Mistel', category: 'Herbs', ripeness: 'Winter', location: 'Laubbäume', whyCollect: 'Blutdrucksenkend, Immunsystem' },
        { name: 'Tannenknospen', category: 'Herbs', ripeness: 'Frühjahr', location: 'Tannenwälder', whyCollect: 'Hustensaft, Erkältung' },
        { name: 'Lärchennadeln', category: 'Herbs', ripeness: 'Ganzjährig', location: 'Lärchenwälder', whyCollect: 'Vitamin C, Tee' },
        { name: 'Eichenrinde', category: 'Herbs', ripeness: 'Ganzjährig', location: 'Eichenwälder', whyCollect: 'Gerbstoffe, Hautpflege' },
        { name: 'Weidenrinde', category: 'Herbs', ripeness: 'Frühjahr', location: 'Weidenbestände', whyCollect: 'Schmerzmittel, Fieber' }
    ],
    2: [ // Februar
        { name: 'Haselnussblüten', category: 'Herbs', ripeness: 'Februar-März', location: 'Haselsträucher', whyCollect: 'Frühblüher, Pollen für Bienen' },
        { name: 'Erlenkätzchen', category: 'Herbs', ripeness: 'Februar-März', location: 'Erlenbestände', whyCollect: 'Frühblüher, Pollen' },
        { name: 'Weidenkätzchen', category: 'Herbs', ripeness: 'Februar-März', location: 'Weidenbestände', whyCollect: 'Frühblüher, Salicylsäure' },
        { name: 'Schneeglöckchen', category: 'Herbs', ripeness: 'Februar-März', location: 'Gärten, Parks', whyCollect: 'Frühblüher, Zierde' },
        { name: 'Krokus', category: 'Herbs', ripeness: 'Februar-März', location: 'Gärten, Wiesen', whyCollect: 'Frühblüher, Safran-Ersatz' },
        { name: 'Winterlinge', category: 'Herbs', ripeness: 'Februar-März', location: 'Gärten, Parks', whyCollect: 'Frühblüher, Zierde' },
        { name: 'Christrosen', category: 'Herbs', ripeness: 'Winter-Frühjahr', location: 'Gärten, Parks', whyCollect: 'Winterblüher, Zierde' },
        { name: 'Mahonien', category: 'Herbs', ripeness: 'Februar-März', location: 'Gärten, Parks', whyCollect: 'Frühblüher, Vitamin C' },
        { name: 'Zaubernuss', category: 'Herbs', ripeness: 'Winter-Frühjahr', location: 'Gärten, Parks', whyCollect: 'Winterblüher, Hautpflege' },
        { name: 'Kornelkirsche', category: 'Herbs', ripeness: 'Februar-März', location: 'Hecken, Gärten', whyCollect: 'Frühblüher, später Früchte' }
    ],
    3: [ // März
        { name: 'Bärlauch', category: 'Herbs', ripeness: 'März-Mai', location: 'Laubwälder', whyCollect: 'Knoblauchgeschmack, Vitamin C' },
        { name: 'Löwenzahn', category: 'Herbs', ripeness: 'März-Oktober', location: 'Wiesen, Gärten', whyCollect: 'Vitamin C, Bitterstoffe, Tee' },
        { name: 'Brennnessel', category: 'Herbs', ripeness: 'März-September', location: 'Überall', whyCollect: 'Eisen, Vitamin C, Tee' },
        { name: 'Giersch', category: 'Herbs', ripeness: 'März-Oktober', location: 'Gärten, Hecken', whyCollect: 'Vitamin C, Petersilie-Ersatz' },
        { name: 'Gundermann', category: 'Herbs', ripeness: 'März-Oktober', location: 'Wiesen, Hecken', whyCollect: 'Husten, Wundheilung' },
        { name: 'Scharbockskraut', category: 'Herbs', ripeness: 'März-April', location: 'Wälder, Wiesen', whyCollect: 'Vitamin C, Skorbut-Vorbeugung' },
        { name: 'Huflattich', category: 'Herbs', ripeness: 'März-April', location: 'Böschungen, Wegränder', whyCollect: 'Husten, Bronchitis' },
        { name: 'Vogelmiere', category: 'Herbs', ripeness: 'Ganzjährig', location: 'Gärten, Wiesen', whyCollect: 'Vitamin C, Salat, Spinat-Ersatz' },
        { name: 'Gänseblümchen', category: 'Herbs', ripeness: 'März-Oktober', location: 'Wiesen, Gärten', whyCollect: 'Vitamin C, Tee, Salat' },
        { name: 'Sauerampfer', category: 'Herbs', ripeness: 'März-Oktober', location: 'Wiesen, Wegränder', whyCollect: 'Vitamin C, säuerlicher Geschmack' }
    ],
    4: [ // April
        { name: 'Waldmeister', category: 'Herbs', ripeness: 'April-Mai', location: 'Laubwälder', whyCollect: 'Maibowle, Beruhigungsmittel' },
        { name: 'Gundelrebe', category: 'Herbs', ripeness: 'April-Oktober', location: 'Wiesen, Hecken', whyCollect: 'Husten, Wundheilung' },
        { name: 'Spitzwegerich', category: 'Herbs', ripeness: 'April-Oktober', location: 'Wiesen, Wegränder', whyCollect: 'Husten, Wundheilung, Insektenstiche' },
        { name: 'Breitwegerich', category: 'Herbs', ripeness: 'April-Oktober', location: 'Wiesen, Wegränder', whyCollect: 'Husten, Wundheilung' },
        { name: 'Schafgarbe', category: 'Herbs', ripeness: 'April-Oktober', location: 'Wiesen, Wegränder', whyCollect: 'Blutstillend, Verdauung' },
        { name: 'Wiesenkerbel', category: 'Herbs', ripeness: 'April-Juni', location: 'Wiesen, Wegränder', whyCollect: 'Vitamin C, Petersilie-Ersatz' },
        { name: 'Wiesenbärenklau', category: 'Herbs', ripeness: 'April-Juni', location: 'Wiesen, Wegränder', whyCollect: 'Vitamin C, Petersilie-Ersatz' },
        { name: 'Wiesenknopf', category: 'Herbs', ripeness: 'April-Juni', location: 'Wiesen, Wegränder', whyCollect: 'Vitamin C, Tee' },
        { name: 'Wiesenmargerite', category: 'Herbs', ripeness: 'April-Juni', location: 'Wiesen, Wegränder', whyCollect: 'Zierde, Tee' },
        { name: 'Wiesenkümmel', category: 'Herbs', ripeness: 'April-Juni', location: 'Wiesen, Wegränder', whyCollect: 'Verdauung, Gewürz' }
    ],
    5: [ // Mai
        { name: 'Maiglöckchen', category: 'Herbs', ripeness: 'Mai', location: 'Laubwälder', whyCollect: 'Zierde, Duft (Vorsicht: giftig!)' },
        { name: 'Waldmeister', category: 'Herbs', ripeness: 'April-Mai', location: 'Laubwälder', whyCollect: 'Maibowle, Beruhigungsmittel' },
        { name: 'Holunderblüten', category: 'Herbs', ripeness: 'Mai-Juni', location: 'Hecken, Wälder', whyCollect: 'Hustensaft, Tee, Sirup' },
        { name: 'Lindenblüten', category: 'Herbs', ripeness: 'Mai-Juni', location: 'Alleen, Parks', whyCollect: 'Beruhigungsmittel, Tee' },
        { name: 'Robinienblüten', category: 'Herbs', ripeness: 'Mai-Juni', location: 'Alleen, Parks', whyCollect: 'Duft, Tee (Vorsicht: giftig!)' },
        { name: 'Flieder', category: 'Herbs', ripeness: 'Mai', location: 'Gärten, Parks', whyCollect: 'Duft, Zierde' },
        { name: 'Löwenzahn', category: 'Herbs', ripeness: 'März-Oktober', location: 'Wiesen, Gärten', whyCollect: 'Vitamin C, Bitterstoffe, Tee' },
        { name: 'Gänseblümchen', category: 'Herbs', ripeness: 'März-Oktober', location: 'Wiesen, Gärten', whyCollect: 'Vitamin C, Tee, Salat' },
        { name: 'Sauerampfer', category: 'Herbs', ripeness: 'März-Oktober', location: 'Wiesen, Wegränder', whyCollect: 'Vitamin C, säuerlicher Geschmack' },
        { name: 'Brennnessel', category: 'Herbs', ripeness: 'März-September', location: 'Überall', whyCollect: 'Eisen, Vitamin C, Tee' }
    ],
    6: [ // Juni
        { name: 'Holunderblüten', category: 'Herbs', ripeness: 'Mai-Juni', location: 'Hecken, Wälder', whyCollect: 'Hustensaft, Tee, Sirup' },
        { name: 'Lindenblüten', category: 'Herbs', ripeness: 'Mai-Juni', location: 'Alleen, Parks', whyCollect: 'Beruhigungsmittel, Tee' },
        { name: 'Wildrose', category: 'Herbs', ripeness: 'Juni', location: 'Hecken, Wälder', whyCollect: 'Duft, Tee, später Hagebutten' },
        { name: 'Kamille', category: 'Herbs', ripeness: 'Juni-August', location: 'Wiesen, Wegränder', whyCollect: 'Beruhigungsmittel, Tee' },
        { name: 'Schafgarbe', category: 'Herbs', ripeness: 'April-Oktober', location: 'Wiesen, Wegränder', whyCollect: 'Blutstillend, Verdauung' },
        { name: 'Spitzwegerich', category: 'Herbs', ripeness: 'April-Oktober', location: 'Wiesen, Wegränder', whyCollect: 'Husten, Wundheilung, Insektenstiche' },
        { name: 'Breitwegerich', category: 'Herbs', ripeness: 'April-Oktober', location: 'Wiesen, Wegränder', whyCollect: 'Husten, Wundheilung' },
        { name: 'Gundelrebe', category: 'Herbs', ripeness: 'April-Oktober', location: 'Wiesen, Hecken', whyCollect: 'Husten, Wundheilung' },
        { name: 'Wiesenkerbel', category: 'Herbs', ripeness: 'April-Juni', location: 'Wiesen, Wegränder', whyCollect: 'Vitamin C, Petersilie-Ersatz' },
        { name: 'Wiesenbärenklau', category: 'Herbs', ripeness: 'April-Juni', location: 'Wiesen, Wegränder', whyCollect: 'Vitamin C, Petersilie-Ersatz' }
    ],
    7: [ // Juli
        { name: 'Brombeeren', category: 'Fruits', ripeness: 'Juli-September', location: 'Hecken, Wälder', whyCollect: 'Vitamin C, Antioxidantien' },
        { name: 'Himbeeren', category: 'Fruits', ripeness: 'Juli-August', location: 'Hecken, Wälder', whyCollect: 'Vitamin C, Antioxidantien' },
        { name: 'Johannisbeeren', category: 'Fruits', ripeness: 'Juli-August', location: 'Gärten, Hecken', whyCollect: 'Vitamin C, Antioxidantien' },
        { name: 'Stachelbeeren', category: 'Fruits', ripeness: 'Juli-August', location: 'Gärten, Hecken', whyCollect: 'Vitamin C, Antioxidantien' },
        { name: 'Waldmeister', category: 'Herbs', ripeness: 'April-Mai', location: 'Laubwälder', whyCollect: 'Maibowle, Beruhigungsmittel' },
        { name: 'Kamille', category: 'Herbs', ripeness: 'Juni-August', location: 'Wiesen, Wegränder', whyCollect: 'Beruhigungsmittel, Tee' },
        { name: 'Schafgarbe', category: 'Herbs', ripeness: 'April-Oktober', location: 'Wiesen, Wegränder', whyCollect: 'Blutstillend, Verdauung' },
        { name: 'Spitzwegerich', category: 'Herbs', ripeness: 'April-Oktober', location: 'Wiesen, Wegränder', whyCollect: 'Husten, Wundheilung, Insektenstiche' },
        { name: 'Breitwegerich', category: 'Herbs', ripeness: 'April-Oktober', location: 'Wiesen, Wegränder', whyCollect: 'Husten, Wundheilung' },
        { name: 'Gundelrebe', category: 'Herbs', ripeness: 'April-Oktober', location: 'Wiesen, Hecken', whyCollect: 'Husten, Wundheilung' }
    ],
    8: [ // August
        { name: 'Brombeeren', category: 'Fruits', ripeness: 'Juli-September', location: 'Hecken, Wälder', whyCollect: 'Vitamin C, Antioxidantien' },
        { name: 'Himbeeren', category: 'Fruits', ripeness: 'Juli-August', location: 'Hecken, Wälder', whyCollect: 'Vitamin C, Antioxidantien' },
        { name: 'Johannisbeeren', category: 'Fruits', ripeness: 'Juli-August', location: 'Gärten, Hecken', whyCollect: 'Vitamin C, Antioxidantien' },
        { name: 'Stachelbeeren', category: 'Fruits', ripeness: 'Juli-August', location: 'Gärten, Hecken', whyCollect: 'Vitamin C, Antioxidantien' },
        { name: 'Holunderbeeren', category: 'Fruits', ripeness: 'August-September', location: 'Hecken, Wälder', whyCollect: 'Vitamin C, Hustensaft' },
        { name: 'Schlehen', category: 'Fruits', ripeness: 'August-September', location: 'Hecken, Wälder', whyCollect: 'Vitamin C, Likör' },
        { name: 'Hagebutten', category: 'Fruits', ripeness: 'August-Oktober', location: 'Hecken, Wälder', whyCollect: 'Vitamin C, Tee' },
        { name: 'Ebereschen', category: 'Fruits', ripeness: 'August-September', location: 'Wälder, Parks', whyCollect: 'Vitamin C, Marmelade' },
        { name: 'Kornelkirschen', category: 'Fruits', ripeness: 'August-September', location: 'Hecken, Gärten', whyCollect: 'Vitamin C, Marmelade' },
        { name: 'Wildbirnen', category: 'Fruits', ripeness: 'August-September', location: 'Wälder, Hecken', whyCollect: 'Vitamin C, Marmelade' }
    ],
    9: [ // September
        { name: 'Brombeeren', category: 'Fruits', ripeness: 'Juli-September', location: 'Hecken, Wälder', whyCollect: 'Vitamin C, Antioxidantien' },
        { name: 'Holunderbeeren', category: 'Fruits', ripeness: 'August-September', location: 'Hecken, Wälder', whyCollect: 'Vitamin C, Hustensaft' },
        { name: 'Schlehen', category: 'Fruits', ripeness: 'August-September', location: 'Hecken, Wälder', whyCollect: 'Vitamin C, Likör' },
        { name: 'Hagebutten', category: 'Fruits', ripeness: 'August-Oktober', location: 'Hecken, Wälder', whyCollect: 'Vitamin C, Tee' },
        { name: 'Ebereschen', category: 'Fruits', ripeness: 'August-September', location: 'Wälder, Parks', whyCollect: 'Vitamin C, Marmelade' },
        { name: 'Kornelkirschen', category: 'Fruits', ripeness: 'August-September', location: 'Hecken, Gärten', whyCollect: 'Vitamin C, Marmelade' },
        { name: 'Wildbirnen', category: 'Fruits', ripeness: 'August-September', location: 'Wälder, Hecken', whyCollect: 'Vitamin C, Marmelade' },
        { name: 'Wildäpfel', category: 'Fruits', ripeness: 'September-Oktober', location: 'Wälder, Hecken', whyCollect: 'Vitamin C, Marmelade' },
        { name: 'Walnüsse', category: 'Nuts', ripeness: 'September-Oktober', location: 'Gärten, Parks', whyCollect: 'Omega-3, Protein' },
        { name: 'Haselnüsse', category: 'Nuts', ripeness: 'September-Oktober', location: 'Hecken, Gärten', whyCollect: 'Omega-3, Protein' }
    ],
    10: [ // Oktober
        { name: 'Hagebutten', category: 'Fruits', ripeness: 'August-Oktober', location: 'Hecken, Wälder', whyCollect: 'Vitamin C, Tee' },
        { name: 'Wildäpfel', category: 'Fruits', ripeness: 'September-Oktober', location: 'Wälder, Hecken', whyCollect: 'Vitamin C, Marmelade' },
        { name: 'Walnüsse', category: 'Nuts', ripeness: 'September-Oktober', location: 'Gärten, Parks', whyCollect: 'Omega-3, Protein' },
        { name: 'Haselnüsse', category: 'Nuts', ripeness: 'September-Oktober', location: 'Hecken, Gärten', whyCollect: 'Omega-3, Protein' },
        { name: 'Kastanien', category: 'Nuts', ripeness: 'Oktober-November', location: 'Wälder, Parks', whyCollect: 'Kohlenhydrate, Protein' },
        { name: 'Eicheln', category: 'Nuts', ripeness: 'Oktober-November', location: 'Eichenwälder', whyCollect: 'Kohlenhydrate, Protein' },
        { name: 'Bucheckern', category: 'Nuts', ripeness: 'Oktober-November', location: 'Buchenwälder', whyCollect: 'Kohlenhydrate, Protein' },
        { name: 'Schlehen', category: 'Fruits', ripeness: 'August-September', location: 'Hecken, Wälder', whyCollect: 'Vitamin C, Likör' },
        { name: 'Holunderbeeren', category: 'Fruits', ripeness: 'August-September', location: 'Hecken, Wälder', whyCollect: 'Vitamin C, Hustensaft' },
        { name: 'Brombeeren', category: 'Fruits', ripeness: 'Juli-September', location: 'Hecken, Wälder', whyCollect: 'Vitamin C, Antioxidantien' }
    ],
    11: [ // November
        { name: 'Kastanien', category: 'Nuts', ripeness: 'Oktober-November', location: 'Wälder, Parks', whyCollect: 'Kohlenhydrate, Protein' },
        { name: 'Eicheln', category: 'Nuts', ripeness: 'Oktober-November', location: 'Eichenwälder', whyCollect: 'Kohlenhydrate, Protein' },
        { name: 'Bucheckern', category: 'Nuts', ripeness: 'Oktober-November', location: 'Buchenwälder', whyCollect: 'Kohlenhydrate, Protein' },
        { name: 'Walnüsse', category: 'Nuts', ripeness: 'September-Oktober', location: 'Gärten, Parks', whyCollect: 'Omega-3, Protein' },
        { name: 'Haselnüsse', category: 'Nuts', ripeness: 'September-Oktober', location: 'Hecken, Gärten', whyCollect: 'Omega-3, Protein' },
        { name: 'Hagebutten', category: 'Fruits', ripeness: 'August-Oktober', location: 'Hecken, Wälder', whyCollect: 'Vitamin C, Tee' },
        { name: 'Wacholderbeeren', category: 'Fruits', ripeness: 'Ganzjährig', location: 'Heidegebiete, Kiefernwälder', whyCollect: 'Für Gin, Gewürze und Heilmittel' },
        { name: 'Fichtennadeln', category: 'Herbs', ripeness: 'Ganzjährig', location: 'Nadelwälder', whyCollect: 'Vitamin C, Tee, Hustensaft' },
        { name: 'Efeu', category: 'Herbs', ripeness: 'Ganzjährig', location: 'Wälder, Mauern', whyCollect: 'Hustentee, äußerliche Anwendung' },
        { name: 'Kiefernnadeln', category: 'Herbs', ripeness: 'Ganzjährig', location: 'Kiefernwälder', whyCollect: 'Tee, Badezusatz, Inhalation' }
    ],
    12: [ // Dezember
        { name: 'Wacholderbeeren', category: 'Fruits', ripeness: 'Ganzjährig', location: 'Heidegebiete, Kiefernwälder', whyCollect: 'Für Gin, Gewürze und Heilmittel' },
        { name: 'Fichtennadeln', category: 'Herbs', ripeness: 'Ganzjährig', location: 'Nadelwälder', whyCollect: 'Vitamin C, Tee, Hustensaft' },
        { name: 'Efeu', category: 'Herbs', ripeness: 'Ganzjährig', location: 'Wälder, Mauern', whyCollect: 'Hustentee, äußerliche Anwendung' },
        { name: 'Kiefernnadeln', category: 'Herbs', ripeness: 'Ganzjährig', location: 'Kiefernwälder', whyCollect: 'Tee, Badezusatz, Inhalation' },
        { name: 'Mistel', category: 'Herbs', ripeness: 'Winter', location: 'Laubbäume', whyCollect: 'Blutdrucksenkend, Immunsystem' },
        { name: 'Lärchennadeln', category: 'Herbs', ripeness: 'Ganzjährig', location: 'Lärchenwälder', whyCollect: 'Vitamin C, Tee' },
        { name: 'Eichenrinde', category: 'Herbs', ripeness: 'Ganzjährig', location: 'Eichenwälder', whyCollect: 'Gerbstoffe, Hautpflege' },
        { name: 'Weidenrinde', category: 'Herbs', ripeness: 'Frühjahr', location: 'Weidenbestände', whyCollect: 'Schmerzmittel, Fieber' },
        { name: 'Kastanien', category: 'Nuts', ripeness: 'Oktober-November', location: 'Wälder, Parks', whyCollect: 'Kohlenhydrate, Protein' },
        { name: 'Walnüsse', category: 'Nuts', ripeness: 'September-Oktober', location: 'Gärten, Parks', whyCollect: 'Omega-3, Protein' }
    ]
};

// Month names in German
const monthNames = {
    1: 'Januar', 2: 'Februar', 3: 'März', 4: 'April', 5: 'Mai', 6: 'Juni',
    7: 'Juli', 8: 'August', 9: 'September', 10: 'Oktober', 11: 'November', 12: 'Dezember'
};

// Generate placeholder images for items
function generatePlaceholderImages(itemName, category) {
    const baseUrl = 'https://images.unsplash.com/photo-';
    const imageIds = {
        'Fruits': ['1578662996442-48f60103fc96', '1578662996442-48f60103fc96', '1578662996442-48f60103fc96'],
        'Herbs': ['1578662996442-48f60103fc96', '1578662996442-48f60103fc96', '1578662996442-48f60103fc96'],
        'Nuts': ['1578662996442-48f60103fc96', '1578662996442-48f60103fc96', '1578662996442-48f60103fc96'],
        'Mushrooms': ['1578662996442-48f60103fc96', '1578662996442-48f60103fc96', '1578662996442-48f60103fc96']
    };
    
    const ids = imageIds[category] || imageIds['Herbs'];
    return ids.map(id => `${baseUrl}${id}?w=400`);
}

// Generate detailed content for items
function generateDetailedContent(item) {
    // Use stored detailed content if available, otherwise generate default content
    const content = {
        howToFind: item.howToFind || `Um ${item.name} zu finden, suchen Sie in ${item.location}. Die beste Zeit ist ${item.ripeness}.`,
        recipes: item.recipes && item.recipes.length > 0 ? item.recipes : [
            `${item.name}-Tee: Frische Blätter mit heißem Wasser übergießen und 5-10 Minuten ziehen lassen.`,
            `${item.name}-Salat: Junge Blätter mit anderen Wildkräutern mischen und mit Essig-Öl-Dressing anrichten.`,
            `${item.name}-Pesto: Mit Pinienkernen, Parmesan und Olivenöl zu einem cremigen Pesto verarbeiten.`
        ],
        lookalikes: item.lookalikes && item.lookalikes.length > 0 ? item.lookalikes : [
            `Vorsicht vor ähnlich aussehenden Pflanzen! ${item.name} kann mit anderen Pflanzen verwechselt werden.`,
            `Achten Sie auf charakteristische Merkmale wie Blattform, Blütenstand und Geruch.`,
            `Bei Unsicherheit konsultieren Sie einen Experten oder verwenden Sie Bestimmungsbücher.`
        ],
        season: `Saison: ${item.ripeness}. Standort: ${item.location}. Nutzen: ${item.whyCollect}.`,
        description: item.description || `Ausführliche Beschreibung von ${item.name}: Diese Pflanze ist ein wichtiger Bestandteil der deutschen Flora und bietet viele gesundheitliche Vorteile.`
    };
    
    return content;
}

// Add images to all items
Object.keys(germanItems).forEach(month => {
    germanItems[month] = germanItems[month].map(item => ({
        ...item,
        images: item.images || generatePlaceholderImages(item.name, item.category)
    }));
});

// Get current month
function getCurrentMonth() {
    return new Date().getMonth() + 1; // getMonth() returns 0-11, so add 1
}

// Get items for selected month and country
function getItemsForMonth(month, country) {
    if (country === 'germany') {
        return germanItems[month] || [];
    }
    return [];
}

// Create image HTML for table
function createImageHTML(item, imageIndex) {
    const imageUrl = item.images[imageIndex];
    const fallbackEmoji = item.category === 'Fruits' ? '🍓' : item.category === 'Herbs' ? '🌿' : item.category === 'Nuts' ? '🌰' : '🍄';
    
    if (imageUrl) {
        return `
            <img src="${imageUrl}" 
                 alt="${item.name} - Bild ${imageIndex + 1}" 
                 class="item-image" 
                 onclick="openImageModal('${item.name}', ${JSON.stringify(item.images).replace(/"/g, '&quot;')})"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="image-placeholder" style="display: none;">${fallbackEmoji}</div>
        `;
    } else {
        return `<div class="image-placeholder">${fallbackEmoji}</div>`;
    }
}

// Create item page
function createItemPage(item) {
    const detailedContent = generateDetailedContent(item);
    const pageContent = `
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${item.name} - Was ist wild und in Saison?</title>
            <link rel="stylesheet" href="style.css">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        </head>
        <body>
            <!-- Abstract nature background elements -->
            <div class="background-elements">
                <div class="floating-circle circle-1"></div>
                <div class="floating-circle circle-2"></div>
                <div class="floating-circle circle-3"></div>
                <div class="floating-circle circle-4"></div>
                <div class="organic-shape shape-1"></div>
                <div class="organic-shape shape-2"></div>
                <div class="organic-shape shape-3"></div>
            </div>

            <div class="container">
                <header class="hero">
                    <h1 class="main-title">${item.name}</h1>
                    <div class="item-meta">
                        <span class="item-category ${item.category.toLowerCase()}">${item.category}</span>
                        <span class="item-season">${item.ripeness}</span>
                    </div>
                    <a href="index.html" class="back-link">← Zurück zur Hauptseite</a>
                </header>

                <main class="content">
                    <div class="item-detail-container">
                        <!-- Images Gallery -->
                        <section class="images-section">
                            <h2>Bilder</h2>
                            <div class="images-gallery">
                                ${item.images.map((imageUrl, index) => `
                                    <div class="gallery-image-container">
                                        <img src="${imageUrl}" 
                                             alt="${item.name} - Bild ${index + 1}" 
                                             class="gallery-image"
                                             onclick="openFullImage('${imageUrl}', '${item.name} - Bild ${index + 1}')">
                                    </div>
                                `).join('')}
                            </div>
                        </section>

                        <!-- Description -->
                        <section class="description-section">
                            <h2>Beschreibung</h2>
                            <p>${detailedContent.description}</p>
                        </section>

                        <!-- How to Find -->
                        <section class="how-to-find-section">
                            <h2>Wie und wo finden?</h2>
                            <p>${detailedContent.howToFind}</p>
                        </section>

                        <!-- Season Info -->
                        <section class="season-section">
                            <h2>Saison & Standort</h2>
                            <p>${detailedContent.season}</p>
                        </section>

                        <!-- Recipes -->
                        <section class="recipes-section">
                            <h2>Rezepte</h2>
                            <ul>
                                ${detailedContent.recipes.map(recipe => `<li>${recipe}</li>`).join('')}
                            </ul>
                        </section>

                        <!-- Lookalikes -->
                        <section class="lookalikes-section">
                            <h2>Mögliche Verwechslungen</h2>
                            <ul>
                                ${detailedContent.lookalikes.map(lookalike => `<li>${lookalike}</li>`).join('')}
                            </ul>
                        </section>
                    </div>
                </main>

                <footer class="footer">
                    <div class="footer-content">
                        <p>Entdecke die natürliche Fülle um dich herum</p>
                        <div class="social-links">
                            <a href="https://instagram.com/wildesammeln" target="_blank" class="social-link">
                                <span class="social-icon">📷</span>
                                Instagram
                            </a>
                            <a href="https://instagram.com/wildkraeuter" target="_blank" class="social-link">
                                <span class="social-icon">🌿</span>
                                Wildkräuter
                            </a>
                        </div>
                        <a href="admin.html" class="admin-link">Admin</a>
                    </div>
                </footer>
            </div>

            <script src="script.js"></script>
        </body>
        </html>
    `;
    
    return pageContent;
}

// Open item page
function openItemPage(item) {
    const pageContent = createItemPage(item);
    const blob = new Blob([pageContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
}

// Create table HTML
function createItemsTable(items) {
    if (items.length === 0) {
        return `
            <div class="no-items">
                <div class="no-items-icon">🌿</div>
                <h2>Nichts in diesem Monat verfügbar</h2>
                <p>Versuche einen anderen Monat oder Land!</p>
            </div>
        `;
    }

    const tableHTML = `
        <table class="items-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Kategorie</th>
                    <th>Reifezeitpunkt</th>
                    <th>Standort</th>
                    <th>Warum sammeln?</th>
                    <th>Bild 1</th>
                    <th>Bild 2</th>
                    <th>Bild 3</th>
                </tr>
            </thead>
            <tbody>
                ${items.map(item => `
                    <tr>
                        <td class="item-name">
                            <a href="#" onclick="openItemPage(${JSON.stringify(item).replace(/"/g, '&quot;')}); return false;" class="item-link">
                                ${item.name}
                            </a>
                        </td>
                        <td><span class="item-category ${item.category.toLowerCase()}">${item.category}</span></td>
                        <td>${item.ripeness}</td>
                        <td>${item.location}</td>
                        <td>${item.whyCollect}</td>
                        <td>${createImageHTML(item, 0)}</td>
                        <td>${createImageHTML(item, 1)}</td>
                        <td>${createImageHTML(item, 2)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    return tableHTML;
}

// Update the display
function updateDisplay() {
    const selectedMonth = parseInt(document.getElementById('month').value);
    const selectedCountry = document.getElementById('country').value;
    
    const items = getItemsForMonth(selectedMonth, selectedCountry);
    const tableContainer = document.getElementById('items-table-container');
    
    tableContainer.innerHTML = createItemsTable(items);
    
    // Add entrance animations to table rows
    const rows = tableContainer.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            row.style.transition = 'all 0.4s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Initialize the page
function initializePage() {
    // Set current month as default
    const currentMonth = getCurrentMonth();
    document.getElementById('month').value = currentMonth;
    
    // Add event listeners
    document.getElementById('month').addEventListener('change', updateDisplay);
    document.getElementById('country').addEventListener('change', updateDisplay);
    
    // Initial display
    updateDisplay();
    
    // Add interactive effects
    addInteractiveEffects();
}

// Add interactive effects
function addInteractiveEffects() {
    // Add parallax effect to background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-circle, .organic-shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Add smooth form interactions
    const formInputs = document.querySelectorAll('select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Modal functionality
function openImageModal(itemName, images) {
    // Create modal HTML
    const modalHTML = `
        <div id="imageModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">${itemName} - Bilder</h2>
                    <span class="close" onclick="closeImageModal()">&times;</span>
                </div>
                <div class="modal-images">
                    ${images.map((imageUrl, index) => `
                        <div class="modal-image-container">
                            <img src="${imageUrl}" 
                                 alt="${itemName} - Bild ${index + 1}" 
                                 class="modal-image"
                                 onclick="openFullImage('${imageUrl}', '${itemName} - Bild ${index + 1}')">
                            <div class="image-caption">Bild ${index + 1}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = document.getElementById('imageModal');
    modal.style.display = 'block';
    
    // Close modal when clicking outside
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeImageModal();
        }
    };
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.remove();
    }
}

function openFullImage(imageUrl, imageTitle) {
    // Create full image modal HTML
    const fullImageModalHTML = `
        <div id="fullImageModal" class="full-image-modal">
            <span class="full-image-close" onclick="closeFullImage()">&times;</span>
            <div class="full-image-content">
                <img src="${imageUrl}" alt="${imageTitle}" class="full-image">
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', fullImageModalHTML);
    
    // Show modal
    const modal = document.getElementById('fullImageModal');
    modal.style.display = 'block';
    
    // Close modal when clicking outside
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeFullImage();
        }
    };
}

function closeFullImage() {
    const modal = document.getElementById('fullImageModal');
    if (modal) {
        modal.remove();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);
