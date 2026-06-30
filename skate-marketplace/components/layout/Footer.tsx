import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <Link href="/" className="text-lg font-bold tracking-tight text-amber-400">
          Skate<span className="text-zinc-100">Market</span>
        </Link>

        <p className="text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} SkateMarket. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
