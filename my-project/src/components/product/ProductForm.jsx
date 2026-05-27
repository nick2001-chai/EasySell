// components/product/ProductForm.js
import React from 'react';
import { ArrowLeft, Package, Image as ImageIcon, DollarSign, Truck, CheckCircle, Info } from 'lucide-react';
import Toast from '../common/Toast';
import StepBasicInfo from './steps/StepBasicInfo';
import StepImages from './steps/StepImages';
import StepPricing from './steps/StepPricing';
import StepShipping from './steps/StepShipping';
import StepPublish from './steps/StepPublish';

const ProductForm = ({ setViewProduct, resetForm, editingProduct, updateProduct, createProduct, currentStep, setCurrentStep, validateStep1, validateStep2, validateStep3, showToast, toast, closeToast, formData, sellingMode, setSellingMode, images, error, handleInputChange, handleImageUpload, removeImage, variants, addVariant, removeVariant, loading }) => {

  const steps = [
    { id: 1, name: 'Basic Info', icon: Info },
    { id: 2, name: 'Images', icon: ImageIcon },
    { id: 3, name: 'Pricing', icon: DollarSign },
    { id: 4, name: 'Shipping', icon: Truck },
    { id: 5, name: 'Publish', icon: CheckCircle }
  ];

  const handleBack = () => {
    resetForm();
    setViewProduct('list');
  };

  const handleSubmit = async () => {
    if (editingProduct) {
      await updateProduct();
    } else {
      await createProduct();
    }
  };

  // Handle Step Navigation with Validation
  const handleStepClick = (targetStep) => {
    // Allow going back to previous steps
    if (targetStep <= currentStep) {
      setCurrentStep(targetStep);
      return;
    }

    // Validate before moving forward
    let isValid = true;
    let currentValidationStep = currentStep;

    // Validate all steps between current and target
    while (currentValidationStep < targetStep) {
      switch (currentValidationStep) {
        case 1:
          isValid = validateStep1();
          if (!isValid) {
            showToast('warning', '⚠️ Please complete Basic Info before proceeding');
            return;
          }
          break;
        case 2:
          isValid = validateStep2();
          if (!isValid) {
            showToast('warning', '⚠️ Please add at least one image before proceeding');
            return;
          }
          break;
        case 3:
          isValid = validateStep3();
          if (!isValid) {
            showToast('warning', '⚠️ Please complete Pricing information');
            return;
          }
          break;
      }
      currentValidationStep++;
    }

    // If all validations pass, allow navigation
    if (isValid) {
      setCurrentStep(targetStep);
    }
  };

  // Handle Next Step with Validation
  const handleNextStep = () => {
    let isValid = true;

    // Validate based on current step
    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        if (!isValid) {
          showToast('warning', '⚠️ Please fill in all required fields');
          return;
        }
        break;
      case 2:
        isValid = validateStep2();
        if (!isValid) {
          showToast('warning', '⚠️ Please add at least one product image');
          return;
        }
        break;
      case 3:
        isValid = validateStep3();
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      setCurrentStep(Math.min(steps.length, currentStep + 1));
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={closeToast}
          duration={5000}
        />
      )}

      <div className="w-full p-4 sm:p-6 lg:max-w-5xl lg:mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 font-semibold text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          {/* Header */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            {editingProduct ? 'Edit Product' : 'Create New Product'}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            Fill in all the details to create a professional listing
          </p>

          {/* Progress Steps - Desktop Version */}
          <div className="hidden md:block mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      onClick={() => handleStepClick(step.id)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                        currentStep >= step.id
                          ? 'bg-blue-600 text-white cursor-pointer hover:bg-blue-700'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-50'
                      }`}
                      title={currentStep < step.id ? 'Complete previous steps first' : step.name}
                    >
                      <step.icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-xs mt-2 font-semibold ${
                        currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Progress Steps - Mobile Version (Horizontal Scroll) */}
          <div className="md:hidden mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  disabled={step.id > currentStep}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition shrink-0 ${
                    currentStep === step.id
                      ? 'bg-blue-600 text-white'
                      : currentStep > step.id
                      ? 'bg-blue-100 text-blue-700 cursor-pointer hover:bg-blue-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  <step.icon className="w-4 h-4" />
                  <span className="text-sm font-semibold">{step.name}</span>
                </button>
              ))}
            </div>
            {currentStep < steps.length && (
              <p className="text-xs text-center text-gray-500 mt-2">
                Complete current step to unlock next steps
              </p>
            )}
          </div>

          {/* Step Content */}
          <div className="mb-6">
            {currentStep === 1 && (
              <StepBasicInfo
                formData={formData}
                sellingMode={sellingMode}
                setSellingMode={setSellingMode}
                handleInputChange={handleInputChange}
                error={error}
                editingProduct={editingProduct}
              />
            )}

            {currentStep === 2 && (
              <StepImages
                images={images}
                handleImageUpload={handleImageUpload}
                removeImage={removeImage}
                error={error}
              />
            )}

            {currentStep === 3 && (
              <StepPricing
                variants={variants}
                addVariant={addVariant}
                removeVariant={removeVariant}
                formData={formData}
                handleInputChange={handleInputChange}
                error={error}
              />
            )}

            {currentStep === 4 && <StepShipping />}

            {currentStep === 5 && (
              <StepPublish 
                formData={formData} 
                images={images}
                sellingMode={sellingMode}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-t gap-3">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="w-full sm:w-auto order-2 sm:order-1 px-6 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            <div className="hidden sm:block order-1 sm:order-2 text-sm text-gray-600 font-medium">
              Step {currentStep} of {steps.length}
            </div>

            <div className="sm:hidden order-1 text-sm text-gray-600 font-medium">
              {currentStep} / {steps.length}
            </div>

            {currentStep < steps.length ? (
              <button
                onClick={handleNextStep}
                className="w-full sm:w-auto order-3 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full sm:w-auto order-3 px-6 py-2.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : editingProduct ? (
                  'Update Product'
                ) : (
                  'Create & Publish'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductForm;