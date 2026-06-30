const PRODUCTS = [
  {
    emoji: "🛹",
    title: "Street",
    desc: "O clássico dos skates. Perfeito para manobras, corrimãos e pistas urbanas. Leve e resistente.",
  },
  {
    emoji: "🏄",
    title: "Longboard",
    desc: "Ideal para cruising e downhill. Maior estabilidade em altas velocidades e curvas suaves.",
  },
  {
    emoji: "⚡",
    title: "Cruiser",
    desc: "Compacto e ágil. Perfeito para o dia a dia, andar na cidade e deslocamentos curtos.",
  },
  {
    emoji: "🎨",
    title: "Custom",
    desc: "Monte do seu jeito. Escolha shape, trucks, rodas e cores. Um skate único para você.",
  },
];

export default function ProductsSection() {
  return (
    <section id="produtos" className="bg-zinc-50 px-6 py-24 dark:bg-zinc-900">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Nossos Modelos
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-600 dark:text-zinc-400">
          Seja qual for seu estilo, temos o shape certo para você.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <article
              key={product.title}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800"
            >
              <span className="block text-4xl transition-transform group-hover:scale-110">
                {product.emoji}
              </span>
              <h3 className="mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {product.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {product.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
