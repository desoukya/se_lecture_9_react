import Error from "next/error";
import { useRouter } from "next/router";
import Product from "../../components/Product";

function ProductPageContainer({ product }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Product
      id={product.id}
      name = {product.name}
      size = {product.size}
      image = {product.image}
      slug = {product.slug}
      price = {product.price}
      stock = {product.stock}
      category = {product.category}
      measurement = {product.measurement}
      weight = {product.weight}
    />
  );
}

export async function getStaticProps({ params }) {
  const productSlug = params.slug;
  const response = await fetch(`https://se-lecture-8-node-vercel-h814dy0vt-desoukya-gmailcom.vercel.app/api/products/${productSlug}`);
  const data = await response.text()
  const product = JSON.parse(data);
  return {
    props: {
      product,
    },
  };
}

// pages/products/[slug]
export async function getStaticPaths() {
  const response = await fetch('https://se-lecture-8-node-vercel-h814dy0vt-desoukya-gmailcom.vercel.app/api/products');
  const data = await response.text()
  const products = JSON.parse(data);
  const paths = products.map((product) => ({ params: { slug: String(product.id) }}))
  return {
    paths,
    fallback: false,
  }
}
export default ProductPageContainer;
