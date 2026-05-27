const OrderPipeline = ({ orderPipeline }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Order Pipeline</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {orderPipeline.map((stage, index) => (
          <div key={index} className="text-center">
            <div
              className={`w-full h-24 rounded-lg flex items-center justify-center mb-2`}
              style={{
                backgroundColor:
                  stage.color === 'yellow' ? '#FEF3C7' :
                  stage.color === 'blue' ? '#DBEAFE' :
                  stage.color === 'purple' ? '#EDE9FE' :
                  stage.color === 'green' ? '#DCFCE7' : '#F3F4F6'
              }}
            >
              <span
                className={`text-4xl font-bold`}
                style={{
                  color:
                    stage.color === 'yellow' ? '#B45309' :
                    stage.color === 'blue' ? '#1D4ED8' :
                    stage.color === 'purple' ? '#7C3AED' :
                    stage.color === 'green' ? '#15803D' : '#374151'
                }}
              >
                {stage.count}
              </span>
            </div>
            <p className="text-sm font-semibold text-gray-700">{stage.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPipeline;
