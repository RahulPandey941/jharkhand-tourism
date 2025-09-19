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
            default: 'Thanks! I will suggest top places like Netarhat, Betla, Hundru Falls and help with stays and transport.',
            best: 'Top picks: Netarhat (sunrise), Betla National Park (wildlife), Hundru Falls (waterfall), Baidyanath Temple (heritage).',
            homestay: 'Great homestays near Netarhat, Betla, and Hazaribagh. Average price ₹700-1200/night.',
            events: 'Upcoming: Tribal dance festivals and local haats on weekends in Ranchi/Khunti.',
            transport: 'Buses connect major towns; taxis available in Ranchi/Hazaribagh; trains via Hatia/Ranchi Jn.'
        },
        hi: {
            default: 'धन्यवाद! मैं नेटारहाट, बेटला, हुन्द्रू फॉल्स जैसे स्थान और ठहराव व परिवहन सुझाऊँगा।',
            best: 'शीर्ष स्थान: नेटारहाट, बेटला नेशनल पार्क, हुन्द्रू फॉल्स, बैद्यनाथ मंदिर।',
            homestay: 'नेटारहाट, बेटला, हजारीबाग में अच्छे होमस्टे ₹700-1200/रात।',
            events: 'आने वाले कार्यक्रम: जनजातीय नृत्य उत्सव और हाट (रांची/खूँटी)।',
            transport: 'बसें प्रमुख शहरों को जोड़ती हैं; टैक्सी रांची/हजारीबाग में उपलब्ध; ट्रेनें हाटिया/रांची जं.।'
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
        const qt = q.toLowerCase();
        if (qt.includes('best')) return r.best;
        if (qt.includes('home') || qt.includes('stay')) return r.homestay;
        if (qt.includes('event')) return r.events;
        if (qt.includes('transport') || qt.includes('bus') || qt.includes('train')) return r.transport;
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
    if (!btn || !out || !timeline) return;
    btn.addEventListener('click', () => {
        const days = parseInt(document.getElementById('duration').value, 10);
        const styles = Array.from(document.querySelectorAll('.checkbox-group input:checked')).map(i => i.value);
        const budget = document.getElementById('budget').value;
        const items = [];
        for (let d = 1; d <= days; d++) {
            let plan = `Day ${d}: `;
            if (styles.includes('nature')) plan += 'Morning: Netarhat sunrise. ';
            if (styles.includes('adventure')) plan += 'Noon: Trek near Patratu Valley. ';
            if (styles.includes('cultural')) plan += 'Evening: Tribal dance and local haat. ';
            if (styles.includes('spiritual')) plan += 'Visit Baidyanath Temple. ';
            plan += budget === 'budget' ? 'Stay: Homestay (₹700-1000).' : budget === 'mid' ? 'Stay: Eco resort (₹1500-2500).' : 'Stay: Premium (₹3000+).';
            items.push(plan);
        }
        timeline.innerHTML = items.map(t => `<div class="itinerary-item">${t}</div>`).join('');
        out.style.display = 'block';
        if (window.gsap) { gsap.from('.itinerary-item', { opacity: 0, y: 20, stagger: 0.1 }); }
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