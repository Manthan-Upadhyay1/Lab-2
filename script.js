const menuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

const openIcon = document.getElementById("menu-open-icon");
const closeIcon = document.getElementById("menu-close-icon");

const setMobileMenuOpen = (shouldOpen) => {
  if (!menuButton || !mobileMenu) return;
  mobileMenu.classList.toggle("hidden", !shouldOpen);
  openIcon?.classList.toggle("hidden", shouldOpen);
  closeIcon?.classList.toggle("hidden", !shouldOpen);
  menuButton.setAttribute("aria-expanded", String(shouldOpen));
  menuButton.setAttribute("aria-label", shouldOpen ? "Close navigation menu" : "Open navigation menu");
};

menuButton?.addEventListener("click", () => {
  const isOpen = !mobileMenu.classList.contains("hidden");
  setMobileMenuOpen(!isOpen);
});

/* Close mobile menu after clicking a link */

document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    setMobileMenuOpen(false);
  });
});

// Navigation enhancements: active section tracking, outside/escape close,
// responsive menu reset, and a contextual back-to-top control.
document.addEventListener("DOMContentLoaded", () => {
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll('header nav a[href^="#"]')];
  const topButton = document.getElementById("back-to-top");

  const markCurrentSection = (sectionId) => {
    navLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${sectionId}`;
      link.classList.toggle("nav-link-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) markCurrentSection(visible.target.id);
    }, { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.2, 0.5] });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  window.addEventListener("scroll", () => {
    if (topButton) topButton.hidden = window.scrollY < 500;
  }, { passive: true });
  topButton?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMobileMenuOpen(false);
  });
  document.addEventListener("click", (event) => {
    if (mobileMenu && menuButton && !mobileMenu.classList.contains("hidden") &&
        !mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
      setMobileMenuOpen(false);
    }
  });
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 1024px)").matches) setMobileMenuOpen(false);
  });
});

// loader

/* =========================================
   DINEMATE LOADER ANIMATION
========================================= */

gsap.registerPlugin(ScrollTrigger);

const loader = document.querySelector("#loader");

if (loader) {
  const loaderCard = document.querySelector("#loader-card");
  const iconBg = document.querySelector("#icon-bg");
  const iconBackground = document.querySelector("#icon-background");
  const utensils = document.querySelector("#utensils");

  const fork = document.querySelector("#fork");
  const knife = document.querySelector("#knife");

  const dineMateText = document.querySelector("#dinemate-text");
  const aiText = document.querySelector("#ai-text");

  /* ---------------------------------
       Initial states
    --------------------------------- */

  gsap.set(loaderCard, {
    opacity: 0,
    scale: 0.85,
  });

  gsap.set(iconBg, {
    opacity: 0,
    scale: 0.5,
    transformOrigin: "center center",
  });

  gsap.set(utensils, {
    opacity: 0,
    scale: 0.7,
    transformOrigin: "center center",
  });

  gsap.set([dineMateText, aiText], {
    opacity: 0,
    y: 10,
  });

  /* ---------------------------------
       Create loader timeline
    --------------------------------- */

  const loaderTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  /* 1. Card appears */

  loaderTimeline.to(loaderCard, {
    opacity: 1,
    scale: 1,
    duration: 0.7,
  });

  /* 2. Orange icon pops in */

  loaderTimeline.to(
    iconBg,
    {
      opacity: 1,
      scale: 1,
      duration: 0.55,
      ease: "back.out(1.7)",
    },
    "-=0.25",
  );

  /* 3. Utensils appear */

  loaderTimeline.to(
    utensils,
    {
      opacity: 1,
      scale: 1,
      duration: 0.45,
      ease: "back.out(1.8)",
    },
    "-=0.25",
  );

  /* 4. Small utensil movement */

  loaderTimeline.to(fork, {
    rotation: -6,
    duration: 0.2,
    transformOrigin: "center center",
  });

  loaderTimeline.to(fork, {
    rotation: 0,
    duration: 0.2,
  });

  loaderTimeline.to(
    knife,
    {
      rotation: 6,
      duration: 0.2,
      transformOrigin: "center center",
    },
    "<",
  );

  loaderTimeline.to(knife, {
    rotation: 0,
    duration: 0.2,
  });

  /* 5. DineMate appears */

  loaderTimeline.to(dineMateText, {
    opacity: 1,
    y: 0,
    duration: 0.55,
    ease: "power3.out",
  });

  /* 6. AI appears */

  loaderTimeline.to(
    aiText,
    {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: "power3.out",
    },
    "-=0.25",
  );

  /* 7. Tiny pause */

  loaderTimeline.to(
    {},
    {
      duration: 0.35,
    },
  );

  /* 8. Entire logo exits */

  loaderTimeline.to(loader, {
    opacity: 0,
    duration: 0.6,
    ease: "power2.inOut",
    onComplete: () => {
      loader.style.display = "none";
    },
  });
}

/* =========================================
   GSAP SCROLL ANIMATIONS
========================================= */

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------------------
       HERO
    ----------------------------------------- */

  const hero = document.querySelector("#home");

  if (hero) {
    const heroTimeline = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    heroTimeline
      .from("#home .hero-badge", {
        opacity: 0,
        y: 25,
        duration: 0.7,
      })
      .from(
        "#home h1",
        {
          opacity: 0,
          y: 50,
          duration: 1,
        },
        "-=0.35",
      )
      .from(
        "#home p",
        {
          opacity: 0,
          y: 30,
          duration: 0.7,
        },
        "-=0.5",
      )
      .from(
        "#home a",
        {
          opacity: 0,
          y: 25,
          stagger: 0.12,
          duration: 0.6,
        },
        "-=0.35",
      )
      .from(
        "#recommendation-card",
        {
          opacity: 0,
          y: 70,
          scale: 0.92,
          duration: 1,
        },
        "-=0.6",
      );
  }

  /* -----------------------------------------
       GENERIC SECTION HEADINGS
    ----------------------------------------- */

  gsap.utils.toArray("section h2").forEach((heading) => {
    gsap.from(heading, {
      scrollTrigger: {
        trigger: heading,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },

      opacity: 0,
      y: 50,
      duration: 0.9,
      ease: "power3.out",
    });
  });

  /* -----------------------------------------
       SECTION DESCRIPTIONS
    ----------------------------------------- */

  gsap.utils.toArray("section h2 + p").forEach((text) => {
    gsap.from(text, {
      scrollTrigger: {
        trigger: text,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },

      opacity: 0,
      y: 30,
      duration: 0.7,
      delay: 0.1,
      ease: "power2.out",
    });
  });

  /* -----------------------------------------
       PROBLEM SECTION
    ----------------------------------------- */

  const problemCards = document.querySelectorAll("#problem article");

  if (problemCards.length) {
    gsap.from(problemCards, {
      scrollTrigger: {
        trigger: "#problem",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },

      opacity: 0,
      y: 70,
      scale: 0.94,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
    });
  }

  /* =========================================
   PERSONALIZATION FEATURES
========================================= */

  const featuresSection = document.querySelector("#features");
  const featureCards = gsap.utils.toArray("#features .feature-card");

  if (featuresSection && featureCards.length) {
    featureCards.forEach((card) => {
      const icon = card.querySelector(".feature-icon");

      // Initial card state
      gsap.set(card, {
        opacity: 0,
        y: 60,
      });

      // Initial icon state
      if (icon) {
        gsap.set(icon, {
          opacity: 0,
          scale: 0.5,
          rotation: -15,
        });
      }
    });

    const featureTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: featuresSection,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    featureCards.forEach((card, index) => {
      const icon = card.querySelector(".feature-icon");

      // Card appears
      featureTimeline.to(
        card,
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        },
        index * 0.12,
      );

      // Icon appears after its card
      if (icon) {
        featureTimeline.to(
          icon,
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.45,
            ease: "back.out(1.7)",
          },
          index * 0.12 + 0.35,
        );
      }
    });
  }

  /* =========================================
   TRAVELLER TYPES
========================================= */

  const travellerSection = document.querySelector("#travellers");
  const travellerCards = gsap.utils.toArray("#travellers .traveller-card");

  if (travellerSection && travellerCards.length) {
    travellerCards.forEach((card, index) => {
      const icon = card.querySelector(".traveller-icon");

      // Alternate entry direction
      const direction = index % 2 === 0 ? -80 : 80;

      gsap.set(card, {
        opacity: 0,
        x: direction,
        y: 30,
        rotation: index % 2 === 0 ? -3 : 3,
      });

      if (icon) {
        gsap.set(icon, {
          opacity: 0,
          scale: 0.5,
        });
      }
    });

    const travellerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: travellerSection,
        start: "top 65%",
        toggleActions: "play none none reverse",
      },
    });

    travellerCards.forEach((card, index) => {
      const icon = card.querySelector(".traveller-icon");

      const direction = index % 2 === 0 ? -80 : 80;

      // Card enters
      travellerTimeline.to(
        card,
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        index * 0.12,
      );

      // Icon pops in
      if (icon) {
        travellerTimeline.to(
          icon,
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          index * 0.12 + 0.35,
        );
      }
    });
  }
  gsap.from("#traveller-summary", {
    scrollTrigger: {
      trigger: "#travellers",
      start: "top 35%",
      toggleActions: "play none none reverse",
    },

    opacity: 0,
    y: 35,
    scale: 0.96,
    duration: 0.8,
    ease: "power3.out",
  });

  /* =========================================
   ABOUT SECTION
========================================= */

  const aboutSection = document.querySelector("#about");
  const aboutProfile = document.querySelector("#about-profile-card");
  const aboutBenefits = gsap.utils.toArray("#about .about-benefit");

  if (aboutSection) {
    /* -----------------------------------------
       PROFILE CARD
    ----------------------------------------- */

    if (aboutProfile) {
      gsap.fromTo(
        aboutProfile,

        {
          opacity: 0,
          x: -80,
        },

        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: aboutSection,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    /* -----------------------------------------
       BENEFIT CARDS
    ----------------------------------------- */

    if (aboutBenefits.length) {
      gsap.fromTo(
        aboutBenefits,

        {
          opacity: 0,
          x: 60,
        },

        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",

          scrollTrigger: {
            trigger: aboutBenefits[0],
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    /* -----------------------------------------
       PREFERENCE BARS
    ----------------------------------------- */

    const preferenceBars = gsap.utils.toArray("#about .preference-bar");

    preferenceBars.forEach((bar, index) => {
      gsap.to(bar, {
        width: bar.dataset.width,
        duration: 1.4,
        delay: index * 0.1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: aboutProfile,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    });

    /* -----------------------------------------
       PREFERENCE NUMBERS
    ----------------------------------------- */

    const preferenceValues = gsap.utils.toArray("#about .preference-value");

    preferenceValues.forEach((value, index) => {
      const target = Number(value.dataset.value);

      const counter = {
        number: 0,
      };

      gsap.to(counter, {
        number: target,

        duration: 1.4,
        delay: index * 0.1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: aboutProfile,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },

        onUpdate: () => {
          value.textContent = `${Math.round(counter.number)}%`;
        },
      });
    });
  }
  /* =========================================
   AI PROFILE
   COUNTING + PROGRESS BARS
========================================= */

  // const aboutSection = document.querySelector("#about");

  if (aboutSection) {
    const preferenceBars = gsap.utils.toArray("#about .preference-bar");

    const preferenceValues = gsap.utils.toArray("#about .preference-value");

    /* -----------------------------------------
       PROGRESS BARS
    ----------------------------------------- */

    preferenceBars.forEach((bar, index) => {
      gsap.to(bar, {
        width: bar.dataset.width,

        duration: 1.5,

        delay: index * 0.12,

        ease: "power3.out",

        scrollTrigger: {
          trigger: aboutSection,
          start: "top 55%",
          toggleActions: "play none none reverse",
        },
      });
    });

    /* -----------------------------------------
       NUMBER COUNTING
    ----------------------------------------- */

    preferenceValues.forEach((value, index) => {
      const target = Number(value.dataset.value);

      const counter = {
        number: 0,
      };

      gsap.to(counter, {
        number: target,

        duration: 1.5,

        delay: index * 0.12,

        ease: "power3.out",

        scrollTrigger: {
          trigger: aboutSection,
          start: "top 55%",
          toggleActions: "play none none reverse",
        },

        onUpdate: () => {
          value.textContent = `${Math.round(counter.number)}%`;
        },
      });
    });
  }

  /* -----------------------------------------
       FOOTER
    ----------------------------------------- */

  gsap.from("footer", {
    scrollTrigger: {
      trigger: "footer",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },

    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power2.out",
  });

  /* -----------------------------------------
       REFRESH SCROLLTRIGGER
    ----------------------------------------- */

  ScrollTrigger.refresh();
});

/* =========================================
   HERO PARALLAX
========================================= */

const heroBackground = document.querySelector("#hero-background");

if (heroBackground) {
  gsap.to(heroBackground, {
    yPercent: 12,

    ease: "none",

    scrollTrigger: {
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

/* =========================================
   PREFERENCE BAR ANIMATION
========================================= */

const preferenceBars = document.querySelectorAll(".preference-bar");

if (preferenceBars.length) {
  gsap.to(preferenceBars, {
    width: (index, element) => {
      return element.dataset.width;
    },

    stagger: 0.15,
    duration: 1.4,
    ease: "power3.out",

    scrollTrigger: {
      trigger: "#about",
      start: "top 55%",
      toggleActions: "play none none reverse",
    },
  });
}
/* =========================================
   HOW IT WORKS
   Pinned, scroll-driven card sequence
========================================= */

const howStage = document.querySelector("#how-stage");
const howSteps = gsap.utils.toArray("#how-it-works .how-step");
const howProgress = document.querySelector("#how-progress");
const howProgressLabel = document.querySelector("#how-progress-label");

if (howStage && howSteps.length) {
  const activateHowStep = (activeIndex) => {
    howSteps.forEach((step, index) => {
      step.classList.toggle("is-active", index === activeIndex);
      if (index === activeIndex) step.setAttribute("aria-current", "step");
      else step.removeAttribute("aria-current");
    });
    if (howProgressLabel) howProgressLabel.textContent = `Step ${activeIndex + 1} of ${howSteps.length}`;
  };

  gsap.set(howSteps, { autoAlpha: 0, y: 28 });
  gsap.set(howProgress, { scaleX: 0, transformOrigin: "left center" });
  activateHowStep(0);

  const howMedia = gsap.matchMedia();
  howMedia.add({ isMobile: "(max-width: 767px)", isDesktop: "(min-width: 768px)" }, (context) => {
    const { isMobile } = context.conditions;
    const sequence = gsap.timeline({
      scrollTrigger: {
        trigger: howStage,
        start: "top 14%",
        end: () => `+=${howSteps.length * (isMobile ? 440 : 380)}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const activeIndex = Math.min(howSteps.length - 1, Math.floor(self.progress * howSteps.length));
          activateHowStep(activeIndex);
          gsap.set(howProgress, { scaleX: self.progress });
        },
        onLeaveBack: () => {
          activateHowStep(0);
          gsap.set(howProgress, { scaleX: 0 });
        },
        onLeave: () => {
          activateHowStep(howSteps.length - 1);
          gsap.set(howProgress, { scaleX: 1 });
        },
      },
    });

    howSteps.forEach((step, index) => {
      if (isMobile && index > 0) {
        sequence.to(howSteps[index - 1], { autoAlpha: 0, y: -12, duration: 0.22, ease: "none" });
      }
      sequence.to(step, {
        autoAlpha: 1,
        y: 0,
        duration: 0.68,
        ease: "none",
        onStart: () => activateHowStep(index),
      });
      sequence.to({}, { duration: 0.32 });
    });
  });
}

gsap.from("#how-summary", {
  scrollTrigger: {
    trigger: "#how-it-works",
    start: "top 60%",
    stagger:true,
    toggleActions: "play none none reverse",
  },

  opacity: 0,
  duration: 0.8,
  ease: "power3.out",
});

// ai demo box
const aiDemoButton = document.getElementById("ai-demo-button");
const aiDemoModal = document.getElementById("ai-demo-modal");
const closeAiDemo = document.getElementById("close-ai-demo");

function openAiDemo() {
  aiDemoModal.classList.remove("hidden");
  aiDemoModal.classList.add("flex");

  document.body.classList.add("overflow-hidden");

  loadSavedPreferences();
}

function closeAiDemoModal() {
  aiDemoModal.classList.add("hidden");
  aiDemoModal.classList.remove("flex");

  document.body.classList.remove("overflow-hidden");
}

if (aiDemoButton) {
  aiDemoButton.addEventListener("click", (event) => {
    event.preventDefault();
    openAiDemo();
  });
}

if (closeAiDemo) {
  closeAiDemo.addEventListener("click", closeAiDemoModal);
}

if (aiDemoModal) {
  aiDemoModal.addEventListener("click", (event) => {
    if (event.target === aiDemoModal) {
      closeAiDemoModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAiDemoModal();
  }
});

// AI Demo preferences

const demoLocationBtn = document.getElementById("demo-location-btn");
const demoLocationStatus = document.getElementById("demo-location-status");

const groupOptions = document.querySelectorAll(".group-option");

let selectedGroupSize = null;
let userLatitude = null;
let userLongitude = null;

// Group size selection
groupOptions.forEach((button) => {
  button.addEventListener("click", () => {
    groupOptions.forEach((btn) => {
      btn.classList.remove("bg-orange-500", "border-orange-500");
    });

    button.classList.add("bg-orange-500", "border-orange-500");

    selectedGroupSize = button.dataset.group;

    console.log("Group size:", selectedGroupSize);
  });
});

// Get location
if (demoLocationBtn) {
  demoLocationBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
      demoLocationStatus.textContent =
        "Geolocation is not supported by your browser.";

      demoLocationStatus.classList.remove("hidden");

      return;
    }

    demoLocationBtn.textContent = "Getting your location...";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLatitude = position.coords.latitude;

        userLongitude = position.coords.longitude;

        demoLocationBtn.textContent = "✓ Location detected";

        demoLocationBtn.classList.add("border-green-400", "text-green-300");

        demoLocationStatus.textContent = `${userLatitude.toFixed(4)}, ${userLongitude.toFixed(4)}`;

        demoLocationStatus.classList.remove("hidden");

        console.log("Latitude:", userLatitude);
        console.log("Longitude:", userLongitude);
      },

      () => {
        demoLocationBtn.textContent = "Use my current location";

        demoLocationStatus.textContent = "Please allow location access.";

        demoLocationStatus.classList.remove("hidden");
      },
    );
  });
}

function loadSavedPreferences() {
  const saved = localStorage.getItem("dinematePreferences");

  if (!saved) {
    return;
  }

  const preferences = JSON.parse(saved);

  // Cuisine
  if (preferences.cuisine) {
    document.getElementById("demo-cuisine").value = preferences.cuisine;
  }

  // Budget
  if (preferences.budget) {
    document.getElementById("demo-budget").value = preferences.budget;
  }

  // Dietary
  if (preferences.dietary) {
    document.getElementById("demo-dietary").value = preferences.dietary;
  }

  // Group size
  if (preferences.groupSize) {
    selectedGroupSize = preferences.groupSize;

    document.querySelectorAll(".group-option").forEach((button) => {
      button.classList.remove("bg-orange-500", "border-orange-500");

      if (button.dataset.group === preferences.groupSize) {
        button.classList.add("bg-orange-500", "border-orange-500");
      }
    });
  }

  // Location
  if (
    preferences.location &&
    preferences.location.latitude &&
    preferences.location.longitude
  ) {
    userLatitude = preferences.location.latitude;

    userLongitude = preferences.location.longitude;

    if (demoLocationBtn) {
      demoLocationBtn.textContent = "✓ Saved location";
    }
  }
}

async function testGooglePlaces() {
  try {
    const { Place } = await google.maps.importLibrary("places");

    console.log("✅ Google Places loaded successfully");
    console.log("Place API:", Place);
  } catch (error) {
    console.error("❌ Google Places failed to load:", error);
  }
}

testGooglePlaces();

const findRestaurantsBtn = document.getElementById("find-restaurants-btn");

if (findRestaurantsBtn) {
  findRestaurantsBtn.addEventListener("click", async () => {
    /*
        ========================================
        1. Get CURRENT preferences from UI
        ========================================
        */

    const cuisine = document.getElementById("demo-cuisine").value;

    const budget = document.getElementById("demo-budget").value;

    const dietary = document.getElementById("demo-dietary").value;

    /*
        ========================================
        2. Create fresh preferences
        ========================================
        */

    const preferences = {
      location: {
        latitude: userLatitude,
        longitude: userLongitude,
      },

      cuisine: cuisine,

      budget: budget,

      dietary: dietary,

      groupSize: selectedGroupSize,
    };

    /*
        ========================================
        3. Save NEW preferences
        ========================================
        */

    localStorage.setItem("dinematePreferences", JSON.stringify(preferences));

    console.log("Updated DineMate Preferences:", preferences);

    /*
        ========================================
        4. Validate location
        ========================================
        */

    if (userLatitude == null || userLongitude == null) {
      alert("Please allow your location first.");

      return;
    }

    /*
        ========================================
        5. Disable button
        ========================================
        */

    findRestaurantsBtn.disabled = true;

    findRestaurantsBtn.innerHTML = "Finding restaurants...";

    try {
      /*
            ========================================
            6. Load Google Places
            ========================================
            */

      const { Place } = await google.maps.importLibrary("places");

      /*
            ========================================
            7. Build fresh search query
            ========================================
            */

      let query = "restaurants";

      if (cuisine) {
        query = `${cuisine} restaurants`;
      }

      if (dietary) {
        query += ` ${dietary}`;
      }

      console.log("NEW Google Places Query:", query);

      /*
            ========================================
            8. Google Places request
            ========================================
            */

      const request = {
        textQuery: query,

        fields: [
          "displayName",
          "formattedAddress",
          "location",
          "rating",
          "priceLevel",
          "businessStatus",
          "googleMapsURI",
        ],

        includedType: "restaurant",

        maxResultCount: 6,

        language: "en",

        region: "IN",

        locationBias: {
          center: {
            lat: userLatitude,
            lng: userLongitude,
          },

          radius: 5000,
        },
      };

      /*
            ========================================
            9. Search
            ========================================
            */

      const { places } = await Place.searchByText(request);

      console.log("NEW Restaurant Results:", places);

      if (!places || places.length === 0) {
        alert("No restaurants found for these preferences.");

        return;
      }

      renderRestaurantResults(places, preferences);

      /*
            ========================================
            11. Temporary console output
            ========================================
            */

      places.forEach((place, index) => {
        console.log(`${index + 1}.`, place.displayName);

        console.log("Address:", place.formattedAddress);

        console.log("Rating:", place.rating);
      });
    } catch (error) {
      console.error("Google Places Error:", error);

      alert("Unable to find restaurants.");
    } finally {
      findRestaurantsBtn.disabled = false;

      findRestaurantsBtn.innerHTML = `Find My Restaurants <span class="ml-2">→</span>`;
    }
  });
}

function renderRestaurantResults(places, preferences) {
  console.log("🔥 renderRestaurantResults CALLED");
  console.log("Places received:", places);
  console.log("Preferences:", preferences);

  const resultsSection = document.getElementById("restaurant-results");

  const resultsGrid = document.getElementById("restaurant-results-grid");

  const resultsSummary = document.getElementById("results-summary");

  console.log("Results section:", resultsSection);
  console.log("Results grid:", resultsGrid);
  console.log("Results summary:", resultsSummary);

  if (!resultsSection) {
    console.error("❌ #restaurant-results NOT FOUND");
    return;
  }

  if (!resultsGrid) {
    console.error("❌ #restaurant-results-grid NOT FOUND");
    return;
  }

  resultsSection.classList.remove("hidden");

  if (resultsSummary) {
    resultsSummary.textContent = `${places.length} restaurants found near you.`;
  }

  resultsGrid.innerHTML = "";

  places.forEach((place, index) => {
    console.log(`Rendering restaurant ${index + 1}:`, place);

    const name = place.displayName || "Restaurant";

    const address = place.formattedAddress || "Address unavailable";

    const rating = place.rating ? Number(place.rating).toFixed(1) : "N/A";

    const card = document.createElement("div");

    card.className =
      "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm";

    card.innerHTML = `
            <div class="mb-4 flex items-start justify-between gap-4">

                <div>
                    <h4 class="text-lg font-bold text-[#0B1F33]">
                        ${name}
                    </h4>

                    <p class="mt-1 text-sm text-slate-500">
                        ${address}
                    </p>
                </div>

                <div class="rounded-xl bg-orange-50 px-3 py-2 text-center">
                    <div class="text-sm font-bold text-orange-500">
                        ${rating}
                    </div>

                    <div class="text-[10px] text-slate-400">
                        ★ Rating
                    </div>
                </div>

            </div>

            <div class="mb-4 flex flex-wrap gap-2">

                <span class="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                    ${preferences.cuisine || "Restaurant"}
                </span>

                ${
                  preferences.dietary
                    ? `
                    <span class="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        ${preferences.dietary}
                    </span>
                    `
                    : ""
                }

                ${
                  preferences.groupSize
                    ? `
                    <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        👥 ${preferences.groupSize}
                    </span>
                    `
                    : ""
                }

            </div>

            <div class="mb-4 rounded-xl bg-[#FAF8F3] p-3">

                <div class="flex items-center gap-2">
                    <span>✨</span>

                    <p class="text-xs font-medium text-slate-600">
                        Found based on your DineMate preferences
                    </p>
                </div>

            </div>

            ${
              place.googleMapsURI
                ? `
                <a
                    href="${place.googleMapsURI}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block w-full rounded-xl bg-[#0B1F33] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[#16344D]"
                >
                    View on Google Maps ↗
                </a>
                `
                : ""
            }
        `;

    resultsGrid.appendChild(card);
  });

  showRestaurantResults();
  animateToRestaurantResults();
  console.log("✅ Cards rendered:", resultsGrid.children.length);
}

function calculateMatchScore(place, preferences) {
  let score = 70;

  // Rating
  if (place.rating) {
    score += Math.round((place.rating - 3) * 6);
  }

  // Cuisine preference
  if (preferences.cuisine) {
    score += 5;
  }

  // Dietary preference
  if (preferences.dietary) {
    score += 5;
  }

  // Group size
  if (preferences.groupSize) {
    score += 3;
  }

  // Keep score realistic
  score = Math.min(score, 98);
  score = Math.max(score, 65);

  return score;
}

function showRestaurantResults() {
  const layout = document.getElementById("demo-layout");

  const preferences = document.getElementById("demo-preferences");

  const results = document.getElementById("restaurant-results");

  if (!layout || !preferences || !results) {
    console.error("Demo layout elements not found.");
    return;
  }

  // Activate results state
  layout.classList.add("results-active");

  // GSAP animation
  const timeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  /*
        STEP 1
        Slightly shrink preference panel
    */

  timeline.to(preferences, {
    width: 420,
    duration: 0.7,
  });

  /*
        STEP 2
        Results panel appears
    */

  timeline.fromTo(
    results,
    {
      opacity: 0,
      x: 60,
      scale: 0.97,
    },
    {
      opacity: 1,
      x: 0,
      scale: 1,
      width: "auto",
      duration: 0.7,
    },
    "-=0.45",
  );

  /*
        STEP 3
        Restaurant cards enter one by one
    */

  timeline.fromTo(
    ".restaurant-card",
    {
      opacity: 0,
      y: 30,
      scale: 0.96,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.45,
      stagger: 0.08,
    },
    "-=0.35",
  );
}

function animateToRestaurantResults() {

    const layout =
        document.getElementById("demo-layout");

    const preferences =
        document.getElementById("demo-preferences");

    const results =
        document.getElementById("restaurant-results");

    if (!layout || !preferences || !results) {
        console.error("❌ Demo elements not found.");
        return;
    }


    /*
    ==========================================
    SHOW RESULTS
    ==========================================
    */

    results.classList.remove("hidden");


    /*
    ==========================================
    GET DIMENSIONS
    ==========================================
    */

    const layoutRect =
        layout.getBoundingClientRect();

    const preferenceRect =
        preferences.getBoundingClientRect();


    /*
    ==========================================
    CURRENT CENTER POSITION

    The preference card is currently
    centered inside the layout.

    We calculate how far it must move
    to reach the left side.
    ==========================================
    */

    const currentLeft =
        preferenceRect.left;

    const targetLeft =
        layoutRect.left;


    const moveLeft =
        targetLeft - currentLeft + 20;


    console.log("Moving preference card:", moveLeft);


    /*
    ==========================================
    PREPARE RESULTS
    ==========================================
    */

    gsap.set(results, {
        visibility: "visible",
        opacity: 0,
        x: 80
    });


    /*
    ==========================================
    MAIN TRANSITION
    ==========================================
    */

    const timeline =
        gsap.timeline();


    // 1. Move preference card left
    timeline.to(
        preferences,
        {
            x: moveLeft,
            duration: 0.8,
            ease: "power3.inOut"
        }
    );


    // 2. Bring restaurant results from right
    timeline.to(
        results,
        {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out"
        },
        "-=0.45"
    );


    /*
    ==========================================
    RESTAURANT CARDS
    ==========================================
    */

    timeline.fromTo(
        ".restaurant-card",
        {
            opacity: 0,
            y: 25
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power3.out"
        },
        "-=0.3"
    );

} 

