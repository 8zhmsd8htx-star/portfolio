// Remove any hash on initial load (iOS Safari fix)
if (window.location.hash) {
  history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search
  );
}

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

// iOS Safari needs multiple passes
const forceScrollTop = () => {
  window.scrollTo(0, 0);
  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
  });
};

// Run on first load
window.addEventListener("load", () => {
  setTimeout(forceScrollTop, 0);
});

// Run when page is restored from cache (mobile Safari)
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    setTimeout(forceScrollTop, 0);
  }
});



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

navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("is-open");
    mobileMenu.classList.toggle("is-open");

    document.body.style.overflow =
        mobileMenu.classList.contains("is-open") ? "hidden" : "";
});

// Close menu when clicking a link
mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navToggle.classList.remove("is-open");
        mobileMenu.classList.remove("is-open");
        document.body.style.overflow = "";
    });
});
