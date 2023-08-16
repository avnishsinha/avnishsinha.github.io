const navMenu = document.querySelector(".nav-menu");

navMenu.addEventListener("click", (e) => {
  const target = e.target.getAttribute("href");

  // Only handle internal links
  if (target && target.startsWith("#")) {
    e.preventDefault();
    const section = document.querySelector(target);

    if (section) { // Add a check to ensure section exists
      const sectionTop = section.offsetTop - 80;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    }
  }
});
