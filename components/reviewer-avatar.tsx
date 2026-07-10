type ReviewerAvatarProps = {
  name: string;
  initial: string;
  profilePhotoUrl?: string;
  sizeClassName?: string;
  textClassName?: string;
  ringClassName?: string;
};

export function ReviewerAvatar({
  name,
  initial,
  profilePhotoUrl,
  sizeClassName = "h-11 w-11",
  textClassName = "text-[1.1rem]",
  ringClassName = "border-white",
}: ReviewerAvatarProps) {
  if (profilePhotoUrl) {
    return (
      <span
        className={`inline-flex overflow-hidden rounded-full border-2 bg-white ${sizeClassName} ${ringClassName}`}
      >
        <img
          src={profilePhotoUrl}
          alt={`Foto de ${name}`}
          className="h-full w-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </span>
    );
  }

  return (
    <span
      className={`grid place-items-center rounded-full border-2 bg-[linear-gradient(135deg,#001736,#fd8b00)] font-heading text-white ${sizeClassName} ${textClassName} ${ringClassName}`}
      aria-label={`Inicial de ${name}`}
    >
      {initial}
    </span>
  );
}
