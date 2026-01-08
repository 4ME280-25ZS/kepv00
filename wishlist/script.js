// Supabase-backed wishlist logic.
// Replaces previous localStorage approach with Supabase table `gifts`.
// The app expects `window.supabaseClient` to be available (see `supabase-config.js`).


let gifts = [];

// Use the db helper defined in db.js (window.db)
async function loadGifts() {
  try {
    gifts = await window.db.fetchGifts();
    if (!gifts || gifts.length === 0) {
      const list = document.getElementById('gifts');
      list.innerHTML = '<li class="gift">No gifts found. Ensure the Supabase table "gifts" has rows and the anon key has read permission.</li>';
      return;
    }
    renderGifts();
  } catch (err) {
    const list = document.getElementById('gifts');
    list.innerHTML = '<li class="gift">Error loading gifts. Check Supabase and config.</li>';
  }
}

function renderGifts() {
  const list = document.getElementById('gifts');
  list.innerHTML = '';
  gifts.forEach((g) => {
    const li = document.createElement('li');
    li.className = 'gift';

    const title = document.createElement('h3');
    title.textContent = g.title || g.name || 'Unnamed gift';
    li.appendChild(title);

    if (g.description) {
      const desc = document.createElement('p');
      desc.textContent = g.description;
      li.appendChild(desc);
    }

    if (g.reserved_by) {
      const container = document.createElement('div');
      container.style.display = 'inline-flex';
      container.style.alignItems = 'center';
      container.style.gap = '0.4rem';

      const nameSpan = document.createElement('span');
      nameSpan.className = 'reserved';
      nameSpan.textContent = 'It is reserved by: ' + g.reserved_by;
      container.appendChild(nameSpan);

      const clearBtn = document.createElement('button');
      clearBtn.textContent = '×';
      clearBtn.setAttribute('aria-label', 'Clear reservation');
      clearBtn.style.margin = '0';
      clearBtn.style.padding = '0 .35rem';
      clearBtn.style.fontWeight = '700';
      clearBtn.style.fontSize = '1rem';
      clearBtn.style.color = '#b00';
      clearBtn.style.background = 'transparent';
      clearBtn.style.border = '1px solid #e6e6e6';
      clearBtn.style.borderRadius = '4px';
      clearBtn.style.cursor = 'pointer';
      clearBtn.addEventListener('click', async () => {
        await window.db.unreserveGift(g.id);
        await loadGifts();
      });
      container.appendChild(clearBtn);

      li.appendChild(container);
    } else {
      const btn = document.createElement('button');
      btn.textContent = 'Reserve';
      btn.addEventListener('click', async () => {
        const name = prompt('Your name to reserve "' + (g.title || g.name) + '"?');
        if (!name) return;
        const trimmed = name.trim();
        if (!trimmed) return;
        await window.db.reserveGift(g.id, trimmed);
        await loadGifts();
      });
      li.appendChild(btn);
    }

    list.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
    if (!window.supabaseClient) {
    const list = document.getElementById('gifts');
    list.innerHTML = '<li class="gift">Supabase client not available. Check `supabase-config.js`.</li>';
    return;
  }
  if (!window.db) {
    const list = document.getElementById('gifts');
    list.innerHTML = '<li class="gift">DB helper not available. Check `db.js`.</li>';
    return;
  }
  loadGifts();
});
