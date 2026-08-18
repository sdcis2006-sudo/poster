/* ==========================================================================
   POSTER MARKETPLACE - VANILLA JAVASCRIPT APP ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // 1. POSTER DATABASE (Referencing images in posters/ folder)
  // ========================================================================
  const postersData = [
    {
      id: 'p1',
      title: 'BATTLE STATION - Cyberpunk 2099',
      category: 'Gaming',
      price: 24.99,
      rating: 4.9,
      reviews: 142,
      image: 'posters/poster1.jpg',
      featured: true,
      description: 'Immerse yourself in the high-tech, low-life universe with this ultra-detailed Cyberpunk Battle Station artwork. High-resolution giclée print on premium satin-finish paper stock.'
    },
    {
      id: 'p2',
      title: 'NEON VALKYRIE - Horizon',
      category: 'Anime',
      price: 19.99,
      rating: 4.8,
      reviews: 98,
      image: 'posters/poster2.jpg',
      featured: true,
      description: 'Vibrant anime illustration featuring glowing neon aesthetics and futuristic warrior dynamics. Perfect focal accent piece for gaming setups and anime collection rooms.'
    },
    {
      id: 'p3',
      title: 'DARK CINEMA - Legacy Edition',
      category: 'Movies',
      price: 22.99,
      rating: 4.9,
      reviews: 210,
      image: 'posters/poster3.jpg',
      featured: true,
      description: 'Iconic cinematic poster capturing dramatic contrast and mood. Printed on archival 250gsm museum-grade heavyweight poster paper.'
    },
    {
      id: 'p4',
      title: 'MATCHDAY LEGEND - Golden Edition',
      category: 'Football',
      price: 18.99,
      rating: 4.7,
      reviews: 76,
      image: 'posters/poster4.jpg',
      featured: false,
      description: 'Celebrate football passion and glory with this dynamic sports art poster. Features energetic stadium lighting and bold painterly brushwork.'
    },
    {
      id: 'p5',
      title: 'FRESHERS FESTIVAL - Underground Sound',
      category: 'Music',
      price: 21.99,
      rating: 4.8,
      reviews: 84,
      image: 'posters/poster5.jpg',
      featured: false,
      description: 'Electric concert event poster featuring expressive typographical artwork and vibrant color contrasts. A stylish statement piece for music lovers.'
    },
    {
      id: 'p6',
      title: 'ETHEREAL ABSTRACT - Studio Edition',
      category: 'Art',
      price: 26.99,
      rating: 4.9,
      reviews: 115,
      image: 'posters/poster6.jpg',
      featured: false,
      description: 'Contemporary abstract canvas composition with rich textures and modern neutral tones. Adds sophisticated artistic flair to modern living spaces.'
    },
    {
      id: 'p7',
      title: 'RETRO WAVE - Sunset Boulevard',
      category: 'Anime',
      price: 20.99,
      rating: 4.8,
      reviews: 130,
      image: 'posters/poster7.jpg',
      featured: false,
      description: 'Nostalgic 80s synthwave anime aesthetic poster. Features glowing digital grids, palm silhouettes, and iconic retro neon color gradients.'
    },
    {
      id: 'p8',
      title: 'UNIVERSE: SCI-FI CELESTIAL ARTWORK',
      category: 'Sci-Fi',
      price: 34.99,
      rating: 5.0,
      reviews: 320,
      image: 'posters/poster8.jpg',
      isSpecial: true,
      description: '✨ SPECIAL LIMITED COLLECTOR EDITION ✨ Breathtaking cosmic artwork depicting deep space nebulae, celestial magic, and sci-fi grandeur. Printed with metallic sheen foil accents.'
    }
  ];

  // ========================================================================
  // 2. STATE MANAGEMENT & LOCAL STORAGE
  // ========================================================================
  let activeCategory = 'All';
  let searchQuery = '';
  let activeDetailPoster = null;
  let detailQuantity = 1;
  let isSpecialRevealed = false;
  let activeCheckoutItems = [];

  // Load Cart from localStorage
  let cart = JSON.parse(localStorage.getItem('poster_cart_data')) || [];
  // Load Order History from localStorage
  let orderHistory = JSON.parse(localStorage.getItem('poster_order_history')) || [];

  function saveCart() {
    localStorage.setItem('poster_cart_data', JSON.stringify(cart));
    updateCartBadges();
  }

  function saveOrderHistory() {
    localStorage.setItem('poster_order_history', JSON.stringify(orderHistory));
  }

  // ========================================================================
  // 3. UI RENDERING ENGINES
  // ========================================================================

  // Render Featured Carousel
  const featuredCarousel = document.getElementById('featured-carousel');
  function renderFeaturedPosters() {
    if (!featuredCarousel) return;
    const featuredItems = postersData.filter(p => p.featured);
    featuredCarousel.innerHTML = featuredItems.map(poster => `
      <div class="featured-card" data-id="${poster.id}">
        <img src="${poster.image}" alt="${poster.title}" class="featured-img" loading="lazy">
        <span class="featured-pill">${poster.category}</span>
        <div class="featured-overlay">
          <h3 class="featured-card-title">${poster.title}</h3>
          <div class="featured-meta">
            <span class="featured-price">$${poster.price.toFixed(2)}</span>
            <span class="featured-rating">★ ${poster.rating}</span>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click listeners
    featuredCarousel.querySelectorAll('.featured-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        openPosterDetails(id);
      });
    });
  }

  // Render Main Poster Grid
  const posterGrid = document.getElementById('poster-grid');
  const resultsCount = document.getElementById('results-count');
  const emptyState = document.getElementById('empty-state');

  function renderPosterGrid() {
    if (!posterGrid) return;

    // Filter normal posters (excluding special poster from standard grid to keep special section exclusive)
    const filtered = postersData.filter(poster => {
      if (poster.isSpecial) return false;
      const matchesCategory = (activeCategory === 'All' || poster.category.toLowerCase() === activeCategory.toLowerCase());
      const matchesSearch = poster.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            poster.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    resultsCount.textContent = `${filtered.length} Poster${filtered.length === 1 ? '' : 's'}`;

    if (filtered.length === 0) {
      posterGrid.style.display = 'none';
      emptyState.classList.remove('hidden');
    } else {
      posterGrid.style.display = 'grid';
      emptyState.classList.add('hidden');

      posterGrid.innerHTML = filtered.map(poster => `
        <div class="poster-card" data-id="${poster.id}">
          <div class="poster-thumb-container">
            <img src="${poster.image}" alt="${poster.title}" class="poster-thumb" loading="lazy">
            <span class="poster-badge">${poster.category}</span>
            <button class="quick-add-btn" data-id="${poster.id}" title="Add to Cart" aria-label="Add to cart">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          </div>
          <div class="poster-details">
            <h3 class="poster-title">${poster.title}</h3>
            <div class="poster-meta-row">
              <span class="poster-price">$${poster.price.toFixed(2)}</span>
              <span class="poster-rating">★ ${poster.rating}</span>
            </div>
          </div>
        </div>
      `).join('');

      // Card click handlers
      posterGrid.querySelectorAll('.poster-card').forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.closest('.quick-add-btn')) return; // Quick add button handled separately
          const id = card.dataset.id;
          openPosterDetails(id);
        });
      });

      // Quick add handlers
      posterGrid.querySelectorAll('.quick-add-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.dataset.id;
          addToCart(id, 1);
        });
      });
    }
  }

  // ========================================================================
  // 4. SPECIAL POSTER REVEAL CONTROLLER & ANIMATION
  // ========================================================================

  const specialRevealCard = document.getElementById('special-reveal-card');
  const specialPosterImg = document.getElementById('special-poster-img');
  const specialOverlay = document.getElementById('special-overlay');
  const specialContent = document.getElementById('special-content');
  const buySpecialBtn = document.getElementById('buy-special-btn');
  const revealCanvas = document.getElementById('reveal-canvas');

  function initSpecialReveal() {
    if (!specialOverlay) return;

    specialOverlay.addEventListener('click', triggerPosterReveal);
    specialPosterImg.addEventListener('click', triggerPosterReveal);

    if (buySpecialBtn) {
      buySpecialBtn.addEventListener('click', () => {
        const specialPoster = postersData.find(p => p.isSpecial);
        if (specialPoster) {
          startCheckout([ { poster: specialPoster, quantity: 1 } ]);
        }
      });
    }
  }

  function triggerPosterReveal() {
    if (isSpecialRevealed) return;
    isSpecialRevealed = true;

    // 1. Blur smoothly disappears & poster zooms slightly
    specialPosterImg.classList.remove('blurred');

    // 2. Overlay fades away
    specialOverlay.classList.add('hidden-overlay');

    // 3. Play spark/confetti particle reveal animation
    playSparkleCanvasAnimation();

    // 4. Reveal content details & Buy Now button smoothly
    setTimeout(() => {
      specialContent.classList.remove('hidden');
      showToast('✨ Special Collector Poster Unlocked!');
    }, 400);
  }

  // Sparkle / Confetti Particle Reveal Animation on Canvas
  function playSparkleCanvasAnimation() {
    if (!revealCanvas) return;
    const ctx = revealCanvas.getContext('2d');
    const width = revealCanvas.width = specialRevealCard.clientWidth;
    const height = revealCanvas.height = specialRevealCard.clientHeight;

    const particles = [];
    const colors = ['#7928ca', '#ff0080', '#6366f1', '#f59e0b', '#ffffff', '#10b981'];

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: width / 2,
        y: height / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        size: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: Math.random() * 40 + 30
      });
    }

    let animationFrame;
    function animate() {
      ctx.clearRect(0, 0, width, height);
      let aliveCount = 0;

      particles.forEach(p => {
        if (p.alpha > 0) {
          aliveCount++;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.15; // Gravity effect
          p.alpha -= 1 / p.life;

          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      if (aliveCount > 0) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, width, height);
        cancelAnimationFrame(animationFrame);
      }
    }
    animate();
  }

  // ========================================================================
  // 5. SEARCH & CATEGORY LISTENERS
  // ========================================================================

  // Search Toggle Header Button
  const toggleSearchBtn = document.getElementById('toggle-search-btn');
  const searchBarWrapper = document.getElementById('search-bar-wrapper');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const resetSearchBtn = document.getElementById('reset-search-btn');

  if (toggleSearchBtn && searchBarWrapper) {
    toggleSearchBtn.addEventListener('click', () => {
      searchBarWrapper.classList.toggle('open');
      if (searchBarWrapper.classList.contains('open')) {
        searchInput.focus();
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      if (searchQuery.length > 0) {
        clearSearchBtn.classList.add('visible');
      } else {
        clearSearchBtn.classList.remove('visible');
      }
      renderPosterGrid();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.classList.remove('visible');
      renderPosterGrid();
      searchInput.focus();
    });
  }

  if (resetSearchBtn) {
    resetSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      activeCategory = 'All';
      updateActiveCategoryPill();
      clearSearchBtn.classList.remove('visible');
      renderPosterGrid();
    });
  }

  // Category Pills
  const categoryPills = document.querySelectorAll('.category-pill');
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      activeCategory = pill.dataset.category;
      updateActiveCategoryPill();
      renderPosterGrid();
    });
  });

  function updateActiveCategoryPill() {
    categoryPills.forEach(p => {
      if (p.dataset.category.toLowerCase() === activeCategory.toLowerCase()) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
  }

  // ========================================================================
  // 6. POSTER DETAILS BOTTOM-SHEET MODAL
  // ========================================================================

  const detailBackdrop = document.getElementById('detail-backdrop');
  const closeDetailBtn = document.getElementById('close-detail-btn');
  const detailImg = document.getElementById('detail-img');
  const detailTitle = document.getElementById('detail-title');
  const detailCategory = document.getElementById('detail-category');
  const detailRating = document.getElementById('detail-rating');
  const detailPrice = document.getElementById('detail-price');
  const detailDesc = document.getElementById('detail-desc');
  const qtyValue = document.getElementById('qty-value');
  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus = document.getElementById('qty-plus');
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  const buyNowBtn = document.getElementById('buy-now-btn');

  function openPosterDetails(posterId) {
    const poster = postersData.find(p => p.id === posterId);
    if (!poster) return;

    activeDetailPoster = poster;
    detailQuantity = 1;

    detailImg.src = poster.image;
    detailTitle.textContent = poster.title;
    detailCategory.textContent = poster.category;
    detailRating.textContent = `★ ${poster.rating} (${poster.reviews} reviews)`;
    detailDesc.textContent = poster.description;
    qtyValue.textContent = detailQuantity;
    updateDetailPrice();

    detailBackdrop.classList.remove('hidden');
  }

  function closePosterDetails() {
    detailBackdrop.classList.add('hidden');
    activeDetailPoster = null;
  }

  function updateDetailPrice() {
    if (activeDetailPoster) {
      const total = activeDetailPoster.price * detailQuantity;
      detailPrice.textContent = `$${total.toFixed(2)}`;
    }
  }

  if (closeDetailBtn) closeDetailBtn.addEventListener('click', closePosterDetails);
  if (detailBackdrop) {
    detailBackdrop.addEventListener('click', (e) => {
      if (e.target === detailBackdrop) closePosterDetails();
    });
  }

  if (qtyMinus) {
    qtyMinus.addEventListener('click', () => {
      if (detailQuantity > 1) {
        detailQuantity--;
        qtyValue.textContent = detailQuantity;
        updateDetailPrice();
      }
    });
  }

  if (qtyPlus) {
    qtyPlus.addEventListener('click', () => {
      detailQuantity++;
      qtyValue.textContent = detailQuantity;
      updateDetailPrice();
    });
  }

  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      if (activeDetailPoster) {
        addToCart(activeDetailPoster.id, detailQuantity);
        closePosterDetails();
      }
    });
  }

  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      if (activeDetailPoster) {
        const itemToBuy = { poster: activeDetailPoster, quantity: detailQuantity };
        closePosterDetails();
        startCheckout([itemToBuy]);
      }
    });
  }

  // ========================================================================
  // 7. CART ENGINE & STORAGE
  // ========================================================================

  function addToCart(posterId, qty = 1) {
    const poster = postersData.find(p => p.id === posterId);
    if (!poster) return;

    const existingIndex = cart.findIndex(item => item.id === posterId);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({
        id: poster.id,
        quantity: qty
      });
    }

    saveCart();
    showToast(`Added ${qty}x "${poster.title}" to cart! 🛒`);
  }

  function updateCartQuantity(posterId, delta) {
    const itemIndex = cart.findIndex(i => i.id === posterId);
    if (itemIndex > -1) {
      cart[itemIndex].quantity += delta;
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }
      saveCart();
      renderCartSheet();
    }
  }

  function removeCartItem(posterId) {
    cart = cart.filter(i => i.id !== posterId);
    saveCart();
    renderCartSheet();
    showToast('Item removed from cart');
  }

  function updateCartBadges() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadge = document.getElementById('cart-badge');
    const navCartBadge = document.getElementById('nav-cart-badge');

    if (cartBadge) {
      cartBadge.textContent = totalCount;
      cartBadge.style.transform = 'scale(1.3)';
      setTimeout(() => cartBadge.style.transform = 'scale(1)', 200);
    }
    if (navCartBadge) navCartBadge.textContent = totalCount;
  }

  // Cart Sheet Modal Controls
  const cartBackdrop = document.getElementById('cart-backdrop');
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartEmptyView = document.getElementById('cart-empty-view');
  const cartFooter = document.getElementById('cart-footer');
  const cartGrandTotal = document.getElementById('cart-grand-total');
  const cartSheetCount = document.getElementById('cart-sheet-count');
  const proceedCartCheckoutBtn = document.getElementById('proceed-cart-checkout-btn');

  function openCartSheet() {
    renderCartSheet();
    cartBackdrop.classList.remove('hidden');
  }

  function closeCartSheet() {
    cartBackdrop.classList.add('hidden');
  }

  function renderCartSheet() {
    if (!cartItemsList) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartSheetCount.textContent = `${totalItems} item${totalItems === 1 ? '' : 's'}`;

    if (cart.length === 0) {
      cartItemsList.innerHTML = '';
      cartEmptyView.classList.remove('hidden');
      cartFooter.classList.add('hidden');
    } else {
      cartEmptyView.classList.add('hidden');
      cartFooter.classList.remove('hidden');

      let grandTotal = 0;
      cartItemsList.innerHTML = cart.map(item => {
        const poster = postersData.find(p => p.id === item.id);
        if (!poster) return '';
        const itemTotal = poster.price * item.quantity;
        grandTotal += itemTotal;

        return `
          <div class="cart-item-row">
            <img src="${poster.image}" alt="${poster.title}" class="cart-item-img">
            <div class="cart-item-info">
              <h4 class="cart-item-title">${poster.title}</h4>
              <span class="cart-item-price">$${poster.price.toFixed(2)}</span>
            </div>
            <div class="cart-item-actions">
              <div class="qty-selector">
                <button class="qty-btn cart-qty-minus" data-id="${poster.id}">-</button>
                <span class="qty-val">${item.quantity}</span>
                <button class="qty-btn cart-qty-plus" data-id="${poster.id}">+</button>
              </div>
              <button class="remove-item-btn" data-id="${poster.id}" title="Remove item" aria-label="Remove item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>
        `;
      }).join('');

      cartGrandTotal.textContent = `$${grandTotal.toFixed(2)}`;

      // Attach item quantity & remove listeners
      cartItemsList.querySelectorAll('.cart-qty-minus').forEach(btn => {
        btn.addEventListener('click', () => updateCartQuantity(btn.dataset.id, -1));
      });
      cartItemsList.querySelectorAll('.cart-qty-plus').forEach(btn => {
        btn.addEventListener('click', () => updateCartQuantity(btn.dataset.id, 1));
      });
      cartItemsList.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', () => removeCartItem(btn.dataset.id));
      });
    }
  }

  if (openCartBtn) openCartBtn.addEventListener('click', openCartSheet);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartSheet);
  if (cartBackdrop) {
    cartBackdrop.addEventListener('click', (e) => {
      if (e.target === cartBackdrop) closeCartSheet();
    });
  }

  if (proceedCartCheckoutBtn) {
    proceedCartCheckoutBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      const checkoutList = cart.map(item => {
        const poster = postersData.find(p => p.id === item.id);
        return { poster, quantity: item.quantity };
      }).filter(i => i.poster);

      closeCartSheet();
      startCheckout(checkoutList, true); // true = from cart checkout
    });
  }

  // ========================================================================
  // 8. BUY FLOW & ORDER CONFIRMATION
  // ========================================================================

  const checkoutBackdrop = document.getElementById('checkout-backdrop');
  const closeCheckoutBtn = document.getElementById('close-checkout-btn');
  const checkoutStageSummary = document.getElementById('checkout-stage-summary');
  const checkoutStageConfirmed = document.getElementById('checkout-stage-confirmed');
  const checkoutItemsList = document.getElementById('checkout-items-list');
  const checkoutSubtotal = document.getElementById('checkout-subtotal');
  const checkoutTotal = document.getElementById('checkout-total');
  const confirmOrderBtn = document.getElementById('confirm-order-btn');
  const continueShoppingBtn = document.getElementById('continue-shopping-btn');

  // Order Confirmed fields
  const confirmedOrderId = document.getElementById('confirmed-order-id');
  const confirmedPosterName = document.getElementById('confirmed-poster-name');
  const confirmedTotal = document.getElementById('confirmed-total');
  const confirmedDelivery = document.getElementById('confirmed-delivery');

  let isCartCheckoutSource = false;

  function startCheckout(itemsArray, fromCart = false) {
    activeCheckoutItems = itemsArray;
    isCartCheckoutSource = fromCart;

    // Reset view to stage 1 summary
    checkoutStageSummary.classList.remove('hidden');
    checkoutStageConfirmed.classList.add('hidden');

    let totalAmount = 0;
    checkoutItemsList.innerHTML = activeCheckoutItems.map(item => {
      const itemPrice = item.poster.price * item.quantity;
      totalAmount += itemPrice;
      return `
        <div class="summary-item-card">
          <img src="${item.poster.image}" alt="${item.poster.title}" class="summary-thumb">
          <div class="summary-details">
            <h4 class="summary-item-title">${item.poster.title}</h4>
            <span class="summary-item-qty">Qty: ${item.quantity} × $${item.poster.price.toFixed(2)}</span>
          </div>
          <span class="summary-item-price">$${itemPrice.toFixed(2)}</span>
        </div>
      `;
    }).join('');

    checkoutSubtotal.textContent = `$${totalAmount.toFixed(2)}`;
    checkoutTotal.textContent = `$${totalAmount.toFixed(2)}`;

    checkoutBackdrop.classList.remove('hidden');
  }

  function closeCheckout() {
    checkoutBackdrop.classList.add('hidden');
  }

  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeCheckout);
  if (checkoutBackdrop) {
    checkoutBackdrop.addEventListener('click', (e) => {
      if (e.target === checkoutBackdrop) closeCheckout();
    });
  }

  if (confirmOrderBtn) {
    confirmOrderBtn.addEventListener('click', () => {
      // Generate random mock order ID
      const randomID = '#PST-' + Math.floor(100000 + Math.random() * 900000);
      const totalAmount = activeCheckoutItems.reduce((sum, i) => sum + (i.poster.price * i.quantity), 0);

      // Estimated delivery date (3-5 days from now)
      const now = new Date();
      const del1 = new Date(now.setDate(now.getDate() + 3));
      const del2 = new Date(now.setDate(now.getDate() + 2));
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const delStr = `${monthNames[del1.getMonth()]} ${del1.getDate()} - ${monthNames[del2.getMonth()]} ${del2.getDate()}`;

      // Populate stage 2 details
      confirmedOrderId.textContent = randomID;
      confirmedPosterName.textContent = activeCheckoutItems.length === 1 ? 
        activeCheckoutItems[0].poster.title : 
        `${activeCheckoutItems[0].poster.title} + ${activeCheckoutItems.length - 1} more`;
      confirmedTotal.textContent = `$${totalAmount.toFixed(2)}`;
      confirmedDelivery.textContent = delStr;

      // Save order to history
      orderHistory.unshift({
        id: randomID,
        itemTitle: confirmedPosterName.textContent,
        total: `$${totalAmount.toFixed(2)}`,
        date: new Date().toLocaleDateString()
      });
      saveOrderHistory();

      // If checkout came from cart, clear cart
      if (isCartCheckoutSource) {
        cart = [];
        saveCart();
      }

      // Switch stage
      checkoutStageSummary.classList.add('hidden');
      checkoutStageConfirmed.classList.remove('hidden');
    });
  }

  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', () => {
      closeCheckout();
    });
  }

  // ========================================================================
  // 9. PROFILE & ORDER HISTORY MODAL
  // ========================================================================

  const profileBackdrop = document.getElementById('profile-backdrop');
  const closeProfileBtn = document.getElementById('close-profile-btn');
  const statOrdersCount = document.getElementById('stat-orders-count');
  const orderHistoryList = document.getElementById('order-history-list');

  function openProfileSheet() {
    renderProfile();
    profileBackdrop.classList.remove('hidden');
  }

  function closeProfileSheet() {
    profileBackdrop.classList.add('hidden');
  }

  function renderProfile() {
    statOrdersCount.textContent = orderHistory.length;

    if (orderHistory.length === 0) {
      orderHistoryList.innerHTML = `<p style="font-size:0.75rem; color:var(--text-dim); text-align:center; padding:10px;">No previous order history yet.</p>`;
    } else {
      orderHistoryList.innerHTML = orderHistory.map(order => `
        <div class="history-card">
          <div>
            <span class="history-id">${order.id}</span>
            <div style="font-size:0.75rem; font-weight:600; color:var(--text-main); margin-top:2px;">${order.itemTitle}</div>
          </div>
          <span style="font-weight:700; color:#10b981;">${order.total}</span>
        </div>
      `).join('');
    }
  }

  if (closeProfileBtn) closeProfileBtn.addEventListener('click', closeProfileSheet);
  if (profileBackdrop) {
    profileBackdrop.addEventListener('click', (e) => {
      if (e.target === profileBackdrop) closeProfileSheet();
    });
  }

  // ========================================================================
  // 10. BOTTOM NAVIGATION ENGINE
  // ========================================================================

  const navItems = document.querySelectorAll('.nav-item');
  const appContent = document.getElementById('app-content');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetNav = item.dataset.nav;

      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      if (targetNav === 'home') {
        appContent.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (targetNav === 'search') {
        searchBarWrapper.classList.add('open');
        searchInput.focus();
        appContent.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (targetNav === 'posters') {
        activeCategory = 'All';
        updateActiveCategoryPill();
        renderPosterGrid();
        const gridElem = document.getElementById('grid-title');
        if (gridElem) gridElem.scrollIntoView({ behavior: 'smooth' });
      } else if (targetNav === 'cart') {
        openCartSheet();
      } else if (targetNav === 'profile') {
        openProfileSheet();
      }
    });
  });

  // Logo button scrolls to top
  const logoBtn = document.getElementById('logo-btn');
  if (logoBtn) {
    logoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      appContent.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========================================================================
  // 11. TOAST NOTIFICATION UTILITY
  // ========================================================================

  const toastContainer = document.getElementById('toast-container');

  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-fade');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // ========================================================================
  // INITIALIZATION
  // ========================================================================
  renderFeaturedPosters();
  renderPosterGrid();
  initSpecialReveal();
  updateCartBadges();

});
