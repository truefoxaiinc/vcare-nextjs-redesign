'use client';

import { usePathname } from 'next/navigation';

const whatsappUrl =
  'https://wa.me/16473914283?text=' +
  encodeURIComponent('Hi Vcare, I would like to know more about your products.');

export function WhatsAppButton() {
  const pathname = usePathname();

  if (pathname === '/admin' || pathname.startsWith('/admin/')) return null;

  return (
    <a
      className="whatsapp-button"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Vcare on WhatsApp (opens in a new tab)"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="currentColor"
      >
        <path d="M16.01 3.2A12.7 12.7 0 0 0 5.08 22.37L3.3 28.8l6.58-1.73A12.7 12.7 0 1 0 16.01 3.2Zm0 23.05a10.3 10.3 0 0 1-5.25-1.44l-.38-.23-3.9 1.03 1.04-3.8-.25-.39a10.34 10.34 0 1 1 8.74 4.83Zm5.67-7.75c-.31-.16-1.83-.9-2.12-1-.28-.1-.49-.16-.69.16-.21.31-.8 1-.98 1.2-.18.21-.36.23-.67.08-.31-.16-1.31-.48-2.5-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.2.05-.39-.03-.54-.08-.16-.69-1.67-.95-2.29-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.54.08-.82.39-.28.31-1.08 1.06-1.08 2.58s1.11 2.99 1.27 3.2c.15.2 2.18 3.33 5.28 4.66.74.32 1.31.51 1.76.65.74.23 1.41.2 1.94.12.59-.09 1.83-.75 2.09-1.47.25-.72.25-1.34.18-1.47-.08-.13-.28-.2-.59-.36Z" />
      </svg>
    </a>
  );
}
