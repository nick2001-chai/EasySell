// hooks/useProductForm.js
import { useState, useEffect, useCallback } from 'react';

const API_URL = 'http://127.0.0.1:5000/api';

const useProductForm = () => {
  const [viewProduct, setViewProduct] = useState('list');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [sellingMode, setSellingMode] = useState('in-stock');
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    brand: '',
    description: '',
    regularPrice: '',
    salePrice: '',
    stockQuantity: '',
    platforms: {
      facebook: true,
      instagram: true,
      tiktok: false,
      whatsapp: false
    }
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  const closeToast = () => {
    setToast(null);
  };

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError({});

      const response = await fetch(`${API_URL}/products`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      const data = await response.json();

      if (response.ok) {
        setProducts(data.products || []);
      } else {
        setError({ general: data.message || 'Failed to load products' });
        showToast('error', data.message || 'Failed to load products');
      }
    } catch (err) {
      console.error('Load products error:', err);
      setError({ general: 'Unable to connect to server' });
      showToast('error', 'Unable to connect to server');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (viewProduct === 'list') {
      loadProducts();
    }
  }, [viewProduct, loadProducts]);

  //validation Basic info 
  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.sku || !formData.sku.trim()) {
      newErrors.sku = 'Product code is required';
    }

    if (!formData.category || !formData.category.trim()) {
      newErrors.category = 'Category is required';
    }


    if (sellingMode === 'in-stock') {
      if (!formData.stockQuantity || parseInt(formData.stockQuantity) < 0) {
        newErrors.stockQuantity = 'Stock quantity is required';
      }
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //validation image
  const validateStep2 = () => {
    const newErrors = {};

    if (images.length === 0) {
      newErrors.images = 'At least one product image is required';
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //validation pricing
  const validateStep3 = () => {
    const newErrors = {};

    if (!formData.regularPrice || parseFloat(formData.regularPrice) <= 0) {
      newErrors.regularPrice = 'Regular price is required';
    }

    if (formData.salePrice && parseFloat(formData.salePrice) >= parseFloat(formData.regularPrice)) {
      newErrors.salePrice = 'Sale price must be less than regular price';
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createProduct = async () => {
    try {
      setLoading(true);
      setError({});

      const productData = {
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        brand: formData.brand,
        description: formData.description,
        regularPrice: parseFloat(formData.regularPrice) || 0,
        salePrice: formData.salePrice ? parseFloat(formData.salePrice) : null,
        stockQuantity: parseInt(formData.stockQuantity) || 0,
        sellingMode: sellingMode,
        images: images,
        variants: variants,
        platforms: formData.platforms,
        status: 'active'
      };

      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(productData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Product created:', data.product);
        showToast('success', '🎉 Product created successfully!');
        resetForm();
        setViewProduct('list');
        loadProducts();
        return { success: true, message: 'Product created successfully!' };
      } else {
        showToast('error', data.message || 'Failed to create product');
        setError({ general: data.message || 'Failed to create product' });
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Create product error:', err);
      showToast('error', '⚠️ Unable to connect to server');
      setError({ general: 'Unable to connect to server' });
      return { success: false, message: 'Unable to connect to server' };
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async () => {
    if (!editingProduct || !editingProduct._id) {
      console.error('❌ No editing product');
      return;
    }

    try {
      setLoading(true);
      setError({});

      const productData = {
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        brand: formData.brand,
        description: formData.description,
        regularPrice: Number(formData.regularPrice),
        salePrice: formData.salePrice ? Number(formData.salePrice) : null,
        stockQuantity: Number(formData.stockQuantity),
        sellingMode,
        images,
        variants,
        platforms: formData.platforms
      };

      console.log('📦 UPDATE PAYLOAD:', productData);

      const response = await fetch(
        `${API_URL}/products/${editingProduct._id}`,
        {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(productData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Update failed');
      }

      console.log('✅ UPDATED PRODUCT:', data.product);

      showToast('success', '✏️ Product updated successfully!');
      await loadProducts();     // 🔥 WAIT for reload
      resetForm();
      setEditingProduct(null);
      setViewProduct('list');

      return { success: true };
    } catch (err) {
      console.error('❌ Update error:', err);
      showToast('error', err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };


  const deleteProduct = async (productId) => {
    try {
      setLoading(true);
      setError({});

      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Product deleted');
        showToast('success', '🗑️ Product deleted successfully!');
        loadProducts();
        return { success: true, message: 'Product deleted successfully!' };
      } else {
        showToast('error', data.message || 'Failed to delete product');
        setError({ general: data.message || 'Failed to delete product' });
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Delete product error:', err);
      showToast('error', '⚠️ Unable to connect to server');
      setError({ general: 'Unable to connect to server' });
      return { success: false, message: 'Unable to connect to server' };
    } finally {
      setLoading(false);
    }
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      sku: product.sku || '',
      category: product.category || '',
      brand: product.brand || '',
      description: product.description || '',
      regularPrice: product.regularPrice || '',
      salePrice: product.salePrice || '',
      stockQuantity: product.stockQuantity || '',
      platforms: product.platforms || { facebook: true, instagram: true, tiktok: false, whatsapp: false }
    });
    setSellingMode(product.sellingMode || 'in-stock');
    setImages(product.images || []);
    setVariants(product.variants || []);
    setCurrentStep(1);
    setSelectedProduct(product);   // ✅ save old data
    setViewProduct('edit');        // ✅ switch view
  };

  const resetForm = () => {
    setFormData({
      name: '',
      sku: '',
      category: '',
      brand: '',
      description: '',
      regularPrice: '',
      salePrice: '',
      stockQuantity: '',
      platforms: { facebook: true, instagram: true, tiktok: false, whatsapp: false }
    });
    setSellingMode('in-stock');
    setImages([]);
    setVariants([]);
    setCurrentStep(1);
    setEditingProduct(null);
    setError({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (error[name]) {
      setError(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    setVariants(prev => [...prev, { size: '', color: '', price: '', stock: '' }]);
  };

  const removeVariant = (index) => {
    setVariants(prev => prev.filter((_, i) => i !== index));
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      const isValid = validateStep1();
      if (!isValid) {
        showToast('warning', '⚠️ Please fill in all required fields');
        return;
      }
    }

    if (currentStep === 2) {
      const isValid = validateStep2();
      if (!isValid) {
        showToast('warning', '⚠️ Please add at least one image');
        return;
      }
    }

    if (currentStep === 3) {
      const isValid = validateStep3();
      if (!isValid) {
        showToast('warning', '⚠️ Please complete pricing information');
        return;
      }
    }

    setCurrentStep(prev => Math.min(5, prev + 1));
  };

  return {
    viewProduct,
    setViewProduct,
    products,
    loading,
    error,
    currentStep,
    setCurrentStep,
    sellingMode,
    setSellingMode,
    images,
    variants,
    formData,
    editingProduct,
    toast,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    editProduct,
    resetForm,
    handleInputChange,
    handleImageUpload,
    removeImage,
    addVariant,
    removeVariant,
    validateStep1,
    validateStep2,
    validateStep3,
    handleNextStep,
    showToast,
    closeToast,
    selectedProduct
  };
};

export default useProductForm;