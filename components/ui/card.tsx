type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`surface-card flex h-full flex-col rounded-[24px] p-6 transition duration-300 ease-smooth hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
