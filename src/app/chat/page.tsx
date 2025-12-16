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
    typeof params?.q === "string" ? params.q : Array.isArray(params?.q) ? params.q[0] : "";

  return (
    <div className="relative flex w-full justify-center py-8">
      <div className="w-full max-w-5xl">
        <Chatbot mode="page" initialQuery={initialQuery} />
      </div>
    </div>
  );
}
