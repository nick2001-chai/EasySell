// src/pages/Dashboard.jsx
import Header from '../components/dashboard/Header';
import KeyMetrics from '../components/dashboard/KeyMetrics';
import SecondaryMetrics from '../components/dashboard/SecondaryMetrics';
import OrderPipeline from '../components/dashboard/OrderPipeline';
import RecentOrders from '../components/dashboard/RecentOrders';
import RecentMessages from '../components/dashboard/RecentMessages';
import TopProducts from '../components/dashboard/TopProducts';
import PlatformPerformance from '../components/dashboard/PlatformPerformance';
import QuickActions from '../components/dashboard/QuickActions';
import useDashBoard from '../hooks/useDashBoard';

const Dashboard = ({ getStatusColor, getPlatformColor, setCurrentScreen }) => {
  const { ...dashboardHook } = useDashBoard();

  return (
    <div className="space-y-6">
      <Header
        setCurrentScreen={setCurrentScreen}
        {...dashboardHook}
      />
      <KeyMetrics stats={{ /* pass stats */ }} />
      <SecondaryMetrics stats={{ /* pass stats */ }} />
      <OrderPipeline {...dashboardHook} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders
          setCurrentScreen={setCurrentScreen}
          getStatusColor={getStatusColor}
          {...dashboardHook}
        />
        <RecentMessages
          setCurrentScreen={setCurrentScreen}
          {...dashboardHook}
        />
        <TopProducts {...dashboardHook} />
        <PlatformPerformance
          getPlatformColor={getPlatformColor}
          {...dashboardHook}
        />
      </div>
      <QuickActions setCurrentScreen={setCurrentScreen} />
    </div>
  );
};

export default Dashboard;
