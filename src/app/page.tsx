import ProductList from "@/components/ui/products/product-list/ProductList";



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-9 md:gap-15 p-2 md:p-24">
      <h1 className=" text-2xl md:text-5xl font-bold mt-12 md:mt-0 text-center">
        <span className="text-[#1F4FD8]">Welcome to the Fake</span> <span className="text-[#FF8A34]">Store App</span>
      </h1>
      
      {/* Productlist component */}
      <ProductList />
    </main>
  );
}
