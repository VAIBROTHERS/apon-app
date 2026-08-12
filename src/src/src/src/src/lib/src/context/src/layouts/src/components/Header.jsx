import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, ShoppingCart, User, MapPin, ChevronDown, 
  Menu, X, Globe, LogOut, Package, Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header = () => {
  const navigate = useNavigate();
  const { language, setLanguage, location, setLocation, user, session, signOut, getTotalItems } = useApp();
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const locations = ['Dinhata', 'Cooch Behar'];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    navigate('/');
  };

  const text = {
    bn: {
      search: 'আপনার কী দরকার?',
      login: 'লগইন',
      profile: 'প্রোফাইল',
      orders: 'অর্ডার',
      bookings: 'বুকিং',
      logout: 'লগআউট',
    },
    en: {
      search: 'What do you need?',
      login: 'Login',
      profile: 'Profile',
      orders: 'Orders',
      bookings: 'Bookings',
      logout: 'Logout',
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-bold text-lg md:text-xl shadow-lg">
              আ
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-xl md:text-2xl text-gray-900">APON</div>
              <div className="text-[10px] md:text-xs text-gray-600 -mt-1">আপনজনের মতো</div>
            </div>
          </Link>

          {/* Location Selector */}
          <div className="hidden md:flex items-center relative">
            <button
              onClick={() => setShowLocationMenu(!showLocationMenu)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MapPin className="w-5 h-5 text-primary-600" />
              <div className="text-left">
                <div className="text-xs text-gray-500">অবস্থান</div>
                <div className="font-semibold text-gray-900">{location}</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showLocationMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowLocationMenu(false)} />
                <div className="absolute top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[200px] z-20">
                  {locations.map(loc => (
                    <button
                      key={loc}
                      onClick={() => {
                        setLocation(loc);
                        setShowLocationMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                        location === loc ? 'text-primary-600 font-semibold' : 'text-gray-700'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-4">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={text[language].search}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
              className="hidden md:flex items-center space-x-1 px-3 py-2 hover:bg-gray-50 rounded-lg"
            >
              <Globe className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">{language === 'bn' ? 'EN' : 'বাং'}</span>
            </button>

            <Link to="/cart" className="relative p-2 hover:bg-gray-50 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {session ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg"
                >
                  <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-semibold">
                    {user?.name?.[0] || 'U'}
                  </div>
                </button>

                {showUserMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border py-2 min-w-[200px] z-20">
                      <div className="px-4 py-2 border-b">
                        <div className="font-semibold">{user?.name || 'User'}</div>
                        <div className="text-sm text-gray-500">{user?.phone}</div>
                      </div>
                      <Link to="/profile" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50">
                        <User className="w-4 h-4" />
                        <span>{text[language].profile}</span>
                      </Link>
                      <Link to="/orders" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50">
                        <Package className="w-4 h-4" />
                        <span>{text[language].orders}</span>
                      </Link>
                      <Link to="/bookings" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50">
                        <Calendar className="w-4 h-4" />
                        <span>{text[language].bookings}</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 text-red-600 border-t mt-2 pt-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{text[language].logout}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/profile')}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium"
              >
                <User className="w-4 h-4" />
                <span>{text[language].login}</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={text[language].search}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
