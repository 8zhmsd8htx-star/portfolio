// Remove any hash on initial load (iOS Safari fix)
if (window.location.hash) {
  history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search
  );
}

document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    reveals.forEach(reveal => observer.observe(reveal));
});


const navToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

let menuOpen = false;

// Toggle mobile menu

const openMenu = () => {
    menuOpen = true;
    navToggle.classList.add("is-open");
    mobileMenu.classList.add("is-open");
    document.body.style.overflow = "hidden";
};

const closeMenu = () => {
    menuOpen = false;
    navToggle.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");
    document.body.style.overflow = "";
};

navToggle.addEventListener("click", () => {
    menuOpen ? closeMenu() : openMenu();
});

// Close menu when clicking a link
mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
});
