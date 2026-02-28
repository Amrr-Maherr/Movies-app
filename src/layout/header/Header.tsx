import { HeaderLinks } from "@/data/header";
import NavLinks from './components/NavLinks';
import Logo from '@/components/shared/logo/Logo';
import SearchButton from './components/search/SearchButton';
import { AuthButton } from './components/authButton';
export default function Header() {
  return (
    <header
      className="container fixed top-0 left-0 right-0 z-999 transition-all duration-300 flex items-center justify-between gap-5 p-2
      "
    >
      <nav className="flex items-center justify-between md:justify-start gap-5 p-2">
        <Logo className="w-35 h-10" />
        {HeaderLinks.map((link, index) => (
          <NavLinks key={index} link={link} />
        ))}
        <SearchButton />
      </nav>
      <AuthButton label="login" />
    </header>
  );
}
