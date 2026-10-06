import { TestArea } from './TestArea';

export default async function TestPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ name?: string }> 
}) {
  // Next.js 15 requires us to 'await' the URL parameters before using them
  const params = await searchParams;
  const studentName = params.name || "Guest";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-white text-black">
      <TestArea name={studentName} />
    </main>
  );
}