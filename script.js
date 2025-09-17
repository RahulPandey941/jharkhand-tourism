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

// Simple multilingual chatbot (mock)
(function initChatbot() {
    const messagesEl = document.getElementById('chatMessages');
    const inputEl = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const langSel = document.getElementById('languageSelect');
    if (!messagesEl || !inputEl || !sendBtn) return;

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
})();

// Geolocation for maps section
(function initGeo() {
    const btn = document.getElementById('getLocation');
    const text = document.getElementById('currentLocation');
    const list = document.getElementById('nearbyList');
    if (!btn || !text) return;
    btn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            text.textContent = 'Geolocation not supported.';
            return;
        }
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            text.textContent = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
            if (list) {
                list.innerHTML = '<li>Betla National Park (approx)</li><li>Hundru Falls (approx)</li><li>Local Market (approx)</li>';
            }
        }, (err) => {
            text.textContent = 'Permission denied or unavailable.';
        });
    });
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