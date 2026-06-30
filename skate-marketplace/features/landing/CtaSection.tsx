import LeadForm from "./LeadForm";

export default function CtaSection() {
  return (
    <section
      id="cta"
      className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-amber-900 px-6 py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
          Pronto para ter o skate dos seus sonhos?
        </h2>
        <p className="mt-4 text-lg text-zinc-400">
          Deixe seus dados e entraremos em contato para montar o skate perfeito para
          você.
        </p>

        <div className="mt-10">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
