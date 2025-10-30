// Custom JavaScript for Indra Ganesan College of Engineering

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initializeBootstrapComponents();
  setActiveNavigation();
  initializeAnimations();
  initializeBackToTop();
  initializeForms();
  initializeCounters();
  initializeCourseFiltering();
  initializeDropdownHover();

  console.log(
    "Indra Ganesan College of Engineering website loaded successfully!"
  );
});

// Initialize Bootstrap Components
function initializeBootstrapComponents() {
  // Initialize tooltips
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  // Initialize popovers
  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  const popoverList = [...popoverTriggerList].map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  );
}

// Set Active Navigation
function setActiveNavigation() {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Initialize Animations
function initializeAnimations() {
  // Add animation to elements when they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  const elementsToAnimate = document.querySelectorAll(
    ".course-card, .testimonial-card, .department-card, .facility-card, .hero-stats"
  );
  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });
}

// Initialize Back to Top Button
function initializeBackToTop() {
  // Create back to top button
  const backToTopButton = document.createElement("a");
  backToTopButton.href = "#";
  backToTopButton.className = "back-to-top";
  backToTopButton.innerHTML = '<i class="bi bi-chevron-up"></i>';
  backToTopButton.setAttribute("aria-label", "Back to top");
  document.body.appendChild(backToTopButton);

  // Show/hide back to top button
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  // Smooth scroll to top
  backToTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Initialize Forms
function initializeForms() {
  // Contact form handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactFormSubmit);
  }

  // Newsletter form handling
  const newsletterForm = document.querySelector("footer .input-group button");
  if (newsletterForm) {
    newsletterForm.addEventListener("click", handleNewsletterSubscribe);
  }
}

// Handle Contact Form Submission
function handleContactFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;

  // Show loading state
  submitButton.innerHTML = '<span class="loading"></span> Sending...';
  submitButton.disabled = true;

  // Get form data
  const formData = new FormData(form);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    // Show success message
    showNotification(
      "Thank you for your message! We will get back to you soon.",
      "success"
    );

    // Reset form
    form.reset();

    // Reset button
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
  }, 2000);
}

// Handle Newsletter Subscription
function handleNewsletterSubscribe(e) {
  e.preventDefault();

  const button = e.target;
  const input = button.parentElement.querySelector("input");
  const email = input.value;

  if (!email || !isValidEmail(email)) {
    showNotification("Please enter a valid email address.", "warning");
    return;
  }

  const originalText = button.innerHTML;

  // Show loading state
  button.innerHTML = '<span class="loading"></span>';
  button.disabled = true;

  // Simulate subscription (replace with actual API call)
  setTimeout(() => {
    showNotification("Thank you for subscribing to our newsletter!", "success");
    input.value = "";

    // Reset button
    button.innerHTML = originalText;
    button.disabled = false;
  }, 1500);
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Initialize Counters
function initializeCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.textContent);
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target;
      }
    };

    // Start counter when element is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(counter);
  });
}

// Initialize Course Filtering
function initializeCourseFiltering() {
  const filterButtons = document.querySelectorAll(".filter-buttons .btn");
  const courseItems = document.querySelectorAll(".course-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      courseItems.forEach((item) => {
        const category = item.getAttribute("data-category");

        if (filterValue === "all" || filterValue === category) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 100);
        } else {
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Initialize Dropdown Hover
function initializeDropdownHover() {
  const dropdowns = document.querySelectorAll(".dropdown, .dropdown-submenu");

  dropdowns.forEach((dropdown) => {
    // Show on hover
    dropdown.addEventListener("mouseenter", function () {
      const menu = this.querySelector(".dropdown-menu");
      if (menu) {
        menu.style.display = "block";
        menu.classList.add("show");
      }
    });

    // Hide on mouse leave
    dropdown.addEventListener("mouseleave", function () {
      const menu = this.querySelector(".dropdown-menu");
      if (menu) {
        menu.style.display = "none";
        menu.classList.remove("show");
      }
    });
  });

  // Close all dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
      const openMenus = document.querySelectorAll(".dropdown-menu.show");
      openMenus.forEach((menu) => {
        menu.style.display = "none";
        menu.classList.remove("show");
      });
    }
  });
}

// Navbar background change on scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.pageYOffset > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Show notification function
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  notification.style.cssText =
    "top: 20px; right: 20px; z-index: 1050; min-width: 300px;";
  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  // Add to page
  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

// Print functionality for fee structure
function printFeeStructure() {
  window.print();
}

// Add print button for fee tables
document.addEventListener("DOMContentLoaded", function () {
  const feeTables = document.querySelectorAll(".table");
  feeTables.forEach((table) => {
    if (table.closest(".table-responsive")) {
      const printButton = document.createElement("button");
      printButton.textContent = "Print Fee Structure";
      printButton.className = "btn btn-outline-primary mb-3";
      printButton.onclick = printFeeStructure;
      table
        .closest(".table-responsive")
        .parentNode.insertBefore(
          printButton,
          table.closest(".table-responsive")
        );
    }
  });
});

// Page load event
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

// Add CSS for navbar scroll effect and notifications
const dynamicStyles = `
    .navbar-scrolled {
        background: rgba(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .course-item {
        transition: all 0.3s ease;
    }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Course-specific JavaScript functionality

document.addEventListener("DOMContentLoaded", function () {
  // Get all filter buttons and course items
  const filterButtons = document.querySelectorAll(".filter-buttons .btn");
  const courseItems = document.querySelectorAll(".course-item");
  const noCourseMessage = document.getElementById("no-course-message");
  const coursesContainer = document.getElementById("courses-container");

  // Initially hide all courses and show the "no course selected" message
  courseItems.forEach((item) => {
    item.style.display = "none";
  });

  // Function to handle filter button clicks
  function handleFilterClick(event) {
    const filterValue = event.target.getAttribute("data-filter");

    // Remove active class from all buttons
    filterButtons.forEach((button) => {
      button.classList.remove("active");
    });

    // Add active class to clicked button
    event.target.classList.add("active");

    // Hide the "no course selected" message
    noCourseMessage.style.display = "none";

    // Show/hide courses based on filter
    courseItems.forEach((item) => {
      const category = item.getAttribute("data-category");

      if (filterValue === "all" || filterValue === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    // Scroll to the courses section
    document.getElementById("courses-section").scrollIntoView({
      behavior: "smooth",
    });
  }

  // Add click event listeners to filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", handleFilterClick);
  });
});
