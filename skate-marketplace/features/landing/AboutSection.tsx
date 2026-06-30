export default function AboutSection() {
  return (
    <section id="sobre" className="bg-zinc-50 px-6 py-24 dark:bg-zinc-900">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Nossa História
        </h2>

        <div className="mt-8 space-y-5 text-left text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          <p>
            A SkateMarket nasceu da paixão pelo skate e da vontade de oferecer algo
            diferente: skates montados sob medida para cada pessoa. Nada de prateleira.
            Cada shape, truck e roda é escolhido pensando no seu estilo de andar.
          </p>
          <p>
            Somos skaters, assim como você. Sabemos a diferença que um equipamento bem
            montado faz na pista, na rua ou na ladeira. Por isso, tratamos cada pedido
            como se fosse o nosso próprio skate.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-6 border-t border-zinc-200 pt-10 dark:border-zinc-800">
          {[
            { value: "+500", label: "Skates Entregues" },
            { value: "98%", label: "Clientes Satisfeitos" },
            { value: "5 Anos", label: "de Experiência" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold text-amber-500 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
