// ---------- DATA ----------
const EVENTS_KEY = 'wvEvents';
const BOOKINGS_KEY = 'wvBookings';

const vendors = [
  { id: 1, name: 'Royal Photography Studio', category: 'Photographer', location: 'Agra', price: 20000, rating: 5.0 },
  { id: 2, name: 'Elegant Events Catering', category: 'Caterer', location: 'Agra', price: 40000, rating: 4.5 },
  { id: 3, name: 'Dream Decor & Florals', category: 'Decorator', location: 'Mathura', price: 30000, rating: 4.8 },
  { id: 4, name: 'Grand Palace Banquet', category: 'Venue', location: 'Agra', price: 200000, rating: 4.6 }
];

function load(key, fallback) {
  const saved = localStorage.getItem(key);
  return saved === null ? fallback : JSON.parse(saved);
}

let events = load(EVENTS_KEY, [
  { id: 1, type: 'Wedding', date: '2026-12-04', location: 'Agra', budget: 300000, guests: 200 }
]);
let bookings = load(BOOKINGS_KEY, []);

function save() {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

// ---------- HELPERS ----------
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(isoDate) {
  const parts = isoDate.split('-');
  return parts[2] + '/' + parts[1] + '/' + parts[0];
}

function formatMoney(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

// ---------- ELEMENTS ----------
const eventForm = document.getElementById('eventForm');
const formError = document.getElementById('formError');
const eventList = document.getElementById('eventList');
const bookingList = document.getElementById('bookingList');
const vendorList = document.getElementById('vendorList');
const filterType = document.getElementById('filterType');
const searchLocation = document.getElementById('searchLocation');

// ---------- RENDER ----------
function renderSummary() {
  const totalBudget = events.reduce((sum, e) => sum + e.budget, 0);
  const booked = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.amount, 0);

  document.getElementById('sumEvents').textContent = events.length;
  document.getElementById('sumBudget').textContent = formatMoney(totalBudget);
  document.getElementById('sumBooked').textContent = formatMoney(booked);
  document.getElementById('sumRemaining').textContent = formatMoney(totalBudget - booked);
}

function renderEvents() {
  const type = filterType.value;
  const search = searchLocation.value.trim().toLowerCase();

  const filtered = events.filter((e) => {
    const typeMatch = type === 'All' || e.type === type;
    const locationMatch = e.location.toLowerCase().includes(search);
    return typeMatch && locationMatch;
  });

  if (filtered.length === 0) {
    eventList.innerHTML = '<p class="empty">No events found.</p>';
    return;
  }

  eventList.innerHTML = filtered.map((e) => `
    <div class="panel-card">
      <strong>${escapeHtml(e.type)}</strong>
      <p class="muted">${formatDate(e.date)} · ${escapeHtml(e.location)}</p>
      <p>Budget: ${formatMoney(e.budget)}</p>
      <p class="muted">Guests: ${e.guests || '-'}</p>
      <button class="btn-small" data-delete="${e.id}">Delete</button>
    </div>
  `).join('');
}

function renderBookings() {
  if (bookings.length === 0) {
    bookingList.innerHTML = '<p class="empty">No bookings yet. Book a vendor below.</p>';
    return;
  }

  bookingList.innerHTML = bookings.map((b) => `
    <div class="panel-card">
      <strong>${escapeHtml(b.vendorName)}</strong>
      <p class="muted">${escapeHtml(b.category)}</p>
      <span class="badge badge-${b.status}">${b.status}</span>
      <p>${formatMoney(b.amount)}</p>
      ${b.status !== 'cancelled'
        ? `<button class="btn-small" data-cancel="${b.id}">Cancel booking</button>`
        : ''}
    </div>
  `).join('');
}

function renderVendors() {
  vendorList.innerHTML = vendors.map((v) => `
    <div class="vendor-card">
      <h4>${escapeHtml(v.name)}</h4>
      <p class="muted">${v.category} · ${v.location}</p>
      <p>${v.rating} ★ · from ${formatMoney(v.price)}</p>
      <button class="btn-maroon" data-book="${v.id}">Book now</button>
    </div>
  `).join('');
}

function renderAll() {
  renderSummary();
  renderEvents();
  renderBookings();
  renderVendors();
}

// ---------- ADD EVENT ----------
eventForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const type = document.getElementById('eventType').value;
  const date = document.getElementById('eventDate').value;
  const location = document.getElementById('eventLocation').value.trim();
  const budget = Number(document.getElementById('eventBudget').value);
  const guests = Number(document.getElementById('eventGuests').value);

  if (!date) { formError.textContent = 'Please choose an event date.'; return; }
  if (location === '') { formError.textContent = 'Please enter a location.'; return; }
  if (!budget || budget <= 0) { formError.textContent = 'Budget must be greater than 0.'; return; }

  formError.textContent = '';
  events.push({ id: Date.now(), type, date, location, budget, guests });
  save();
  eventForm.reset();
  renderAll();
});

// ---------- FILTERS ----------
filterType.addEventListener('change', renderEvents);
searchLocation.addEventListener('input', renderEvents);

// ---------- DELETE EVENT ----------
eventList.addEventListener('click', function (e) {
  const id = e.target.getAttribute('data-delete');
  if (id === null) return;
  events = events.filter((ev) => ev.id !== Number(id));
  save();
  renderAll();
});

// ---------- BOOK VENDOR ----------
vendorList.addEventListener('click', function (e) {
  const id = e.target.getAttribute('data-book');
  if (id === null) return;

  if (events.length === 0) {
    alert('Please create an event first, then book vendors.');
    return;
  }

  const vendor = vendors.find((v) => v.id === Number(id));
  bookings.push({
    id: Date.now(),
    vendorName: vendor.name,
    category: vendor.category,
    amount: vendor.price,
    status: 'pending'
  });
  save();
  renderAll();
});

// ---------- CANCEL BOOKING ----------
bookingList.addEventListener('click', function (e) {
  const id = e.target.getAttribute('data-cancel');
  if (id === null) return;

  const booking = bookings.find((b) => b.id === Number(id));
  booking.status = 'cancelled';
  save();
  renderAll();
});

// ---------- START ----------
renderAll();