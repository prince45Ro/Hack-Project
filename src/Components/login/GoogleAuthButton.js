import { companyLogos } from "../companyLogos";

export default function GoogleAuthButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-[0_16px_38px_rgba(15,23,42,0.10)] focus:outline-none focus:ring-2 focus:ring-slate-200"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
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
