document.addEventListener('DOMContentLoaded', () => {
    // Hide Loader
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 500);
    }, 1500);

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const hoverElements = document.querySelectorAll('button, .gallery-img, .gift-box');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });

    // Welcome Screen & Music
    const openBtn = document.getElementById('open-btn');
    const openGiftBtn = document.getElementById('open-gift-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');

    function startExperience() {
        welcomeScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        musicBtn.classList.remove('hidden');
        
        // Play music
        bgMusic.play().catch(e => console.log("Audio play blocked by browser:", e));
        musicBtn.classList.add('playing');

        // Start typewriter
        setTimeout(typeMessage, 1000);
        
        // Initial reveal check
        reveal();
        
        // Create initial floating hearts
        createHearts();
        
        window.scrollTo(0, 0);
    }

    openBtn.addEventListener('click', startExperience);
    openGiftBtn.addEventListener('click', startExperience);

    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.classList.add('playing');
        } else {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
        }
    });

    // Scroll Reveal
    const reveals = document.querySelectorAll('.reveal');
    function reveal() {
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', reveal);

    // Typewriter Effect
    const message = `Dear Vaishnavi,

Happy Birthday to the most wonderful sister!

I wish you endless happiness, good health, and success. May all your dreams come true and your life be filled with magical moments.

You will always have a special place in my heart. Keep smiling and shining!

With lots of love,
Your Brother ❤️`;

    let i = 0;
    const speed = 30;
    const typedTarget = document.getElementById('typed-message');
    let isTypingStarted = false;
    
    function typeMessage() {
        if (!isTypingStarted) {
            isTypingStarted = true;
            typeNextChar();
        }
    }
    
    function typeNextChar() {
        if (i < message.length) {
            if (message.charAt(i) === '\n') {
                typedTarget.innerHTML += '<br>';
            } else {
                typedTarget.innerHTML += message.charAt(i);
            }
            i++;
            setTimeout(typeNextChar, speed);
        }
    }

    // Lightbox
    const galleryImgs = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');

    galleryImgs.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.remove('hidden');
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.add('hidden');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.add('hidden');
        }
    });

    // Interactive Wishes
    const blowBtn = document.getElementById('blow-candles-btn');
    const flames = document.querySelectorAll('#wish-candles .flame');
    const wishText = document.getElementById('wish-text');

    blowBtn.addEventListener('click', () => {
        flames.forEach(flame => {
            flame.style.display = 'none';
        });
        
        wishText.classList.remove('hidden');
        blowBtn.style.display = 'none';
        
        // Confetti
        createConfetti();
    });

    // Particle Effects
    function createConfetti() {
        const colors = ['#d81b60', '#ffb6c1', '#ffd700', '#ab47bc', '#4fc3f7'];
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('particle');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = Math.random() * 100 + 'vh';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    function createSingleHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.classList.add('particle');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.animationDuration = Math.random() * 3 + 4 + 's';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }

    function createHearts() {
        setInterval(createSingleHeart, 1500);
    }
});
