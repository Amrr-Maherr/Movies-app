import { useState, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/features/auth/components/AuthLayout";
import { useLogin } from "@/hooks/shared";
import { SectionSkeleton } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { getLocalizedLink } from "@/lib/utils/i18n";
import { useTranslation } from "react-i18next";

// Lazy-loaded components
const Input = lazy(() =>
  import("@/components/ui/input").then((m) => ({ default: m.Input })),
);

export default function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language || 'en';
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { mutate: loginUser, isPending, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginUser(
      {
        email,
        password,
      },
      {
        onSuccess: (response) => {
          // Store token based on remember me option
          console.log(response);

          if (rememberMe) {
            localStorage.setItem("token", response?.accessToken);
            localStorage.setItem("name", JSON.stringify(response.firstName));
            localStorage.setItem("image", JSON.stringify(response.image));
            localStorage.setItem("email", JSON.stringify(response.email));
          } else {
            // Session storage for temporary login
            sessionStorage.setItem("token", response?.accessToken);
            sessionStorage.setItem("name", JSON.stringify(response.firstName));
            sessionStorage.setItem("image", JSON.stringify(response.image));
            sessionStorage.setItem("email", JSON.stringify(response.email));
          }
          // Redirect to home page
          navigate(`/${currentLang}/`);
        },
      },
    );
  };

  return (
    <AuthLayout>
      <HelmetMeta
        name={t('auth.login.title')}
        description={t('auth.login.description')}
      />
      <div className="w-full max-w-[450px] bg-black/75 rounded-lg px-8 py-16 md:px-16 md:py-12">
        <h1 className="text-3xl font-bold text-white mb-8">{t('auth.login.title')}</h1>

        {/* Test Credentials */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 mb-6">
          <p className="text-sm font-medium text-white mb-2">
            {t('auth.login.testCredentials')}
          </p>
          <div className="text-sm text-neutral-400 space-y-1">
            <p>
              <span className="text-neutral-500">{t('auth.login.username')}</span>{" "}
              <span className="text-white font-mono">emilys</span>
            </p>
            <p>
              <span className="text-neutral-500">{t('auth.login.passwordLabel')}</span>{" "}
              <span className="text-white font-mono">emilyspass</span>
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-[#e87c7c] text-white text-sm">
            {(error as Error).message ||
                                  t('auth.login.loginFailed')}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Suspense fallback={<SectionSkeleton variant="list" cardCount={1} />}>
            <div className="relative">
              <Input
                type="text"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isPending}
                className="peer w-full bg-[#333] border-0 rounded text-white px-4 py-4 h-12 placeholder-transparent focus:outline-none focus:ring-0 focus:bg-[#454545] transition-colors"
              />
              <label className="absolute left-4 top-4 text-[#8c8c8c] text-base pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white bg-[#333] px-1 peer-focus:bg-black peer-not-placeholder-shown:bg-black">
                {t('auth.login.email')}
              </label>
            </div>

            <div className="relative">
              <Input
                type="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isPending}
                className="peer w-full bg-[#333] border-0 rounded text-white px-4 py-4 h-12 placeholder-transparent focus:outline-none focus:ring-0 focus:bg-[#454545] transition-colors"
              />
              <label className="absolute left-4 top-4 text-[#8c8c8c] text-base pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white bg-[#333] px-1 peer-focus:bg-black peer-not-placeholder-shown:bg-black">
                {t('auth.login.password')}
              </label>
            </div>
          </Suspense>

          <button
            type="submit"
            disabled={isPending}
            className="mt-6 w-full bg-[#e50914] hover:bg-[#f40612] text-white font-semibold py-3 rounded text-base disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? t('auth.signingIn') : t('auth.signIn')}
          </button>

          <div className="flex items-center justify-between text-sm text-[#737373] mt-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 bg-[#333] text-[#e50914] focus:ring-[#e50914] focus:ring-2"
              />
              <label
                htmlFor="remember"
                className="text-[#737373] cursor-pointer hover:text-white transition-colors"
              >
                {t('auth.login.rememberMe')}
              </label>
            </div>
            <Link to="#" className="hover:underline">
              {t('auth.login.forgotPassword')}
            </Link>
          </div>
        </form>

        <div className="mt-16 text-[#737373] flex flex-col gap-4">
          <p className="text-base">
            {t('auth.login.noAccount')}{" "}
            <Link
              to={getLocalizedLink('/signup')}
              className="text-white hover:underline font-medium"
            >
              {t('auth.login.signUpNow')}
            </Link>
          </p>
          <p className="text-xs">
            {t('auth.login.recaptcha')}{" "}
            <Link to="#" className="text-blue-500 hover:underline">
              {t('auth.login.learnMore')}
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
