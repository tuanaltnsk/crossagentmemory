const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(item);
});

const networkCard = document.getElementById("network-card");

if (networkCard && window.matchMedia("(pointer: fine)").matches) {
  networkCard.addEventListener("mousemove", (event) => {
    const rect = networkCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    networkCard.style.transform = `rotateX(${y * -5}deg) rotateY(${x * 6}deg)`;
  });

  networkCard.addEventListener("mouseleave", () => {
    networkCard.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = button.dataset.copy;
    const originalText = button.textContent.trim();

    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "Email copied";
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      button.textContent = "Email copied";
    }

    setTimeout(() => {
      button.textContent = originalText;
    }, 1800);
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
