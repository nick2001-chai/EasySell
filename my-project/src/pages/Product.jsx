// src/pages/Product.jsx
import React from 'react';
import ProductForm from '../components/product/ProductForm';
import ProductList from '../components/product/ProductList';
import useProductForm from '../hooks/useProductForm';

const Product = () => {
  const productFormHook = useProductForm();

  return (
    <>
      {productFormHook.viewProduct === 'list' ? (
        <ProductList {...productFormHook} />
      ) : (
        <ProductForm {...productFormHook} />
      )}
    </>
  );
};

export default Product;