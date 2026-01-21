export default function Loading() {
    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <div className="grid gap-6 md:grid-cols-2 animate-pulse">
            <div className="h-105 rounded-xl bg-gray-200" />
            <div className="space-y-4">
            <div className="h-6 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-8 w-24 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-11/12 rounded bg-gray-200" />
            <div className="h-4 w-10/12 rounded bg-gray-200" />
            <div className="h-11 w-full rounded-lg bg-gray-200" />
            </div>
        </div>
        </main>
    );
}
