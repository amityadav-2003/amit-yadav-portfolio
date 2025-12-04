  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const navLinks = document.getElementById('nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Scroll animations
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const fadeInOnScroll = () => {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        };
        
        // Initial check
        fadeInOnScroll();
        
        // Check on scroll
        window.addEventListener('scroll', fadeInOnScroll);
        
        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const btn = document.getElementById("submitBtn");
    btn.innerText = "Sending...";
    btn.disabled = true;

    let formData = {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value
    };

    fetch("https://script.google.com/macros/s/AKfycbwbpkza0uOELB75UBCxjuuNRqJUq7i9F9kUI8etTtCWcGTn7oj-3ZE0l1vw4XBMPf41EA/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
        btn.innerText = "Send Message";
        btn.disabled = false;

        if (data.success) {
            alert("Message Sent Successfully!");
            document.getElementById("contactForm").reset();
        } else {
            alert("Error: " + data.error);
        }
    })
    .catch(err => {
        btn.innerText = "Send Message";
        btn.disabled = false;
        alert("Network Error!");
        console.error(err);
    });
});