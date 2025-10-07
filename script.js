// Storage key for seasonal items
const STORAGE_KEY = 'seasonal_items';

/*
Supabase Database Structure Required:

The application expects three tables: 'fruits', 'herbs', and 'nuts'
Each table should have the following columns:

REQUIRED COLUMNS:
- name (VARCHAR): The name of the item
- reasons (TEXT): Description/why to collect this item (used as description in modal)
- start (INTEGER): First month of ripeness (1-12)
- end (INTEGER): Last month of ripeness (1-12)
- location (TEXT): Where to find this item (used as how_to_find in modal)
- image1 (TEXT): First image URL (optional)
- image2 (TEXT): Second image URL (optional)

OPTIONAL DETAILED CONTENT COLUMNS:
- lookalikes (TEXT): JSON string with lookalike warnings (e.g., '["Warning 1", "Warning 2"]')
- seasonal_info (TEXT): Additional seasonal information

Supabase Configuration:
1. Replace 'YOUR_SUPABASE_URL' with your Supabase project URL
2. Replace 'YOUR_SUPABASE_ANON_KEY' with your Supabase anon key
3. Make sure your tables have Row Level Security (RLS) disabled or configured for public read access

The start and end fields should contain numeric month values (1-12):
- Single month: start=9, end=9 (September only)
- Month range: start=7, end=9 (July through September)
- Year-round: start=1, end=12 (Available all year)
- Cross-year range: start=11, end=2 (November through February)

Image URLs should be direct links to images (e.g., https://example.com/image.jpg)
If no images are provided, placeholder images will be used automatically.
The homepage shows a clean list with name and image preview.
Clicking opens a detailed modal with all information.
*/

// Configuration for Supabase data fetching
const SUPABASE_CONFIG = {
    // Your Supabase project URL (found in Project Settings > API)
    url: 'https://iriqtgabcbgotbtcmwoi.supabase.co', // Replace with your actual Supabase URL
    // Your Supabase anon key (found in Project Settings > API)
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyaXF0Z2FiY2Jnb3RidGNtd29pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2OTQ5ODYsImV4cCI6MjA3MzI3MDk4Nn0.VuM3gsJhJ3Fz28bPgsOlvDfmfE2j_dPuT-B_4xJGhag', // Replace with your actual anon key
    // Table names for each category
    tables: {
        'Fruits': 'fruits',
        'Herbs': 'herbs', 
        'Nuts': 'nuts'
    }
};

// Cache for storing fetched data
const dataCache = {
    fruits: new Map(),
    herbs: new Map(),
    nuts: new Map()
};

// Month names in German
const monthNames = {
    1: 'Januar', 2: 'Februar', 3: 'März', 4: 'April', 5: 'Mai', 6: 'Juni',
    7: 'Juli', 8: 'August', 9: 'September', 10: 'Oktober', 11: 'November', 12: 'Dezember'
};

// Helper function to check if a month is within the start and end range
function isMonthInRange(startMonth, endMonth, targetMonth) {
    if (!startMonth || !endMonth) return false;
    
    const start = parseInt(startMonth);
    const end = parseInt(endMonth);
    
    // Handle year-round items (start = 1, end = 12)
    if (start === 1 && end === 12) {
        return true;
    }
    
    // Handle normal ranges
    if (start <= end) {
        // Same year range (e.g., March to May: 3-5)
        return targetMonth >= start && targetMonth <= end;
    } else {
        // Cross-year range (e.g., November to February: 11-2)
        return targetMonth >= start || targetMonth <= end;
    }
}

// Fetch data from Supabase for a specific category
async function fetchCategoryData(category) {
    const tableName = SUPABASE_CONFIG.tables[category];
    if (!tableName) {
        console.error(`Unknown category: ${category}`);
        return [];
    }
    
    try {
        const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${tableName}?select=*`, {
            headers: {
                'apikey': SUPABASE_CONFIG.anonKey,
                'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Cache the data
        dataCache[tableName].set('all', data);
        
        return data;
    } catch (error) {
        console.error(`Error fetching ${category} data:`, error);
        return [];
    }
}

// Get cached data or fetch from Supabase
async function getCategoryData(category) {
    const tableName = SUPABASE_CONFIG.tables[category];
    if (!tableName) return [];
    
    // Check cache first
    if (dataCache[tableName].has('all')) {
        return dataCache[tableName].get('all');
    }
    
    // Fetch from Supabase if not cached
    return await fetchCategoryData(category);
}

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
        description: item.description || `Ausführliche Beschreibung von ${item.name}: Diese Pflanze ist ein wichtiger Bestandteil der deutschen Flora und bietet viele gesundheitliche Vorteile.`,
        effect: item.effects || `Die Wirkung von ${item.name} auf unseren Körper: Diese Pflanze enthält wertvolle Inhaltsstoffe, die sich positiv auf unsere Gesundheit auswirken können.`
    };
    
    return content;
}

// This function is now handled in the getItemsForMonth function

// Get current month
function getCurrentMonth() {
    return new Date().getMonth() + 1; // getMonth() returns 0-11, so add 1
}

// Get items for selected month, country and category from SQL
async function getItemsForMonth(month, country, category = 'all', regionCode = null) {
    if (country !== 'germany') {
    return [];
    }
    
    try {
        let allItems = [];
        
        if (category === 'all') {
            // Fetch data from all categories
            const [fruits, herbs, nuts] = await Promise.all([
                getCategoryData('Fruits'),
                getCategoryData('Herbs'),
                getCategoryData('Nuts')
            ]);
            allItems = [...fruits, ...herbs, ...nuts];
        } else {
            // Fetch data from specific category
            allItems = await getCategoryData(category);
        }
        
        // Optional: filter by region code (Supabase column 'regions' with values 'k'|'b'|'a')
        if (regionCode) {
            allItems = allItems.filter(item => {
                const raw = item.regions;
                if (!raw) return false;
                // Support formats: 'k', 'k,b', '{k,b}', '["k","b"]'
                let codes = [];
                if (Array.isArray(raw)) {
                    codes = raw;
                } else if (typeof raw === 'string') {
                    const s = raw.trim();
                    if ((s.startsWith('[') && s.endsWith(']')) || (s.startsWith('{') && s.endsWith('}'))) {
                        try {
                            codes = s.startsWith('[') ? JSON.parse(s) : s.slice(1, -1).split(',');
                        } catch (_) {
                            codes = s.replace(/[{}\[\]"]+/g, '').split(',');
                        }
                    } else if (s.includes(',')) {
                        codes = s.split(',');
                    } else {
                        codes = [s];
                    }
                }
                codes = codes.map(c => String(c).trim().toLowerCase());
                return codes.includes(String(regionCode).toLowerCase());
            });
        }
        
        // Filter items by month using start and end columns
        const filteredItems = allItems.filter(item => {
            return isMonthInRange(item.start, item.end, month);
        });
        
        // Transform SQL data to expected format
        const transformedItems = filteredItems.map(item => ({
            name: item.name,
            images: getItemImages(item),
            category: getCategoryFromTableName(category === 'all' ? getCategoryFromItem(item) : category),
            ripeness: formatRipenessPeriod(item.start, item.end),
            // Use existing columns for new fields
            description: item.description || 'Unbekannt',
            howToFind: item.location || 'Unbekannt',
            // Additional detailed content fields
            lookalikes: item.lookalikes || null,
            seasonalInfo: item.seasonalInfo || null,
            effects: item.effects || null
        }));
        
        // Translate content if needed
        const currentLanguage = localStorage.getItem('selectedLanguage') || 'de';
        if (currentLanguage !== 'de') {
            return await translateSupabaseContent(transformedItems, currentLanguage);
        }
        
        return transformedItems;
        
    } catch (error) {
        console.error('Error fetching items:', error);
        return [];
    }
}

// Helper function to determine category from item data
function getCategoryFromItem(item) {
    // This would need to be implemented based on your SQL structure
    // For now, we'll assume the category is determined by which table the item came from
    // You might need to add a category field to your SQL tables or use a different approach
    return 'Fruits'; // Default fallback
}

// Helper function to get category name from table name
function getCategoryFromTableName(tableName) {
    const categoryMap = {
        'fruits': 'Fruits',
        'herbs': 'Herbs',
        'nuts': 'Nuts'
    };
    return categoryMap[tableName] || 'Fruits';
}

// Helper function to format ripeness period from start and end months
function formatRipenessPeriod(startMonth, endMonth) {
    if (!startMonth || !endMonth) return 'Unbekannt';
    
    const start = parseInt(startMonth);
    const end = parseInt(endMonth);
    
    // Handle year-round items
    if (start === 1 && end === 12) {
        return 'Ganzjährig';
    }
    
    // Handle single month
    if (start === end) {
        return monthNames[start];
    }
    
    // Handle normal ranges
    if (start < end) {
        return `${monthNames[start]}-${monthNames[end]}`;
    } else {
        // Handle cross-year ranges (e.g., November to February)
        return `${monthNames[start]}-${monthNames[end]}`;
    }
}

// Helper function to get images from database or use fallbacks
function getItemImages(item) {
    const images = [];
    
    // Add images from database if they exist
    if (item.image1) images.push(item.image1);
    if (item.image2) images.push(item.image2);
    
    // If no database images, use placeholder images
    if (images.length === 0) {
        return generatePlaceholderImages(item.name, getCategoryFromTableName(getCategoryFromItem(item)));
    }
    
    // Fill up to 2 images with placeholders if needed
    while (images.length < 2) {
        images.push(generatePlaceholderImages(item.name, getCategoryFromTableName(getCategoryFromItem(item)))[images.length]);
    }
    
    return images;
}

// Create image preview HTML for list
function createImagePreviewHTML(item) {
    const imageUrl = item.images[0]; // Use first image for preview
    const fallbackEmoji = item.category === 'Fruits' ? '🍓' : item.category === 'Herbs' ? '🌿' : item.category === 'Nuts' ? '🌰' : '🍄';
    
    if (imageUrl) {
        return `
            <img src="${imageUrl}" 
                 alt="${item.name}" 
                 class="preview-image" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="image-placeholder" style="display: none;">${fallbackEmoji}</div>
        `;
    } else {
        return `<div class="image-placeholder">${fallbackEmoji}</div>`;
    }
}

// Create image HTML for table
function createImageHTML(item, imageIndex) {
    const imageUrl = item.images[imageIndex];
    const fallbackEmoji = item.category === 'Fruits' ? '🍓' : item.category === 'Herbs' ? '🌿' : item.category === 'Nuts' ? '🌰' : '🍄';
    
    if (imageUrl) {
        return `
            <img src="${imageUrl}" 
                 alt="${item.name}" 
                 class="item-image" 
                 onclick="openImageModal('${item.name}', ${JSON.stringify(item.images).replace(/"/g, '&quot;')})"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="image-placeholder" style="display: none;">${fallbackEmoji}</div>
        `;
    } else {
        return `<div class="image-placeholder">${fallbackEmoji}</div>`;
    }
}


// Open item modal
function openItemModal(item) {
    const currentLanguage = localStorage.getItem('selectedLanguage') || 'de';
    
    // Create modal HTML
    const modalHTML = `
        <div id="itemModal" class="item-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">${item.name}</h2>
                    <span class="item-season">${item.ripeness}</span>
                    <span class="close" onclick="closeItemModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="item-details">
                        <div class="item-images">
                            ${item.images.map((imageUrl, index) => `
                                <div class="modal-image-container">
                                    <img src="${imageUrl}" 
                                         alt="${item.name} - ${getTranslation('description', currentLanguage)} ${index + 1}" 
                                         class="modal-image"
                                         onclick="openFullImage('${imageUrl}', '${item.name} - ${getTranslation('description', currentLanguage)} ${index + 1}')">
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="item-info-grid">
                            <div class="info-section">
                                <h3>${getTranslation('characteristics', currentLanguage)}</h3>
                                <p>${item.description}</p>
                            </div>
                            <div class="info-section">
                                <h3>${getTranslation('effects', currentLanguage)}</h3>
                                <p>${item.effects}</p>
                            </div>
                            <div class="info-section">
                                <h3>${getTranslation('occurrence', currentLanguage)}</h3>
                                <p>${item.howToFind}</p>
                            </div>
                            <div class="info-section">
                                <h3>${getTranslation('lookalikes', currentLanguage)}</h3>
                                <p>${item.lookalikes}</p>
                            </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = document.getElementById('itemModal');
    modal.style.display = 'block';
    
    // Close modal when clicking outside
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeItemModal();
        }
    };
}

function closeItemModal() {
    const modal = document.getElementById('itemModal');
    if (modal) {
        modal.remove();
    }
}


// Create table HTML
function createItemsTable(items) {
    const currentLanguage = localStorage.getItem('selectedLanguage') || 'de';
    
    if (items.length === 0) {
        return `
            <div class="no-items">
                <div class="no-items-icon">🌿</div>
                <h2>${getTranslation('nothing_available', currentLanguage)}</h2>
                <p>${getTranslation('try_other_month', currentLanguage)}</p>
            </div>
        `;
    }

    const listHTML = `
        <div class="items-list">
                ${items.map(item => `
                <div class="item-card" onclick="openItemModal(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                    <div class="item-preview">
                        <div class="item-image-preview">
                            ${createImagePreviewHTML(item)}
                        </div>
                        <div class="item-info">
                            <h3 class="item-name">${item.name}</h3>
                        </div>
                    </div>
                </div>
                `).join('')}
        </div>
    `;
    
    return listHTML;
}

// Update the display
async function updateDisplay() {
    const selectedMonth = parseInt(document.getElementById('month').value);
    // The right-hand select is now a subregion filter (Küste/Berge/Alles andere).
    // For data loading, we keep using the Mitteleuropa dataset (maps to 'germany' in current backend).
    const selectedCountry = 'germany';
    const selectedCategory = document.getElementById('category').value;
    const selectedRegionCode = document.getElementById('country').value; // k | b | a
    
    const tableContainer = document.getElementById('items-table-container');
    
    // Show loading state
    const currentLanguage = localStorage.getItem('selectedLanguage') || 'de';
    tableContainer.innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>${getTranslation('loading', currentLanguage)}</p>
        </div>
    `;
    
    try {
        const items = await getItemsForMonth(selectedMonth, selectedCountry, selectedCategory, selectedRegionCode);
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
    } catch (error) {
        console.error('Error updating display:', error);
        const currentLanguage = localStorage.getItem('selectedLanguage') || 'de';
        tableContainer.innerHTML = `
            <div class="error-state">
                <div class="error-icon">⚠️</div>
                <h2>${getTranslation('error_loading', currentLanguage)}</h2>
                <p>${getTranslation('try_later', currentLanguage)}</p>
            </div>
        `;
    }
}

// Initialize the page
function initializePage() {
    // Set current month as default
    const currentMonth = getCurrentMonth();
    document.getElementById('month').value = currentMonth;
    
    // Add event listeners
    document.getElementById('month').addEventListener('change', updateDisplay);
    document.getElementById('country').addEventListener('change', updateDisplay);
    document.getElementById('category').addEventListener('change', updateDisplay);
    
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
                    <h2 class="modal-title">${itemName}</h2>
                    <span class="close" onclick="closeImageModal()">&times;</span>
                </div>
                <div class="modal-images">
                    ${images.map((imageUrl, index) => `
                        <div class="modal-image-container">
                            <img src="${imageUrl}" 
                                 alt="${itemName}" 
                                 class="modal-image"
                                 onclick="openFullImage('${imageUrl}', '${itemName}')">
                            <div class="image-caption"> </div>
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

// Navigation dropdown functionality
function toggleDropdown() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const navDropdown = document.querySelector('.nav-dropdown');
    const navMenu = document.getElementById('navMenu');
    
    if (!navDropdown.contains(event.target)) {
        navMenu.classList.remove('show');
    }
});

// Translation system
const TRANSLATIONS = {
    de: {
        // UI Elements
        'menu': 'Menü',
        'about': 'Über uns',
        'follow_us': 'Folg uns ❤️',
        'what_to_collect': 'Was willst du sammeln?',
        'fruits': 'Obst & Beeren',
        'herbs': 'Wildkräuter',
        'nuts': 'Nüsse & Hülsenfrüchte',
        'region': 'Region:',
        'current_month': 'Aktueller Monat:',
        'made_in_potsdam': 'Made in Potsdam with ❤️',
        'more_features': '🚀 Mehr Features kommen! Bleib dran für spannende Updates! 🚀',
        'january': 'Januar',
        'february': 'Februar',
        'march': 'März',
        'april': 'April',
        'may': 'Mai',
        'june': 'Juni',
        'july': 'Juli',
        'august': 'August',
        'september': 'September',
        'october': 'Oktober',
        'november': 'November',
        'december': 'Dezember',
        'central_europe': 'Mitteleuropa',
        'lowland': 'Tiefland',
        'coast': 'Küste',
        'mountains': 'Berge',
        'nothing_available': 'Nichts in diesem Monat verfügbar',
        'try_other_month': 'Versuche einen anderen Monat oder Land!',
        'loading': 'Lade saisonale Produkte...',
        'error_loading': 'Fehler beim Laden der Daten',
        'try_later': 'Bitte versuchen Sie es später erneut.',
        'characteristics': 'Merkmale',
        'effects': 'Wirkung auf uns',
        'occurrence': 'Vorkommen',
        'lookalikes': 'Doppelgänger',
        'season': 'Saison',
        'description': 'Beschreibung'
    },
    en: {
        // UI Elements
        'menu': 'Menu',
        'about': 'About us',
        'follow_us': 'Follow us ❤️',
        'what_to_collect': 'What do you want to collect?',
        'fruits': 'Fruits & Berries',
        'herbs': 'Wild Herbs',
        'nuts': 'Nuts & Legumes',
        'region': 'Region:',
        'current_month': 'Current month:',
        'made_in_potsdam': 'Made in Potsdam with ❤️',
        'more_features': '🚀 More features to come! Stay tuned for exciting updates! 🚀',
        'january': 'January',
        'february': 'February',
        'march': 'March',
        'april': 'April',
        'may': 'May',
        'june': 'June',
        'july': 'July',
        'august': 'August',
        'september': 'September',
        'october': 'October',
        'november': 'November',
        'december': 'December',
        'central_europe': 'Central Europe',
        'lowland': 'Lowland',
        'coast': 'Coast',
        'mountains': 'Mountains',
        'nothing_available': 'Nothing available this month',
        'try_other_month': 'Try a different month or country!',
        'loading': 'Loading seasonal products...',
        'error_loading': 'Error loading data',
        'try_later': 'Please try again later.',
        'characteristics': 'Characteristics',
        'effects': 'Effects on us',
        'occurrence': 'Occurrence',
        'lookalikes': 'Lookalikes',
        'season': 'Season',
        'description': 'Description'
    }
};

// Google Translate API configuration
const GOOGLE_TRANSLATE_API_KEY = 'YOUR_GOOGLE_TRANSLATE_API_KEY'; // Replace with your actual API key
const GOOGLE_TRANSLATE_URL = 'https://translation.googleapis.com/language/translate/v2';

// Translate text using Google Translate API
async function translateText(text, targetLanguage) {
    if (!GOOGLE_TRANSLATE_API_KEY || GOOGLE_TRANSLATE_API_KEY === 'YOUR_GOOGLE_TRANSLATE_API_KEY') {
        console.warn('Google Translate API key not configured. Using fallback translation.');
        return text; // Return original text if no API key
    }
    
    try {
        const response = await fetch(`${GOOGLE_TRANSLATE_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                target: targetLanguage,
                format: 'text'
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            return data.data.translations[0].translatedText;
        } else {
            console.error('Translation API error:', response.statusText);
            return text;
        }
    } catch (error) {
        console.error('Translation error:', error);
        return text;
    }
}

// Get translation for a key
function getTranslation(key, language = 'de') {
    return TRANSLATIONS[language]?.[key] || key;
}

// Language switching functionality
function changeLanguage() {
    const languageSelect = document.getElementById('languageSelect');
    const selectedLanguage = languageSelect.value;
    
    // Store language preference
    localStorage.setItem('selectedLanguage', selectedLanguage);
    
    // Update UI elements
    updateUIForLanguage(selectedLanguage);
    
    // Update banner text
    updateBannerText(selectedLanguage);
    
    // Re-render content with new language
    updateDisplay();
}

// Update UI elements for selected language
function updateUIForLanguage(language) {
    // Update navigation
    const menuText = document.querySelector('.nav-text');
    if (menuText) menuText.textContent = getTranslation('menu', language);
    
    // Update about link
    const aboutLink = document.querySelector('a[href="about.html"]');
    if (aboutLink) {
        aboutLink.innerHTML = `<span class="nav-link-icon">🌱</span>${getTranslation('about', language)}`;
    }
    
    // Update follow us link
    const followLink = document.querySelector('a[href*="instagram"]');
    if (followLink) {
        followLink.innerHTML = `<span class="social-icon"><img class="social-icon-img" alt="Instagram" src="https://www.pngkey.com/png/full/283-2831746_insta-icon-instagram.png"></span>${getTranslation('follow_us', language)}`;
    }
    
    // Update main title
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle && language === 'en') {
        mainTitle.textContent = '🌿 What nature has to offer in your region today 🌿';
    } else if (mainTitle && language === 'de') {
        mainTitle.textContent = '🌿 Was die Natur heute in deiner Region zu bieten hat 🌿';
    }
    
    // Update form labels
    const categoryLabel = document.querySelector('.category-selector label');
    if (categoryLabel) categoryLabel.textContent = getTranslation('what_to_collect', language);
    
    const regionLabel = document.querySelector('.country-selector label');
    if (regionLabel) regionLabel.textContent = getTranslation('region', language);
    
    const monthLabel = document.querySelector('.month-selector label');
    if (monthLabel) monthLabel.textContent = getTranslation('current_month', language);
    
    // Update select options
    updateSelectOptions(language);
    
    // Update footer
    updateFooterForLanguage(language);
}

// Update select options for language
function updateSelectOptions(language) {
    const categorySelect = document.getElementById('category');
    if (categorySelect) {
        const options = categorySelect.querySelectorAll('option');
        options[0].textContent = getTranslation('fruits', language);
        options[1].textContent = getTranslation('herbs', language);
        options[2].textContent = getTranslation('nuts', language);
    }
    
    const monthSelect = document.getElementById('month');
    if (monthSelect) {
        const options = monthSelect.querySelectorAll('option');
        const monthKeys = ['january', 'february', 'march', 'april', 'may', 'june', 
                          'july', 'august', 'september', 'october', 'november', 'december'];
        options.forEach((option, index) => {
            option.textContent = getTranslation(monthKeys[index], language);
        });
    }
    
    const countrySelect = document.getElementById('country');
    if (countrySelect) {
        const options = countrySelect.querySelectorAll('option');
        options[0].textContent = getTranslation('lowland', language);
        options[1].textContent = getTranslation('coast', language);
        options[2].textContent = getTranslation('mountains', language);
    }
}

// Update banner text
function updateBannerText(language) {
    const bannerText = document.querySelector('.banner-text');
    if (bannerText) {
        bannerText.textContent = getTranslation('more_features', language);
    }
}

// Update footer for language
function updateFooterForLanguage(language) {
    const footerText = document.querySelector('.footer p:first-child');
    if (footerText) {
        footerText.textContent = getTranslation('made_in_potsdam', language);
    }
}

// Translate Supabase content dynamically
async function translateSupabaseContent(items, targetLanguage) {
    if (targetLanguage === 'de') {
        return items; // Return original German content
    }
    
    const translatedItems = [];
    
    for (const item of items) {
        const translatedItem = { ...item };
        
        try {
            // Translate item name
            if (item.name) {
                translatedItem.name = await translateText(item.name, targetLanguage);
            }
            
            // Translate description
            if (item.description) {
                translatedItem.description = await translateText(item.description, targetLanguage);
            }
            
            // Translate effects
            if (item.effects) {
                translatedItem.effects = await translateText(item.effects, targetLanguage);
            }
            
            // Translate how to find
            if (item.howToFind) {
                translatedItem.howToFind = await translateText(item.howToFind, targetLanguage);
            }
            
            // Translate lookalikes
            if (item.lookalikes) {
                translatedItem.lookalikes = await translateText(item.lookalikes, targetLanguage);
            }
            
            // Translate ripeness period
            if (item.ripeness) {
                translatedItem.ripeness = await translateRipenessPeriod(item.ripeness, targetLanguage);
            }
            
        } catch (error) {
            console.error('Error translating item:', item.name, error);
            // Keep original text if translation fails
        }
        
        translatedItems.push(translatedItem);
    }
    
    return translatedItems;
}

// Translate ripeness period (month names)
async function translateRipenessPeriod(ripeness, targetLanguage) {
    if (targetLanguage === 'de') {
        return ripeness;
    }
    
    const monthTranslations = {
        'Januar': 'January',
        'Februar': 'February', 
        'März': 'March',
        'April': 'April',
        'Mai': 'May',
        'Juni': 'June',
        'Juli': 'July',
        'August': 'August',
        'September': 'September',
        'Oktober': 'October',
        'November': 'November',
        'Dezember': 'December',
        'Ganzjährig': 'Year-round'
    };
    
    let translatedRipeness = ripeness;
    
    // Replace German month names with English
    for (const [german, english] of Object.entries(monthTranslations)) {
        translatedRipeness = translatedRipeness.replace(new RegExp(german, 'g'), english);
    }
    
    return translatedRipeness;
}

// Load saved language preference
function loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = savedLanguage;
        }
        // Update UI for saved language
        updateUIForLanguage(savedLanguage);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    loadLanguagePreference();
});

// Video functionality
function loadVideo() {
    const url = document.getElementById('videoUrlInput').value.trim();
    if (!url) {
        alert('Bitte geben Sie eine YouTube-URL ein!');
        return;
    }

    const videoFrame = document.getElementById('videoFrame');
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    
    // Hide placeholder
    videoPlaceholder.style.display = 'none';

    // Remove existing video
    const existingVideo = videoFrame.querySelector('iframe');
    if (existingVideo) {
        existingVideo.remove();
    }

    // Extract YouTube video ID
    let videoId = '';
    if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch')) {
        videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtube.com/embed/')) {
        videoId = url.split('embed/')[1].split('?')[0];
    }

    if (videoId) {
        // Create YouTube iframe
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`;
        iframe.allowFullscreen = true;
        iframe.allow = 'autoplay; encrypted-media';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '10px';
        
        videoFrame.appendChild(iframe);
        
        // Save video settings
        saveVideoSettings();
    } else {
        alert('Bitte geben Sie eine gültige YouTube-URL ein!');
        videoPlaceholder.style.display = 'block';
    }
}

function resetVideo() {
    const videoUrlInput = document.getElementById('videoUrlInput');
    const videoFrame = document.getElementById('videoFrame');
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    
    videoUrlInput.value = '';
    videoPlaceholder.style.display = 'block';
    
    const existingVideo = videoFrame.querySelector('iframe');
    if (existingVideo) {
        existingVideo.remove();
    }

    // Reset controls
    const videoVolume = document.getElementById('videoVolume');
    const videoSpeed = document.getElementById('videoSpeed');
    const volumeValue = document.getElementById('volumeValue');
    
    if (videoVolume) videoVolume.value = 50;
    if (videoSpeed) videoSpeed.value = 1;
    if (volumeValue) volumeValue.textContent = '50%';

    saveVideoSettings();
}

function saveVideoSettings() {
    const settings = {
        videoUrl: document.getElementById('videoUrlInput').value,
        volume: document.getElementById('videoVolume').value,
        speed: document.getElementById('videoSpeed').value
    };
    localStorage.setItem('videoSettings', JSON.stringify(settings));
}

function loadVideoSettings() {
    const savedSettings = localStorage.getItem('videoSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        const videoUrlInput = document.getElementById('videoUrlInput');
        const videoVolume = document.getElementById('videoVolume');
        const videoSpeed = document.getElementById('videoSpeed');
        const volumeValue = document.getElementById('volumeValue');
        
        if (videoUrlInput) videoUrlInput.value = settings.videoUrl || '';
        if (videoVolume) videoVolume.value = settings.volume || 50;
        if (videoSpeed) videoSpeed.value = settings.speed || 1;
        if (volumeValue) volumeValue.textContent = (settings.volume || 50) + '%';

        // Load video automatically if URL is present
        if (settings.videoUrl) {
            loadVideo();
        }
    }
}

// Video control event listeners
document.addEventListener('DOMContentLoaded', function() {
    const videoVolume = document.getElementById('videoVolume');
    const videoSpeed = document.getElementById('videoSpeed');
    const videoUrlInput = document.getElementById('videoUrlInput');
    const volumeValue = document.getElementById('volumeValue');

    if (videoVolume) {
        videoVolume.addEventListener('input', function() {
            if (volumeValue) {
                volumeValue.textContent = this.value + '%';
            }
            saveVideoSettings();
        });
    }

    if (videoSpeed) {
        videoSpeed.addEventListener('change', function() {
            saveVideoSettings();
        });
    }

    if (videoUrlInput) {
        videoUrlInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                loadVideo();
            }
        });
    }

    // Load saved video settings
    loadVideoSettings();
});
