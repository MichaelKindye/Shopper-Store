// PROJECT: Frontend only e-commerce site built with Vite, React, TypeScript, Tailwind CSS, React Router, and Framer Motion. This is a production minded, component driven, accessible, mobile first storefront that includes all typical business features for an online shop. Use functional components, React hooks, and TypeScript types for every component prop and data object. Keep code modular, well commented, and easy to hand off to a backend engineer later.

// GENERAL REQUIREMENTS
// - Tech: React with TypeScript, Vite, Tailwind CSS, Framer Motion, React Router v6, React Query or SWR for data fetching mocks, and Jest with React Testing Library for unit tests.
// - Styling: Tailwind utility classes with a simple design token file mapping colors, spacing, radii, and typography. Two themes: dark and light. Use CSS variables for theme tokens.
// - Mock API: Use a local mock folder that exports async functions simulating fetch delays. Include basic caching in the mock layer. Provide a seed file to populate localStorage for cart, wishlist, and orders.
// - Accessibility: semantic HTML, proper aria attributes, keyboard focus states, skip to content link, form labels, aria-live for toasts.
// - Performance: code split routes, lazy load images and product detail heavy assets, use low quality image placeholders and srcset, use IntersectionObserver to lazy load offscreen images.
// - Testing: include at least three tests that validate critical flows: rendering product card, add to cart flow, checkout validation.
// - Analytics: console log events for product view, add to cart, apply coupon, checkout complete. Ready to be replaced by real analytics calls.

// SIX PAGES TO BUILD
// 1. Home
// 2. Category Listing
// 3. Product Detail
// 4. Cart
// 5. Checkout
// 6. Account Orders and Profile

// ROUTES
// - / home
// - /category/:slug category listing
// - /product/:slug product detail
// - /cart cart
// - /checkout checkout
// - /account account dashboard

// DATA SHAPES
// - Product
//   {
//     id: "p_sku_001",
//     slug: "organic-coffee-beans",
//     title: "Organic Single Origin Coffee Beans",
//     shortDescription: "Medium roast from Ethiopia",
//     description: "<p>Long HTML description with headings and lists</p>",
//     price: 24.99,
//     compareAtPrice: 36.99 or null,
//     currency: "USD",
//     rating: 4.7,
//     reviewsCount: 128,
//     images: [
//       { src: "/images/p1-1.jpg", alt: "bag front", width: 1600, height: 1200 },
//       ...
//     ],
//     variants: [
//       { id: "v_250g", title: "250 g", price: 24.99, sku: "p1-250" },
//       { id: "v_1kg", title: "1 kg", price: 79.99, sku: "p1-1kg" }
//     ],
//     inventory: { total: 120, perVariant: { v_250g: 60, v_1kg: 60 } },
//     tags: ["coffee", "organic"],
//     categories: ["beverages", "coffee"],
//     shippingWeightKg: 0.5,
//     dimensionsCm: { w: 12, h: 22, d: 8 },
//     relatedProductIds: ["p_sku_002", "p_sku_005"],
//     createdAt: "2025-09-05"
//   }

// - CartItem
//   { productId, variantId, quantity, unitPrice, metadata: {giftWrap: boolean} }

// - Order
//   {
//     id: "ord_0001",
//     createdAt: "2025-10-12T10:00:00Z",
//     items: [CartItem],
//     subtotal: 120,
//     shipping: 10,
//     taxes: 9.6,
//     discount: 15,
//     total: 124.6,
//     status: "processing",
//     shippingAddress: {...},
//     billingAddress: {...},
//     paymentMethod: { type: "card", last4: "4242" }
//   }

// COMPONENT LIST and RESPONSIBILITIES
// - src/components/
//   - Header.tsx sticky header with logo, search input, nav links, cart icon with badge, account menu. Desktop layout shows full search; mobile shows icon that opens full screen search modal.
//   - Footer.tsx links, contact, social icons, newsletter subscribe form.
//   - ProductCard.tsx used in grid and recommendations. Thumbnail with hover zoom, quick add to cart small button, rating stars, price and sale badge.
//   - ProductGrid.tsx responsive masonry or grid layout with load more and skeletons.
//   - FiltersPanel.tsx collapsible on mobile, sticky on desktop. Includes category, tag chips, price range slider, rating filter, availability toggle, sort select.
//   - ProductGallery.tsx main image viewer with thumbnail strip, zoom modal, keyboard nav, and responsive srcset.
//   - VariantSelector.tsx choose variant, updates price and inventory messages.
//   - QuantitySelector.tsx accessible stepper with plus and minus buttons and manual input.
//   - CartDrawer.tsx slide over from right, shows line items, coupon input, checkout CTA, mini totals, persists cart to localStorage.
//   - CartPage.tsx full page with editable quantities, remove item, save for later button, continue shopping link.
//   - CheckoutForm.tsx split into steps: shipping info, shipping method, payment method, review order. Use client side validation and show inline errors.
//   - PaymentCardForm.tsx mock Stripe style UI but do not integrate with real payments in the mock. Provide a placeholder function to simulate tokenization and a failure case probability for testing.
//   - AddressForm.tsx reusable form used in checkout and account.
//   - OrderSummary.tsx shows line by line price breakdown, discounts, and shipping estimate calculator.
//   - Toast.tsx global success and error toasts using aria-live.
//   - Pagination.tsx and InfiniteScroller.tsx.
//   - Skeletons: ProductCardSkeleton, GallerySkeleton, CartSkeleton.

// PAGES DETAILED LAYOUT and UX

// 1. Home
// - Top hero with marketing image or carousel, headline, short value proposition, and primary CTA View Collections linking to /category/all.
// - Below hero a curated featured products carousel showing 6 best sellers with auto play pause on hover and manual arrows.
// - Category quicklinks row with icons, link each to /category/:slug.
// - Trending Now section using horizontal scroll snap. Each product opens product detail.
// - Footer and newsletter subscribe.

// 2. Category Listing
// - Layout: two column on desktop, left filters panel, right product grid.
// - Top sticky breadcrumb and title with result count and sort select.
// - Each product card includes quick add to cart button visible on hover.
// - Pagination at bottom and load more button for infinite loading.
// - Filter interactions update URL query params for deep linking and browser back behavior.
// - Product quick view modal available on click of quick view button, modal links to product detail.

// 3. Product Detail
// - Hero area: product gallery left, product meta right in a sticky card containing title, price, rating, variant selector, quantity selector, Add to cart and Buy now buttons, social share icons, trust badges, shipping estimator input using postal code.
// - Tabs: Details, Reviews, Shipping and returns, Q and A. Clicking reviews scrolls to review list anchored and updates URL fragment.
// - Sticky add to cart microbar on mobile when scrolled past hero that shows selected variant, price, Add to cart CTA, and Go to cart quick link.
// - Related products and recommended bundle at bottom. Bundle displays small discount when adding both items.
// - Interactions: Add to cart triggers cart drawer and success toast, also logs analytics event. Buy now bypasses cart and goes directly to checkout with the single item prefilled.
// - Accessibility: product images have descriptive alt text, thumbnails are buttons, variant selector supports keyboard.

// 4. Cart Page
// - List of items with editable quantity, remove, save for later.
// - Coupon input with apply button and immediate validation. Show how coupon affects subtotal and grand total.
// - Delivery estimator: input postal code and shows shipping options and costs using a mock shipping rate algorithm based on weight and distance.
// - Continue shopping link goes to last visited category or home.
// - Checkout button navigates to /checkout.

// 5. Checkout
// - Stepper UI at top showing steps: Shipping, Shipping Method, Payment, Review.
// - Shipping step: Address form with address line, city, region state, postal code, phone optional.
// - Shipping method step: radio options with estimated arrival and cost. Cost calculation based on simple rules and mock carrier data.
// - Payment step: Card form mock and optional Pay Later option simulation. Include checkbox to save card to account if logged in.
// - Review step: full order summary with editable line items and terms and conditions checkbox required before submit.
// - Submit triggers mock payment processing with a simulated delay and possible failure. On success create mock order and redirect to /account with order id param or to a friendly order confirmation page at /account?order=ord_0001 with receipt content.

// 6. Account Orders and Profile
// - Orders list with status chips and quick view for each order.
// - Clicking an order ID opens order detail with items, shipping address, tracking placeholder if shipped, invoice download link that generates a simple PDF in memory or a printable invoice page.
// - Profile section for name, email, address book, saved payment methods (mock), wishlist, and notifications preferences.

// INTERACTIONS and NAVIGATION MAP
// - Header logo goes to home.
// - Primary nav: Home, Collections linking to /category/all, Deals linking to prebuilt filter, About linking to static info, Account opens /account.
// - ProductCard click goes to /product/:slug.
// - Quick add to cart button in product card opens CartDrawer.
// - View cart button on CartDrawer navigates to /cart.
// - Buy now button on product detail goes to /checkout with prefilled cart.
// - From checkout success, redirect to /account with order query param which opens order detail modal.
// - Wishlist heart toggles will update wishlist context and persist.

// PAYMENT, ORDERS and INVENTORY BEHAVIOR
// - Mock payment tokenization function to simulate Stripe behavior and return success or failure based on a seeded random with a small failure rate for testing.
// - Inventory checks: add to cart should validate inventory and show out of stock or limited quantity messages. During checkout recheck inventory and if insufficient show a friendly error and offer to remove item or reduce quantity.
// - Promo codes: implement a few mock codes in seed file with percentage and fixed amount types. Provide client side validation and expiration handling.
// - Taxes: simple tax rules by region using a small tax table in mock data. Shipping tax logic included.

// SEO and PWA considerations
// - Use semantic headings and meta tags generated per route for title and description. Provide server side meta defaults in a util file for manual setting.
// - Add a manifest.json and service worker stub for basic offline fallback of static pages and assets. Provide instructions to enable PWA features later.

// DEVELOPMENT and DEVOPS NOTES
// - Provide env sample file for keys with comments indicating where to plug in real API keys later.
// - Build scripts: provide npm scripts entries in package.json for dev, build, preview, test, lint, format. Keep commands conventional.
// - Deployment notes for static hosting: build output ready for Netlify, Vercel, or static S3 hosting. Note CORS considerations when integrating payments or APIs later.

// TESTING and ERROR HANDLING
// - Unit tests: ProductCard renders with title price and add to cart; Cart adding reduces inventory; Checkout form validation rejects empty required fields.
// - Error states: mock API error scenarios and show user friendly UI with retry button and preserved form input.
// - Edge cases: no inventory scenarios, invalid coupon, failed payment, partial shipping availability, and guest checkout flow.

// DELIVERABLES and FILES YOU MUST HAVE
// - src/pages for each page
// - src/components as listed above
// - src/context for CartContext, AuthContext, WishlistContext
// - src/mock with products.ts, coupons.ts, shipping.ts, orders.ts, and seed.ts
// - src/utils for currency formatting, tax calc, shipping algorithm, storage helpers
// - README detailing local setup, how to seed mock data, how to run tests, and where to plug real services
// - A minimal design tokens file with CSS variable mapping and Tailwind config extensions
// - At least three unit tests and a test script
// - README contains API contract notes for backend handoff

// UI and DESIGN DECISIONS
// - Visual hierarchy: big hero then categories then product grids. Use generous spacing and rounded cards for a premium feel.
// - Color palette: choose one brand color and use different tints for accents and states. High contrast for CTAs and disabled states that are visually obvious.
// - Buttons: primary rounded full width on mobile, inline pill buttons on desktop. Primary uses brand accent, secondary uses neutral.
// - Micro interactions: quick scale and shadow on hover, consistent 150ms transition durations, micro animations on cart add with a flying thumbnail effect from product card to cart icon for delight.
// - Mobile UX: header uses compact icons, cart drawer replaces full cart page until user taps view cart, checkout form breaks into single column and uses large touch targets.
// - Copy: short clear CTAs: Add to cart, Buy now, Continue to checkout, Apply coupon, Save for later.

// ANALYTICS and OBSERVABILITY
// - Fire console events for product_view, add_to_cart, start_checkout, apply_coupon, payment_success, payment_failed, view_order.
// - Expose a small debug panel route at /debug that lists localStorage content for cart, orders, and mocks to help manual QA.

// FINAL NOTES for Copilot
// - Create complete TypeScript interfaces for all data shapes.
// - For heavy UI parts like ProductGallery and CheckoutForm include inline code comments explaining each step and accessibility decisions.
// - Where Copilot hesitates, produce smaller components first and then compose them.
// - Prioritize correctness and clarity over cleverness. Make components obvious to read and extend.
// - End with a README section explaining how to replace mock APIs with real endpoints and how to wire a real payment provider in three steps.

// END