/* --- Sidebar & Navigation --- */
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const content = document.getElementById('content');
const pageTitle = document.getElementById('pageTitle');

const navLinks = document.querySelectorAll('.nav-link');

function closeSidebarOnMobile() {
  if (window.innerWidth <= 900) {
    sidebar.classList.remove('open');
    sidebar.setAttribute('aria-hidden', 'true');
  }
}

menuToggle.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('open');
  sidebar.setAttribute('aria-hidden', !isOpen);
});

/* Add click listeners to all nav links */
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    // active class
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    // load page based on id
    const id = link.id;
    if (id === 'homeLink') loadHome();
    if (id === 'aboutLink') loadAbout();
    if (id === 'teamLink') loadTeam();
    if (id === 'bookingLink') loadBooking();
    if (id === 'contactLink') loadContact();

    closeSidebarOnMobile();
  });
});

/* Close sidebar if window resizes to desktop */
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    sidebar.classList.remove('open');
    sidebar.setAttribute('aria-hidden', 'false');
  } else {
    sidebar.setAttribute('aria-hidden', 'true');
  }
});

/* --- Initial load --- */
loadHome();

/* --- Page loaders --- */
function loadHome() {
  pageTitle.textContent = 'Home';
  content.innerHTML = `
    <section>
      <h2>Welcome to Tikit Master</h2>
      <p>Book tickets for concerts, movies and sports quickly and securely.</p>
      <div class="hero-image" role="img" aria-label="Concert"></div>

      <div class="steps" style="margin-top:16px;">
        <div class="card"><h4>🎟️ Choose</h4><p>Select your event.</p></div>
        <div class="card"><h4>💳 Pay</h4><p>Easy and secure checkout.</p></div>
        <div class="card"><h4>🎉 Enjoy</h4><p>Show your e-ticket and enjoy!</p></div>
      </div>

      <div style="margin-top:18px;">
        <button id="ctaBookNow" style="padding:10px 14px;border-radius:8px;border:none;background:#ff9800;color:#fff;cursor:pointer;">
          Book Now
        </button>
      </div>
    </section>
  `;

  const cta = document.getElementById('ctaBookNow');
  cta.addEventListener('click', () => {
    document.getElementById('bookingLink').click();
  });
}

function loadAbout() {
  pageTitle.textContent = 'About';
  content.innerHTML = `
    <section>
      <h2>About Tikit Master</h2>
      <p>Tikit Master is a demo ticket booking application built for learning and portfolio use.</p>
      <div class="card" style="margin-top:12px;">
        <h3>Why choose us?</h3>
        <ul>
          <li>Fast booking</li>
          <li>Secure demo payments</li>
          <li>Responsive UI</li>
        </ul>
      </div>
    </section>
  `;
}

function loadTeam() {
  pageTitle.textContent = 'Team';
  content.innerHTML = `
    <section>
      <h2>Our Team</h2>
      <div class="team" style="margin-top:12px;">
        <div class="team-member card">
          <h3>Vaishnavi Mokashe</h3>
          <p>Founder & Frontend Developer</p>
        </div>
        <div class="team-member card">
          <h3>Tanu</h3>
          <p>Backend Developer</p>
        </div>
      </div>
    </section>
  `;
}

function loadContact() {
  pageTitle.textContent = 'Contact';
  content.innerHTML = `
    <section>
      <h2>Contact Us</h2>
      <p>Email: mokashevaishnavi119@gmail.com</p>
      <p>Phone: 9356594420</p>
    </section>
  `;
}

/* Booking page with demo payment flow */
function loadBooking() {
  pageTitle.textContent = 'Booking';
  content.innerHTML = `
    <section>
      <h2>Book Your Tickets</h2>

      <form class="booking-form" id="bookingForm">
        <input type="text" id="fullName" placeholder="Full name" required />
        <input type="email" id="email" placeholder="Email" required />
        <select id="eventSelect" required>
          <option value="">Select event</option>
          <option value="Concert">Concert</option>
          <option value="Movie">Movie</option>
          <option value="Sports">Sports</option>
        </select>
        <input type="number" id="ticketCount" placeholder="No. of tickets" min="1" max="10" required />
        <button type="submit">Submit</button>
      </form>

      <div id="paymentSection" style="display:none; margin-top:12px;">
        <h3>Payment</h3>
        <form class="booking-form" id="paymentForm">
          <input type="text" id="cardName" placeholder="Cardholder name" required />
          <input type="text" id="cardNumber" placeholder="Card number (16 digits)" maxlength="16" required />
          <input type="text" id="cardExpiry" placeholder="MM/YY" maxlength="5" required />
          <input type="text" id="cardCvv" placeholder="CVV" maxlength="3" required />
          <button type="submit">Pay Now (Demo)</button>
        </form>
      </div>

      <div id="ticketsContainer"></div>
    </section>
  `;

  const bookingForm = document.getElementById('bookingForm');
  const paymentSection = document.getElementById('paymentSection');
  const paymentForm = document.getElementById('paymentForm');
  const ticketsContainer = document.getElementById('ticketsContainer');

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Basic validation
    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const event = document.getElementById('eventSelect').value;
    const count = parseInt(document.getElementById('ticketCount').value, 10);

    if (!name || !email || !event || !count) {
      showAlert('Please fill booking details.');
      return;
    }

    // Show payment section
    bookingForm.style.display = 'none';
    paymentSection.style.display = 'block';
  });

  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Minimal card validation
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const cardName = document.getElementById('cardName').value.trim();
    const expiry = document.getElementById('cardExpiry').value.trim();
    const cvv = document.getElementById('cardCvv').value.trim();

    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber) ||
        cvv.length < 3 || !/^\d+$/.test(cvv) ||
        !expiry || !cardName) {
      showAlert('Please enter valid card details (demo).');
      return;
    }

    // Create a ticket card
    const name = document.getElementById('fullName').value.trim();
    const event = document.getElementById('eventSelect').value;
    const count = document.getElementById('ticketCount').value;

    const ticket = document.createElement('div');
    ticket.className = 'ticket-card';
    ticket.innerHTML = `
      <strong>${name}</strong> • ${event} (${count} ticket${count > 1 ? 's' : ''})<br/>
      <small>Payment: DEMO (no real charge)</small>
      <div style="margin-top:8px;"><button class="cancelBtn">Cancel</button></div>
    `;
    ticketsContainer.appendChild(ticket);

    // Cancel button
    ticket.querySelector('.cancelBtn').addEventListener('click', () => ticket.remove());

    // Reset forms & show success
    paymentForm.reset();
    document.getElementById('bookingForm').reset();
    document.getElementById('bookingForm').style.display = 'block';
    paymentSection.style.display = 'none';
    showAlert('✅ Payment successful (demo). Ticket confirmed!');
  });
}

/* Simple alert (non-blocking) */
function showAlert(msg, timeout = 2200) {
  const ex = document.createElement('div');
  ex.className = 'alert';
  ex.textContent = msg;
  document.body.appendChild(ex);
  setTimeout(() => ex.remove(), timeout);
}
