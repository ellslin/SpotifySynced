// Spotify Clone - Synched Edition
// Main Application Logic

// Global state
let currentWeather = 'sunny';
let currentCity = 'Seattle';
let currentTimePeriod = 'evening';
let currentMoods = {
    happy: 50,
    sad: 0,
    energetic: 30,
    calm: 20,
    angry: 0,
    romantic: 0,
    nostalgic: 0,
    party: 0
};
let beRealConnected = false;
let uploadedPhoto = null;
let calendarConnected = false;
let currentPhoneMode = 'normal';
let currentDestination = null;
let currentMovement = 'stationary';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initGreeting();
    initSynchedPage();
    initPlayerControls();
    initPhotoUpload();
    initBeRealIntegration();
    initMoodMixer();
    initCalendarSync();
    initPhoneModeSync();
    initDestinationSelection();
    detectMovement();
    initSpotifyLock();
});

// ========================================
// NAVIGATION
// ========================================

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = item.dataset.page;

            // Update nav active state
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Show target page
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(`${targetPage}-page`).classList.add('active');

            // Initialize Synched page when navigating to it
            if (targetPage === 'synched') {
                initSynchedPage();
            }
        });
    });
}

// ========================================
// GREETING BASED ON TIME
// ========================================

function initGreeting() {
    const greetingEl = document.querySelector('.greeting');
    const hour = new Date().getHours();
    
    let greeting;
    if (hour >= 5 && hour < 12) {
        greeting = 'Good morning';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Good afternoon';
    } else if (hour >= 17 && hour < 21) {
        greeting = 'Good evening';
    } else {
        greeting = 'Good night';
    }
    
    if (greetingEl) {
        greetingEl.textContent = greeting;
    }
}

// ========================================
// WEATHER EFFECTS
// ========================================

const weatherEffectsContainer = document.getElementById('weather-effects');

function clearWeatherEffects() {
    if (weatherEffectsContainer) {
        weatherEffectsContainer.classList.add('transitioning');
        setTimeout(() => {
            weatherEffectsContainer.innerHTML = '';
            weatherEffectsContainer.classList.remove('transitioning');
        }, 500);
    }
    
    // Remove all weather classes from body
    document.body.classList.remove(
        'weather-sunny', 'weather-cloudy', 'weather-rainy', 
        'weather-snowy', 'weather-night', 'weather-stormy'
    );
}

function createSnowEffect() {
    document.body.classList.add('weather-snowy');
    
    const snowflakes = ['❄', '❅', '❆', '•'];
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 5 + 5) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowflake.style.fontSize = (Math.random() * 0.8 + 0.5) + 'rem';
        snowflake.style.opacity = Math.random() * 0.5 + 0.3;
        weatherEffectsContainer.appendChild(snowflake);
    }
}

function createRainEffect() {
    document.body.classList.add('weather-rainy');
    
    for (let i = 0; i < 100; i++) {
        const raindrop = document.createElement('div');
        raindrop.className = 'raindrop';
        raindrop.style.left = Math.random() * 100 + '%';
        raindrop.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
        raindrop.style.animationDelay = Math.random() * 2 + 's';
        raindrop.style.height = (Math.random() * 15 + 10) + 'px';
        weatherEffectsContainer.appendChild(raindrop);
    }
    
    // Add splash effect at bottom
    const splash = document.createElement('div');
    splash.className = 'rain-splash';
    weatherEffectsContainer.appendChild(splash);
}

function createSunnyEffect() {
    document.body.classList.add('weather-sunny');
    
    // Sun glow
    const sunGlow = document.createElement('div');
    sunGlow.className = 'sun-glow';
    weatherEffectsContainer.appendChild(sunGlow);
    
    // Sun rays
    for (let i = 0; i < 12; i++) {
        const ray = document.createElement('div');
        ray.className = 'sun-ray';
        ray.style.transform = `rotate(${i * 30}deg)`;
        ray.style.animationDelay = (i * 0.3) + 's';
        ray.style.right = '200px';
        ray.style.left = 'auto';
        weatherEffectsContainer.appendChild(ray);
    }
    
    // Floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'sun-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        weatherEffectsContainer.appendChild(particle);
    }
}

function createCloudyEffect() {
    document.body.classList.add('weather-cloudy');
    
    for (let i = 0; i < 5; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.width = (Math.random() * 300 + 200) + 'px';
        cloud.style.height = (Math.random() * 100 + 50) + 'px';
        cloud.style.top = (Math.random() * 40) + '%';
        cloud.style.animationDuration = (Math.random() * 60 + 60) + 's';
        cloud.style.animationDelay = (i * -20) + 's';
        weatherEffectsContainer.appendChild(cloud);
    }
}

function createNightEffect() {
    document.body.classList.add('weather-night');
    
    // Stars
    for (let i = 0; i < 80; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 60 + '%';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.width = (Math.random() * 2 + 1) + 'px';
        star.style.height = star.style.width;
        weatherEffectsContainer.appendChild(star);
    }
    
    // Moon
    const moon = document.createElement('div');
    moon.className = 'moon';
    weatherEffectsContainer.appendChild(moon);
    
    // Shooting star
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    shootingStar.style.top = '15%';
    shootingStar.style.left = '20%';
    weatherEffectsContainer.appendChild(shootingStar);
}

function createStormyEffect() {
    document.body.classList.add('weather-stormy');
    
    // Rain (heavier)
    for (let i = 0; i < 150; i++) {
        const raindrop = document.createElement('div');
        raindrop.className = 'raindrop';
        raindrop.style.left = Math.random() * 100 + '%';
        raindrop.style.animationDuration = (Math.random() * 0.3 + 0.3) + 's';
        raindrop.style.animationDelay = Math.random() * 2 + 's';
        raindrop.style.height = (Math.random() * 20 + 15) + 'px';
        weatherEffectsContainer.appendChild(raindrop);
    }
    
    // Lightning
    const lightning = document.createElement('div');
    lightning.className = 'lightning';
    lightning.style.animationDelay = Math.random() * 5 + 's';
    weatherEffectsContainer.appendChild(lightning);
    
    // Second lightning with different timing
    const lightning2 = document.createElement('div');
    lightning2.className = 'lightning';
    lightning2.style.animationDelay = (Math.random() * 5 + 3) + 's';
    lightning2.style.animationDuration = '12s';
    weatherEffectsContainer.appendChild(lightning2);
}

function applyWeatherTheme(weather) {
    clearWeatherEffects();
    
    setTimeout(() => {
        switch(weather) {
            case 'snowy':
                createSnowEffect();
                break;
            case 'rainy':
                createRainEffect();
                break;
            case 'sunny':
                createSunnyEffect();
                break;
            case 'cloudy':
                createCloudyEffect();
                break;
            case 'clear_night':
                createNightEffect();
                break;
            case 'stormy':
                createStormyEffect();
                break;
            default:
                createSunnyEffect();
        }
    }, 500);
}

// ========================================
// CITY DATA & LOCATION
// ========================================

const cities = [
    { name: 'Seattle', type: 'urban', weather: 'rainy', timezone: 'PST' },
    { name: 'New York', type: 'urban', weather: 'cloudy', timezone: 'EST' },
    { name: 'Los Angeles', type: 'urban', weather: 'sunny', timezone: 'PST' },
    { name: 'Chicago', type: 'urban', weather: 'snowy', timezone: 'CST' },
    { name: 'Miami', type: 'urban', weather: 'sunny', timezone: 'EST' },
    { name: 'London', type: 'urban', weather: 'rainy', timezone: 'GMT' },
    { name: 'Tokyo', type: 'urban', weather: 'cloudy', timezone: 'JST' },
    { name: 'Paris', type: 'urban', weather: 'cloudy', timezone: 'CET' },
    { name: 'Denver', type: 'suburban', weather: 'snowy', timezone: 'MST' },
    { name: 'Austin', type: 'urban', weather: 'sunny', timezone: 'CST' },
    { name: 'Portland', type: 'urban', weather: 'rainy', timezone: 'PST' },
    { name: 'San Francisco', type: 'urban', weather: 'cloudy', timezone: 'PST' },
];

// Generate contextual city + weather playlists
function generateCityWeatherPlaylists(city, weather, timePeriod) {
    const timeOfDay = getTimeLabel(timePeriod);
    
    const templates = {
        rainy: [
            { name: `Rainy ${timeOfDay} in ${city}`, desc: `Lo-fi beats for ${city}'s rain`, gradient: 'linear-gradient(135deg, #4a90a4, #2c5f72)' },
            { name: `${city} Storm Sessions`, desc: 'Cozy tunes while it pours', gradient: 'linear-gradient(135deg, #373b44, #4286f4)' },
            { name: `Wet Streets of ${city}`, desc: 'Jazz for rainy days', gradient: 'linear-gradient(135deg, #2c3e50, #bdc3c7)' },
            { name: `Rain on ${city} Windows`, desc: 'Ambient & atmospheric', gradient: 'linear-gradient(135deg, #606c88, #3f4c6b)' }
        ],
        sunny: [
            { name: `${city} Sunshine`, desc: `Feel-good vibes from ${city}`, gradient: 'linear-gradient(135deg, #ffd93d, #ff9500)' },
            { name: `Summer in ${city}`, desc: 'Beach-ready hits', gradient: 'linear-gradient(135deg, #00d2ff, #3a7bd5)' },
            { name: `${city} Golden Hour`, desc: `${timeOfDay} drives & good times`, gradient: 'linear-gradient(135deg, #f5af19, #f12711)' },
            { name: `Sunny Side of ${city}`, desc: 'Uplifting energy', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' }
        ],
        cloudy: [
            { name: `Overcast in ${city}`, desc: 'Mellow indie vibes', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: `${city} Gray Days`, desc: 'Contemplative tracks', gradient: 'linear-gradient(135deg, #a8c0ff, #3f2b96)' },
            { name: `Cloudy ${city} Café`, desc: 'Coffee shop ambiance', gradient: 'linear-gradient(135deg, #606c88, #3f4c6b)' },
            { name: `${city} Under Clouds`, desc: 'Alternative & dreamy', gradient: 'linear-gradient(135deg, #c9d6ff, #e2e2e2)' }
        ],
        snowy: [
            { name: `Snowy ${timeOfDay} in ${city}`, desc: 'Winter wonderland vibes', gradient: 'linear-gradient(135deg, #e8e8e8, #b8d4e3)' },
            { name: `${city} Snowfall`, desc: 'Peaceful piano & ambient', gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
            { name: `Fireside in ${city}`, desc: 'Cozy winter warmth', gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)' },
            { name: `${city} Frozen`, desc: 'Chill electronic vibes', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' }
        ],
        clear_night: [
            { name: `${city} After Dark`, desc: 'Late night city vibes', gradient: 'linear-gradient(135deg, #1a1a2e, #4a4e69)' },
            { name: `Midnight in ${city}`, desc: 'R&B & smooth grooves', gradient: 'linear-gradient(135deg, #0f0c29, #302b63)' },
            { name: `${city} Neon Nights`, desc: 'Synthwave & electronic', gradient: 'linear-gradient(135deg, #232526, #414345)' },
            { name: `Stars Over ${city}`, desc: 'Dreamy night sounds', gradient: 'linear-gradient(135deg, #2c3e50, #3498db)' }
        ],
        stormy: [
            { name: `Thunder Over ${city}`, desc: 'Dramatic storm soundtrack', gradient: 'linear-gradient(135deg, #434343, #000000)' },
            { name: `${city} Lightning`, desc: 'Electric & intense', gradient: 'linear-gradient(135deg, #373b44, #4286f4)' },
            { name: `Storm Watch ${city}`, desc: 'Powerful ambient', gradient: 'linear-gradient(135deg, #2c3e50, #4ca1af)' },
            { name: `${city} Tempest`, desc: 'Rock & metal energy', gradient: 'linear-gradient(135deg, #232526, #414345)' }
        ]
    };
    
    return templates[weather] || templates.sunny;
}

function getTimeLabel(period) {
    const labels = {
        early_morning: 'Morning',
        morning: 'Morning',
        afternoon: 'Afternoon',
        evening: 'Evening',
        night: 'Night',
        late_night: 'Night'
    };
    return labels[period] || 'Day';
}

// ========================================
// SYNCHED PAGE - Smart Recommendations
// ========================================

// Time-based recommendations
const timeRecommendations = {
    early_morning: {
        label: 'Early Morning',
        mood: 'Gentle Wake-Up',
        playlists: [
            { name: 'Morning Coffee', desc: 'Soft tunes to start your day', gradient: 'linear-gradient(135deg, #f5af19, #f12711)' },
            { name: 'Sunrise Acoustic', desc: 'Peaceful guitar melodies', gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)' },
            { name: 'Early Bird Energy', desc: 'Light upbeat motivation', gradient: 'linear-gradient(135deg, #ff9a9e, #fad0c4)' },
            { name: 'Mindful Morning', desc: 'Meditation & calm beats', gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' }
        ]
    },
    morning: {
        label: 'Morning',
        mood: 'Productive Focus',
        playlists: [
            { name: 'Focus Flow', desc: 'Deep concentration beats', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: 'Morning Motivation', desc: 'Energy to conquer tasks', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
            { name: 'Workday Pop', desc: 'Popular hits for productivity', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
            { name: 'Jazz for Work', desc: 'Sophisticated background tunes', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' }
        ]
    },
    afternoon: {
        label: 'Afternoon',
        mood: 'Energized Vibes',
        playlists: [
            { name: 'Afternoon Energy', desc: 'Beat the afternoon slump', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
            { name: 'Lunch Break Hits', desc: 'Feel-good tracks', gradient: 'linear-gradient(135deg, #a8ff78, #78ffd6)' },
            { name: 'Power Hour', desc: 'High energy productivity', gradient: 'linear-gradient(135deg, #f5af19, #f12711)' },
            { name: 'Smooth Afternoon', desc: 'Easy listening vibes', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' }
        ]
    },
    evening: {
        label: 'Evening',
        mood: 'Wind Down',
        playlists: [
            { name: 'Golden Hour', desc: 'Sunset vibes & chill', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
            { name: 'Dinner Party', desc: 'Sophisticated ambiance', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
            { name: 'Evening Unwind', desc: 'Relaxing after work', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: 'Sunset Drive', desc: 'Perfect for the commute', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' }
        ]
    },
    night: {
        label: 'Night',
        mood: 'Late Night Feels',
        playlists: [
            { name: 'Night Owl', desc: 'For the late night sessions', gradient: 'linear-gradient(135deg, #1a1a2e, #4a4e69)' },
            { name: 'Midnight Mood', desc: 'Deep vibes & R&B', gradient: 'linear-gradient(135deg, #2c3e50, #3498db)' },
            { name: 'Stargazing', desc: 'Ambient space sounds', gradient: 'linear-gradient(135deg, #0f0c29, #302b63)' },
            { name: 'Chill Night In', desc: 'Cozy at-home vibes', gradient: 'linear-gradient(135deg, #373b44, #4286f4)' }
        ]
    },
    late_night: {
        label: 'Late Night',
        mood: 'Sleepy Vibes',
        playlists: [
            { name: 'Sleep Sounds', desc: 'Drift off peacefully', gradient: 'linear-gradient(135deg, #0f0c29, #302b63)' },
            { name: 'Deep Sleep', desc: 'Ambient for rest', gradient: 'linear-gradient(135deg, #1a1a2e, #16213e)' },
            { name: 'Night Drive', desc: 'Empty roads playlist', gradient: 'linear-gradient(135deg, #232526, #414345)' },
            { name: 'Insomnia Mix', desc: 'When sleep won\'t come', gradient: 'linear-gradient(135deg, #2c3e50, #4ca1af)' }
        ]
    }
};

// Activity-based recommendations
const activityPlaylists = {
    working: [
        { name: 'Deep Focus', desc: 'Maximum concentration', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
        { name: 'Lo-Fi Beats', desc: 'Study & work essentials', gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
        { name: 'Instrumental Focus', desc: 'No lyrics, all focus', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
        { name: 'Brain Food', desc: 'Boost your productivity', gradient: 'linear-gradient(135deg, #f5af19, #f12711)' }
    ],
    exercising: [
        { name: 'Beast Mode', desc: 'Hardcore workout energy', gradient: 'linear-gradient(135deg, #f12711, #f5af19)' },
        { name: 'Cardio Rush', desc: 'High BPM motivation', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
        { name: 'Strength Training', desc: 'Heavy lifting anthems', gradient: 'linear-gradient(135deg, #434343, #000000)' },
        { name: 'Yoga Flow', desc: 'Mindful movement', gradient: 'linear-gradient(135deg, #11998e, #38ef7d)' }
    ],
    relaxing: [
        { name: 'Total Relaxation', desc: 'Unwind completely', gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
        { name: 'Spa Day', desc: 'Self-care soundscape', gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)' },
        { name: 'Reading Companion', desc: 'Quiet background music', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
        { name: 'Meditation Garden', desc: 'Inner peace sounds', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' }
    ],
    socializing: [
        { name: 'Party Starter', desc: 'Get the party going', gradient: 'linear-gradient(135deg, #f5af19, #f12711)' },
        { name: 'Game Night', desc: 'Fun background beats', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
        { name: 'Dinner with Friends', desc: 'Conversation-friendly', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
        { name: 'Road Trip', desc: 'Sing-along essentials', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' }
    ]
};

// Initialize Synched Page
async function initSynchedPage() {
    updateTimeContext();
    await detectLocation();
    await detectWeather();
    detectActivity();
    
    // Update AI recommendation banner
    setTimeout(() => {
        updateAIRecommendation();
    }, 1500);
}

// Get current time period
function getTimePeriod() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 8) return 'early_morning';
    if (hour >= 8 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    if (hour >= 21 || hour < 0) return 'night';
    return 'late_night';
}

// Update time context
function updateTimeContext() {
    currentTimePeriod = getTimePeriod();
    const timeData = timeRecommendations[currentTimePeriod];
    
    document.getElementById('time-value').textContent = timeData.label;
    
    // Populate time-based playlists
    const timePlaylistsContainer = document.getElementById('time-playlists');
    timePlaylistsContainer.innerHTML = timeData.playlists.map(playlist => createPlaylistCard(playlist)).join('');
}

// Detect location (simulated)
async function detectLocation() {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Pick a random city for demo
    const cityData = cities[Math.floor(Math.random() * cities.length)];
    currentCity = cityData.name;
    
    document.getElementById('location-value').textContent = cityData.name;
    
    return cityData;
}

// Simulate weather detection
async function detectWeather() {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const hour = new Date().getHours();
    
    // Get city's typical weather or determine by time
    const cityData = cities.find(c => c.name === currentCity) || cities[0];
    
    // Adjust weather based on time of day
    if (hour >= 21 || hour < 6) {
        currentWeather = 'clear_night';
    } else {
        // Use city's typical weather or randomize
        const weatherOptions = ['sunny', 'cloudy', 'rainy', 'snowy'];
        const rand = Math.random();
        
        // Bias towards city's typical weather
        if (rand < 0.6) {
            currentWeather = cityData.weather;
        } else {
            currentWeather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
        }
    }
    
    // Apply weather theme with visual effects
    applyWeatherTheme(currentWeather);
    
    // Update weather display
    const weatherLabels = {
        sunny: '☀️ Sunny, 72°F',
        cloudy: '☁️ Cloudy, 65°F',
        rainy: '🌧️ Rainy, 58°F',
        stormy: '⛈️ Stormy, 55°F',
        snowy: '❄️ Snowy, 32°F',
        clear_night: '🌙 Clear Night, 62°F'
    };
    
    document.getElementById('weather-value').textContent = weatherLabels[currentWeather];
    
    // Generate weather + location based playlists
    const weatherPlaylists = generateWeatherPlaylists(currentWeather);
    const weatherPlaylistsContainer = document.getElementById('weather-playlists');
    weatherPlaylistsContainer.innerHTML = weatherPlaylists.map(playlist => createPlaylistCard(playlist)).join('');
    
    // Generate city-specific location playlists
    const locationPlaylists = generateCityWeatherPlaylists(currentCity, currentWeather, currentTimePeriod);
    const locationPlaylistsContainer = document.getElementById('location-playlists');
    locationPlaylistsContainer.innerHTML = locationPlaylists.map(playlist => createPlaylistCard(playlist)).join('');
}

// Generate weather-based playlists
function generateWeatherPlaylists(weather) {
    const weatherPlaylistData = {
        sunny: [
            { name: 'Sunny Day Vibes', desc: 'Feel-good summer hits', gradient: 'linear-gradient(135deg, #ffd93d, #ff9500)' },
            { name: 'Beach Party', desc: 'Tropical dance tracks', gradient: 'linear-gradient(135deg, #00d2ff, #3a7bd5)' },
            { name: 'Happy Hits', desc: 'Songs that make you smile', gradient: 'linear-gradient(135deg, #f5af19, #f12711)' },
            { name: 'Summer Pop', desc: 'This season\'s biggest hits', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' }
        ],
        cloudy: [
            { name: 'Cloudy Day Chill', desc: 'Mellow indie vibes', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: 'Overcast Acoustic', desc: 'Soft guitar melodies', gradient: 'linear-gradient(135deg, #a8c0ff, #3f2b96)' },
            { name: 'Daydreaming', desc: 'Lost in thought tunes', gradient: 'linear-gradient(135deg, #c9d6ff, #e2e2e2)' },
            { name: 'Coffee & Clouds', desc: 'Café vibes for gray days', gradient: 'linear-gradient(135deg, #606c88, #3f4c6b)' }
        ],
        rainy: [
            { name: 'Rainy Day Jazz', desc: 'Cozy jazz for stormy weather', gradient: 'linear-gradient(135deg, #4a90a4, #2c5f72)' },
            { name: 'Lo-Fi Rain', desc: 'Beats to watch the rain to', gradient: 'linear-gradient(135deg, #373b44, #4286f4)' },
            { name: 'Melancholy Mood', desc: 'Emotional rainy day songs', gradient: 'linear-gradient(135deg, #2c3e50, #bdc3c7)' },
            { name: 'Thunder & Piano', desc: 'Dramatic classical pieces', gradient: 'linear-gradient(135deg, #434343, #000000)' }
        ],
        clear_night: [
            { name: 'Midnight Dreams', desc: 'Late night R&B', gradient: 'linear-gradient(135deg, #1a1a2e, #4a4e69)' },
            { name: 'Starlight Sessions', desc: 'Ambient & ethereal', gradient: 'linear-gradient(135deg, #0f0c29, #302b63)' },
            { name: 'Night Drive', desc: 'Cruising under stars', gradient: 'linear-gradient(135deg, #232526, #414345)' },
            { name: 'Moonlit Chill', desc: 'Relaxing night vibes', gradient: 'linear-gradient(135deg, #2c3e50, #3498db)' }
        ],
        stormy: [
            { name: 'Storm Energy', desc: 'Powerful & intense', gradient: 'linear-gradient(135deg, #434343, #000000)' },
            { name: 'Thunder Rock', desc: 'Epic storm soundtrack', gradient: 'linear-gradient(135deg, #2c3e50, #4ca1af)' },
            { name: 'Electric Storm', desc: 'Electronic & dramatic', gradient: 'linear-gradient(135deg, #373b44, #4286f4)' },
            { name: 'Cozy Thunder', desc: 'Warm indoors vibes', gradient: 'linear-gradient(135deg, #606c88, #3f4c6b)' }
        ],
        snowy: [
            { name: 'Winter Wonderland', desc: 'Magical snowy soundscape', gradient: 'linear-gradient(135deg, #e8e8e8, #b8d4e3)' },
            { name: 'Fireside Classical', desc: 'Warm by the fire', gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)' },
            { name: 'Snow Day Chill', desc: 'Cozy winter vibes', gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
            { name: 'Holiday Feels', desc: 'Festive winter songs', gradient: 'linear-gradient(135deg, #11998e, #38ef7d)' }
        ]
    };
    
    return weatherPlaylistData[weather] || weatherPlaylistData.sunny;
}

// Detect activity (simulated based on time and patterns)
function detectActivity() {
    const hour = new Date().getHours();
    const day = new Date().getDay();
    
    let activity;
    let activityLabel;
    
    // Simulate activity based on time patterns
    if (hour >= 9 && hour < 17 && day >= 1 && day <= 5) {
        activity = 'working';
        activityLabel = 'Working';
    } else if ((hour >= 6 && hour < 8) || (hour >= 17 && hour < 19)) {
        activity = 'exercising';
        activityLabel = 'Active Time';
    } else if (hour >= 19 && hour < 22) {
        activity = 'relaxing';
        activityLabel = 'Relaxing';
    } else if ((day === 0 || day === 6) && hour >= 12 && hour < 22) {
        activity = 'socializing';
        activityLabel = 'Social Time';
    } else {
        activity = 'relaxing';
        activityLabel = 'Leisure Time';
    }
    
    document.getElementById('activity-value').textContent = activityLabel;
    
    // Populate activity-based playlists
    const activityPlaylistsContainer = document.getElementById('activity-playlists');
    const playlists = activityPlaylists[activity];
    activityPlaylistsContainer.innerHTML = playlists.map(playlist => createPlaylistCard(playlist)).join('');
}

// Update AI recommendation banner
function updateAIRecommendation() {
    const timeData = timeRecommendations[currentTimePeriod];
    
    const recommendations = [
        `Perfect for your ${timeData.label.toLowerCase()} in ${currentCity}`,
        `${currentCity} ${currentWeather === 'rainy' ? 'rain' : currentWeather} vibes activated`,
        `Curated for this ${currentWeather} ${timeData.label.toLowerCase()}`,
        `Your ${currentCity} soundtrack is ready`
    ];
    
    const descriptions = [
        `Weather, time, and location all synced for ${currentCity}`,
        `AI-powered recommendations for ${currentWeather} weather`,
        `Based on ${currentCity}'s vibe right now`,
        'Continuously learning from your preferences'
    ];
    
    const titleEl = document.getElementById('ai-recommendation-title');
    const descEl = document.getElementById('ai-recommendation-desc');
    
    titleEl.textContent = recommendations[Math.floor(Math.random() * recommendations.length)];
    descEl.textContent = descriptions[Math.floor(Math.random() * descriptions.length)];
}

// Create playlist card HTML
function createPlaylistCard(playlist) {
    return `
        <div class="music-card" onclick="playPlaylist('${playlist.name}')">
            <div class="card-img" style="background: ${playlist.gradient};"></div>
            <h3>${playlist.name}</h3>
            <p>${playlist.desc}</p>
            <button class="play-btn">▶</button>
        </div>
    `;
}

// Play playlist (simulated)
function playPlaylist(name) {
    console.log(`Playing: ${name}`);
    
    // Update now playing bar
    document.querySelector('.track-name').textContent = `${name} - Track 1`;
    document.querySelector('.artist-name').textContent = 'Various Artists';
    
    // Visual feedback
    const playPauseBtn = document.querySelector('.play-pause');
    playPauseBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
}

// ========================================
// PLAYER CONTROLS
// ========================================

let isPlaying = false;

function initPlayerControls() {
    const playPauseBtn = document.querySelector('.play-pause');
    
    playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            playPauseBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
        } else {
            playPauseBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
        }
    });
    
    // Progress bar interaction
    const progressBar = document.querySelector('.progress-bar');
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = ((e.clientX - rect.left) / rect.width) * 100;
        document.querySelector('.progress-fill').style.width = `${percent}%`;
    });
    
    // Volume bar interaction
    const volumeBar = document.querySelector('.volume-bar');
    volumeBar.addEventListener('click', (e) => {
        const rect = volumeBar.getBoundingClientRect();
        const percent = ((e.clientX - rect.left) / rect.width) * 100;
        document.querySelector('.volume-fill').style.width = `${percent}%`;
    });
    
    // Like button
    const likeBtn = document.querySelector('.like-btn');
    likeBtn.addEventListener('click', () => {
        if (likeBtn.textContent === '♡') {
            likeBtn.textContent = '♥';
            likeBtn.style.color = '#1db954';
        } else {
            likeBtn.textContent = '♡';
            likeBtn.style.color = '';
        }
    });
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================

const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        console.log('Searching for:', query);
    });
}

// ========================================
// LIBRARY FILTERS
// ========================================

const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// ========================================
// WEATHER TOGGLE FOR DEMO
// ========================================

// Add keyboard shortcuts to demo different weather themes
document.addEventListener('keydown', (e) => {
    // Only work when on synched page
    const synchedPage = document.getElementById('synched-page');
    if (!synchedPage.classList.contains('active')) return;
    
    const weatherMap = {
        '1': 'sunny',
        '2': 'cloudy', 
        '3': 'rainy',
        '4': 'snowy',
        '5': 'clear_night',
        '6': 'stormy'
    };
    
    if (weatherMap[e.key]) {
        currentWeather = weatherMap[e.key];
        applyWeatherTheme(currentWeather);
        
        const weatherLabels = {
            sunny: '☀️ Sunny, 72°F',
            cloudy: '☁️ Cloudy, 65°F',
            rainy: '🌧️ Rainy, 58°F',
            stormy: '⛈️ Stormy, 55°F',
            snowy: '❄️ Snowy, 32°F',
            clear_night: '🌙 Clear Night, 62°F'
        };
        
        document.getElementById('weather-value').textContent = weatherLabels[currentWeather];
        
        // Update playlists
        const weatherPlaylists = generateWeatherPlaylists(currentWeather);
        document.getElementById('weather-playlists').innerHTML = weatherPlaylists.map(playlist => createPlaylistCard(playlist)).join('');
        
        const locationPlaylists = generateCityWeatherPlaylists(currentCity, currentWeather, currentTimePeriod);
        document.getElementById('location-playlists').innerHTML = locationPlaylists.map(playlist => createPlaylistCard(playlist)).join('');
        
        updateAIRecommendation();
    }
    
    // City toggle with C key
    if (e.key === 'c' || e.key === 'C') {
        const currentIndex = cities.findIndex(c => c.name === currentCity);
        const nextIndex = (currentIndex + 1) % cities.length;
        currentCity = cities[nextIndex].name;
        
        document.getElementById('location-value').textContent = currentCity;
        
        const locationPlaylists = generateCityWeatherPlaylists(currentCity, currentWeather, currentTimePeriod);
        document.getElementById('location-playlists').innerHTML = locationPlaylists.map(playlist => createPlaylistCard(playlist)).join('');
        
        updateAIRecommendation();
    }
});

// ========================================
// PHOTO UPLOAD & AI ANALYSIS
// ========================================

function initPhotoUpload() {
    const uploadArea = document.getElementById('upload-area');
    const uploadPlaceholder = document.getElementById('upload-placeholder');
    const uploadPreview = document.getElementById('upload-preview');
    const photoInput = document.getElementById('photo-upload');
    const removeBtn = document.getElementById('remove-photo');
    const generateBtn = document.getElementById('generate-from-photo');
    const previewImage = document.getElementById('preview-image');
    
    if (!uploadArea) return;
    
    // Click to upload
    uploadPlaceholder.addEventListener('click', () => {
        photoInput.click();
    });
    
    // File selected
    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handlePhotoUpload(file);
        }
    });
    
    // Drag and drop
    uploadPlaceholder.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadPlaceholder.classList.add('dragover');
    });
    
    uploadPlaceholder.addEventListener('dragleave', () => {
        uploadPlaceholder.classList.remove('dragover');
    });
    
    uploadPlaceholder.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadPlaceholder.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handlePhotoUpload(file);
        }
    });
    
    // Remove photo
    removeBtn.addEventListener('click', () => {
        uploadedPhoto = null;
        uploadPreview.style.display = 'none';
        uploadPlaceholder.style.display = 'block';
        generateBtn.disabled = true;
        document.getElementById('photo-analysis').style.display = 'none';
        document.getElementById('photo-playlists-section').style.display = 'none';
    });
    
    // Generate playlist from photo
    generateBtn.addEventListener('click', () => {
        if (uploadedPhoto) {
            analyzePhotoAndGeneratePlaylist();
        }
    });
}

function handlePhotoUpload(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedPhoto = e.target.result;
        document.getElementById('preview-image').src = uploadedPhoto;
        document.getElementById('upload-preview').style.display = 'block';
        document.getElementById('upload-placeholder').style.display = 'none';
        document.getElementById('generate-from-photo').disabled = false;
    };
    reader.readAsDataURL(file);
}

async function analyzePhotoAndGeneratePlaylist() {
    const analysisDiv = document.getElementById('photo-analysis');
    const tagsDiv = document.getElementById('analysis-tags');
    const playlistsSection = document.getElementById('photo-playlists-section');
    const playlistsContainer = document.getElementById('photo-playlists');
    
    // Show analyzing state
    analysisDiv.style.display = 'block';
    tagsDiv.innerHTML = '<span class="analyzing-text">🔍 Analyzing image...</span>';
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate AI-detected attributes from photo
    const photoAnalysis = simulatePhotoAnalysis();
    
    // Display detected tags
    tagsDiv.innerHTML = photoAnalysis.tags.map(tag => 
        `<span class="tag ${tag.type}">${tag.emoji} ${tag.label}</span>`
    ).join('');
    
    // Generate playlists based on analysis
    const playlists = generatePhotoBasedPlaylists(photoAnalysis);
    
    // Show playlists section
    playlistsSection.style.display = 'block';
    playlistsContainer.innerHTML = playlists.map(playlist => createPlaylistCard(playlist)).join('');
    
    // Scroll to playlists
    playlistsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function simulatePhotoAnalysis() {
    // Simulate different photo scenarios
    const scenarios = [
        {
            tags: [
                { type: 'mood', emoji: '😊', label: 'Happy vibes' },
                { type: 'scene', emoji: '🌳', label: 'Outdoor/Nature' },
                { type: 'color', emoji: '🟢', label: 'Green tones' },
                { type: 'vibe', emoji: '✨', label: 'Peaceful' }
            ],
            mood: 'nature_peaceful'
        },
        {
            tags: [
                { type: 'mood', emoji: '🎉', label: 'Energetic' },
                { type: 'scene', emoji: '🏙️', label: 'Urban/City' },
                { type: 'color', emoji: '🔵', label: 'Cool tones' },
                { type: 'vibe', emoji: '⚡', label: 'Dynamic' }
            ],
            mood: 'urban_energy'
        },
        {
            tags: [
                { type: 'mood', emoji: '😌', label: 'Relaxed' },
                { type: 'scene', emoji: '🏠', label: 'Indoor/Cozy' },
                { type: 'color', emoji: '🟠', label: 'Warm tones' },
                { type: 'vibe', emoji: '☕', label: 'Cozy' }
            ],
            mood: 'cozy_indoor'
        },
        {
            tags: [
                { type: 'mood', emoji: '🥰', label: 'Romantic' },
                { type: 'scene', emoji: '🌅', label: 'Sunset' },
                { type: 'color', emoji: '🟣', label: 'Purple/Pink' },
                { type: 'vibe', emoji: '💫', label: 'Dreamy' }
            ],
            mood: 'romantic_sunset'
        },
        {
            tags: [
                { type: 'mood', emoji: '🔥', label: 'Intense' },
                { type: 'scene', emoji: '🎸', label: 'Concert/Event' },
                { type: 'color', emoji: '🔴', label: 'Bold colors' },
                { type: 'vibe', emoji: '🎵', label: 'Musical' }
            ],
            mood: 'concert_energy'
        }
    ];
    
    return scenarios[Math.floor(Math.random() * scenarios.length)];
}

function generatePhotoBasedPlaylists(analysis) {
    const playlistTemplates = {
        nature_peaceful: [
            { name: 'Forest Serenity', desc: 'Peaceful sounds from your nature photo', gradient: 'linear-gradient(135deg, #134e5e, #71b280)' },
            { name: 'Green Escape', desc: 'Acoustic & ambient inspired by outdoors', gradient: 'linear-gradient(135deg, #11998e, #38ef7d)' },
            { name: 'Natural Calm', desc: 'Relaxing tunes matching your vibe', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
            { name: 'Photo Mood: Peaceful', desc: 'AI-curated from your image', gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' }
        ],
        urban_energy: [
            { name: 'City Pulse', desc: 'Urban beats from your city photo', gradient: 'linear-gradient(135deg, #434343, #000000)' },
            { name: 'Street Energy', desc: 'Hip-hop & electronic vibes', gradient: 'linear-gradient(135deg, #2c3e50, #3498db)' },
            { name: 'Metro Motion', desc: 'Fast-paced city soundtrack', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: 'Photo Mood: Dynamic', desc: 'AI-curated from your image', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' }
        ],
        cozy_indoor: [
            { name: 'Cozy Corner', desc: 'Warm tunes for your indoor vibe', gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)' },
            { name: 'Home Comfort', desc: 'Relaxing at-home playlist', gradient: 'linear-gradient(135deg, #f5af19, #f12711)' },
            { name: 'Warm Blanket Beats', desc: 'Lo-fi & chill for cozy moments', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: 'Photo Mood: Cozy', desc: 'AI-curated from your image', gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' }
        ],
        romantic_sunset: [
            { name: 'Golden Hour Love', desc: 'Romantic sunset vibes', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
            { name: 'Sunset Dreams', desc: 'Dreamy tunes for magic hour', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
            { name: 'Purple Sky Romance', desc: 'Love songs & soft melodies', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: 'Photo Mood: Romantic', desc: 'AI-curated from your image', gradient: 'linear-gradient(135deg, #ff9a9e, #fad0c4)' }
        ],
        concert_energy: [
            { name: 'Live Energy', desc: 'Concert vibes from your photo', gradient: 'linear-gradient(135deg, #f12711, #f5af19)' },
            { name: 'Stage Presence', desc: 'High-energy performance tracks', gradient: 'linear-gradient(135deg, #434343, #000000)' },
            { name: 'Crowd Favorites', desc: 'Songs that get everyone moving', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
            { name: 'Photo Mood: Electric', desc: 'AI-curated from your image', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' }
        ]
    };
    
    return playlistTemplates[analysis.mood] || playlistTemplates.nature_peaceful;
}

// ========================================
// BEREAL INTEGRATION
// ========================================

function initBeRealIntegration() {
    const connectBtn = document.getElementById('bereal-connect');
    const syncBtn = document.getElementById('sync-bereal');
    
    if (!connectBtn) return;
    
    connectBtn.addEventListener('click', () => {
        connectBeReal();
    });
    
    if (syncBtn) {
        syncBtn.addEventListener('click', () => {
            syncBeRealPhoto();
        });
    }
}

async function connectBeReal() {
    const connectBtn = document.getElementById('bereal-connect');
    const content = document.querySelector('.bereal-content');
    const connected = document.getElementById('bereal-connected');
    const status = document.getElementById('bereal-status');
    
    // Simulate connection
    connectBtn.innerHTML = '<span class="analyzing-spinner" style="width:20px;height:20px;border-width:2px;margin:0;"></span> Connecting...';
    connectBtn.disabled = true;
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update to connected state
    beRealConnected = true;
    
    status.innerHTML = `
        <div class="status-indicator connected"></div>
        <span>Connected</span>
    `;
    
    connectBtn.style.display = 'none';
    connected.style.display = 'block';
    
    // Set BeReal time
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    document.getElementById('bereal-time').textContent = `${hours}:${minutes} ${ampm}`;
    
    // Simulate BeReal photo backgrounds
    document.getElementById('bereal-main').style.background = 'linear-gradient(135deg, #2c3e50, #4ca1af)';
    document.getElementById('bereal-selfie').style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
}

async function syncBeRealPhoto() {
    const syncBtn = document.getElementById('sync-bereal');
    const tagsDiv = document.getElementById('bereal-tags');
    
    syncBtn.innerHTML = '<span class="analyzing-spinner" style="width:18px;height:18px;border-width:2px;margin:0;"></span> Syncing...';
    syncBtn.disabled = true;
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate detected mood/activity from BeReal
    const beRealAnalysis = [
        { moods: ['😊 Happy', '💻 Working', '🏠 Home'], activity: 'working' },
        { moods: ['😴 Tired', '🛋️ Relaxing', '📺 Watching'], activity: 'relaxing' },
        { moods: ['🎉 Excited', '👯 With Friends', '🍕 Eating'], activity: 'socializing' },
        { moods: ['💪 Energized', '🏃 Active', '🌳 Outside'], activity: 'exercising' },
        { moods: ['☕ Cozy', '📚 Reading', '🌧️ Rainy Day'], activity: 'relaxing' }
    ];
    
    const analysis = beRealAnalysis[Math.floor(Math.random() * beRealAnalysis.length)];
    
    // Update tags
    tagsDiv.innerHTML = analysis.moods.map((mood, i) => {
        const types = ['mood', 'activity', 'location'];
        return `<span class="tag ${types[i]}">${mood}</span>`;
    }).join('');
    
    // Update activity based on BeReal
    document.getElementById('activity-value').textContent = analysis.activity.charAt(0).toUpperCase() + analysis.activity.slice(1);
    
    // Update activity playlists
    const activityPlaylistsContainer = document.getElementById('activity-playlists');
    const playlists = activityPlaylists[analysis.activity];
    activityPlaylistsContainer.innerHTML = playlists.map(playlist => createPlaylistCard(playlist)).join('');
    
    syncBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
        Synced!
    `;
    
    setTimeout(() => {
        syncBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
            Sync Now
        `;
        syncBtn.disabled = false;
    }, 2000);
}

// ========================================
// MOOD MIXER
// ========================================

function initMoodMixer() {
    const moodSliders = document.querySelectorAll('.mood-range');
    const generateBtn = document.getElementById('generate-mood-playlist');
    
    moodSliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const mood = e.target.dataset.mood;
            const value = e.target.value;
            
            // Update mood state
            currentMoods[mood] = parseInt(value);
            
            // Update value display
            document.getElementById(`${mood}-value`).textContent = `${value}%`;
            
            // Update bar width
            const bar = e.target.nextElementSibling;
            if (bar) {
                bar.style.width = `${value}%`;
            }
            
            // Update visualization
            updateMoodVisualization();
        });
    });
    
    if (generateBtn) {
        generateBtn.addEventListener('click', generateMoodPlaylist);
    }
    
    // Initial visualization
    updateMoodVisualization();
}

function updateMoodVisualization() {
    const blendCircle = document.getElementById('blend-circle');
    const description = document.getElementById('mood-description');
    
    // Calculate dominant moods
    const sortedMoods = Object.entries(currentMoods)
        .filter(([_, value]) => value > 0)
        .sort((a, b) => b[1] - a[1]);
    
    // Generate gradient based on active moods
    const moodColors = {
        happy: '#ffd93d',
        sad: '#4a90a4',
        energetic: '#f5af19',
        calm: '#43e97b',
        angry: '#f12711',
        romantic: '#f093fb',
        nostalgic: '#667eea',
        party: '#fa709a'
    };
    
    if (sortedMoods.length > 0) {
        let gradientParts = [];
        let currentAngle = 0;
        
        sortedMoods.forEach(([mood, value]) => {
            const angle = (value / 100) * 360;
            gradientParts.push(`${moodColors[mood]} ${currentAngle}deg ${currentAngle + angle}deg`);
            currentAngle += angle;
        });
        
        // Fill remaining with dark
        if (currentAngle < 360) {
            gradientParts.push(`rgba(50,50,50,0.5) ${currentAngle}deg 360deg`);
        }
        
        blendCircle.style.background = `conic-gradient(${gradientParts.join(', ')})`;
        
        // Update box shadow with primary color
        blendCircle.style.boxShadow = `0 0 40px ${moodColors[sortedMoods[0][0]]}40`;
    }
    
    // Generate description
    if (sortedMoods.length === 0) {
        description.textContent = 'Adjust the sliders to mix your mood';
    } else if (sortedMoods.length === 1) {
        description.textContent = `Feeling ${sortedMoods[0][0]} at ${sortedMoods[0][1]}% intensity`;
    } else {
        const primary = sortedMoods[0][0];
        const secondary = sortedMoods[1][0];
        description.textContent = `Mostly ${primary} with a touch of ${secondary}`;
    }
}

async function generateMoodPlaylist() {
    const btn = document.getElementById('generate-mood-playlist');
    const section = document.getElementById('mood-playlists-section');
    const container = document.getElementById('mood-playlists');
    
    btn.innerHTML = '<span class="analyzing-spinner" style="width:20px;height:20px;border-width:2px;margin:0;"></span> Generating...';
    btn.disabled = true;
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Get dominant moods
    const activeMoods = Object.entries(currentMoods)
        .filter(([_, value]) => value > 20)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
    
    // Generate playlists based on mood blend
    const playlists = generateMoodBlendPlaylists(activeMoods);
    
    // Show section
    section.style.display = 'block';
    container.innerHTML = playlists.map(playlist => createPlaylistCard(playlist)).join('');
    
    // Reset button
    btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
        Generate Mood Playlist
    `;
    btn.disabled = false;
    
    // Scroll to playlists
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function generateMoodBlendPlaylists(activeMoods) {
    const moodPlaylistTemplates = {
        happy: [
            { name: 'Pure Joy', desc: 'Feel-good hits for happy times', gradient: 'linear-gradient(135deg, #ffd93d, #ff9500)' },
            { name: 'Smile Inducer', desc: 'Songs that boost your mood', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' }
        ],
        sad: [
            { name: 'Melancholy Mix', desc: 'For when you need to feel', gradient: 'linear-gradient(135deg, #4a90a4, #2c5f72)' },
            { name: 'Rainy Soul', desc: 'Emotional depth & beauty', gradient: 'linear-gradient(135deg, #373b44, #4286f4)' }
        ],
        energetic: [
            { name: 'Energy Surge', desc: 'High-octane motivation', gradient: 'linear-gradient(135deg, #f5af19, #f12711)' },
            { name: 'Adrenaline Rush', desc: 'Maximum energy tracks', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' }
        ],
        calm: [
            { name: 'Tranquil Mind', desc: 'Peace & serenity', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
            { name: 'Zen Garden', desc: 'Ambient relaxation', gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' }
        ],
        angry: [
            { name: 'Release the Rage', desc: 'Let it all out', gradient: 'linear-gradient(135deg, #f12711, #8b0000)' },
            { name: 'Intensity Mode', desc: 'Powerful & aggressive', gradient: 'linear-gradient(135deg, #434343, #000000)' }
        ],
        romantic: [
            { name: 'Heart Strings', desc: 'Love songs & slow jams', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
            { name: 'Moonlit Romance', desc: 'Romantic evening vibes', gradient: 'linear-gradient(135deg, #ff9a9e, #fad0c4)' }
        ],
        nostalgic: [
            { name: 'Memory Lane', desc: 'Throwback favorites', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: 'Time Machine', desc: 'Songs from the past', gradient: 'linear-gradient(135deg, #a8c0ff, #3f2b96)' }
        ],
        party: [
            { name: 'Dance Floor Filler', desc: 'Get the party started', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
            { name: 'Club Bangers', desc: 'Non-stop party energy', gradient: 'linear-gradient(135deg, #f5af19, #f12711)' }
        ]
    };
    
    let playlists = [];
    
    // Add playlists for each active mood
    activeMoods.forEach(([mood, intensity]) => {
        if (moodPlaylistTemplates[mood]) {
            playlists.push(...moodPlaylistTemplates[mood].map(p => ({
                ...p,
                name: `${p.name} (${intensity}%)`,
                desc: p.desc
            })));
        }
    });
    
    // Add a custom blend playlist
    if (activeMoods.length > 1) {
        const moodNames = activeMoods.map(([mood]) => mood).join(' + ');
        playlists.unshift({
            name: `Your Mood Blend`,
            desc: `Custom mix: ${moodNames}`,
            gradient: 'linear-gradient(135deg, #9b4dca, #4d9fca, #1db954)'
        });
    }
    
    return playlists.slice(0, 6);
}

// ========================================
// CALENDAR SYNC
// ========================================

const calendarEvents = [
    { id: 1, name: 'Team Standup', type: 'meeting', time: '9:00 AM', timeUntil: 'in 30 min', mood: 'focus', icon: '👥' },
    { id: 2, name: 'Project Review', type: 'meeting', time: '11:00 AM', timeUntil: 'in 2 hrs', mood: 'motivate', icon: '📊' },
    { id: 3, name: 'Gym Session', type: 'workout', time: '5:30 PM', timeUntil: 'in 8 hrs', mood: 'pump', icon: '🏋️' },
    { id: 4, name: 'Dinner with Sarah', type: 'social', time: '7:00 PM', timeUntil: 'in 10 hrs', mood: 'romantic', icon: '🍽️' },
    { id: 5, name: 'Study Group', type: 'study', time: '3:00 PM', timeUntil: 'in 5 hrs', mood: 'focus', icon: '📚' }
];

function initCalendarSync() {
    const connectBtn = document.getElementById('connect-calendar-btn');
    const connectCardBtn = document.getElementById('connect-calendar');
    
    if (connectBtn) {
        connectBtn.addEventListener('click', connectCalendar);
    }
    if (connectCardBtn) {
        connectCardBtn.addEventListener('click', connectCalendar);
    }
}

async function connectCalendar() {
    const connectBtn = document.getElementById('connect-calendar-btn');
    const notConnected = document.getElementById('calendar-not-connected');
    const connected = document.getElementById('calendar-connected');
    const badge = document.getElementById('calendar-sync-badge');
    const calendarValue = document.getElementById('calendar-value');
    const connectCardBtn = document.getElementById('connect-calendar');
    
    if (connectBtn) {
        connectBtn.innerHTML = '<span class="analyzing-spinner" style="width:20px;height:20px;border-width:2px;margin:0;"></span> Connecting...';
        connectBtn.disabled = true;
    }
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    calendarConnected = true;
    
    // Update UI
    if (notConnected) notConnected.style.display = 'none';
    if (connected) connected.style.display = 'block';
    if (badge) {
        badge.textContent = 'Connected';
        badge.classList.add('connected');
    }
    if (connectCardBtn) connectCardBtn.style.display = 'none';
    
    // Show first event
    const nextEvent = calendarEvents[0];
    if (calendarValue) {
        calendarValue.textContent = `${nextEvent.name} ${nextEvent.timeUntil}`;
    }
    
    // Populate events list
    populateCalendarEvents();
}

function populateCalendarEvents() {
    const eventsList = document.getElementById('events-list');
    const previewDiv = document.getElementById('event-playlist-preview');
    
    if (!eventsList) return;
    
    eventsList.innerHTML = calendarEvents.slice(0, 3).map((event, index) => `
        <div class="event-item ${index === 0 ? 'active' : ''}" data-event-id="${event.id}" onclick="selectCalendarEvent(${event.id})">
            <span class="event-time ${index === 0 ? 'soon' : ''}">${event.time}</span>
            <div class="event-details">
                <div class="event-name">${event.name}</div>
                <div class="event-type">${event.type} • ${event.timeUntil}</div>
            </div>
            <span class="event-music-icon">${event.icon}</span>
        </div>
    `).join('');
    
    // Show playlist preview for first event
    const firstEvent = calendarEvents[0];
    if (previewDiv) {
        previewDiv.innerHTML = `<p>🎵 Playing <strong>Pre-${firstEvent.type} Energy</strong> to get you ready for ${firstEvent.name}</p>`;
    }
    
    // Generate playlists for upcoming event
    generateCalendarPlaylists(firstEvent);
}

function selectCalendarEvent(eventId) {
    const event = calendarEvents.find(e => e.id === eventId);
    if (!event) return;
    
    // Update active state
    document.querySelectorAll('.event-item').forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.eventId) === eventId) {
            item.classList.add('active');
        }
    });
    
    // Update preview
    const previewDiv = document.getElementById('event-playlist-preview');
    if (previewDiv) {
        previewDiv.innerHTML = `<p>🎵 Playing <strong>Pre-${event.type} Energy</strong> to get you ready for ${event.name}</p>`;
    }
    
    // Generate playlists
    generateCalendarPlaylists(event);
}

function generateCalendarPlaylists(event) {
    const section = document.getElementById('calendar-playlists-section');
    const container = document.getElementById('calendar-playlists');
    const title = document.getElementById('calendar-section-title');
    
    if (!section || !container) return;
    
    const eventPlaylists = {
        meeting: [
            { name: 'Meeting Mindset', desc: 'Focus & confidence boost', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: 'Pre-Meeting Power', desc: 'Get in the zone', gradient: 'linear-gradient(135deg, #f5af19, #f12711)' },
            { name: 'Professional Energy', desc: 'Calm but motivated', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
            { name: 'Confidence Boost', desc: 'Walk in ready', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' }
        ],
        workout: [
            { name: 'Pre-Workout Pump', desc: 'Get hyped for gains', gradient: 'linear-gradient(135deg, #f12711, #f5af19)' },
            { name: 'Gym Motivation', desc: 'Beast mode activation', gradient: 'linear-gradient(135deg, #434343, #000000)' },
            { name: 'Workout Warmup', desc: 'Ease into intensity', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
            { name: 'Iron Paradise', desc: 'Heavy lifting anthems', gradient: 'linear-gradient(135deg, #2c3e50, #4ca1af)' }
        ],
        social: [
            { name: 'Social Butterfly', desc: 'Upbeat & friendly vibes', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
            { name: 'Dinner Ambiance', desc: 'Sophisticated background', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: 'Good Vibes Only', desc: 'Feel-good energy', gradient: 'linear-gradient(135deg, #ffd93d, #ff9500)' },
            { name: 'Evening Out', desc: 'Perfect for socializing', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' }
        ],
        study: [
            { name: 'Study Session', desc: 'Deep focus for learning', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
            { name: 'Brain Boost', desc: 'Concentration enhancer', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: 'Lo-Fi Study', desc: 'Chill beats to study to', gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
            { name: 'Academic Focus', desc: 'Instrumental concentration', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' }
        ]
    };
    
    const playlists = eventPlaylists[event.type] || eventPlaylists.meeting;
    
    title.textContent = `📅 Getting Ready for: ${event.name}`;
    container.innerHTML = playlists.map(p => createPlaylistCard(p)).join('');
    section.style.display = 'block';
}

// ========================================
// PHONE MODE SYNC
// ========================================

function initPhoneModeSync() {
    const modeOptions = document.querySelectorAll('.phone-mode-option');
    
    modeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const mode = option.dataset.mode;
            setPhoneMode(mode);
        });
    });
    
    // Set initial mode
    setPhoneMode('normal');
}

function setPhoneMode(mode) {
    currentPhoneMode = mode;
    
    // Update UI
    document.querySelectorAll('.phone-mode-option').forEach(opt => {
        opt.classList.remove('active');
        if (opt.dataset.mode === mode) {
            opt.classList.add('active');
        }
    });
    
    // Update mode dot
    const modeDot = document.querySelector('.mode-dot');
    if (modeDot) {
        modeDot.className = 'mode-dot ' + mode;
    }
    
    // Update phone mode value display
    const modeLabels = {
        normal: 'Normal',
        dnd: 'Do Not Disturb',
        focus: 'Focus Mode',
        sleep: 'Sleep Mode',
        driving: 'Driving',
        workout: 'Workout'
    };
    
    const phoneModeValue = document.getElementById('phone-mode-value');
    if (phoneModeValue) {
        phoneModeValue.textContent = modeLabels[mode];
    }
    
    // Update mode info
    const modeInfo = document.getElementById('mode-playlist-info');
    const modeMessages = {
        normal: '📱 <strong>Normal mode</strong> - Playing your regular mix',
        dnd: '🔕 <strong>Do Not Disturb</strong> - Playing calm, non-intrusive music',
        focus: '🎯 <strong>Focus Mode</strong> - Playing instrumental focus tracks',
        sleep: '😴 <strong>Sleep Mode</strong> - Playing gentle sleep sounds',
        driving: '🚗 <strong>Driving Mode</strong> - Playing sing-along favorites',
        workout: '💪 <strong>Workout Mode</strong> - Playing high-energy pump tracks'
    };
    
    if (modeInfo) {
        modeInfo.innerHTML = `<p>${modeMessages[mode]}</p>`;
    }
    
    // Generate mode-specific playlists
    generatePhoneModePlaylists(mode);
}

function generatePhoneModePlaylists(mode) {
    const section = document.getElementById('phone-mode-playlists-section');
    const container = document.getElementById('phone-mode-playlists');
    const title = document.getElementById('phone-mode-section-title');
    
    if (!section || !container) return;
    
    const modePlaylists = {
        normal: [
            { name: 'Your Daily Mix', desc: 'Personalized for you', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: 'Discover Weekly', desc: 'New finds for you', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
            { name: 'On Repeat', desc: 'Your top tracks', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
            { name: 'Release Radar', desc: 'New from artists you love', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' }
        ],
        dnd: [
            { name: 'Peaceful Background', desc: 'Non-intrusive ambiance', gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
            { name: 'Quiet Focus', desc: 'Minimal & calming', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: 'Do Not Disturb Mix', desc: 'Gentle & unobtrusive', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
            { name: 'Soft Instrumentals', desc: 'No lyrics, all peace', gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)' }
        ],
        focus: [
            { name: 'Deep Focus', desc: 'Maximum concentration', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: 'Instrumental Focus', desc: 'No distractions', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
            { name: 'Lo-Fi Focus', desc: 'Chill beats for work', gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
            { name: 'Brain Food', desc: 'Enhance your productivity', gradient: 'linear-gradient(135deg, #f5af19, #f12711)' }
        ],
        sleep: [
            { name: 'Sleep Sounds', desc: 'Drift off peacefully', gradient: 'linear-gradient(135deg, #0f0c29, #302b63)' },
            { name: 'Deep Sleep', desc: 'Ambient for rest', gradient: 'linear-gradient(135deg, #1a1a2e, #16213e)' },
            { name: 'Night Rain', desc: 'Soothing rain sounds', gradient: 'linear-gradient(135deg, #373b44, #4286f4)' },
            { name: 'Peaceful Piano', desc: 'Gentle piano for sleep', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' }
        ],
        driving: [
            { name: 'Sing-Along Drive', desc: 'Songs everyone knows', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
            { name: 'Road Trip Hits', desc: 'Classic driving songs', gradient: 'linear-gradient(135deg, #f5af19, #f12711)' },
            { name: 'Highway Playlist', desc: 'Perfect for the road', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
            { name: 'Carpool Karaoke', desc: 'Belt it out!', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' }
        ],
        workout: [
            { name: 'Beast Mode', desc: 'Maximum intensity', gradient: 'linear-gradient(135deg, #f12711, #f5af19)' },
            { name: 'Gym Pump', desc: 'Heavy lifting energy', gradient: 'linear-gradient(135deg, #434343, #000000)' },
            { name: 'Cardio Blast', desc: 'High BPM for running', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
            { name: 'Workout Motivation', desc: 'Push through!', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' }
        ]
    };
    
    const modeEmojis = {
        normal: '📱',
        dnd: '🔕',
        focus: '🎯',
        sleep: '😴',
        driving: '🚗',
        workout: '💪'
    };
    
    const playlists = modePlaylists[mode] || modePlaylists.normal;
    
    title.textContent = `${modeEmojis[mode]} ${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode Playlists`;
    container.innerHTML = playlists.map(p => createPlaylistCard(p)).join('');
    section.style.display = 'block';
}

// ========================================
// DESTINATION / MOVEMENT SELECTION
// ========================================

function initDestinationSelection() {
    const destinationBtns = document.querySelectorAll('.destination-btn');
    
    destinationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const destination = btn.dataset.destination;
            selectDestination(destination, btn);
        });
    });
}

function selectDestination(destination, btnElement) {
    currentDestination = destination;
    
    // Update UI
    document.querySelectorAll('.destination-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    btnElement.classList.add('active');
    
    // Update movement value
    const movementValue = document.getElementById('movement-value');
    const destLabels = {
        gym: 'Walking to Gym',
        class: 'Heading to Class',
        work: 'Commuting to Work',
        home: 'Heading Home',
        coffee: 'To Coffee Shop',
        date: 'Date Night Prep',
        party: 'Party Time!',
        run: 'Going for a Run'
    };
    
    if (movementValue) {
        movementValue.textContent = destLabels[destination];
    }
    
    // Generate destination playlists
    generateDestinationPlaylists(destination);
}

function generateDestinationPlaylists(destination) {
    const section = document.getElementById('movement-playlists-section');
    const container = document.getElementById('movement-playlists');
    const title = document.getElementById('movement-section-title');
    
    if (!section || !container) return;
    
    const destinationPlaylists = {
        gym: [
            { name: 'Walk to Gym Pump', desc: 'Get hyped on the way', gradient: 'linear-gradient(135deg, #f12711, #f5af19)' },
            { name: 'Pre-Workout Energy', desc: 'Mental preparation', gradient: 'linear-gradient(135deg, #434343, #000000)' },
            { name: 'Gym Motivation Walk', desc: 'Every step counts', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
            { name: 'Beast Mode Loading', desc: 'Activating workout mode', gradient: 'linear-gradient(135deg, #2c3e50, #4ca1af)' }
        ],
        class: [
            { name: 'Walk to Class', desc: 'Focus mode activating', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
            { name: 'Study Prep', desc: 'Get your mind ready', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: 'Campus Vibes', desc: 'Chill academic energy', gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
            { name: 'Brain Activation', desc: 'Wake up your mind', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' }
        ],
        work: [
            { name: 'Morning Commute', desc: 'Start the day right', gradient: 'linear-gradient(135deg, #ffd93d, #ff9500)' },
            { name: 'Work Mode On', desc: 'Professional mindset', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: 'Commuter Motivation', desc: 'Make the journey count', gradient: 'linear-gradient(135deg, #f5af19, #f12711)' },
            { name: 'Office Bound', desc: 'Ready for productivity', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' }
        ],
        home: [
            { name: 'Heading Home', desc: 'Wind down begins', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
            { name: 'Evening Decompress', desc: 'Leaving work behind', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: 'Homeward Bound', desc: 'Relaxation loading', gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
            { name: 'Post-Work Chill', desc: 'Transition to relaxation', gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)' }
        ],
        coffee: [
            { name: 'Café Walk', desc: 'Anticipating that first sip', gradient: 'linear-gradient(135deg, #795548, #5d4037)' },
            { name: 'Coffee Shop Vibes', desc: 'Indie café energy', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { name: 'Caffeine Dreams', desc: 'Cozy & creative', gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)' },
            { name: 'Barista Beats', desc: 'Hip coffee shop sounds', gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' }
        ],
        date: [
            { name: 'Date Night Prep', desc: 'Romantic anticipation', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
            { name: 'Confidence Boost', desc: 'Feel amazing', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
            { name: 'Love Songs Walk', desc: 'Setting the mood', gradient: 'linear-gradient(135deg, #ff9a9e, #fad0c4)' },
            { name: 'Romantic Vibes', desc: 'Hearts & butterflies', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' }
        ],
        party: [
            { name: 'Pre-Game Playlist', desc: 'Party mode activating', gradient: 'linear-gradient(135deg, #f5af19, #f12711)' },
            { name: 'Party Prep', desc: 'Getting hyped up', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
            { name: 'Night Out Energy', desc: 'Dance ready', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
            { name: 'Let\'s Go!', desc: 'Maximum party energy', gradient: 'linear-gradient(135deg, #9b4dca, #4d9fca)' }
        ],
        run: [
            { name: 'Running Start', desc: 'Warmup pace', gradient: 'linear-gradient(135deg, #00bcd4, #009688)' },
            { name: 'Cardio Boost', desc: 'High BPM energy', gradient: 'linear-gradient(135deg, #f12711, #f5af19)' },
            { name: 'Runner\'s High', desc: 'Push through tracks', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
            { name: 'Trail Blazer', desc: 'Outdoor running vibes', gradient: 'linear-gradient(135deg, #11998e, #38ef7d)' }
        ]
    };
    
    const destEmojis = {
        gym: '🏋️',
        class: '📚',
        work: '💼',
        home: '🏠',
        coffee: '☕',
        date: '💕',
        party: '🎉',
        run: '🏃'
    };
    
    const destTitles = {
        gym: 'Walking to Gym',
        class: 'Heading to Class',
        work: 'Commuting to Work',
        home: 'Heading Home',
        coffee: 'Going for Coffee',
        date: 'Date Night Prep',
        party: 'Party Time',
        run: 'Going for a Run'
    };
    
    const playlists = destinationPlaylists[destination] || destinationPlaylists.gym;
    
    title.textContent = `${destEmojis[destination]} ${destTitles[destination]}`;
    container.innerHTML = playlists.map(p => createPlaylistCard(p)).join('');
    section.style.display = 'block';
    
    // Scroll to section
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ========================================
// MOVEMENT DETECTION
// ========================================

function detectMovement() {
    // Simulate movement detection
    const movements = ['Stationary', 'Walking', 'Running', 'In Vehicle', 'On Bicycle'];
    const movementValue = document.getElementById('movement-value');
    
    // Randomly select movement state for demo
    const randomMovement = movements[Math.floor(Math.random() * 3)]; // Bias towards stationary/walking
    currentMovement = randomMovement.toLowerCase();
    
    if (movementValue && !currentDestination) {
        movementValue.textContent = randomMovement;
    }
}

// ========================================
// SPOTIFY LOCK - Focus Mode
// ========================================

let canvasConnected = false;
let focusSessionActive = false;
let sessionTimeLimit = 60; // minutes
let sessionTimeElapsed = 0; // seconds
let sessionTimer = null;
let lockIntensity = 'medium';
let selectedAssignment = null;

const canvasAssignments = [
    { id: 1, name: 'Research Essay', course: 'English 101', due: 'Tomorrow', dueClass: 'today', urgent: true },
    { id: 2, name: 'Problem Set 5', course: 'Calculus II', due: 'In 3 days', dueClass: 'this-week', urgent: false },
    { id: 3, name: 'Chapter 8 Reading', course: 'Psychology', due: 'In 5 days', dueClass: 'this-week', urgent: false },
    { id: 4, name: 'Group Project Slides', course: 'Marketing 201', due: 'Overdue', dueClass: 'overdue', urgent: true },
    { id: 5, name: 'Lab Report', course: 'Chemistry', due: 'In 1 week', dueClass: 'this-week', urgent: false }
];

const distractingSongs = [
    { name: 'Blinding Lights', artist: 'The Weeknd', img: '#e74c3c' },
    { name: 'Levitating', artist: 'Dua Lipa', img: '#9b59b6' },
    { name: 'Save Your Tears', artist: 'The Weeknd', img: '#3498db' },
    { name: 'Peaches', artist: 'Justin Bieber', img: '#f39c12' },
    { name: 'Kiss Me More', artist: 'Doja Cat', img: '#1abc9c' },
    { name: 'Montero', artist: 'Lil Nas X', img: '#e91e63' }
];

function initSpotifyLock() {
    // Canvas connection
    const connectCanvasBtn = document.getElementById('connect-canvas');
    if (connectCanvasBtn) {
        connectCanvasBtn.addEventListener('click', connectCanvas);
    }
    
    // Time buttons
    const timeBtns = document.querySelectorAll('.time-btn');
    timeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            timeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            sessionTimeLimit = parseInt(btn.dataset.time);
        });
    });
    
    // Custom time input
    const customTimeInput = document.getElementById('custom-time');
    if (customTimeInput) {
        customTimeInput.addEventListener('change', (e) => {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            sessionTimeLimit = parseInt(e.target.value) || 60;
        });
    }
    
    // Intensity buttons
    const intensityBtns = document.querySelectorAll('.intensity-btn');
    intensityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            intensityBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            lockIntensity = btn.dataset.intensity;
        });
    });
    
    // Assignment select
    const assignmentSelect = document.getElementById('session-assignment');
    if (assignmentSelect) {
        assignmentSelect.addEventListener('change', (e) => {
            selectedAssignment = e.target.value;
        });
    }
    
    // Start session button
    const startBtn = document.getElementById('start-session');
    if (startBtn) {
        startBtn.addEventListener('click', startFocusSession);
    }
    
    // Session controls
    const pauseBtn = document.getElementById('pause-session');
    const extendBtn = document.getElementById('extend-session');
    const endBtn = document.getElementById('end-session');
    
    if (pauseBtn) pauseBtn.addEventListener('click', pauseFocusSession);
    if (extendBtn) extendBtn.addEventListener('click', extendFocusSession);
    if (endBtn) endBtn.addEventListener('click', endFocusSession);
}

async function connectCanvas() {
    const connectBtn = document.getElementById('connect-canvas');
    const notConnected = document.getElementById('canvas-not-connected');
    const connected = document.getElementById('canvas-connected');
    const badge = document.getElementById('canvas-badge');
    
    connectBtn.innerHTML = '<span class="analyzing-spinner" style="width:18px;height:18px;border-width:2px;margin:0;"></span> Connecting...';
    connectBtn.disabled = true;
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    canvasConnected = true;
    
    notConnected.style.display = 'none';
    connected.style.display = 'block';
    badge.textContent = 'Connected';
    badge.classList.add('connected');
    
    // Populate assignments
    populateAssignments();
}

function populateAssignments() {
    const assignmentsList = document.getElementById('assignments-list');
    if (!assignmentsList) return;
    
    assignmentsList.innerHTML = canvasAssignments.slice(0, 4).map(assignment => `
        <div class="assignment-item ${assignment.urgent ? 'urgent' : ''} ${assignment.dueClass === 'today' ? 'due-soon' : ''}">
            <span class="assignment-due ${assignment.dueClass}">${assignment.due}</span>
            <div class="assignment-details">
                <div class="assignment-name">${assignment.name}</div>
                <div class="assignment-course">${assignment.course}</div>
            </div>
            <button class="assignment-action" onclick="startSessionForAssignment('${assignment.name}')">Focus</button>
        </div>
    `).join('');
    
    // Update stats
    const overdueCount = canvasAssignments.filter(a => a.dueClass === 'overdue').length;
    document.getElementById('overdue-count').textContent = overdueCount;
}

function startSessionForAssignment(assignmentName) {
    const select = document.getElementById('session-assignment');
    if (select) {
        // Find matching option
        for (let option of select.options) {
            if (option.text.includes(assignmentName.split(' ')[0])) {
                select.value = option.value;
                selectedAssignment = option.value;
                break;
            }
        }
    }
    
    // Scroll to session panel
    document.querySelector('.focus-session-panel').scrollIntoView({ behavior: 'smooth' });
}

function startFocusSession() {
    if (!selectedAssignment) {
        alert('Please select an assignment first!');
        return;
    }
    
    focusSessionActive = true;
    sessionTimeElapsed = 0;
    
    // Update UI
    document.querySelector('.focus-session-panel').style.display = 'none';
    document.getElementById('active-session').style.display = 'block';
    
    // Update status banner
    const statusBanner = document.getElementById('focus-status-banner');
    const statusTitle = document.getElementById('focus-status-title');
    const statusDesc = document.getElementById('focus-status-desc');
    const focusIcon = document.getElementById('focus-icon');
    const focusTimer = document.getElementById('focus-timer');
    
    statusBanner.classList.add('locked');
    statusTitle.textContent = 'Focus Mode Active';
    statusDesc.textContent = 'Distracting music is locked. Stay focused to earn it back!';
    focusIcon.textContent = '🔒';
    focusTimer.style.display = 'block';
    
    // Update session details
    const assignmentNames = {
        'essay': 'Research Essay',
        'problem-set': 'Problem Set 5',
        'reading': 'Chapter 8 Reading',
        'project': 'Group Project',
        'custom': 'Custom Task'
    };
    
    document.getElementById('session-assignment-name').textContent = assignmentNames[selectedAssignment] || 'Focus Session';
    
    const intensityLabels = {
        'light': '🔒 Light Lock Active',
        'medium': '🔐 Medium Lock Active',
        'strict': '⛔ Strict Lock Active'
    };
    document.getElementById('session-lock-level').textContent = intensityLabels[lockIntensity];
    
    // Show locked songs
    showLockedSongs();
    
    // Start timer
    sessionTimer = setInterval(updateSessionTimer, 1000);
}

function updateSessionTimer() {
    sessionTimeElapsed++;
    
    const totalSeconds = sessionTimeLimit * 60;
    const remainingSeconds = Math.max(0, totalSeconds - sessionTimeElapsed);
    
    // Format time
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;
    
    const timeString = hours > 0 
        ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        : `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    document.getElementById('session-time-left').textContent = timeString;
    document.getElementById('timer-value').textContent = 
        `${Math.floor(sessionTimeElapsed / 3600).toString().padStart(2, '0')}:${Math.floor((sessionTimeElapsed % 3600) / 60).toString().padStart(2, '0')}:${(sessionTimeElapsed % 60).toString().padStart(2, '0')}`;
    
    // Update progress circle
    const progress = Math.min(sessionTimeElapsed / totalSeconds, 1);
    const circumference = 283; // 2 * PI * 45
    const offset = circumference * (1 - progress);
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.strokeDashoffset = offset;
        progressFill.style.stroke = progress >= 1 ? '#f44336' : '#673ab7';
    }
    
    // Check overtime
    if (sessionTimeElapsed > totalSeconds) {
        const overtimeMinutes = Math.floor((sessionTimeElapsed - totalSeconds) / 60);
        document.getElementById('overtime-warning').style.display = 'flex';
        document.getElementById('overtime-amount').textContent = `${overtimeMinutes} minute${overtimeMinutes !== 1 ? 's' : ''}`;
    }
    
    // Update focus score (simulate slight variations)
    const baseScore = 92;
    const variation = Math.floor(Math.random() * 6) - 2;
    document.getElementById('focus-score').textContent = `${Math.max(80, Math.min(100, baseScore + variation))}%`;
}

function pauseFocusSession() {
    const pauseBtn = document.getElementById('pause-session');
    
    if (sessionTimer) {
        clearInterval(sessionTimer);
        sessionTimer = null;
        pauseBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            Resume
        `;
    } else {
        sessionTimer = setInterval(updateSessionTimer, 1000);
        pauseBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            Pause
        `;
    }
}

function extendFocusSession() {
    sessionTimeLimit += 15;
    
    // Visual feedback
    const extendBtn = document.getElementById('extend-session');
    extendBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
        Added!
    `;
    
    setTimeout(() => {
        extendBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
            +15 min
        `;
    }, 1500);
    
    // Hide overtime warning if showing
    document.getElementById('overtime-warning').style.display = 'none';
}

function endFocusSession() {
    if (sessionTimer) {
        clearInterval(sessionTimer);
        sessionTimer = null;
    }
    
    focusSessionActive = false;
    
    // Reset UI
    document.querySelector('.focus-session-panel').style.display = 'block';
    document.getElementById('active-session').style.display = 'none';
    document.getElementById('overtime-warning').style.display = 'none';
    
    // Update status banner
    const statusBanner = document.getElementById('focus-status-banner');
    const statusTitle = document.getElementById('focus-status-title');
    const statusDesc = document.getElementById('focus-status-desc');
    const focusIcon = document.getElementById('focus-icon');
    const focusTimer = document.getElementById('focus-timer');
    
    statusBanner.classList.remove('locked');
    statusTitle.textContent = 'Session Complete! 🎉';
    statusDesc.textContent = `Great work! You focused for ${Math.floor(sessionTimeElapsed / 60)} minutes. All music unlocked!`;
    focusIcon.textContent = '🔓';
    focusTimer.style.display = 'none';
    
    // Hide locked songs
    hideLockedSongs();
    
    // Reset session variables
    sessionTimeElapsed = 0;
    selectedAssignment = null;
    
    // Reset assignment select
    const select = document.getElementById('session-assignment');
    if (select) select.value = '';
}

function showLockedSongs() {
    const grid = document.getElementById('locked-songs-grid');
    const noLocksMsg = document.getElementById('no-locks-message');
    const lockCount = document.getElementById('lock-count');
    
    if (noLocksMsg) noLocksMsg.style.display = 'none';
    
    // Number of songs locked based on intensity
    const lockCounts = { light: 20, medium: 47, strict: 89 };
    const count = lockCounts[lockIntensity];
    
    lockCount.textContent = `${count} songs`;
    document.getElementById('locked-songs-count').textContent = count;
    
    // Show some locked song cards
    grid.innerHTML = distractingSongs.map(song => `
        <div class="locked-song-card">
            <div class="locked-song-img" style="background: ${song.img};"></div>
            <div class="locked-song-info">
                <div class="locked-song-name">${song.name}</div>
                <div class="locked-song-artist">${song.artist}</div>
            </div>
        </div>
    `).join('');
}

function hideLockedSongs() {
    const grid = document.getElementById('locked-songs-grid');
    const noLocksMsg = document.getElementById('no-locks-message');
    const lockCount = document.getElementById('lock-count');
    
    lockCount.textContent = '0 songs';
    
    grid.innerHTML = `
        <div class="no-locks-message" id="no-locks-message">
            <span class="no-locks-icon">🎵</span>
            <p>No songs are locked. Start a focus session to lock distracting music!</p>
        </div>
    `;
}
