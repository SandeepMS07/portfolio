import { HoverEffect } from "@/components/ui/card-hover-effect";

export const demoProjects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers award-winning shows, movies, anime, and more.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "Focused on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "E-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "Software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];

export default function CardHoverEffectDemo() {
  return (
    <div className="mx-auto max-w-5xl px-8">
      <HoverEffect items={demoProjects} />
    </div>
  );
}
