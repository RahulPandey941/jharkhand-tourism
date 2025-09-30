// Preload slideshow images very early
(function preloadSlideshowImages() {
    const urls = [
        "https://baidhyanath.org/try1.webp",
        "https://mapacademy.io/wp-content/uploads/2025/07/sohrai-painting-8L.jpg",
        "https://i0.wp.com/avenuemail.in/wp-content/uploads/2024/03/Vande_Bharat.webp?fit=1600%2C900&ssl=1",
        "https://media.assettype.com/deccanherald%2Fimport%2Fsites%2Fdh%2Ffiles%2Farticleimages%2F2022%2F07%2F25%2Fsanthal-tribe-1129883-1658743174.jpg?w=undefined&auto=format%2Ccompress&fit=max",
        "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2024/01/08/2f3f282a9bfcef08e3e93630853f7173_1000x1000.jpg"
    ];
    urls.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
        const img = new Image();
        img.decoding = 'async';
        img.src = src;
    });
})();

// After the page is fully loaded, restore below-the-fold background images
window.addEventListener('load', function() {
    document.body.classList.add('images-ready');
});
//Featured Destinations
let scrollContainer1 = document.querySelector("#hello")
let backbtn1 = document.getElementById("prevBtn");
let prevbtn1 = document.getElementById("nextBtn");
if (scrollContainer1) {
    scrollContainer1.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        scrollContainer1.style.scrollBehavior = 'auto';
        scrollContainer1.scrollLeft += evt.deltaY;
    })
}



if (prevbtn1 && scrollContainer1) {
    prevbtn1.addEventListener("click", () => {
        scrollContainer1.style.scrollBehavior = 'smooth';
        scrollContainer1.scrollLeft += 9000;

    })
}

if (backbtn1 && scrollContainer1) {
    backbtn1.addEventListener("click", () => {
        scrollContainer1.style.scrollBehavior = 'smooth';
        scrollContainer1.scrollLeft -= 9000;
    })
}

//Experience Authentic Homestays
let scrollContainer = document.querySelector("#hi")
let backbtn = document.getElementById("btn1");
let prevbtn = document.getElementById("btn2");
if (scrollContainer) {
    scrollContainer.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        scrollContainer.style.scrollBehavior = 'auto';
        scrollContainer.scrollLeft += evt.deltaY;
    })
}



if (prevbtn && scrollContainer) {
    prevbtn.addEventListener("click", () => {
        scrollContainer.style.scrollBehavior = 'smooth';
        scrollContainer.scrollLeft += 9000;

    })
}

// Testimonials carousel
(function initTestimonials() {
    const wrap = document.getElementById('tWrap');
    const prev = document.getElementById('tPrev');
    const next = document.getElementById('tNext');
    if (!wrap || !prev || !next) return;
    wrap.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        wrap.style.scrollBehavior = 'auto';
        wrap.scrollLeft += evt.deltaY;
    });
    next.addEventListener('click', () => { wrap.style.scrollBehavior = 'smooth'; wrap.scrollLeft += 9000; });
    prev.addEventListener('click', () => { wrap.style.scrollBehavior = 'smooth'; wrap.scrollLeft -= 9000; });
})();

if (backbtn && scrollContainer) {
    backbtn.addEventListener("click", () => {
        scrollContainer.style.scrollBehavior = 'smooth';
        scrollContainer.scrollLeft -= 9000;
    })
}

// GSAP animations
window.addEventListener('load', () => {
    if (window.gsap) {
        gsap.from('.slide-content h1', { duration: 1, y: 30, opacity: 0 });
        gsap.from('.slide-content p', { duration: 1, y: 20, opacity: 0, delay: 0.1 });
        gsap.from('.cta-buttons', { duration: 1, y: 20, opacity: 0, delay: 0.1 });

        if (window.ScrollTrigger) {
            gsap.utils.toArray('section h2').forEach((el) => {
                gsap.from(el, { scrollTrigger: el, y: 30, opacity: 0, duration: 0.8 });
            });
            gsap.utils.toArray('.destination-card, .Homestay-card, .product-card, .metric-card, .vr-item').forEach((el) => {
                gsap.from(el, { scrollTrigger: el, y: 40, opacity: 0, duration: 0.6 });
            });
        }
    }

    // Wire Featured Destinations Explore buttons
    document.querySelectorAll('.featured-section .destination-card .explore-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const card = e.currentTarget.closest('.destination-card');
            const slug = card && card.getAttribute('data-slug');
            if (!slug) return;
            const url = `detail.html?slug=${encodeURIComponent(slug)}`;
            window.open(url, '_blank');
        });
    });
});

// Slideshow auto-rotate and dots
(function initSlideshow() {
    const slides = Array.from(document.querySelectorAll('.slideshow-container .slide'));
    const dots = Array.from(document.querySelectorAll('.slide-indicators .dot'));
    if (slides.length === 0) return;
    let index = slides.findIndex(s => s.classList.contains('active'));
    if (index < 0) index = 0;
    function show(i) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        slides[i].classList.add('active');
        if (dots[i]) dots[i].classList.add('active');
    }
    function next() { index = (index + 1) % slides.length; show(index); }
    const timer = setInterval(next, 5000);
    dots.forEach((d, i) => d.addEventListener('click', () => { index = i; show(index); }));
})();

// Simple multilingual chatbot (mock) - Updated for modal
(function initChatbot() {
    // Wait for DOM to be ready and modal to be available
    const initChatbotElements = () => {
        const messagesEl = document.getElementById('chatMessages');
        const inputEl = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        const langSel = document.getElementById('languageSelect');
        
        if (!messagesEl || !inputEl || !sendBtn) return false;

    const replies = {
        en: {
            default: 'Happy to help. I can share concise, neutral info on destinations, stays, transport, history, festivals, food, attire and local customs. Tell me your focus (e.g., “festivals in spring”, “traditional foods”, “capital and logistics”) and I’ll tailor a brief answer and suggest where to read more (see History & Culture in the menu).',
            best: 'A balanced shortlist: Netarhat (quiet sunrises), Betla National Park (wildlife and forts), Hundru/Dassam Falls (monsoon-friendly), Baidyanath Dham (heritage). Choices can vary by season and interests.',
            homestay: 'Homestays and mid-range stays are available around Netarhat, Betla and Hazaribagh. Typical ranges (indicative): ₹700–1200 (budget), ₹1500–2500 (mid). It helps to book early in holidays.',
            events: 'Through the year you’ll find village haats and cultural evenings (Ranchi/Khunti belts). Dates can shift locally—checking a week ahead with the host or tourism office is prudent.',
            transport: 'Major towns connect by bus and rail; Ranchi (IXR) is the key airport. Within districts, taxis and shared jeeps are common; travel times vary with terrain and weather.',
            history: 'In brief—an arc of stewardship and resistance: early uprisings (Tilka Manjhi), Kol Rebellion, Santhal Hul, Birsa Munda’s Ulgulan, and statehood in 2000. If useful, I can summarise key dates or you can open History & Culture for the full timeline.',
            festivals: 'Key observances include Sarhul (spring thanksgiving), Karma (monsoon fertility rite), Sohrai (harvest murals, cattle veneration), Tusu (winter folk songs), and Shravani Mela (Deoghar pilgrimage). Timings and customs may vary by community and district.',
            clothes: 'Daily wear tends toward breathable cottons; festive attire often includes silver jewellery, lac bangles and bead strings. Motifs commonly echo hills, rivers and fauna. When visiting rituals, modest dress is appreciated.',
            food: 'Expect seasonal, home-style fare: chilka roti, pittha, dhuska‑ghughni, leafy saags; foraged items like rugra mushrooms and bamboo shoots; sweets such as thekua/tilkut; and handia (traditional rice beer). Availability varies by season and locality.',
            traditions: 'Sarna sacred groves, pahan‑led rituals and Sohrai/Kohbar arts reflect a respectful forest ethic—asking before photographing and following local guidance is the best approach.',
            community: 'You’ll meet Santhal, Munda, Ho, Oraon (Kurukh), Asur, Birhor and others—each with distinct languages, dances, crafts and festivals. Engaging with consent and cultural curiosity goes a long way.',
            people: 'Everyday life centres on weekly haats, communal farming, Mandar/Nagara drums and Jhumar/Domkach dances. Hospitality is valued; simple greetings and patience are appreciated.',
            capital: 'Capital: Ranchi. Access via Ranchi Jn. (rail) and IXR (air). Nearby nature: Hundru/Dassam Falls; city areas include Kanke/Hatia. Local conditions (traffic/monsoon) can affect timings.'
        },
        hi: {
            default: 'नमस्ते! मैं स्थान, ठहराव, परिवहन, इतिहास, त्योहार, भोजन, पोशाक और परंपराओं पर संक्षिप्त व संतुलित जानकारी दे सकता/सकती हूँ। कृपया बताइए—आपका फोकस क्या है (जैसे “वसंत के त्योहार”, “पारंपरिक भोजन”, “राजधानी व लॉजिस्टिक्स”)—मैं जवाब आपके अनुरूप दूँगा/दूँगी। विस्तृत लेख History & Culture पेज में है।',
            best: 'संतुलित सूची: नेटारहाट (सुबह का सन्नाटा), बेटला (वन्यजीव/किला), हुन्द्रू/दस्सम झरने (मानसून में अच्छे), बैद्यनाथ धाम (धार्मिक)। मौसम व रुचि के अनुसार चयन बदल सकता है।',
            homestay: 'नेटारहाट/बेटला/हजारीबाग में होमस्टे व मिड-रेंज ठहराव मिलते हैं—आम तौर पर ₹700–1200 (बजट), ₹1500–2500 (मिड)। छुट्टियों में अग्रिम बुकिंग बेहतर रहती है।',
            events: 'वर्ष भर स्थानीय हाट व सांस्कृतिक शामें (रांची/खूँटी बेल्ट) होती हैं—तिथियाँ स्थानानुसार बदल सकती हैं, अतः यात्रा से पहले पुष्टि उचित है।',
            transport: 'बस/रेल से प्रमुख नगर जुड़े हैं; रांची (IXR) मुख्य एयरपोर्ट है। जिलों में टैक्सी/शेयर्ड जीप प्रचलित हैं; मानसून में समय बदल सकता है।',
            history: 'संक्षेप में—संरक्षण व प्रतिरोध की धारा: तिलका मांझी, कोल विद्रोह, संथाल हूल, बिरसा मुंडा उलगुलान और 2000 में राज्य गठन। चाहें तो मैं मुख्य तिथियाँ संक्षेप में बताऊँ या आप History & Culture पेज खोल सकते हैं।',
            festivals: 'सरहुल (वसंत), करमा (मानसून), सोहराय (फसल/भित्ति कला), तुसु (शीत), श्रावणी मेला (देवघर यात्रा)। समुदाय/ज़िले के अनुसार परंपराएँ बदल सकती हैं—स्थानीय रीति मानें।',
            clothes: 'दैनिक पहनावा सूती; पर्व पर चाँदी के आभूषण, लाख की चूड़ियाँ, मनके। प्रकृति-प्रेरित बॉर्डर प्रचलित हैं। धार्मिक अनुष्ठानों में सरल/सभ्य पहनावा उपयुक्त है।',
            food: 'मौसमी घरेलू भोजन: चिल्का रोटी, पिठा, धुस्का‑घुघनी, साग; रूगड़ा/बाँस की कोपल; थेकुआ/तिलकुट; हाँड़िया। उपलब्धता मौसम/स्थान पर निर्भर करती है।',
            traditions: 'सरना उपवन, पहान‑पूजा, सोहराय/कोहबर कला—वन के प्रति सम्मान की संस्कृति। फ़ोटो से पहले अनुमति लें और स्थानीय निर्देशों का पालन करें।',
            community: 'संथाल, मुंडा, हो, उराँव (कुड़ुख), असुर, बिरहोर आदि—भाषाएँ, नृत्य, शिल्प व पर्व भिन्न हैं। संवाद में सहमति व संवेदनशीलता रखें।',
            people: 'साप्ताहिक हाट, सामुदायिक खेती, मंदार/नगाड़ा, झूमर/डोमकच—अतिथि‑सत्कार महत्त्वपूर्ण; सरल अभिवादन मददगार।',
            capital: 'राजधानी: रांची (रेल: रांची जं., एयर: IXR)। पास में हुन्द्रू/दस्सम झरने; ट्रैफ़िक/मानसून के अनुसार समय बदल सकता है।'
        }
    };

    function addMessage(text, isBot) {
        const wrap = document.createElement('div');
        wrap.className = 'message ' + (isBot ? 'bot-message' : 'user-message');
        const content = document.createElement('div');
        content.className = 'message-content';
        const p = document.createElement('p');
        p.textContent = text;
        content.appendChild(p);
        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = new Date().toLocaleTimeString();
        wrap.appendChild(content);
        wrap.appendChild(time);
        messagesEl.appendChild(wrap);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function handleQuery(q) {
        const lang = (langSel && replies[langSel.value]) ? langSel.value : 'en';
        const r = replies[lang];
        const qt = (q || '').toLowerCase();
        // Destinations / basics
        if (qt.includes('best') || qt.includes('top')) return r.best;
        if (qt.includes('home') || qt.includes('stay') || qt.includes('hotel') || qt.includes('homestay')) return r.homestay;
        if (qt.includes('event') || qt.includes('festival') || qt.includes('festivals') || qt.includes('sarhul') || qt.includes('karma') || qt.includes('sohrai') || qt.includes('tusu')) return r.festivals;
        if (qt.includes('transport') || qt.includes('bus') || qt.includes('train') || qt.includes('taxi')) return r.transport;
        // Culture topics
        if (qt.includes('history') || qt.includes('timeline') || qt.includes('birsa') || qt.includes('santhal hul')) return r.history;
        if (qt.includes('cloth') || qt.includes('attire') || qt.includes('dress') || qt.includes('jewellery') || qt.includes('bangle')) return r.clothes;
        if (qt.includes('food') || qt.includes('cuisine') || qt.includes('dish') || qt.includes('eat') || qt.includes('handia') || qt.includes('dhuska')) return r.food;
        if (qt.includes('tradition') || qt.includes('ritual') || qt.includes('sarna') || qt.includes('pahan')) return r.traditions;
        if (qt.includes('community') || qt.includes('tribe') || qt.includes('santhal') || qt.includes('munda') || qt.includes('ho') || qt.includes('oraon')) return r.community;
        if (qt.includes('people') || qt.includes('life') || qt.includes('everyday')) return r.people;
        if (qt.includes('capital') || qt.includes('state capital') || qt.includes('jharkhand capital') || qt.includes('ranchi')) return r.capital;
        if (qt && qt.length > 0) {
            return r.default + ' If I missed your angle, a keyword like “festivals / food / history / capital” will help me be specific.';
        }
        return r.default;
    }

    function send() {
        const txt = (inputEl.value || '').trim();
        if (!txt) return;
        addMessage(txt, false);
        inputEl.value = '';
        setTimeout(() => addMessage(handleQuery(txt), true), 400);
    }

        sendBtn.addEventListener('click', send);
        inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                inputEl.value = btn.getAttribute('data-query');
                send();
            });
        });
        return true;
    };
    
    // Try to initialize immediately
    if (!initChatbotElements()) {
        // If elements not found, wait for modal to be opened
        document.addEventListener('DOMContentLoaded', initChatbotElements);
    }
})();

// Interactive Maps with Live Location Tracking
(function initInteractiveMap() {
    let map = null;
    let userMarker = null;
    let watchId = null;
    let isTracking = false;
    let userLocationCircle = null;
    
    // Map elements
    const mapElement = document.getElementById('map');
    const mapLoading = document.getElementById('mapLoading');
    const getLocationBtn = document.getElementById('getLocation');
    const trackLocationBtn = document.getElementById('trackLocation');
    const stopTrackingBtn = document.getElementById('stopTracking');
    const currentLocationText = document.getElementById('currentLocation');
    const accuracyElement = document.getElementById('locationAccuracy');
    const accuracyValue = document.getElementById('accuracyValue');
    const nearbyList = document.getElementById('nearbyList');
    
    if (!mapElement) return;
    
    // Jharkhand attractions data
    const jharkhandAttractions = [
        { name: "Netarhat", lat: 23.4673, lng: 84.2600, type: "attractions", icon: "🏔️" },
        { name: "Betla National Park", lat: 23.8833, lng: 84.1833, type: "attractions", icon: "🦌" },
        { name: "Hundru Falls", lat: 23.4167, lng: 85.6167, type: "attractions", icon: "💧" },
        { name: "Patratu Valley", lat: 23.6167, lng: 84.9500, type: "attractions", icon: "🌄" },
        { name: "Hazaribagh Lake", lat: 23.9833, lng: 85.3667, type: "attractions", icon: "🏞️" },
        { name: "Ranchi Railway Station", lat: 23.3441, lng: 85.3096, type: "transport", icon: "🚂" },
        { name: "Birsa Munda Airport", lat: 23.3143, lng: 85.3217, type: "transport", icon: "✈️" },
        { name: "Ranchi Bus Stand", lat: 23.3569, lng: 85.3350, type: "transport", icon: "🚌" },
        { name: "Hotel Chanakya", lat: 23.3441, lng: 85.3096, type: "accommodations", icon: "🏨" },
        { name: "Radisson Blu Ranchi", lat: 23.3569, lng: 85.3350, type: "accommodations", icon: "🏨" },
        { name: "Tribal Cuisine Restaurant", lat: 23.3569, lng: 85.3350, type: "restaurants", icon: "🍽️" },
        { name: "Jharkhand Thali House", lat: 23.3441, lng: 85.3096, type: "restaurants", icon: "🍛" }
    ];
    
    // Initialize map
    function initMap() {
        try {
            // Center on Jharkhand (Ranchi)
            map = L.map('map').setView([23.3441, 85.3096], 8);
            
            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            }).addTo(map);
            
            // Add Jharkhand attractions
            addAttractionMarkers();
            
            // Hide loading
            mapLoading.classList.add('hidden');
            
        } catch (error) {
            console.error('Error initializing map:', error);
            showError('Failed to load map. Please refresh the page.');
        }
    }
    
    // Add attraction markers
    function addAttractionMarkers() {
        jharkhandAttractions.forEach(attraction => {
            const marker = L.marker([attraction.lat, attraction.lng])
                .addTo(map)
                .bindPopup(`
                    <div style="text-align: center;">
                        <h4>${attraction.icon} ${attraction.name}</h4>
                        <p>Type: ${attraction.type}</p>
                        <button onclick="getDirections(${attraction.lat}, ${attraction.lng})" 
                                style="background: #22c55e; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                            Get Directions
                        </button>
                    </div>
                `);
        });
    }
    
    // Get user location once
    function getUserLocation() {
        if (!navigator.geolocation) {
            showError('Geolocation is not supported by this browser.');
            return;
        }
        
        getLocationBtn.disabled = true;
        getLocationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Getting Location...';
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude, accuracy } = position.coords;
                updateUserLocation(latitude, longitude, accuracy);
                map.setView([latitude, longitude], 15);
                updateNearbyPlaces(latitude, longitude);
                
                getLocationBtn.disabled = false;
                getLocationBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Get My Location';
            },
            (error) => {
                handleLocationError(error);
                getLocationBtn.disabled = false;
                getLocationBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Get My Location';
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    }
    
    // Start live location tracking
    function startLocationTracking() {
        if (!navigator.geolocation) {
            showError('Geolocation is not supported by this browser.');
            return;
        }
        
        if (isTracking) return;
        
        isTracking = true;
        trackLocationBtn.style.display = 'none';
        stopTrackingBtn.style.display = 'flex';
        
        watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude, accuracy } = position.coords;
                updateUserLocation(latitude, longitude, accuracy);
                updateNearbyPlaces(latitude, longitude);
            },
            (error) => {
                handleLocationError(error);
                stopLocationTracking();
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 30000
            }
        );
    }
    
    // Stop location tracking
    function stopLocationTracking() {
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            watchId = null;
        }
        
        isTracking = false;
        trackLocationBtn.style.display = 'flex';
        stopTrackingBtn.style.display = 'none';
    }
    
    // Update user location on map
    function updateUserLocation(lat, lng, accuracy) {
        // Remove existing marker and circle
        if (userMarker) {
            map.removeLayer(userMarker);
        }
        if (userLocationCircle) {
            map.removeLayer(userLocationCircle);
        }
        
        // Add new marker
        const userIcon = L.divIcon({
            className: 'user-location-marker',
            html: '<div style="background: #22c55e; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        
        userMarker = L.marker([lat, lng], { icon: userIcon })
            .addTo(map)
            .bindPopup('📍 Your Current Location');
        
        // Add accuracy circle
        userLocationCircle = L.circle([lat, lng], {
            radius: accuracy,
            color: '#22c55e',
            fillColor: '#22c55e',
            fillOpacity: 0.1,
            weight: 2
        }).addTo(map);
        
        // Update location text
        currentLocationText.textContent = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        accuracyValue.textContent = Math.round(accuracy);
        accuracyElement.style.display = 'block';
    }
    
    // Handle location errors
    function handleLocationError(error) {
        let message = 'Unable to get your location. ';
        switch (error.code) {
            case error.PERMISSION_DENIED:
                message += 'Location access denied by user.';
                break;
            case error.POSITION_UNAVAILABLE:
                message += 'Location information unavailable.';
                break;
            case error.TIMEOUT:
                message += 'Location request timed out.';
                break;
            default:
                message += 'An unknown error occurred.';
                break;
        }
        showError(message);
    }
    
    // Show error message
    function showError(message) {
        currentLocationText.textContent = message;
        accuracyElement.style.display = 'none';
    }
    
    // Update nearby places
    function updateNearbyPlaces(userLat, userLng) {
        const nearby = jharkhandAttractions
            .map(place => ({
                ...place,
                distance: calculateDistance(userLat, userLng, place.lat, place.lng)
            }))
            .filter(place => place.distance <= 50) // Within 50km
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 5);
        
        if (nearby.length === 0) {
            nearbyList.innerHTML = '<li><i class="fas fa-info-circle"></i> No attractions found within 50km</li>';
            return;
        }
        
        nearbyList.innerHTML = nearby
            .map(place => `
                <li>
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${place.icon} ${place.name}</span>
                    <small style="margin-left: auto; color: #22c55e;">${place.distance.toFixed(1)}km</small>
                </li>
            `).join('');
    }
    
    // Calculate distance between two points
    function calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    
    // Filter attractions by type
    function filterAttractions(type) {
        // This would typically filter markers on the map
        // For now, we'll just update the active button state
        document.querySelectorAll('.map-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-type="${type}"]`).classList.add('active');
    }
    
    // Event listeners
    if (getLocationBtn) {
        getLocationBtn.addEventListener('click', getUserLocation);
    }
    
    if (trackLocationBtn) {
        trackLocationBtn.addEventListener('click', startLocationTracking);
    }
    
    if (stopTrackingBtn) {
        stopTrackingBtn.addEventListener('click', stopLocationTracking);
    }
    
    // Map filter buttons
    document.querySelectorAll('.map-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterAttractions(btn.dataset.type);
        });
    });
    
    // Initialize map when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMap);
    } else {
        initMap();
    }
    
    // Global function for directions (called from popup)
    window.getDirections = function(lat, lng) {
        if (userMarker) {
            const userPos = userMarker.getLatLng();
            const url = `https://www.google.com/maps/dir/${userPos.lat},${userPos.lng}/${lat},${lng}`;
            window.open(url, '_blank');
        } else {
            alert('Please get your location first to calculate directions.');
        }
    };
    
})();

// Itinerary generator (mock AI)
(function initItinerary() {
    const btn = document.getElementById('generateItinerary');
    const out = document.getElementById('itineraryResult');
    const timeline = document.getElementById('itineraryTimeline');
    const budgetBox = document.getElementById('itineraryBudget');
    if (!btn || !out || !timeline) return;
    // traveller type radio -> group size sync
    document.querySelectorAll('input[name="travellerType"]').forEach(r => {
        r.addEventListener('change', () => {
            const gs = document.getElementById('groupSize');
            if (!gs) return;
            if (r.value === 'solo') gs.value = 1;
            if (r.value === 'duo') gs.value = 2;
            if (r.value === 'family') gs.value = 4;
        });
    });

    function collectInputs() {
        const days = parseInt(document.getElementById('duration').value, 10);
        const styles = Array.from(document.querySelectorAll('.checkbox-group input:checked')).map(i => i.value);
        const budget = document.getElementById('budget').value;
        const type = (document.querySelector('input[name="travellerType"]:checked') || {}).value || 'solo';
        const customSize = Math.max(1, parseInt((document.getElementById('groupSize') || {}).value || '1', 10));
        const size = type === 'solo' ? 1 : type === 'duo' ? 2 : type === 'family' ? 4 : customSize;
        const startCity = (document.getElementById('startCity') || {}).value || 'Ranchi';
        const travelMonth = parseInt((document.getElementById('travelMonth') || {}).value || '1', 10);
        const pace = (document.getElementById('pace') || {}).value || 'standard';
        const transport = (document.getElementById('transport') || {}).value || 'private';
        const accessible = !!(document.getElementById('accessible') || {}).checked;
        return { days, styles, budget, type, size, startCity, travelMonth, pace, transport, accessible };
    }

    const POIS = [
        { id: 'baidyanath', name: 'Baidyanath Temple (Deoghar)', city: 'Deoghar', tags: ['spiritual','cultural'], best:[1,2,8,9,10,11,12], time: 2, walk: 'low' },
        { id: 'netarhat', name: 'Netarhat Sunrise Point', city: 'Netarhat', tags: ['nature','adventure'], best:[10,11,12,1,2,3], time: 3, walk: 'medium' },
        { id: 'betla', name: 'Betla National Park Safari', city: 'Latehar', tags: ['nature','adventure'], best:[11,12,1,2,3,4], time: 4, walk: 'medium' },
        { id: 'patratu', name: 'Patratu Valley Viewpoint', city: 'Ramgarh', tags: ['nature'], best:[9,10,11,12,1,2,3], time: 2, walk: 'low' },
        { id: 'sohrai', name: 'Sohrai-Khovar Art Village', city: 'Hazaribagh', tags: ['cultural'], best:[10,11,12,1,2,3,4], time: 2, walk: 'low' },
        { id: 'jonha', name: 'Jonha Falls', city: 'Ranchi', tags: ['nature'], best:[8,9,10,11,12], time: 2, walk: 'medium' },
        { id: 'hundru', name: 'Hundru Falls', city: 'Ranchi', tags: ['nature'], best:[8,9,10,11,12], time: 2, walk: 'high' },
        { id: 'parasnath', name: 'Parasnath Hills (Shikharji)', city: 'Giridih', tags: ['spiritual','adventure'], best:[11,12,1,2,3], time: 4, walk: 'high' },
        { id: 'jrd', name: 'Tata Steel Heritage + Jubilee Park', city: 'Jamshedpur', tags: ['cultural','nature'], best:[10,11,12,1,2,3,4], time: 3, walk: 'low' },
        { id: 'haat', name: 'Local Haat + Tribal Dance', city: 'Ranchi', tags: ['cultural'], best:[9,10,11,12,1,2,3], time: 2, walk: 'low' }
    ];

    function scorePoi(poi, inputs) {
        let score = 0;
        inputs.styles.forEach(s => { if (poi.tags.includes(s)) score += 2; });
        if (poi.best.includes(inputs.travelMonth)) score += 2;
        if (inputs.accessible) {
            if (poi.walk === 'low') score += 2; else if (poi.walk === 'medium') score += 0; else score -= 2;
        }
        if (poi.city === inputs.startCity) score += 2;
        return score;
    }

    function getStopsPerDay(pace) {
        if (pace === 'relaxed') return 2; if (pace === 'packed') return 4; return 3;
    }

    function buildItinerary(inputs) {
        const ranked = POIS
            .map(p => ({ poi: p, score: scorePoi(p, inputs) }))
            .sort((a, b) => b.score - a.score);
        const daysArr = [];
        const stopsPerDay = getStopsPerDay(inputs.pace);
        let idx = 0;
        for (let d = 1; d <= inputs.days; d++) {
            const dayStops = [];
            for (let s = 0; s < stopsPerDay && idx < ranked.length; s++, idx++) {
                dayStops.push(ranked[idx].poi);
            }
            if (dayStops.length === 0 && ranked.length > 0) dayStops.push(ranked[0].poi);
            daysArr.push(dayStops);
        }
        return daysArr;
    }

    function budgetCalc(inputs) {
        const perDay = inputs.budget === 'budget' ? 900 : inputs.budget === 'mid' ? 2200 : 4500;
        const perPersonPerDay = perDay;
        const totalTrip = perPersonPerDay * inputs.days * inputs.size;
        const lodgingFactor = inputs.budget === 'budget' ? 0.45 : inputs.budget === 'mid' ? 0.5 : 0.55;
        const foodFactor = 0.3;
        const transportFactor = inputs.budget === 'budget' ? 0.15 : 0.12;
        const lodging = Math.round(perPersonPerDay * lodgingFactor * inputs.days * inputs.size);
        const food = Math.round(perPersonPerDay * foodFactor * inputs.days * inputs.size);
        const transport = Math.round(perPersonPerDay * transportFactor * inputs.days * inputs.size);
        const activities = Math.max(0, totalTrip - (lodging + food + transport));
        return { perPersonPerDay, totalTrip, lodging, food, transport, activities };
    }

    function renderItinerary(daysArr, inputs, budget) {
        timeline.innerHTML = daysArr.map((stops, i) => {
            const segments = stops.map((s, j) => {
                const timeOfDay = ['Morning','Noon','Evening','Night'][j] || 'Anytime';
                const tagIcon = s.tags.includes('nature') ? '🌿' : s.tags.includes('adventure') ? '🥾' : s.tags.includes('spiritual') ? '🛕' : '🎭';
                return `<div class="itinerary-item"><strong>${timeOfDay}</strong>: ${tagIcon} ${s.name} <span style="opacity:.7">(${s.city})</span></div>`;
            }).join('');
            const stayText = inputs.budget === 'budget' ? 'Homestay (₹700-1000)' : inputs.budget === 'mid' ? 'Eco resort (₹1500-2500)' : 'Premium stay (₹3000+)';
            return `<div class="itinerary-day"><h4>Day ${i+1}</h4>${segments}<div class="itinerary-stay">Stay: ${stayText} • Transport: ${inputs.transport}</div></div>`;
        }).join('');

        if (budgetBox) {
            budgetBox.innerHTML = `
                <div class="info-card">
                    <h4>Budget Summary</h4>
                    <p><strong>Start:</strong> ${inputs.startCity} • <strong>Pace:</strong> ${inputs.pace} • <strong>Month:</strong> ${inputs.travelMonth}</p>
                    <p><strong>Party:</strong> ${inputs.type} (${inputs.size} ${inputs.size === 1 ? 'person' : 'people'})</p>
                    <p><strong>Per person/day:</strong> ₹${budget.perPersonPerDay.toLocaleString()}</p>
                    <p><strong>Estimated total:</strong> ₹${budget.totalTrip.toLocaleString()}</p>
                    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:6px;">
                        <div>🏨 Lodging: <strong>₹${budget.lodging.toLocaleString()}</strong></div>
                        <div>🍽️ Food: <strong>₹${budget.food.toLocaleString()}</strong></div>
                        <div>🚖 Transport: <strong>₹${budget.transport.toLocaleString()}</strong></div>
                        <div>🎟️ Activities: <strong>₹${budget.activities.toLocaleString()}</strong></div>
                    </div>
                </div>`;
        }
    }

    function generate() {
        const inputs = collectInputs();
        const daysArr = buildItinerary(inputs);
        const budget = budgetCalc(inputs);
        renderItinerary(daysArr, inputs, budget);
        out.style.display = 'block';
        if (window.gsap) { gsap.from('.itinerary-item', { opacity: 0, y: 20, stagger: 0.06 }); }
        out.dataset.payload = JSON.stringify({ inputs, days: daysArr, budget });
    }

    btn.addEventListener('click', generate);
    const regen = document.getElementById('regenItinerary');
    const copyBtn = document.getElementById('copyItinerary');
    const dlBtn = document.getElementById('downloadItinerary');
    if (regen) regen.addEventListener('click', generate);
    if (copyBtn) copyBtn.addEventListener('click', async () => {
        const payload = out.dataset.payload || '';
        try { await navigator.clipboard.writeText(payload); copyBtn.textContent = 'Copied!'; setTimeout(()=>copyBtn.textContent='Copy',1200); } catch {}
    });
    if (dlBtn) dlBtn.addEventListener('click', () => {
        const payload = out.dataset.payload || '';
        const blob = new Blob([payload], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'itinerary.json';
        document.body.appendChild(a); a.click(); a.remove();
        URL.revokeObjectURL(url);
    });
})();

// Simple map filter buttons state
document.querySelectorAll('.map-btn').forEach(b => {
    b.addEventListener('click', () => {
        document.querySelectorAll('.map-btn').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
    });
});

// AI Modal functionality
(function initAiModal() {
    const floatingButton = document.getElementById('floatingAiButton');
    const modalOverlay = document.getElementById('aiModalOverlay');
    const modalClose = document.getElementById('aiModalClose');
    
    if (!floatingButton || !modalOverlay || !modalClose) return;
    
    // Open modal when floating button is clicked
    floatingButton.addEventListener('click', () => {
        console.log('AI Button clicked!');
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
    
    // Close modal when close button is clicked
    modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
    
    // Close modal when clicking outside the modal content
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
})();

// Marketplace category filtering
(function initMarketplaceFilter() {
    const buttons = document.querySelectorAll('.marketplace-section .category-btn');
    const cards = document.querySelectorAll('.marketplace-section .marketplace-grid .product-card');
    if (buttons.length === 0 || cards.length === 0) return;

    function applyFilter(category) {
        cards.forEach(card => {
            const cardCategory = card.dataset.category;
            const shouldShow = cardCategory === category;
            card.style.display = shouldShow ? '' : 'none';
        });
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilter(btn.dataset.category);
        });
    });

    const activeBtn = document.querySelector('.marketplace-section .category-btn.active') || buttons[0];
    applyFilter(activeBtn.dataset.category);
})();

// Mobile menu toggle
(function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    navMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
})();

// Open VR buttons' YouTube links in fullscreen overlay
document.addEventListener('click', function (e) {
    const btn = e.target.closest('.vr-btn');
    if (!btn) return;
    const url = btn.getAttribute('data-video');
    if (!url) return;

    const getYouTubeEmbed = (u) => {
        try {
            const yt = new URL(u);
            if (yt.hostname.includes('youtu.be')) {
                const id = yt.pathname.slice(1);
                return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
            }
            if (yt.hostname.includes('youtube.com')) {
                const id = yt.searchParams.get('v');
                if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
            }
        } catch {}
        return u;
    };

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.background = 'rgba(0,0,0,0.9)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';

    const iframe = document.createElement('iframe');
    iframe.src = getYouTubeEmbed(url);
    iframe.style.width = '100vw';
    iframe.style.height = '100vh';
    iframe.style.border = '0';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.setAttribute('allowfullscreen', '');
    overlay.appendChild(iframe);
    document.body.appendChild(overlay);

    const cleanup = () => {
        try { if (document.fullscreenElement) document.exitFullscreen(); } catch {}
        overlay.remove();
    };

    overlay.addEventListener('click', (evt) => {
        if (evt.target === overlay) cleanup();
    });

    const escHandler = (e2) => { if (e2.key === 'Escape') { document.removeEventListener('keydown', escHandler); cleanup(); } };
    document.addEventListener('keydown', escHandler);

    const onFsChange = () => { if (!document.fullscreenElement) { document.removeEventListener('fullscreenchange', onFsChange); cleanup(); } };
    document.addEventListener('fullscreenchange', onFsChange);

    const reqFs = overlay.requestFullscreen || overlay.webkitRequestFullscreen || overlay.msRequestFullscreen || overlay.mozRequestFullScreen;
    if (reqFs) {
        try { reqFs.call(overlay); }
        catch { window.open(url, '_blank', 'noopener,noreferrer'); }
    } else {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
});

// AI Assistant Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing AI Assistant...');
    initAiModal();
    initChatbotElements();
});

// Also try immediate initialization as backup
setTimeout(function() {
    console.log('Timeout backup initialization...');
    initAiModal();
    initChatbotElements();
}, 1000);

function initAiModal() {
    console.log('initAiModal called');
    const floatingButton = document.getElementById('floatingAiButton');
    const modalOverlay = document.getElementById('aiModalOverlay');
    const modalClose = document.getElementById('aiModalClose');

    console.log('Elements found:', {
        floatingButton: !!floatingButton,
        modalOverlay: !!modalOverlay,
        modalClose: !!modalClose
    });

    if (floatingButton && modalOverlay) {
        console.log('Adding click listener to floating button');
        floatingButton.addEventListener('click', function() {
            console.log('AI Button clicked!');
            modalOverlay.classList.add('active');
        });
    } else {
        console.log('Missing elements - floatingButton:', !!floatingButton, 'modalOverlay:', !!modalOverlay);
    }

    if (modalClose && modalOverlay) {
        modalClose.addEventListener('click', function() {
            modalOverlay.classList.remove('active');
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }
}

function initChatbotElements() {
    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const quickButtons = document.querySelectorAll('.quick-btn');

    if (sendBtn && chatInput && chatMessages) {
        sendBtn.addEventListener('click', function() {
            sendMessage();
        });

        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    if (quickButtons.length > 0) {
        quickButtons.forEach(button => {
            button.addEventListener('click', function() {
                const query = this.getAttribute('data-query');
                if (query && chatInput) {
                    chatInput.value = query;
                    sendMessage();
                }
            });
        });
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatInput || !chatMessages) return;

    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';

    // Simulate AI response
    setTimeout(() => {
        const response = getAiResponse(message);
        addMessage(response, 'ai');
    }, 1000);
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    if (sender === 'ai') {
        contentDiv.innerHTML = `<strong>AI Assistant:</strong> ${text}`;
    } else {
        contentDiv.innerHTML = `<strong>You:</strong> ${text}`;
    }
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAiResponse(message) {
    const responses = {
        'best places': 'Jharkhand has amazing destinations! Here are some must-visit places:\n\n🏔️ **Netarhat** - The Queen of Chotanagpur Plateau\n🏛️ **Baidyanath Temple** - One of the 12 Jyotirlingas\n🌊 **Dassam Falls** - Beautiful 10-step waterfall\n🏞️ **Betla National Park** - Rich wildlife and nature\n🏰 **Hazaribagh** - Ancient temples and lakes\n\nEach place offers unique experiences and stunning natural beauty!',
        
        'culture': 'Jharkhand has a rich tribal culture! Here\'s what makes it special:\n\n🎭 **Tribal Communities** - Santhal, Munda, Oraon, and many more\n🎵 **Folk Music** - Traditional instruments like Mandar and Dhol\n💃 **Dance Forms** - Chhau, Santhal, and Karam dances\n🎨 **Art & Crafts** - Bamboo work, pottery, and tribal paintings\n🏠 **Architecture** - Traditional mud houses and tribal settlements\n\nThe culture is deeply connected to nature and celebrates harmony with the environment!',
        
        'festivals': 'Jharkhand celebrates vibrant festivals throughout the year:\n\n🎉 **Sohrai** - Harvest festival with cattle worship\n🌾 **Karam** - Tribal festival celebrating nature\n🕉️ **Sarhul** - Spring festival with flower worship\n🎭 **Chhau Festival** - Traditional dance celebration\n🌙 **Tusu Parab** - Cultural festival with folk songs\n\nThese festivals showcase the rich tribal heritage and community spirit!',
        
        'local food': 'Jharkhand\'s cuisine is delicious and unique:\n\n🍚 **Dhuska** - Deep-fried rice and lentil pancakes\n🌶️ **Handia** - Traditional rice beer\n🥔 **Aloo Chokha** - Spiced mashed potatoes\n🍃 **Saag** - Various leafy green vegetables\n🌾 **Pitha** - Sweet rice cakes\n🍖 **Mutton Curry** - Spicy meat dishes\n\nThe food is simple, nutritious, and full of local flavors!'
    };

    const lowerMessage = message.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }

    return 'Thank you for your question! I\'m here to help you discover the amazing state of Jharkhand. You can ask me about:\n\n• Best places to visit\n• Local culture and traditions\n• Festivals and celebrations\n• Local food and cuisine\n• Travel tips and recommendations\n\nWhat would you like to know more about?';
}