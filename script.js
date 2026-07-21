const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const revealItems = document.querySelectorAll('.reveal');
const filters = document.querySelectorAll('.filter');
const productCards = document.querySelectorAll('.product-card');
const toast = document.getElementById('toast');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => observer.observe(item));

filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const selected = button.dataset.filter;
    productCards.forEach(card => {
      const show = selected === 'all' || card.dataset.category === selected;
      card.classList.toggle('hidden', !show);
    });
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
}

document.querySelectorAll('.add-btn').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.dataset.product;
    showToast('Opening WhatsApp…');
    const text = encodeURIComponent(`Hi Shobhit Gift & Stationary, is "${product}" available?`);
    setTimeout(() => {
      window.open(`https://wa.me/918882808088?text=${text}`, '_blank');
    }, 400);
  });
});

document.getElementById('enquiryForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const item = document.getElementById('item').value.trim();
  const message = document.getElementById('message').value.trim();

  const text = encodeURIComponent(
    `Hi Shobhit Gift & Stationary,\n\nName: ${name}\nProduct/Service: ${item}\nDetails: ${message || 'No extra details'}`
  );

  showToast('Opening WhatsApp…');
  setTimeout(() => {
    window.open(`https://wa.me/918882808088?text=${text}`, '_blank');
  }, 400);
});

document.getElementById('year').textContent = new Date().getFullYear();

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});
