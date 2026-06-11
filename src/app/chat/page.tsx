import Chatbot from "@/components/Chatbot";

export const metadata = {
  title: "Chat with Sandeep’s assistant",
  description: "Ask about skills, projects, and experience.",
};

type ChatPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ChatPage({ searchParams }: ChatPageProps) {
  const params = await searchParams;
  const initialQuery =
    typeof params?.q === "string"
      ? params.q
      : Array.isArray(params?.q)
        ? params.q[0]
        : "";

  return (
    <div className="relative w-full py-4 sm:py-6">
      {/* ambient glow background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,94,44,0.22),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-10 right-1/4 h-72 w-72 translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,71,51,0.16),transparent_70%)] blur-3xl" />
      </div>
      <Chatbot mode="page" initialQuery={initialQuery} />
    </div>
  );
}
