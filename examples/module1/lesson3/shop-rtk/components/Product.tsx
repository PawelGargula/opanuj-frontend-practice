import { Link } from 'react-router-dom';

import { BsEyeFill, BsPlus } from 'react-icons/bs';

import { useAppDispatch } from '../hooks/rtk';
import { addToCart } from '../state/cartSlice';
import type { Product as ProductType } from '../types/Product';

const Product = ({ product }: { product: ProductType }) => {
  const dispatch = useAppDispatch();
  const { id, image, category, title, price } = product;

  return (
    <div data-testid="product">
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={image}
              alt=""
            />
          </div>
        </div>
        <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            data-testid="add-to-cart-button"
            onClick={() => dispatch(addToCart(product))}
            title='Add to cart'
          >
            <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <Link
            to={`/product/${id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
            data-testid="view-details-button"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div>
        <div className="tex-sm capitalize text-gray-500 mb-1">{category}</div>
        <Link to={`/product/${id}`}>
          <h2 className="font-semibold mb-1">{title}</h2>
        </Link>
        <h2 className="font-semibbold">$ {price}</h2>
      </div>
    </div>
  );
};

export default Product;