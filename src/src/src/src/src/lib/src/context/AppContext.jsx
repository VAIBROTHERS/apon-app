import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('bn');
  const [location, setLocation] = useState('Dinhata');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check active sessions
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        loadUserProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        loadUserProfile(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) {
      setUser(data);
    }
  };

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('apon_cart');
    const savedLocation = localStorage.getItem('apon_location');
    const savedLanguage = localStorage.getItem('apon_language');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedLocation) setLocation(savedLocation);
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    localStorage.setItem('apon_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('apon_location', location);
  }, [location]);

  useEffect(() => {
    localStorage.setItem('apon_language', language);
  }, [language]);

  const signIn = async (phone, otp) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setSession(null);
    }
    return { error };
  };

  const addToCart = (item) => {
    setCart(prev => {
      const existingItem = prev.find(i => i.id === item.id && i.type === item.type);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id && i.type === item.type 
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (itemId, type) => {
    setCart(prev => prev.filter(i => !(i.id === itemId && i.type === type)));
  };

  const updateCartQuantity = (itemId, type, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId, type);
      return;
    }
    setCart(prev => prev.map(i => 
      i.id === itemId && i.type === type ? { ...i, quantity } : i
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const createOrder = async (orderData) => {
    if (!session?.user) {
      return { error: 'Please login first' };
    }

    const { data, error } = await supabase
      .from('orders')
      .insert([{
        user_id: session.user.id,
        ...orderData
      }])
      .select()
      .single();

    if (!error) {
      clearCart();
    }

    return { data, error };
  };

  const createBooking = async (bookingData) => {
    if (!session?.user) {
      return { error: 'Please login first' };
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        user_id: session.user.id,
        ...bookingData
      }])
      .select()
      .single();

    return { data, error };
  };

  const value = {
    language,
    setLanguage,
    location,
    setLocation,
    user,
    session,
    signIn,
    signOut,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    createOrder,
    createBooking,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
