import { DecadesLogo } from "./DecadesLogo";

export function PageLoader() {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center py-24"
      role="status"
      aria-live="polite"
      aria-label="Chargement"
    >
      <div className="relative rounded-2xl bg-white p-5 shadow-md ring-1 ring-stone-200/60">
        <DecadesLogo size="md" priority />
      </div>
      <p className="mt-5 font-serif text-base font-semibold text-ink">LA DECADES</p>
      <div className="mt-4 h-1 w-24 overflow-hidden rounded-full bg-stone-200">
        <div className="loading-bar h-full w-1/2 rounded-full bg-decades-orange" />
      </div>
    </div>
  );
}
