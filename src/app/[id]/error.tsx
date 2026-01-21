"use client";

import Link from "next/link";
import { useState } from "react";

export default function Error({ reset }: { reset: () => void }) {
    // Make attempts of retry then open button for go back home
    const [goBackHome, setGoBackHome] = useState<boolean>(false);

    setTimeout(() => setGoBackHome(true), 3000);

    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Couldn’t load this product</h2>
            <p className="mt-2 text-sm text-gray-600">
                Please try again. If the problem continues, the API might be down.
            </p>
            <div className="flex gap-4 justify-center items-center mt-5">
                <button
                    onClick={reset}
                    className=" rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                    Retry
                </button>
                {goBackHome && (
                    <Link
                        href={"/"}
                        aria-label="Go back home"
                        title="Go back home"
                        className=" rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
                        >
                        Go back home
                    </Link>
                )}
            </div>
        </div>
        </main>
    );
}
