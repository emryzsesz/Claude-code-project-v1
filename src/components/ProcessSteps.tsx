type Step = {
  title: string;
  description: string;
};

export default function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="relative pl-14">
          <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">
            {index + 1}
          </span>
          <h3 className="text-lg font-semibold text-navy">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-navy/70">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
