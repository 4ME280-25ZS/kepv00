// ============================================================
// Wishlist App Logic
// ============================================================

// DOM elements
const giftsList = document.getElementById('gifts-list');
const loadingState = document.getElementById('loading');
const errorState = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
const emptyState = document.getElementById('empty-state');
const yearEl = document.getElementById('year');

// Reserve modal
const reserveModal = document.getElementById('reserve-modal');
const reserveForm = document.getElementById('reserve-form');
const reserverNameInput = document.getElementById('reserver-name');
const modalClose = document.getElementById('modal-close');
const modalCancel = document.getElementById('modal-cancel');
const modalOverlay = document.getElementById('modal-overlay');
const modalGiftName = document.getElementById('modal-gift-name');

// Cancel modal
const cancelModal = document.getElementById('cancel-modal');
const cancelForm = document.getElementById('cancel-form');
const cancelReserverNameInput = document.getElementById('cancel-reserver-name');
const cancelModalClose = document.getElementById('cancel-modal-close');
const cancelModalCancel = document.getElementById('cancel-modal-cancel');
const cancelModalOverlay = document.getElementById('cancel-modal-overlay');
const cancelModalGiftName = document.getElementById('cancel-modal-gift-name');

// State
let currentGiftId = null;

// ============================================================
// Initialize App
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  setCurrentYear();
  loadGifts();
  setupModalListeners();
});

function setCurrentYear() {
  const year = new Date().getFullYear();
  yearEl.textContent = year;
}

// ============================================================
// Load gifts from Firestore
// ============================================================
function loadGifts() {
  showLoading();
  
  db.collection('gifts')
    .orderBy('title')
    .onSnapshot(
      (snapshot) => {
        giftsList.innerHTML = '';
        
        if (snapshot.empty) {
          showEmptyState();
          return;
        }
        
        const gifts = [];
        snapshot.forEach((doc) => {
          gifts.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        
        renderGifts(gifts);
        hideLoading();
      },
      (error) => {
        console.error('Error loading gifts:', error);
        showError(`Failed to load wishlist: ${error.message}`);
      }
    );
}

// ============================================================
// Render gifts
// ============================================================
function renderGifts(gifts) {
  giftsList.innerHTML = '';
  
  gifts.forEach((gift) => {
    const li = document.createElement('li');
    li.className = 'gift-card';
    
    const isReserved = gift.reservedBy ? true : false;
    
    // Title
    const title = document.createElement('h3');
    title.className = 'gift-card-title';
    title.textContent = gift.title;
    li.appendChild(title);
    
    // Description
    if (gift.description) {
      const desc = document.createElement('p');
      desc.className = 'gift-card-description';
      desc.textContent = gift.description;
      li.appendChild(desc);
    }
    
    // Meta (price, link)
    const meta = document.createElement('div');
    meta.className = 'gift-card-meta';
    
    if (gift.price) {
      const price = document.createElement('span');
      price.className = 'gift-card-price';
      price.textContent = `Price: ${gift.price}`;
      meta.appendChild(price);
    }
    
    if (gift.url) {
      const link = document.createElement('a');
      link.href = gift.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'View online';
      meta.appendChild(link);
    }
    
    if (meta.children.length > 0) {
      li.appendChild(meta);
    }
    
    // Status
    const status = document.createElement('div');
    status.className = `gift-card-status ${isReserved ? 'reserved' : 'available'}`;
    
    if (isReserved) {
      status.textContent = `Reserved by: ${gift.reservedBy}`;
    } else {
      status.textContent = 'Available';
    }
    li.appendChild(status);
    
    // Actions
    const actions = document.createElement('div');
    actions.className = 'gift-card-actions';
    
    if (isReserved) {
      const cancelBtn = document.createElement('button');
      cancelBtn.className = 'btn btn-secondary';
      cancelBtn.textContent = 'Cancel reservation';
      cancelBtn.addEventListener('click', () => openCancelModal(gift.id, gift.title, gift.reservedBy));
      actions.appendChild(cancelBtn);
    } else {
      const reserveBtn = document.createElement('button');
      reserveBtn.className = 'btn btn-primary';
      reserveBtn.textContent = 'Reserve';
      reserveBtn.addEventListener('click', () => openReserveModal(gift.id, gift.title));
      actions.appendChild(reserveBtn);
    }
    
    li.appendChild(actions);
    giftsList.appendChild(li);
  });
  
  hideLoading();
}

// ============================================================
// Modal: Reserve
// ============================================================
function openReserveModal(giftId, giftTitle) {
  currentGiftId = giftId;
  modalGiftName.textContent = `Reserve: "${giftTitle}"`;
  reserverNameInput.value = '';
  reserverNameInput.focus();
  reserveModal.setAttribute('aria-hidden', 'false');
}

function closeReserveModal() {
  reserveModal.setAttribute('aria-hidden', 'true');
  currentGiftId = null;
}

reserveForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = reserverNameInput.value.trim();
  
  if (!name) {
    alert('Please enter your name.');
    return;
  }
  
  if (!currentGiftId) return;
  
  try {
    await db.collection('gifts').doc(currentGiftId).update({
      reservedBy: name,
      reservedAt: new Date(),
    });
    
    closeReserveModal();
  } catch (error) {
    console.error('Error reserving gift:', error);
    alert(`Failed to reserve gift: ${error.message}`);
  }
});

// ============================================================
// Modal: Cancel reservation
// ============================================================
function openCancelModal(giftId, giftTitle, reservedBy) {
  currentGiftId = giftId;
  cancelModalGiftName.textContent = `Cancel reservation for: "${giftTitle}"`;
  cancelReserverNameInput.value = '';
  cancelReserverNameInput.focus();
  cancelModal.setAttribute('aria-hidden', 'false');
}

function closeCancelModal() {
  cancelModal.setAttribute('aria-hidden', 'true');
  currentGiftId = null;
}

cancelForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = cancelReserverNameInput.value.trim();
  
  if (!name) {
    alert('Please enter your name.');
    return;
  }
  
  if (!currentGiftId) return;
  
  try {
    // Verify the name matches the reservation
    const docSnap = await db.collection('gifts').doc(currentGiftId).get();
    const giftData = docSnap.data();
    
    if (giftData.reservedBy !== name) {
      alert('The name does not match the reservation. Please try again.');
      return;
    }
    
    // Clear the reservation
    await db.collection('gifts').doc(currentGiftId).update({
      reservedBy: null,
      reservedAt: null,
    });
    
    closeCancelModal();
  } catch (error) {
    console.error('Error canceling reservation:', error);
    alert(`Failed to cancel reservation: ${error.message}`);
  }
});

// ============================================================
// Modal listeners
// ============================================================
function setupModalListeners() {
  // Reserve modal
  modalClose.addEventListener('click', closeReserveModal);
  modalCancel.addEventListener('click', closeReserveModal);
  modalOverlay.addEventListener('click', closeReserveModal);
  
  // Cancel modal
  cancelModalClose.addEventListener('click', closeCancelModal);
  cancelModalCancel.addEventListener('click', closeCancelModal);
  cancelModalOverlay.addEventListener('click', closeCancelModal);
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeReserveModal();
      closeCancelModal();
    }
  });
}

// ============================================================
// UI state helpers
// ============================================================
function showLoading() {
  loadingState.style.display = 'block';
  errorState.style.display = 'none';
  emptyState.style.display = 'none';
  giftsList.style.display = 'none';
}

function hideLoading() {
  loadingState.style.display = 'none';
}

function showError(message) {
  errorMessage.textContent = message;
  errorState.style.display = 'block';
  loadingState.style.display = 'none';
  emptyState.style.display = 'none';
  giftsList.style.display = 'none';
}

function showEmptyState() {
  emptyState.style.display = 'block';
  loadingState.style.display = 'none';
  errorState.style.display = 'none';
  giftsList.style.display = 'none';
}
