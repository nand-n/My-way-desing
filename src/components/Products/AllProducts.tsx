'use client';
import { useEffect, useState } from 'react';
import Table from '../Common/GenericTable';
import { Product } from '@prisma/client';
import { useProductStore } from '@/store/productStore';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import ProductModal from './ProductModal';

const AllProducts = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const products = useProductStore((state) => state.products);
  const searchQuery = useProductStore((state) => state.searchQuery);
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);
  const filteredProducts = useProductStore((state) => state.filteredProducts);
  const setFilteredProducts = useProductStore((state) => state.setFilteredProducts);
  const currentPage = useProductStore((state) => state.currentPage);
  const setCurrentPage = useProductStore((state) => state.setCurrentPage);
  const productsPerPage = useProductStore((state) => state.productsPerPage);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery) ||
      product.category.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchQuery, products, setFilteredProducts, setCurrentPage]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const columns = [
    { header: 'Title', accessor: (product: Product) => product.title },
    { header: 'Description', accessor: (product: Product) => product.description },
    { header: 'Category', accessor: (product: Product) => product.category },
    { header: 'Price', accessor: (product: Product) => `$${product.price.toFixed(2)}` },
    { header: 'Item Count', accessor: (product: Product) => product.itemCount },
  ];

  return (
    <>
      <div className="grid items-center justify-start gap-2">
        <Button icon={<PlusCircleOutlined />} type="primary" onClick={() => setIsModalVisible(true)}>
          Add Product
        </Button>
      </div>
      <Table
        data={currentProducts}
        columns={columns}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={productsPerPage}
        totalItems={filteredProducts.length}
      />
      <ProductModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
    </>
  );
};

export default AllProducts;
