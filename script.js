'use strict';
const yearEl = document.querySelector('#copyright-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
// When publishing the site, use its public URL for both the NFC label and QR code.
