document.addEventListener("DOMContentLoaded", () => {
    // scroll effect
    const header = document.getElementById("header")
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled")
        } else {
            header.classList.remove("scrolled")
        }
    })

    // Mobile menu toggle
    const hamburger = document.querySelector(".hamburger")
    const navMenu = document.querySelector(".nav-menu")
    const body = document.body

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navMenu.classList.toggle("active")
        // Prevent scrolling when menu is open
        body.style.overflow = navMenu.classList.contains("active") ? "hidden" : ""
    })


    document.querySelectorAll(".nav-menu a").forEach((link) => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active")
            navMenu.classList.remove("active")
            body.style.overflow = ""
        })
    })


    document.addEventListener("click", (e) => {
        if (navMenu.classList.contains("active") && !e.target.closest(".nav-menu") && !e.target.closest(".hamburger")) {
            hamburger.classList.remove("active")
            navMenu.classList.remove("active")
            body.style.overflow = ""
        }
    })

    // Testimonials slider
    const testimonials = document.querySelectorAll(".testimonial")
    const dots = document.querySelectorAll(".dot")
    const prevBtn = document.querySelector(".prev-testimonial")
    const nextBtn = document.querySelector(".next-testimonial")
    let currentIndex = 0

    function showTestimonial(index) {
        testimonials.forEach((testimonial) => {
            testimonial.classList.remove("active")
        })
        dots.forEach((dot) => {
            dot.classList.remove("active")
        })

        testimonials[index].classList.add("active")
        dots[index].classList.add("active")
        currentIndex = index
    }

    // Initialize dots click event
    dots.forEach((dot) => {
        dot.addEventListener("click", function () {
            const index = Number.parseInt(this.getAttribute("data-index"))
            showTestimonial(index)
        })
    })

    // Previous and Next buttons
    prevBtn.addEventListener("click", () => {
        let index = currentIndex - 1
        if (index < 0) {
            index = testimonials.length - 1
        }
        showTestimonial(index)
    })

    nextBtn.addEventListener("click", () => {
        let index = currentIndex + 1
        if (index >= testimonials.length) {
            index = 0
        }
        showTestimonial(index)
    })

    // Add touch swipe functionality for testimonials
    let touchStartX = 0
    let touchEndX = 0
    const testimonialsContainer = document.querySelector(".testimonials-slider")

    testimonialsContainer.addEventListener(
        "touchstart",
        (e) => {
            touchStartX = e.changedTouches[0].screenX
        },
        false,
    )

    testimonialsContainer.addEventListener(
        "touchend",
        (e) => {
            touchEndX = e.changedTouches[0].screenX
            handleSwipe()
        },
        false,
    )

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left, show next
            let index = currentIndex + 1
            if (index >= testimonials.length) {
                index = 0
            }
            showTestimonial(index)
        }

        if (touchEndX > touchStartX + 50) {
            // Swipe right, show previous
            let index = currentIndex - 1
            if (index < 0) {
                index = testimonials.length - 1
            }
            showTestimonial(index)
        }
    }

    // Auto slide testimonials
    let testimonialInterval = setInterval(() => {
        let index = currentIndex + 1
        if (index >= testimonials.length) {
            index = 0
        }
        showTestimonial(index)
    }, 5000)

    // Stop auto slide on hover or touch
    testimonialsContainer.addEventListener("mouseenter", () => {
        clearInterval(testimonialInterval)
    })

    testimonialsContainer.addEventListener("touchstart", () => {
        clearInterval(testimonialInterval)
    })

    testimonialsContainer.addEventListener("mouseleave", () => {
        testimonialInterval = setInterval(() => {
            let index = currentIndex + 1
            if (index >= testimonials.length) {
                index = 0
            }
            showTestimonial(index)
        }, 5000)
    })

    // Form submission
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault()

            // Get form values
            const name = document.getElementById("name").value
            const email = document.getElementById("email").value
            const message = document.getElementById("message").value

            // Here you would typically send the form data to a server

            alert(`¡Gracias ${name}! Tu mensaje ha sido enviado. Te contactaremos pronto.`)

            // Reset form
            contactForm.reset()
        })
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href")
            if (targetId === "#") return

            const targetElement = document.querySelector(targetId)
            if (targetElement) {
                const headerHeight = document.getElementById("header").offsetHeight
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                })
            }
        })
    })

    // Intersection Observer for animations
    const sections = document.querySelectorAll("section, footer")

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15,
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view")
                // Unobserve after animation is triggered
                // observer.unobserve(entry.target)
            }
        })
    }, observerOptions)

    sections.forEach((section) => {
        observer.observe(section)
    })

    // Parallax effect for background elements
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY

        // Apply parallax to specific elements if needed
        // Example: document.querySelector('.parallax-element').style.transform = `translateY(${scrollY * 0.3}px)`
    })

    // Button hover effects
    const buttons = document.querySelectorAll(".cta-button, .plan-button, .app-button")

    buttons.forEach((button) => {
        button.addEventListener("mouseenter", (e) => {
            const x = e.clientX - button.getBoundingClientRect().left
            const y = e.clientY - button.getBoundingClientRect().top

            const ripple = document.createElement("span")
            ripple.classList.add("ripple")
            ripple.style.left = `${x}px`
            ripple.style.top = `${y}px`

            button.appendChild(ripple)

            setTimeout(() => {
                ripple.remove()
            }, 600)
        })
    })

    // Check if device is mobile for specific mobile optimizations
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    if (isMobile) {
        document.body.classList.add("mobile-device")
    }
})
