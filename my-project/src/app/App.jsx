import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import ScreenRouter from "./ScreenRouter";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check authentication on app load
  useEffect(() => {
    console.log('Checking authentication...');
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    console.log('Token:', token);
    console.log('User:', user);

    if (token && user) {
      console.log('User authenticated, redirecting to dashboard');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoggedIn(true);
      setCurrentScreen("dashboard");
    } else {
      console.log('No authentication found');
    }
    setLoading(false);
  }, []);

  // Logout handler
  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setCurrentScreen("login");
    setMobileMenuOpen(false);
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Define all screens
  const screens = {
    login: "Login",
    dashboard: "Dashboard",
    Product: "Product",
    chatInbox: "Chat Inbox",
    order: "Order",
    inventory: "Inventory",
    notification: "Notification",
  };

  // Protected screens require login
  const protectedScreens = [
    "dashboard",
    "Product",
    "chatInbox",
    "order",
    "inventory",
    "notification",
  ];

  // Helper to get platform color
  const getPlatformColor = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-700",
      pink: "bg-pink-100 text-pink-700",
      green: "bg-green-100 text-green-700",
      purple: "bg-purple-100 text-purple-700",
    };
    return colors[color];
  };

  // Helper to get status color
  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700",
      processing: "bg-blue-100 text-blue-700",
      shipped: "bg-purple-100 text-purple-700",
      delivered: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
      paid: "bg-green-100 text-green-700",
      partial: "bg-orange-100 text-orange-700",
      unpaid: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  // Handle navigation click
  const handleNavClick = (key) => {
    setCurrentScreen(key);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">EasySell</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {Object.entries(screens).map(([key, label]) => {
                const isProtected = protectedScreens.includes(key);
                const disabled = isProtected && !isLoggedIn;
                const buttonLabel = key === "login" && isLoggedIn ? "Logout" : label;

                // Don't show login button in navbar when logged in (show logout instead)
                if (key === "login" && !isLoggedIn) return null;

                return (
                  <button
                    key={key}
                    onClick={() => {
                      if (key === "login" && isLoggedIn) {
                        handleLogout();
                      } else if (!disabled) {
                        handleNavClick(key);
                      }
                    }}
                    disabled={disabled && !(key === "login" && isLoggedIn)}
                    className={`px-4 py-2 rounded-lg font-medium transition text-sm
                      ${currentScreen === key 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-700 hover:bg-gray-100"}
                      ${disabled && !(key === "login" && isLoggedIn) 
                        ? "opacity-50 cursor-not-allowed" 
                        : ""}
                    `}
                  >
                    {buttonLabel}
                  </button>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-2">
              {Object.entries(screens).map(([key, label]) => {
                const isProtected = protectedScreens.includes(key);
                const disabled = isProtected && !isLoggedIn;
                const buttonLabel = key === "login" && isLoggedIn ? "Logout" : label;

                // Don't show login button in mobile menu when logged in
                if (key === "login" && !isLoggedIn) return null;

                return (
                  <button
                    key={key}
                    onClick={() => {
                      if (key === "login" && isLoggedIn) {
                        handleLogout();
                      } else if (!disabled) {
                        handleNavClick(key);
                      }
                    }}
                    disabled={disabled && !(key === "login" && isLoggedIn)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition
                      ${currentScreen === key 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-700 hover:bg-gray-100"}
                      ${disabled && !(key === "login" && isLoggedIn) 
                        ? "opacity-50 cursor-not-allowed" 
                        : ""}
                    `}
                  >
                    {buttonLabel}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ScreenRouter
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          getStatusColor={getStatusColor}
          getPlatformColor={getPlatformColor}
          protectedScreens={protectedScreens}
        />
      </div>
    </div>
  );
};

export default App;