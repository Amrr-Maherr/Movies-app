import OptimizedImage from '@/components/ui/OptimizedImage';
import logo from '@/assets/logos/vite.svg'
import type { LogoProps } from '@/types/logo';

export default function Logo({ className = "w-[50px] h-[50px]" }: LogoProps) {
  return (
    <div className={className}>
      <OptimizedImage
        className="w-full h-full"
        alt="Netflix Logo"
        src={logo}
        objectFit="contain"
      />
    </div>
  );
}
