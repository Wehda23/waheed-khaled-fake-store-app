import { StoreLogo } from "@/assets/Icons";
import Image from "next/image";
import Link from "next/link";



const Navbar: React.FC = () => {
    return (
        <nav className="w-full flex items-center justify-between px-4 md:px-6 bg-white shadow-md">
            {/* Logo Here */}
            <Link
                href="/"
                aria-label="Click to view product home page"
                title="Click to view products at home page"
                className="flex items-center p-2"
                >
                <Image
                    src={StoreLogo}
                    alt={"Store Logo"}
                    width={150}
                    height={50}
                    className="object-contain w-20 h-10 md:w-32 md:h-12"
                />
            </Link>
            {/*
                If fakestore categories API is functional maybe we can add a centered Search Bar here
                can be used to filter products by category, vendors, product type, tags, etc.. in real projects.
            */}
            
            {/* Actions here */}
        </nav>
    )
}


export default Navbar;