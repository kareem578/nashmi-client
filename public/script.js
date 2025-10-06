// Smooth Counter Animation
const counters = document.querySelectorAll("[data-count]")
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target
        const target = Number.parseInt(counter.getAttribute("data-count"))
        let count = 0
        const increment = target / 100

        const updateCount = () => {
          if (count < target) {
            count += increment
            counter.innerText =
              Math.ceil(count) + (counter.parentElement.querySelector("p").innerText.includes("زيادة") ? "%" : "")
            setTimeout(updateCount, 10)
          } else {
            counter.innerText =
              target + (counter.parentElement.querySelector("p").innerText.includes("زيادة") ? "%" : "")
            observer.unobserve(counter)
          }
        }
        updateCount()
      }
    })
  },
  { threshold: 0.8 },
)

counters.forEach((counter) => {
  counterObserver.observe(counter)
})

// Scroll Animation Observer
const elementsToAnimate = document.querySelectorAll(
  ".animate-on-scroll, .animate-slide-right, .animate-slide-left, .animate-scale",
)
const staggerItems = document.querySelectorAll(".stagger-item")

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated")
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1 },
)

elementsToAnimate.forEach((element) => {
  observer.observe(element)
})

// Staggered items observation
const staggerObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const parent = entry.target.closest(".problems-grid, .services-grid, .steps-grid, .features")
        if (parent) {
          Array.from(parent.children).forEach((item, index) => {
            if (item.classList.contains("stagger-item")) {
              setTimeout(() => {
                item.classList.add("animated")
              }, index * 100)
            }
          })
          observer.unobserve(entry.target)
        }
      }
    })
  },
  { threshold: 0.1 },
)

staggerItems.forEach((item) => {
  staggerObserver.observe(item)
})

// Mobile Menu Toggle
function toggleMenu() {
  const navLinks = document.getElementById("navLinks")
  navLinks.classList.toggle("active")
}

// Modal Logic
const modal = document.getElementById("contactModal")

function openModal() {
  modal.style.display = "block"
}

function closeModal() {
  modal.style.display = "none"
}

// Close the modal if user clicks outside of it
window.onclick = (event) => {
  if (event.target == modal) {
    closeModal()
  }
}

function scrollToContact() {
  const contactSection = document.getElementById("contact")
  contactSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

// Form Submission Handler
function submitForm(event) {
  event.preventDefault()

  const formData = {
    name: document.querySelector('input[name="name"]').value,
    email: document.querySelector('input[name="email"]').value,
    phone: document.querySelector('input[name="phone"]').value,
    media: document.querySelector('input[name="media"]').value,
    projectType: document.querySelector('select[name="projectType"]').value,
    budget: document.querySelector('select[name="budget"]').value,
    message: document.querySelector('textarea[name="message"]').value,
  }

  fetch(
    "https://script.google.com/macros/s/AKfycbzU14TB3bW0IJZvWt-lu0-KtAB5Tey2JbawXs2lDX5uaItKMpV6ic3kNLdTPhwzWh3y/exec",
    {
      method: "POST",
      body: JSON.stringify(formData),
    },
  )
    .then((res) => res.text())
    .then((data) => {
      const notification = document.getElementById("notification")
      notification.classList.add("show")

      setTimeout(() => {
        notification.classList.remove("show")
      }, 3000)

      document.getElementById("contactForm").reset()
      closeModal()
    })
    .catch((err) => {
      alert("❌ حصل خطأ: " + err)
    })
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      document.getElementById("navLinks").classList.remove("active")
    }
  })
})

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav")
  if (window.scrollY > 50) {
    nav.style.background = "rgba(0, 0, 0, 0.95)"
  } else {
    nav.style.background = "rgba(0, 0, 0, 0.9)"
  }
})
