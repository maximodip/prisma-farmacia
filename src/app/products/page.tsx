import Link from "next/link";

import {getProducts} from "@/actions/products-actions";

export default async function HomePage() {
  const response = await getProducts();

  const products = response.data;

  return (
    <>
      <Link href="/products/new">Crear nuevo</Link>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <h2 className="font-bold">{product.name}</h2>
            <p className="mt-2 text-sm">{product.price.toString()}</p>
            <p className="mt-2 text-sm">{product.distributor}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
