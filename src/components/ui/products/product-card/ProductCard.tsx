import { Product } from "@/types/product.types";
import Link from "next/link";


const ProductCard = ({product}:{product: Product}) => {

    return (
        <article
            key={product.id}
            className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
        >
        {/* Image */}
        <div className="relative flex h-48 items-center justify-center bg-gray-50 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain transition group-hover:scale-[1.02]"
            loading="lazy"
            />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-1 flex-col justify-between">
            <div>
                {/* Category */}
                <div className="mb-2">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                        {product.category}
                    </span>
                </div>

                {/* Title */}
                <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                    {product.title}
                </h3>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium text-gray-900">
                        ★ {product.rating?.rate ?? "—"}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span>{product.rating?.count ?? 0} reviews</span>
                    </div>

                    {/* Price */}
                    <div className="mt-3 text-lg font-bold text-gray-900">
                    ${product.price}
                </div>
            </div>
            {/* Actions */}
            <div className="mt-4 flex gap-2">
                <button
                    type="button"
                    className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.99]"
                    onClick={() => {
                        // later: dispatch(addToCart(product))
                    }}

                    // Will add disable on dispatch
                >
                    Add to cart
                </button>

                <Link
                    href={`/${product.id}`}
                    title="Click to view product"
                    aria-label="Click to view product"
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                    View
                </Link>
            </div>
        </div>
    </article>
    )
}

export default ProductCard;