import { companyLogos } from "../companyLogos";

export default function GoogleAuthButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="liquid-glass-chip group flex w-full items-center justify-center gap-3 rounded-2xl px-4 py-3 font-semibold text-slate-100 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
    >
      <span className="liquid-glass-input flex h-10 w-10 items-center justify-center rounded-full">
        <img
          src={companyLogos.google}
          alt="Google logo"
          className="h-5 w-5 object-contain"
        />
      </span>
      <span className="tracking-[0.01em]">{label}</span>
    </button>
  );
}
