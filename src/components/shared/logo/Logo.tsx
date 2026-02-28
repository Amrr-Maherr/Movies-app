import logo from '@/assets/logos/Netflix_Logo_RGB.png'
import type { LogoProps } from '@/types/logo';

export default function Logo({ className = "w-[50px] h-[50px]" }: LogoProps) {
  return (
    <div className={className}>
      <img
        className="w-full h-full object-contain"
        alt="Netflix Logo"
        loading="lazy"
        src={logo}
      />
    </div>
  );
}
