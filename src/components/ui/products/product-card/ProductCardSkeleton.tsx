/**
 * Skeleton loader for the ProductCard component.
 *
 */


const ProductCardSkeleton: React.FC = () => {
    return (
        <article
        className="
            flex flex-col overflow-hidden rounded-xl
            border border-gray-200 bg-white shadow-sm
            animate-pulse
        "
        >
            {/* Image skeleton */}
            <div className="h-48 bg-gray-200" />

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                {/* Category */}
                <div className="mb-2 h-4 w-20 rounded-full bg-gray-200" />

                {/* Title */}
                <div className="space-y-2">
                    <div className="h-4 w-full rounded bg-gray-200" />
                    <div className="h-4 w-3/4 rounded bg-gray-200" />
                </div>

                {/* Rating */}
                <div className="mt-3 h-4 w-32 rounded bg-gray-200" />

                {/* Price */}
                <div className="mt-4 h-6 w-16 rounded bg-gray-200" />
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                <div className="h-9 flex-1 rounded-lg bg-gray-200" />
                <div className="h-9 w-16 rounded-lg bg-gray-200" />
                </div>
            </div>
        </article>
  );
};

export default ProductCardSkeleton;
