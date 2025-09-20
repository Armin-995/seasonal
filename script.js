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
async function getItemsForMonth(month, country, category = 'all') {
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
        
        // Filter items by month using start and end columns
        const filteredItems = allItems.filter(item => {
            return isMonthInRange(item.start, item.end, month);
        });
        
        // Transform SQL data to expected format
        return filteredItems.map(item => ({
            name: item.name,
            images: getItemImages(item),
            category: getCategoryFromTableName(category === 'all' ? getCategoryFromItem(item) : category),
            ripeness: formatRipenessPeriod(item.start, item.end),
            // Use existing columns for new fields
            description: item.reasons || 'Unbekannt',
            howToFind: item.location || 'Unbekannt',
            // Additional detailed content fields
            lookalikes: item.lookalikes ? JSON.parse(item.lookalikes) : null,
            seasonalInfo: item.seasonal_info || null,
            effects: item.effects || null
        }));
        
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
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        </head>
        <body>

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
                            <div class="images-gallery">
                                ${item.images.map((imageUrl, index) => `
                                    <div class="gallery-image-container">
                                        <img src="${imageUrl}" 
                                             alt="${item.name}" 
                                             class="gallery-image"
                                             onclick="openFullImage('${imageUrl}', '${item.name}')">
                                    </div>
                                `).join('')}
                            </div>
                        </section>

                        <!-- Description -->
                        <section class="description-section">
                            <h2>Merkmale</h2>
                            <p>${detailedContent.description}</p>
                        </section>

                        <!-- Description -->
                        <section class="description-section">
                            <h2>Wirkung auf uns</h2>
                            <p>${detailedContent.effect}</p>
                        </section>


                        <!-- How to Find -->
                        <section class="how-to-find-section">
                            <h2>Standort</h2>
                            <p>${detailedContent.howToFind}</p>
                        </section>

                        <!-- Lookalikes -->
                        <section class="lookalikes-section">
                            <h2>Verwechslung</h2>
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

// Open item modal
function openItemModal(item) {
    // Create modal HTML
    const modalHTML = `
        <div id="itemModal" class="item-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">${item.name}</h2>
                    <span class="close" onclick="closeItemModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="item-details">
                        <div class="item-meta">
                            <span class="item-season">${item.ripeness}</span>
                        </div>
                        
                        <div class="item-images">
                            ${item.images.map((imageUrl, index) => `
                                <div class="modal-image-container">
                                    <img src="${imageUrl}" 
                                         alt="${item.name} - Bild ${index + 1}" 
                                         class="modal-image"
                                         onclick="openFullImage('${imageUrl}', '${item.name} - Bild ${index + 1}')">
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="item-info-grid">
                            <div class="info-section">
                                <h3>Merkmale</h3>
                                <p>${item.description}</p>
                            </div>
                            <div class="info-section">
                                <h3>Wirkung auf uns</h3>
                                <p>${item.effects || 'Keine spezifischen Wirkungen bekannt.'}</p>
                            </div>
                            <div class="info-section">
                                <h3>Vorkommen</h3>
                                <p>${item.howToFind}</p>
                            </div>
                            <div class="info-section">
                                <h3>Mögliche Verwechslungen</h3>
                                ${item.lookalikes && item.lookalikes.length > 0 ? 
                                    `<ul>${item.lookalikes.map(lookalike => `<li>${lookalike}</li>`).join('')}</ul>` :
                                    `<p class="no-warnings">Keine Doppelgänger bekannt :)</p>`
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

// Open item page (kept for compatibility)
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
    const selectedCountry = document.getElementById('country').value;
    const selectedCategory = document.getElementById('category').value;
    
    const tableContainer = document.getElementById('items-table-container');
    
    // Show loading state
    tableContainer.innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>Lade saisonale Produkte...</p>
        </div>
    `;
    
    try {
        const items = await getItemsForMonth(selectedMonth, selectedCountry, selectedCategory);
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
        tableContainer.innerHTML = `
            <div class="error-state">
                <div class="error-icon">⚠️</div>
                <h2>Fehler beim Laden der Daten</h2>
                <p>Bitte versuchen Sie es später erneut.</p>
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);
