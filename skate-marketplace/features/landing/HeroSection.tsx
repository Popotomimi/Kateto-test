export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(251,191,36,0.12),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(251,191,36,0.08),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-zinc-100 sm:text-5xl md:text-6xl">
          Skates Personalizados que{" "}
          <span className="text-amber-400">Refletem Sua Personalidade</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          Do street ao longboard, monte o skate perfeito para o seu estilo.
          Qualidade, design e performance em cada detalhe.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#cta"
            className="rounded-full bg-amber-500 px-8 py-3 text-base font-semibold text-zinc-900 transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25"
          >
            Monte o Seu
          </a>
          <a
            href="#produtos"
            className="rounded-full border border-zinc-700 px-8 py-3 text-base font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:text-zinc-100"
          >
            Ver Modelos
          </a>
        </div>
      </div>
    </section>
  );
}
