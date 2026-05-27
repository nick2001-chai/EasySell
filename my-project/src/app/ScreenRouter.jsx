import Login from "../pages/Login";
import Product from "../pages/Product";
import DashBoard from "../pages/DashBoard";
import ChatInbox from "../pages/ChatInbox";
import Order from "../pages/Order";
import Notification from "../pages/Notification";
import Inventory from "../pages/Inventory";

const ScreenRouter = ({
  currentScreen,
  setCurrentScreen,
  isLoggedIn,
  setIsLoggedIn,
  getStatusColor,
  getPlatformColor,
  protectedScreens
}) => {


  // If trying to access protected screen without login → force login
  if (protectedScreens.includes(currentScreen) && !isLoggedIn) {
    return <Login setCurrentScreen={setCurrentScreen} setIsLoggedIn={setIsLoggedIn} />;
  }

  switch (currentScreen) {
    case "login":
      return <Login setCurrentScreen={setCurrentScreen} setIsLoggedIn={setIsLoggedIn} />;

    case "dashboard":
      return (
        <DashBoard
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          getStatusColor={getStatusColor}
          getPlatformColor={getPlatformColor}
        />
      );

    case "Product":
      return <Product />;

    case "chatInbox":
      return <ChatInbox getPlatformColor={getPlatformColor} />;

    case "order":
      return <Order getStatusColor={getStatusColor} setCurrentScreen={setCurrentScreen} />;

    case "notification":
      return (
        <Notification
          getStatusColor={getStatusColor}
          setCurrentScreen={setCurrentScreen}
        />
      );

    case "inventory":
      return <Inventory getStatusColor={getStatusColor} setCurrentScreen={setCurrentScreen} />;

    default:
      return null;
  }
};

export default ScreenRouter;
