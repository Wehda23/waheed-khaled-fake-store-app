import CreateProductForm from "./components/CreateProductForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Product - FakeStore",
    description: "Create a new product using FakeStore API",
};

export default function CreateProductPage() {
    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <CreateProductForm />
        </main>
    );
}
