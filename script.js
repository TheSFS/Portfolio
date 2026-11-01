// ======================================
// PORTFOLIO NAVIGATION
// Automatically highlights the active section
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    // Get all navigation links
    const navLinks = document.querySelectorAll(".nav a");

    // Get all portfolio sections
    const sections = document.querySelectorAll(
        "#home, #about, #skills, #projects, #education"
    );


    // ======================================
    // UPDATE ACTIVE NAVIGATION LINK
    // ======================================

    function setActiveLink(sectionId) {

        navLinks.forEach(function (link) {

            // Remove active class from all links
            link.classList.remove("active");

            // Add active class to the matching link
            if (link.getAttribute("href") === "#" + sectionId) {

                link.classList.add("active");

            }

        });

    }


    // ======================================
    // DETECT WHICH SECTION IS VISIBLE
    // ======================================

    const observer = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                // If section is visible
                if (entry.isIntersecting) {

                    // Update active navigation link
                    setActiveLink(entry.target.id);

                }

            });

        },

        {
            // Detect section near the middle of the screen
            rootMargin: "-20% 0px -60% 0px",

            threshold: 0
        }

    );


    // ======================================
    // OBSERVE ALL SECTIONS
    // ======================================

    sections.forEach(function (section) {

        observer.observe(section);

    });


    // ======================================
    // NAVIGATION CLICK
    // ======================================

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            // Get the section ID from the link
            const sectionId = link.getAttribute("href").substring(1);

            // Update active link
            setActiveLink(sectionId);

        });

    });


    // ======================================
    // MOBILE MENU
    // ======================================

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");


    // Open and close mobile navigation
    if (menuToggle && nav) {

        menuToggle.addEventListener("click", function () {

            nav.classList.toggle("open");

        });


        // Close menu after clicking a navigation link
        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                nav.classList.remove("open");

            });

        });

    }


});