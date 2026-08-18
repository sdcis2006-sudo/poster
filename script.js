/* ==========================================================================
   AMAZON-STYLE MOBILE POSTER MARKETPLACE - JAVASCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // 1. POSTER DATABASE (Referencing images in posters/ folder)
  // ========================================================================
  const postersData = [
    {
      id: 'p_onam1',
      title: 'ONAM FESTIVAL CELEBRATION - College Event Cultural Poster Art',
      category: 'Art',
      price: 21.99,
      originalPrice: 29.99,
      discount: '-27%',
      badge: 'New Arrival',
      rating: 4.9,
      reviews: 450,
      image: 'posters/ONAM POSTER   _ COLLEGE EVENT POSTER.jpg',
      featured: true,
      description: 'Vibrant Kerala Onam grand festival event poster featuring traditional Kathakali, floral pookkalam motifs, and festive cultural aesthetics.'
    },
    {
      id: 'p_onam2',
      title: 'ONAM 2025 SPECIAL EDITION - Traditional Kerala Festival Art Print',
      category: 'Art',
      price: 24.99,
      originalPrice: 32.99,
      discount: '-24%',
      badge: 'Best Seller',
      rating: 5.0,
      reviews: 820,
      image: 'posters/ONAM POSTER 2025.jpg',
      featured: true,
      description: 'Special 2025 edition Onam festival poster print with rich golden typography, royal elephant procession, and traditional celebration design.'
    },
    {
      id: 'p_onam3',
      title: 'ONAM CULTURAL HERITAGE - Expressive Indian Festival Wall Decor',
      category: 'Art',
      price: 19.99,
      originalPrice: 26.99,
      discount: '-25%',
      badge: 'Overall Pick',
      rating: 4.8,
      reviews: 630,
      image: 'posters/Onam poster.jpg',
      featured: true,
      description: 'Expressive Indian Onam festival wall poster capturing traditional boat race vibes, Mahabali legend, and rich cultural colors.'
    },
    {
      id: 'p_onam4',
      title: 'KERALA ONAM MAHOTSAV - Vibrant Golden Floral Celebration Print',
      category: 'Art',
      price: 22.99,
      originalPrice: 28.99,
      discount: '-20%',
      badge: 'Amazon Choice',
      rating: 4.9,
      reviews: 910,
      image: 'posters/onam.jpg',
      featured: false,
      description: 'Vibrant golden Kerala Mahotsav event poster print. Perfect cultural statement artwork for festive home decor and art collections.'
    },
    {
      id: 'p_prometheus',
      title: 'PROMETHEUS MYTHOLOGY - Dark Cinematic Legend Archival Art Print',
      category: 'Movies',
      price: 26.99,
      originalPrice: 34.99,
      discount: '-23%',
      badge: 'Collector Choice',
      rating: 4.9,
      reviews: 1120,
      image: 'posters/Se usarem, de os créditos! Meu perfil no Facebook_ Prometheus.jpg',
      featured: true,
      description: 'Dramatic Prometheus mythic cinematic poster print. High-resolution archival giclée print on premium matte stock paper.'
    },
    {
      id: 'p1',
      title: 'BATTLE STATION - Cyberpunk 2099 Neon Gaming Poster Art Print',
      category: 'Gaming',
      price: 24.99,
      originalPrice: 34.99,
      discount: '-28%',
      badge: 'Best Seller',
      rating: 4.9,
      reviews: 1420,
      image: 'posters/poster1.jpg',
      featured: true,
      description: 'Immerse yourself in the high-tech, low-life universe with this ultra-detailed Cyberpunk Battle Station artwork. High-resolution giclée print on premium satin-finish paper stock.'
    },
    {
      id: 'p2',
      title: 'NEON VALKYRIE - Horizon Futuristic Anime Wall Art Decor',
      category: 'Anime',
      price: 19.99,
      originalPrice: 26.99,
      discount: '-25%',
      badge: 'Overall Pick',
      rating: 4.8,
      reviews: 980,
      image: 'posters/poster2.jpg',
      featured: true,
      description: 'Vibrant anime illustration featuring glowing neon aesthetics and futuristic warrior dynamics. Perfect focal accent piece for gaming setups and anime collection rooms.'
    },
    {
      id: 'p3',
      title: 'DARK CINEMA - Legacy Edition Archival Cinema Movie Poster',
      category: 'Movies',
      price: 22.99,
      originalPrice: 29.99,
      discount: '-23%',
      badge: 'Amazon Choice',
      rating: 4.9,
      reviews: 2100,
      image: 'posters/poster3.jpg',
      featured: true,
      description: 'Iconic cinematic poster capturing dramatic contrast and mood. Printed on archival 250gsm museum-grade heavyweight poster paper.'
    },
    {
      id: 'p4',
      title: 'MATCHDAY LEGEND - Golden Edition Sports Stadium Art Print',
      category: 'Football',
      price: 18.99,
      originalPrice: 24.99,
      discount: '-24%',
      badge: '#1 Trending',
      rating: 4.7,
      reviews: 760,
      image: 'posters/poster4.jpg',
      featured: false,
      description: 'Celebrate football passion and glory with this dynamic sports art poster. Features energetic stadium lighting and bold painterly brushwork.'
    },
    {
      id: 'p5',
      title: 'FRESHERS FESTIVAL - Underground Sound Concert Event Poster',
      category: 'Music',
      price: 21.99,
      originalPrice: 28.99,
      discount: '-24%',
      badge: 'Popular Pick',
      rating: 4.8,
      reviews: 840,
      image: 'posters/poster5.jpg',
      featured: false,
      description: 'Electric concert event poster featuring expressive typographical artwork and vibrant color contrasts. A stylish statement piece for music lovers.'
    },
    {
      id: 'p6',
      title: 'ETHEREAL ABSTRACT - Studio Edition Fine Art Wall Decor',
      category: 'Art',
      price: 26.99,
      originalPrice: 35.99,
      discount: '-25%',
      badge: 'Top Rated',
      rating: 4.9,
      reviews: 1150,
      image: 'posters/poster6.jpg',
      featured: false,
      description: 'Contemporary abstract canvas composition with rich textures and modern neutral tones. Adds sophisticated artistic flair to modern living spaces.'
    },
    {
      id: 'p8',
      title: 'UNIVERSE: SCI-FI CELESTIAL ARTWORK (Limited Collector Edition)',
      category: 'Sci-Fi',
      price: 34.99,
      originalPrice: 45.00,
      discount: '-22%',
      badge: 'Collector Choice',
      rating: 5.0,
      reviews: 3200,
      image: 'posters/poster8.jpg',
      featured: true,
      description: '✨ SPECIAL LIMITED COLLECTOR EDITION ✨ Breathtaking cosmic artwork depicting deep space nebulae, celestial magic, and sci-fi grandeur. Printed with metallic sheen foil accents.'
    },
    {
      id: 'p9',
      title: 'SPIDER-MAN MULTIVERSE - Comic Book Vintage Wall Art Print',
      category: 'Movies',
      price: 23.99,
      originalPrice: 31.99,
      discount: '-25%',
      badge: 'Popular Pick',
      rating: 4.9,
      reviews: 1850,
      image: 'posters/poster3.jpg',
      featured: true,
      description: 'Dynamic superhero comic art print capturing high action Spider-Man multiverse aesthetic. Vibrant colors on heavyweight archival poster paper.'
    },
    {
      id: 'p10',
      title: 'DOWNTOWN Y2K GRUNGE - Aesthetic Music Theme Wall Decor',
      category: 'Music',
      price: 19.99,
      originalPrice: 25.99,
      discount: '-23%',
      badge: 'Trending Pick',
      rating: 4.8,
      reviews: 940,
      image: 'posters/poster5.jpg',
      featured: false,
      description: 'Nostalgic Y2K grunge aesthetic collage poster print. Perfect wall art decor for bedrooms, college dorms, and music studios.'
    },
    {
      id: 'p11',
      title: 'CYBER CITY NIGHTS - Neon Tokyo Skyline Architecture Art Print',
      category: 'Gaming',
      price: 27.99,
      originalPrice: 36.99,
      discount: '-24%',
      badge: 'Amazon Choice',
      rating: 4.9,
      reviews: 1520,
      image: 'posters/poster1.jpg',
      featured: false,
      description: 'Hyper-detailed futuristic Tokyo streetscape illuminated with holographic neon signs and atmospheric night reflections.'
    },
    {
      id: 'p7',
      title: '🔒 MYSTERY POSTER - Limited Secret Edition Artwork',
      category: 'Anime',
      price: 149.99,
      originalPrice: 249.99,
      discount: '-40%',
      badge: '🔒 Mystery Choice',
      rating: 5.0,
      reviews: 3800,
      image: 'posters/poster7.jpg',
      featured: true,
      description: '✨ SPECIAL SECRET MYSTERY POSTER ✨ Limited Collector Edition Artwork. Tap card to unlock and reveal full artwork.'
    },
    {
      id: 'p12',
      title: 'CELESTIAL COSMOS - Limited Gold Foil Astronomical Chart Print',
      category: 'Sci-Fi',
      price: 31.99,
      originalPrice: 42.99,
      discount: '-26%',
      badge: 'Collector Choice',
      rating: 5.0,
      reviews: 2400,
      image: 'posters/poster8.jpg',
      featured: false,
      description: 'Exquisite deep space star map and celestial chart print featuring gold foil accents on dark midnight blue paper stock.'
    }
  ];

  // Initialize with all posters revealed except the penultimate (last-but-one) mystery poster (poster7)
  const revealedPostersSet = new Set(
    postersData
      .filter((_, index) => index !== postersData.length - 2)
      .map(p => p.id)
  );

  // ========================================================================
  // 2. STATE MANAGEMENT & LOCAL STORAGE
  // ========================================================================
  let activeCategory = 'All';
  let searchQuery = '';
  let activeDetailPoster = null;
  let detailQuantity = 1;
  let activeCheckoutItems = [];

  let cart = JSON.parse(localStorage.getItem('poster_cart_data')) || [];
  let orderHistory = JSON.parse(localStorage.getItem('poster_order_history')) || [];

  function saveCart() {
    localStorage.setItem('poster_cart_data', JSON.stringify(cart));
    updateCartBadges();
  }

  function saveOrderHistory() {
    localStorage.setItem('poster_order_history', JSON.stringify(orderHistory));
  }

  function getStarString(rating) {
    const fullStars = Math.floor(rating);
    let stars = '★'.repeat(fullStars);
    if (rating % 1 !== 0) stars += '★';
    return stars;
  }

  // ========================================================================
  // 3. UI RENDERING ENGINES
  // ========================================================================

  // Render Featured Carousel
  const featuredCarousel = document.getElementById('featured-carousel');
  function renderFeaturedPosters() {
    if (!featuredCarousel) return;
    const featuredItems = postersData.filter(p => p.featured);
    featuredCarousel.innerHTML = featuredItems.map(poster => {
      const isRevealed = revealedPostersSet.has(poster.id);
      return `
        <div class="featured-card" data-id="${poster.id}">
          <img src="${poster.image}" alt="${poster.title}" class="featured-img ${isRevealed ? '' : 'card-blurred'}" loading="lazy">
          <span class="amazon-choice-badge">${poster.badge}</span>
          ${!isRevealed ? `
            <div class="card-blur-overlay">
              <div class="card-lock-badge">🔒</div>
              <span class="card-blur-text">Tap to Reveal</span>
            </div>
          ` : ''}
          <div class="featured-overlay">
            <h3 class="featured-card-title">${poster.title}</h3>
            <div class="featured-meta">
              <span class="featured-price">$${poster.price.toFixed(2)}</span>
              <span class="rating-val" style="color:var(--amazon-orange); font-size:0.75rem;">★ ${poster.rating}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    featuredCarousel.querySelectorAll('.featured-card').forEach(card => {
      card.addEventListener('click', () => {
        handlePosterTap(card.dataset.id);
      });
    });
  }

  // Render Main Poster Grid (Scrollable 3-Column Grid on Desktop, 1-Column on Mobile)
  const posterGrid = document.getElementById('poster-grid');
  const resultsCount = document.getElementById('results-count');
  const emptyState = document.getElementById('empty-state');
  const paginationContainer = document.getElementById('pagination-container');

  function renderPosterGrid() {
    if (!posterGrid) return;

    if (paginationContainer) {
      paginationContainer.style.display = 'none';
    }

    const filtered = postersData.filter(poster => {
      const matchesCategory = (activeCategory === 'All' || 
                               (activeCategory === 'Best Sellers' && (poster.badge === 'Best Seller' || poster.badge === 'Overall Pick' || poster.badge === 'Collector Choice')) ||
                               poster.category.toLowerCase() === activeCategory.toLowerCase());
      const matchesSearch = poster.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            poster.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (resultsCount) {
      resultsCount.textContent = `${filtered.length} Poster${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      posterGrid.style.display = 'none';
      emptyState.classList.remove('hidden');
    } else {
      posterGrid.style.display = 'grid';
      emptyState.classList.add('hidden');

      posterGrid.innerHTML = filtered.map(poster => {
        const isRevealed = revealedPostersSet.has(poster.id);
        const boughtCount = Math.floor(100 + (poster.reviews * 0.4)) + '+ bought in past month';

        return `
          <div class="poster-card" data-id="${poster.id}">
            ${poster.badge ? `<div class="amazon-choice-badge-card">${poster.badge}</div>` : ''}

            <div class="poster-thumb-container">
              <img src="${poster.image}" alt="${poster.title}" class="poster-thumb ${isRevealed ? '' : 'card-blurred'}" loading="lazy">
              ${!isRevealed ? `
                <div class="card-blur-overlay">
                  <div class="card-lock-badge">🔒</div>
                  <span class="card-blur-text">Tap to Reveal</span>
                </div>
              ` : ''}
            </div>

            <div class="poster-details">
              <h3 class="poster-title">${poster.title}</h3>

              <div class="bought-count-tag">${boughtCount}</div>

              <div class="rating-row">
                <span class="rating-val">${poster.rating}</span>
                <span class="stars">${getStarString(poster.rating)}</span>
                <span class="review-count">(${poster.reviews > 1000 ? (poster.reviews / 1000).toFixed(1) + 'k' : poster.reviews})</span>
              </div>

              <div class="price-block">
                <div class="price-row">
                  <span class="current-price-symbol">$</span><span class="current-price-val">${poster.price.toFixed(2)}</span>
                  <span class="list-price-text">M.R.P.: <span class="old-price">$${poster.originalPrice.toFixed(2)}</span></span>
                  <span class="discount-badge-text">(${poster.discount || '-25%'} off)</span>
                </div>
                <div class="cashback-offer-text">Get 3% back with Poster Pay</div>
              </div>

              <div class="bazaar-deal-pill">bazaar <span>Crazy Prices</span></div>

              <div class="prime-delivery-text">✓ <b>FREE delivery</b> Tomorrow</div>

              <button class="btn-amazon-yellow add-to-cart-quick-btn" data-id="${poster.id}">
                <span>Add to cart</span>
              </button>
            </div>
          </div>
        `;
      }).join('');

      posterGrid.querySelectorAll('.poster-card').forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.closest('.add-to-cart-quick-btn')) return;
          handlePosterTap(card.dataset.id);
        });
      });

      posterGrid.querySelectorAll('.add-to-cart-quick-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const posterId = btn.dataset.id;
          const isMystery = posterId === 'p7' || posterId === 'p_mystery';
          if (!isMystery) {
            revealedPostersSet.add(posterId);
          }
          renderPosterGrid();
          renderFeaturedPosters();
          addToCart(posterId, 1);
        });
      });
    }
  }

  function handlePosterTap(posterId) {
    const isMystery = posterId === 'p7' || posterId === 'p_mystery';
    const isAlreadyRevealed = revealedPostersSet.has(posterId);

    if (isMystery && !isAlreadyRevealed) {
      // Mystery Poster stays locked/blurred on tap until order confirmation!
      openPosterDetails(posterId);
    } else if (!isAlreadyRevealed) {
      revealedPostersSet.add(posterId);
      renderPosterGrid();
      renderFeaturedPosters();
      showToast('✨ Poster Artwork Unlocked!');
    } else {
      openPosterDetails(posterId);
    }
  }

  // ========================================================================
  // 4. SEARCH & CATEGORY LISTENERS
  // ========================================================================

  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const resetSearchBtn = document.getElementById('reset-search-btn');

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
  // 5. POSTER DETAILS MODAL
  // ========================================================================

  const detailBackdrop = document.getElementById('detail-backdrop');
  const closeDetailBtn = document.getElementById('close-detail-btn');
  const detailImg = document.getElementById('detail-img');
  const detailTitle = document.getElementById('detail-title');
  const detailCategory = document.getElementById('detail-category');
  const detailStars = document.getElementById('detail-stars');
  const detailRatingVal = document.getElementById('detail-rating-val');
  const detailReviews = document.getElementById('detail-reviews');
  const detailDealBadge = document.getElementById('detail-deal-badge');
  const detailPrice = document.getElementById('detail-price');
  const detailOldPrice = document.getElementById('detail-old-price');
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

    const isRevealed = revealedPostersSet.has(posterId);
    const detailBlurOverlay = document.getElementById('detail-blur-overlay');

    detailImg.src = poster.image;
    if (!isRevealed) {
      detailImg.classList.add('card-blurred');
      if (detailBlurOverlay) detailBlurOverlay.classList.remove('hidden-overlay');
    } else {
      detailImg.classList.remove('card-blurred');
      if (detailBlurOverlay) detailBlurOverlay.classList.add('hidden-overlay');
    }
    detailTitle.textContent = poster.title;
    detailCategory.textContent = poster.category;
    detailStars.textContent = getStarString(poster.rating);
    detailRatingVal.textContent = poster.rating;
    detailReviews.textContent = `(${poster.reviews} ratings)`;
    detailDealBadge.textContent = poster.discount || '-25%';
    detailOldPrice.textContent = `$${(poster.originalPrice || poster.price * 1.3).toFixed(2)}`;
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
  // 6. CART ENGINE
  // ========================================================================

  function addToCart(posterId, qty = 1) {
    const poster = postersData.find(p => p.id === posterId);
    if (!poster) return;

    revealedPostersSet.add(posterId);

    const existingIndex = cart.findIndex(item => item.id === posterId);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({ id: poster.id, quantity: qty });
    }

    saveCart();
    showToast(`Added ${qty}x "${poster.title.slice(0, 18)}..." to Cart 🛒`);
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
    showToast('Item removed from Amazon Cart');
  }

  function updateCartBadges() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadge = document.getElementById('cart-badge');
    const navCartBadge = document.getElementById('nav-cart-badge');
    const desktopCartBadge = document.getElementById('desktop-cart-badge');

    if (cartBadge) {
      cartBadge.textContent = totalCount;
      cartBadge.style.transform = 'scale(1.3)';
      setTimeout(() => cartBadge.style.transform = 'scale(1)', 200);
    }
    if (navCartBadge) navCartBadge.textContent = totalCount;
    if (desktopCartBadge) desktopCartBadge.textContent = totalCount;
  }

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
      startCheckout(checkoutList, true);
    });
  }

  // ========================================================================
  // 7. BUY FLOW & ORDER CONFIRMATION WITH BIG POSTER DISPLAY
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

  const confirmedOrderId = document.getElementById('confirmed-order-id');
  const confirmedPosterName = document.getElementById('confirmed-poster-name');
  const confirmedTotal = document.getElementById('confirmed-total');
  const confirmedDelivery = document.getElementById('confirmed-delivery');
  const confirmedLargeImg = document.getElementById('confirmed-large-img');

  let isCartCheckoutSource = false;

  function startCheckout(itemsArray, fromCart = false) {
    activeCheckoutItems = itemsArray;
    isCartCheckoutSource = fromCart;

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
      const randomID = '#PST-' + Math.floor(100000 + Math.random() * 900000);
      const totalAmount = activeCheckoutItems.reduce((sum, i) => sum + (i.poster.price * i.quantity), 0);

      confirmedOrderId.textContent = randomID;
      confirmedPosterName.textContent = activeCheckoutItems.length === 1 ? 
        activeCheckoutItems[0].poster.title : 
        `${activeCheckoutItems[0].poster.title} + ${activeCheckoutItems.length - 1} more`;
      confirmedTotal.textContent = `$${totalAmount.toFixed(2)}`;
      if (confirmedDelivery) confirmedDelivery.textContent = 'Tomorrow by 8:00 PM';

      // Automatically UNLOCK and REVEAL all purchased posters (especially Mystery Posters)
      let revealedMystery = false;
      activeCheckoutItems.forEach(item => {
        if (!revealedPostersSet.has(item.poster.id)) {
          revealedPostersSet.add(item.poster.id);
          if (item.poster.id === 'p7' || item.poster.id === 'p_mystery') {
            revealedMystery = true;
          }
        }
      });

      if (activeCheckoutItems.length > 0 && confirmedLargeImg) {
        confirmedLargeImg.src = activeCheckoutItems[0].poster.image;
        confirmedLargeImg.classList.remove('card-blurred');
      }

      renderPosterGrid();
      renderFeaturedPosters();

      if (revealedMystery) {
        showToast('🎉 Mystery Poster Purchased & Unlocked!');
      }

      orderHistory.unshift({
        id: randomID,
        itemTitle: confirmedPosterName.textContent,
        total: `$${totalAmount.toFixed(2)}`,
        date: new Date().toLocaleDateString()
      });
      saveOrderHistory();

      if (isCartCheckoutSource) {
        cart = [];
        saveCart();
      }

      checkoutStageSummary.classList.add('hidden');
      checkoutStageConfirmed.classList.remove('hidden');
    });
  }

  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', closeCheckout);
  }

  // ========================================================================
  // 8. PROFILE & ORDER HISTORY MODAL
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
      orderHistoryList.innerHTML = `<p style="font-size:0.75rem; color:var(--text-dim); text-align:center; padding:10px;">No recent Amazon orders.</p>`;
    } else {
      orderHistoryList.innerHTML = orderHistory.map(order => `
        <div class="history-card">
          <div>
            <span class="history-id">${order.id}</span>
            <div style="font-size:0.72rem; font-weight:600; color:#fff; margin-top:2px;">${order.itemTitle}</div>
          </div>
          <span style="font-weight:800; color:var(--amazon-orange);">${order.total}</span>
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
  // 9. BOTTOM NAVIGATION ENGINE
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

  const logoBtn = document.getElementById('logo-btn');
  if (logoBtn) {
    logoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      appContent.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========================================================================
  // 10. TOAST NOTIFICATION UTILITY
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

  // Window resize handler for smooth desktop/mobile layout transition
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      renderPosterGrid();
    }, 150);
  });

  // Initialization
  renderFeaturedPosters();
  renderPosterGrid();
  updateCartBadges();

});
