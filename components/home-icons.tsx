type IconProps = {
  className?: string;
};

function BaseIcon({
  className = "h-5 w-5",
  children,
  filled = false,
}: IconProps & { children: React.ReactNode; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function ChatIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7A2.5 2.5 0 0 1 17.5 15H10l-4 4v-4H6.5A2.5 2.5 0 0 1 4 12.5v-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path
        d="M12 3 5 6v5c0 4.5 2.9 8.6 7 10 4.1-1.4 7-5.5 7-10V6l-7-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="m9.5 11.8 1.7 1.7 3.6-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </BaseIcon>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </BaseIcon>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className} filled>
      <path d="m12 3.8 2.53 5.12 5.65.82-4.09 3.98.97 5.62L12 16.66l-5.06 2.66.97-5.62L3.82 9.74l5.65-.82L12 3.8Z" />
    </BaseIcon>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </BaseIcon>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className} filled>
      <path d="M8 5v14l11-7Z" />
    </BaseIcon>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className} filled>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.09c-.24.68-1.4 1.3-1.94 1.38-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.15-.19-1.19-1.58-1.19-3.01s.75-2.14 1.02-2.43c.27-.29.58-.36.77-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2.01.89 2.16.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.3 2.35 1.45.29.15.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.66-.14.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.12.07.68-.17 1.36Z" />
    </BaseIcon>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </BaseIcon>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </BaseIcon>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8" />
    </BaseIcon>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}

export function CheckCircleIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="m8.8 12 2.2 2.2 4.6-4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </BaseIcon>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </BaseIcon>
  );
}

export function FileTextIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M8 3h6l4 4v14H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 3v4h4M9 12h6M9 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </BaseIcon>
  );
}

export function IdCardIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="8.5" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M13 10h5M13 14h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </BaseIcon>
  );
}

export function WineIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M8 3h8v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4V3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 9v8M9 21h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </BaseIcon>
  );
}
