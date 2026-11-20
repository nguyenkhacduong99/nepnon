// Biểu tượng mạng xã hội vẽ tối giản (lucide v1 không còn icon thương hiệu).
type P = { className?: string };

export function ZaloIcon({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3.5c-5 0-9 3.4-9 7.6 0 2.4 1.3 4.5 3.3 5.9L5.6 20l3.6-1.8c.9.2 1.8.3 2.8.3 5 0 9-3.4 9-7.5S17 3.5 12 3.5Z" />
      <text x="12" y="13.6" textAnchor="middle" fontSize="6.2" fontWeight="700" fill="currentColor" stroke="none" fontFamily="Arial, sans-serif">
        Zalo
      </text>
    </svg>
  );
}

export function FacebookIcon({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21h3Z" />
    </svg>
  );
}

export function TikTokIcon({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M16.6 3c.3 2.1 1.6 3.6 3.6 3.8v2.8c-1.3 0-2.5-.4-3.6-1v6.1c0 3.3-2.4 5.6-5.5 5.6-3.1 0-5.4-2.3-5.4-5.3 0-3.3 2.8-5.6 6.1-5.1v2.9c-1.5-.4-3 .5-3 2.1 0 1.3 1 2.3 2.3 2.3 1.4 0 2.4-1 2.4-2.7V3h3.1Z" />
    </svg>
  );
}
