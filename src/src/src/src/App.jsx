```jsx
import React, { useMemo, useState } from "react";
import {
  MapPin,
  Search,
  ShoppingCart,
  Home,
  Grid2X2,
  Package,
  CalendarDays,
  User,
  UtensilsCrossed,
  ShoppingBasket,
  Carrot,
  Car,
  Wrench,
  Zap,
  Droplets,
  Wind,
  Users,
  Star,
  BadgeCheck,
  Plus,
  Minus,
  ArrowLeft,
  Phone,
  LogOut,
  Menu,
  X,
  Clock,
} from "lucide-react";

const restaurants = [
  {
    id: "biryani-house",
    name: "Dinhata Biryani House",
    bn: "দিনহাটা বিরিয়ানি হাউস",
    cuisine: "Bengali • Mughlai • Biryani",
    rating: 4.5,
    time: "25–30 মিনিট",
    offer: "₹100-এর বেশি অর্ডারে Free Delivery",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80",
    menu: [
      {
        id: "chicken-biryani",
        bn: "চিকেন বিরিয়ানি",
        price: 180,
        veg: false,
        description: "সুগন্ধি বাসমতী চাল ও নরম চিকেনের বিশেষ বিরিয়ানি।",
      },
      {
        id: "mutton-biryani",
        bn: "মাটন বিরিয়ানি",
        price: 250,
        veg: false,
        description: "দিনহাটার জনপ্রিয় স্পেশাল মাটন বিরিয়ানি।",
      },
      {
        id: "paneer-biryani",
        bn: "পনির বিরিয়ানি",
        price: 160,
        veg: true,
        description: "স্বাদে ভরপুর ভেজ পনির বিরিয়ানি।",
      },
    ],
  },
  {
    id: "north-bengal-food",
    name: "North Bengal Food Corner",
    bn: "নর্থ বেঙ্গল ফুড কর্নার",
    cuisine: "Bengali • Chinese",
    rating: 4.3,
    time: "30–35 মিনিট",
    offer: "আজ 15% ছাড়",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80",
    menu: [
      {
        id: "chowmein",
        bn: "চিকেন চাউমিন",
        price: 120,
        veg: false,
        description: "গরম গরম স্ট্রিট-স্টাইল চাউমিন।",
      },
      {
        id: "fried-rice",
        bn: "ভেজ ফ্রাইড রাইস",
        price: 100,
        veg: true,
        description: "তাজা সবজির ফ্রাইড রাইস।",
      },
    ],
  },
];

const products = [
  {
    id: "rice",
    bn: "বাসমতী চাল",
    price: 80,
    unit: "1 kg",
    category: "Grocery",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "oil",
    bn: "সরিষার তেল",
    price: 180,
    unit: "1 litre",
    category: "Grocery",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "potato",
    bn: "তাজা আলু",
    price: 25,
    unit: "1 kg",
    category: "Market",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "tomato",
    bn: "টাটকা টমেটো",
    price: 40,
    unit: "1 kg",
    category: "Market",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80",
  },
];

const providers = [
  {
    id: "ram-electrician",
    name: "রাম প্রসাদ শর্মা",
    service: "ইলেকট্রিশিয়ান",
    experience: "12 বছরের অভিজ্ঞতা",
    rating: 4.9,
    jobs: 452,
    price: 300,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "karim-plumber",
    name: "করিম আলি",
    service: "প্লাম্বার",
    experience: "10 বছরের অভিজ্ঞতা",
    rating: 4.8,
    jobs: 389,
    price: 350,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "city-ac",
    name: "City AC Service",
    service: "AC Repair & Service",
    experience: "8 বছরের অভিজ্ঞতা",
    rating: 4.8,
    jobs: 267,
    price: 400,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80",
  },
];

const vehicles = [
  {
    id: "dzire",
    name: "Maruti Swift Dzire",
    type: "Sedan • AC • 4 Seats",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "innova",
    name: "Toyota Innova Crysta",
    type: "SUV • AC • 7 Seats",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=700&q=80",
  },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [location, setLocation] = useState("Dinhata");
  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const itemCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const go = (nextPage) => {
    setPage(nextPage);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addCart = (item) => {
    setCart((oldCart) => {
      const existing = oldCart.find((cartItem) => cartItem.id === item.id);

      if (existing) {
        return oldCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...oldCart, { ...item, quantity: 1 }];
    });
  };

  const updateQty = (id, value) => {
    setCart((oldCart) =>
      oldCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + value }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const selectRestaurant = (selectedRestaurant) => {
    setRestaurant(selectedRestaurant);
    go("restaurant-detail");
  };

  const bookService = (provider) => {
    if (!user) {
      alert("বুকিং করতে আগে লগইন করুন।");
      go("profile");
      return;
    }

    const booking = {
      id: `BK-${Date.now().toString().slice(-6)}`,
      service: provider.service || provider.name,
      provider: provider.name,
      price: provider.price,
      status: "Pending",
    };

    setBookings((oldBooking) => [booking, ...oldBooking]);
    alert("আপনার বুকিং রিকোয়েস্ট সফলভাবে পাঠানো হয়েছে।");
    go("bookings");
  };

  const placeOrder = () => {
    if (!user) {
      alert("অর্ডার করতে আগে লগইন করুন।");
      go("profile");
      return;
    }

    if (cart.length === 0) {
      alert("আপনার কার্ট খালি আছে।");
      return;
    }

    const order = {
      id: `APON-${Date.now().toString().slice(-6)}`,
      items: cart,
      total: total + 25,
      status: "Placed",
    };

    setOrders((oldOrders) => [order, ...oldOrders]);
    setCart([]);
    go("orders");
  };

  const navItems = [
    { id: "home", label: "হোম", icon: Home },
    { id: "categories", label: "ক্যাটাগরি", icon: Grid2X2 },
    { id: "orders", label: "অর্ডার", icon: Package },
    { id: "bookings", label: "বুকিং", icon: CalendarDays },
    { id: "profile", label: "প্রোফাইল", icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-900 md:pb-0">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <button onClick={() => go("home")} className="flex items-center gap-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-emerald-800 text-xl font-bold text-white shadow-lg">
              আ
            </span>
            <span className="hidden text-left sm:block">
              <b className="block text-xl">APON</b>
              <small className="text-slate-500">আপনজনের মতো</small>
            </span>
          </button>

          <div className="hidden items-center gap-1 rounded-xl bg-green-50 px-3 py-2 text-sm font-bold text-green-700 md:flex">
            <MapPin size={17} />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent outline-none"
            >
              <option>Dinhata</option>
              <option>Cooch Behar</option>
            </select>
          </div>

          <div className="relative hidden max-w-xl flex-1 md:block">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && go("search")}
              placeholder="আপনার কী দরকার?"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 outline-none focus:border-green-600"
            />
          </div>

          <button
            onClick={() => go("cart")}
            className="relative ml-auto rounded-xl p-2 hover:bg-slate-100"
          >
            <ShoppingCart />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => go("profile")}
            className="hidden rounded-xl bg-green-700 px-4 py-2.5 font-bold text-white md:block"
          >
            {user ? user.name : "লগইন"}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl p-2 hover:bg-slate-100 md:hidden"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t bg-white p-4 md:hidden">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && go("search")}
                placeholder="আপনার কী দরকার?"
                className="w-full rounded-xl border py-3 pl-10"
              />
            </div>
          </div>
        )}
      </header>

      {page === "home" && (
        <HomePage
          location={location}
          go={go}
          setSearch={setSearch}
          restaurants={restaurants}
          providers={providers}
          selectRestaurant={selectRestaurant}
        />
      )}

      {page === "categories" && <CategoriesPage go={go} />}

      {page === "restaurants" && (
        <RestaurantsPage
          restaurants={restaurants}
          selectRestaurant={selectRestaurant}
        />
      )}

      {page === "restaurant-detail" && restaurant && (
        <RestaurantDetail restaurant={restaurant} addCart={addCart} go={go} />
      )}

      {page === "grocery" && (
        <ProductPage
          title="মুদিখানা"
          subtitle="দিনহাটার প্রয়োজনীয় বাজার, ঘরে ডেলিভারি"
          products={products.filter((product) => product.category === "Grocery")}
          addCart={addCart}
        />
      )}

      {page === "market" && (
        <ProductPage
          title="তাজা বাজার"
          subtitle="সবজি, ফল, মাছ ও মাংসের দৈনিক বাজার"
          products={products.filter((product) => product.category === "Market")}
          addCart={addCart}
        />
      )}

      {page === "services" && (
        <ProvidersPage
          title="হোম সার্ভিস"
          providers={providers}
          bookService={bookService}
        />
      )}

      {page === "workers" && (
        <ProvidersPage
          title="লোকাল প্রফেশনাল"
          providers={providers}
          bookService={bookService}
        />
      )}

      {page === "vehicles" && (
        <VehiclesPage vehicles={vehicles} bookService={bookService} />
      )}

      {page === "search" && (
        <SearchPage
          search={search}
          restaurants={restaurants}
          products={products}
          providers={providers}
          addCart={addCart}
          selectRestaurant={selectRestaurant}
        />
      )}

      {page === "cart" && (
        <CartPage cart={cart} total={total} updateQty={updateQty} go={go} />
      )}

      {page === "checkout" && (
        <CheckoutPage total={total} placeOrder={placeOrder} go={go} />
      )}

      {page === "orders" && <OrdersPage orders={orders} />}

      {page === "bookings" && <BookingsPage bookings={bookings} />}

      {page === "profile" && (
        <ProfilePage user={user} setUser={setUser} go={go} />
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t bg-white md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`flex flex-1 flex-col items-center gap-1 py-2 text-xs font-bold ${
                page === item.id ? "text-green-700" : "text-slate-500"
              }`}
            >
              <Icon size={21} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function HomePage({
  location,
  go,
  setSearch,
  restaurants,
  providers,
  selectRestaurant,
}) {
  const categories = [
    ["খাবার", UtensilsCrossed, "restaurants", "from-orange-500 to-red-500"],
    ["মুদিখানা", ShoppingBasket, "grocery", "from-green-500 to-emerald-600"],
    ["তাজা বাজার", Carrot, "market", "from-lime-500 to-green-600"],
    ["গাড়ি ভাড়া", Car, "vehicles", "from-indigo-500 to-blue-600"],
    ["AC সার্ভিস", Wind, "services", "from-sky-500 to-cyan-600"],
    ["ইলেকট্রিশিয়ান", Zap, "services", "from-yellow-500 to-orange-500"],
    ["প্লাম্বার", Droplets, "services", "from-blue-500 to-indigo-600"],
    ["হোম রিপেয়ার", Wrench, "services", "from-teal-500 to-green-600"],
    ["কাজের লোক", Users, "workers", "from-slate-500 to-slate-700"],
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-green-700 via-emerald-700 to-teal-900 px-4 py-12 text-white md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">
            <MapPin size={16} /> এখন পরিষেবা পাওয়া যাচ্ছে: {location}
          </p>

          <h1 className="text-4xl font-black md:text-6xl">
            যা দরকার, APON-এ খুঁজুন।
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-green-50">
            খাবার থেকে গাড়ি, বাজার থেকে মিস্ত্রি—আপনার শহরের প্রয়োজনীয় পরিষেবা এক জায়গায়।
          </p>

          <div className="mx-auto mt-8 flex max-w-3xl rounded-2xl bg-white p-2 shadow-2xl">
            <input
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && go("search")}
              placeholder="যেমন: AC service, Biryani, সবজি"
              className="min-w-0 flex-1 rounded-xl px-4 py-3 text-slate-800 outline-none"
            />
            <button
              onClick={() => go("search")}
              className="rounded-xl bg-orange-500 px-5 font-bold"
            >
              খুঁজুন
            </button>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <SectionTitle
          title="আপনার প্রয়োজনীয় ক্যাটাগরি"
          action="সব দেখুন"
          onAction={() => go("categories")}
        />

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {categories.map(([name, Icon, target, color]) => (
            <button
              key={name}
              onClick={() => go(target)}
              className="rounded-2xl bg-white p-3 shadow-sm hover:shadow-md"
            >
              <span
                className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${color}`}
              >
                <Icon size={24} className="text-white" />
              </span>
              <span className="mt-2 block text-sm font-bold">{name}</span>
            </button>
          ))}
        </div>

        <SectionTitle
          title="APON Near You"
          action="সব রেস্তোরাঁ"
          onAction={() => go("restaurants")}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((item) => (
            <RestaurantCard
              key={item.id}
              restaurant={item}
              onClick={() => selectRestaurant(item)}
            />
          ))}
        </div>

        <SectionTitle
          title="বিশ্বস্ত লোকাল প্রফেশনাল"
          action="সব দেখুন"
          onAction={() => go("services")}
        />

        <div className="grid gap-4 md:grid-cols-3">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
            >
              <img
                src={provider.image}
                alt={provider.name}
                className="h-16 w-16 rounded-xl object-cover"
              />
              <div>
                <p className="font-black">{provider.name}</p>
                <p className="text-sm text-slate-500">{provider.service}</p>
                <p className="mt-1 flex items-center gap-1 text-sm">
                  <Star size={15} className="fill-yellow-400 text-yellow-400" />
                  {provider.rating}
                  <BadgeCheck size={16} className="ml-2 text-green-600" />
                </p>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-12 rounded-3xl bg-orange-500 p-8 text-center text-white">
          <Phone size={42} className="mx-auto mb-4" />
          <h2 className="text-3xl font-black">সাহায্য দরকার?</h2>
          <p className="mt-2 text-lg">
            আপনি শুধু প্রয়োজনটা বলুন, বাকিটা APON দেখবে।
          </p>
          <a
            href="tel:+919876543210"
            className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-bold text-orange-600"
          >
            এখনই কল করুন
          </a>
        </section>
      </main>
    </>
  );
}

function SectionTitle({ title, action, onAction }) {
  return (
    <div className="mb-5 mt-10 flex items-center justify-between">
      <h2 className="text-2xl font-black">{title}</h2>
      {action && (
        <button onClick={onAction} className="font-bold text-green-700">
          {action} →
        </button>
      )}
    </div>
  );
}

function CategoriesPage({ go }) {
  const items = [
    ["খাবার", "restaurants"],
    ["মুদিখানা", "grocery"],
    ["তাজা বাজার", "market"],
    ["হোম সার্ভিস", "services"],
    ["লোকাল প্রফেশনাল", "workers"],
    ["গাড়ি ভাড়া", "vehicles"],
  ];

  return (
    <PageWrap title="সব ক্যাটাগরি">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {items.map(([name, target]) => (
          <button
            onClick={() => go(target)}
            key={name}
            className="rounded-2xl bg-white p-8 text-left text-xl font-black shadow-sm"
          >
            {name} <span className="float-right text-green-600">→</span>
          </button>
        ))}
      </div>
    </PageWrap>
  );
}

function RestaurantsPage({ restaurants, selectRestaurant }) {
  return (
    <PageWrap
      title="দিনহাটার রেস্তোরাঁ"
      subtitle="আপনার পছন্দের খাবার ঘরে পৌঁছে যাবে"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onClick={() => selectRestaurant(restaurant)}
          />
        ))}
      </div>
    </PageWrap>
  );
}

function RestaurantCard({ restaurant, onClick }) {
  return (
    <button
      onClick={onClick}
      className="overflow-hidden rounded-2xl bg-white text-left shadow-sm transition hover:shadow-lg"
    >
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between gap-2">
          <div>
            <h3 className="font-black">{restaurant.bn}</h3>
            <p className="mt-1 text-sm text-slate-500">{restaurant.cuisine}</p>
          </div>
          <span className="flex h-fit items-center gap-1 rounded-lg bg-green-700 px-2 py-1 text-sm font-bold text-white">
            <Star size={13} className="fill-white" />
            {restaurant.rating}
          </span>
        </div>

        <div className="mt-4 flex justify-between text-sm font-semibold">
          <span className="flex items-center gap-1 text-slate-600">
            <Clock size={15} />
            {restaurant.time}
          </span>
          <span className="text-orange-600">{restaurant.offer}</span>
        </div>
      </div>
    </button>
  );
}

function RestaurantDetail({ restaurant, addCart, go }) {
  return (
    <PageWrap>
      <button
        onClick={() => go("restaurants")}
        className="mb-5 flex items-center gap-2 font-bold text-green-700"
      >
        <ArrowLeft size={19} />
        রেস্তোরাঁয় ফিরে যান
      </button>

      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="h-56 w-full rounded-3xl object-cover md:h-80"
      />

      <h1 className="mt-6 text-3xl font-black">{restaurant.bn}</h1>
      <p className="mt-2 text-slate-500">{restaurant.cuisine}</p>

      <h2 className="mt-10 text-2xl font-black">মেনু</h2>

      <div className="mt-4 space-y-3">
        {restaurant.menu.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm"
          >
            <div>
              <p className="font-black">
                {item.veg ? "🟢" : "🔴"} {item.bn}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {item.description}
              </p>
              <p className="mt-2 font-bold">₹{item.price}</p>
            </div>

            <button
              onClick={() =>
                addCart({
                  ...item,
                  type: "food",
                  restaurant: restaurant.bn,
                })
              }
              className="rounded-xl border border-green-600 px-4 py-2 font-black text-green-700"
            >
              ADD
            </button>
          </div>
        ))}
      </div>
    </PageWrap>
  );
}

function ProductPage({ title, subtitle, products, addCart }) {
  return (
    <PageWrap title={title} subtitle={subtitle}>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-2xl bg-white shadow-sm"
          >
            <img
              src={product.image}
              alt={product.bn}
              className="h-32 w-full object-cover"
            />
            <div className="p-3">
              <p className="font-black">{product.bn}</p>
              <p className="text-xs text-slate-500">{product.unit}</p>

              <div className="mt-3 flex items-center justify-between">
                <b>₹{product.price}</b>
                <button
                  onClick={() => addCart({ ...product, type: "product" })}
                  className="rounded-lg bg-green-700 p-2 text-white"
                >
                  <Plus size={17} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageWrap>
  );
}

function ProvidersPage({ title, providers, bookService }) {
  return (
    <PageWrap
      title={title}
      subtitle="VERIFIED BY APON — যাচাইকৃত লোকাল পরিষেবা"
    >
      <div className="space-y-4">
        {providers.map((provider) => (
          <div
            key={provider.id}
            className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center"
          >
            <img
              src={provider.image}
              alt={provider.name}
              className="h-20 w-20 rounded-2xl object-cover"
            />

            <div className="flex-1">
              <p className="flex items-center gap-1 text-lg font-black">
                {provider.name}
                <BadgeCheck size={18} className="text-green-600" />
              </p>
              <p className="text-slate-600">{provider.service}</p>
              <p className="mt-2 flex items-center gap-1 text-sm">
                <Star size={15} className="fill-yellow-400 text-yellow-400" />
                {provider.rating} • {provider.jobs} কাজ সম্পন্ন •{" "}
                {provider.experience}
              </p>
            </div>

            <div>
              <p className="mb-2 font-black">₹{provider.price} থেকে</p>
              <button
                onClick={() => bookService(provider)}
                className="rounded-xl bg-green-700 px-5 py-2.5 font-bold text-white"
              >
                বুক করুন
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageWrap>
  );
}

function VehiclesPage({ vehicles, bookService }) {
  return (
    <PageWrap
      title="গাড়ি ভাড়া"
      subtitle="দিনহাটা ও কোচবিহারের জন্য বিশ্বস্ত গাড়ি বুকিং"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="overflow-hidden rounded-2xl bg-white shadow-sm"
          >
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="h-52 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-black">{vehicle.name}</h3>
              <p className="mt-1 text-slate-500">{vehicle.type}</p>

              <div className="mt-4 flex items-center justify-between">
                <p className="font-black">₹{vehicle.price} / দিন</p>
                <button
                  onClick={() => bookService(vehicle)}
                  className="rounded-xl bg-green-700 px-5 py-2.5 font-bold text-white"
                >
                  বুক করুন
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageWrap>
  );
}

function SearchPage({
  search,
  restaurants,
  products,
  providers,
  addCart,
  selectRestaurant,
}) {
  const query = search.toLowerCase();

  const resultRestaurants = restaurants.filter((restaurant) =>
    `${restaurant.name} ${restaurant.bn} ${restaurant.cuisine}`
      .toLowerCase()
      .includes(query)
  );

  const resultProducts = products.filter((product) =>
    product.bn.toLowerCase().includes(query)
  );

  const resultProviders = providers.filter((provider) =>
    `${provider.name} ${provider.service}`.toLowerCase().includes(query)
  );

  return (
    <PageWrap title={`"${search || "সব"}" এর ফলাফল`}>
      {!search && <p className="text-slate-500">উপরে Search box-এ কিছু লিখুন।</p>}

      {resultRestaurants.length > 0 && (
        <>
          <SectionTitle title="রেস্তোরাঁ" />
          <div className="grid gap-4 md:grid-cols-3">
            {resultRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onClick={() => selectRestaurant(restaurant)}
              />
            ))}
          </div>
        </>
      )}

      {resultProducts.length > 0 && (
        <>
          <SectionTitle title="পণ্য" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {resultProducts.map((product) => (
              <button
                onClick={() => addCart({ ...product, type: "product" })}
                key={product.id}
                className="rounded-xl bg-white p-4 text-left shadow-sm"
              >
                <p className="font-black">{product.bn}</p>
                <p>
                  ₹{product.price} / {product.unit}
                </p>
                <p className="mt-2 text-sm text-green-700">
                  + কার্টে যোগ করুন
                </p>
              </button>
            ))}
          </div>
        </>
      )}

      {resultProviders.length > 0 && (
        <>
          <SectionTitle title="সার্ভিস প্রোভাইডার" />
          <div className="space-y-3">
            {resultProviders.map((provider) => (
              <div
                key={provider.id}
                className="rounded-xl bg-white p-4 shadow-sm"
              >
                <b>{provider.name}</b> — {provider.service} • ₹
                {provider.price} থেকে
              </div>
            ))}
          </div>
        </>
      )}
    </PageWrap>
  );
}

function CartPage({ cart, total, updateQty, go }) {
  return (
    <PageWrap title="আপনার কার্ট">
      {cart.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <ShoppingCart className="mx-auto mb-3 text-slate-400" size={45} />
          <h3 className="text-xl font-black">কার্ট এখন খালি</h3>
          <button
            onClick={() => go("home")}
            className="mt-5 rounded-xl bg-green-700 px-5 py-3 font-bold text-white"
          >
            কেনাকাটা শুরু করুন
          </button>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
              >
                <div>
                  <p className="font-black">{item.bn}</p>
                  <p className="text-sm text-slate-500">
                    ₹{item.price} প্রতি item
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="rounded-lg bg-slate-100 p-2"
                  >
                    <Minus size={16} />
                  </button>
                  <b>{item.quantity}</b>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="rounded-lg bg-green-100 p-2 text-green-700"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="text-xl font-black">বিলের বিবরণ</h3>
            <div className="mt-4 flex justify-between">
              <span>Items total</span>
              <b>₹{total}</b>
            </div>
            <div className="mt-2 flex justify-between">
              <span>Delivery charge</span>
              <b>₹25</b>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-xl">
              <b>মোট</b>
              <b>₹{total + 25}</b>
            </div>
            <button
              onClick={() => go("checkout")}
              className="mt-5 w-full rounded-xl bg-green-700 py-3 font-black text-white"
            >
              Checkout করুন
            </button>
          </div>
        </div>
      )}
    </PageWrap>
  );
}

function CheckoutPage({ total, placeOrder, go }) {
  const [address, setAddress] = useState("");

  return (
    <PageWrap title="Checkout">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm">
        <label className="font-bold">ডেলিভারি ঠিকানা</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="বাড়ি নম্বর, রাস্তা, এলাকা, দিনহাটা..."
          className="mt-2 min-h-28 w-full rounded-xl border p-3"
        />

        <p className="mt-5 font-bold">পেমেন্ট পদ্ধতি</p>
        <div className="mt-2 rounded-xl border border-green-200 bg-green-50 p-4 font-semibold text-green-800">
          Cash on Delivery (Demo)
        </div>

        <div className="mt-5 flex justify-between text-xl font-black">
          <span>মোট পেমেন্ট</span>
          <span>₹{total + 25}</span>
        </div>

        <button
          onClick={() => {
            if (!address.trim()) {
              alert("ডেলিভারি ঠিকানা লিখুন।");
              return;
            }
            placeOrder();
          }}
          className="mt-6 w-full rounded-xl bg-orange-500 py-4 text-lg font-black text-white"
        >
          অর্ডার কনফার্ম করুন
        </button>

        <button
          onClick={() => go("cart")}
          className="mt-3 w-full font-bold text-green-700"
        >
          কার্টে ফিরে যান
        </button>
      </div>
    </PageWrap>
  );
}

function OrdersPage({ orders }) {
  return (
    <PageWrap title="আমার অর্ডার">
      {orders.length === 0 ? (
        <Empty icon={Package} text="এখনও কোনো অর্ডার করা হয়নি।" />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex justify-between">
                <b>Order #{order.id}</b>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                  {order.status}
                </span>
              </div>
              <p className="mt-3 text-slate-600">
                {order.items
                  .map((item) => `${item.bn} × ${item.quantity}`)
                  .join(", ")}
              </p>
              <p className="mt-3 font-black">মোট: ₹{order.total}</p>
            </div>
          ))}
        </div>
      )}
    </PageWrap>
  );
}

function BookingsPage({ bookings }) {
  return (
    <PageWrap title="আমার বুকিং">
      {bookings.length === 0 ? (
        <Empty icon={CalendarDays} text="এখনও কোনো সার্ভিস বুকিং নেই।" />
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="flex justify-between">
                <b>{booking.service}</b>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-700">
                  {booking.status}
                </span>
              </div>
              <p className="mt-2">{booking.provider}</p>
              <p className="mt-2 font-black">
                Estimated ₹{booking.price} থেকে
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Booking ID: {booking.id}
              </p>
            </div>
          ))}
        </div>
      )}
    </PageWrap>
  );
}

function ProfilePage({ user, setUser, go }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (user) {
    return (
      <PageWrap title="আমার প্রোফাইল">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-7 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl font-black text-green-700">
            {user.name[0]}
          </div>
          <h2 className="mt-4 text-2xl font-black">{user.name}</h2>
          <p className="text-slate-500">{user.phone}</p>

          <button
            onClick={() => go("orders")}
            className="mt-6 block w-full rounded-xl border p-3 text-left font-bold"
          >
            📦 আমার অর্ডার
          </button>

          <button
            onClick={() => go("bookings")}
            className="mt-3 block w-full rounded-xl border p-3 text-left font-bold"
          >
            📅 আমার বুকিং
          </button>

          <button
            onClick={() => setUser(null)}
            className="mt-6 flex items-center gap-2 font-bold text-red-600"
          >
            <LogOut size={18} />
            লগআউট
          </button>
        </div>
      </PageWrap>
    );
  }

  return (
    <PageWrap
      title="লগইন / সাইন আপ"
      subtitle="Demo login — পরে Supabase OTP যুক্ত করা হবে"
    >
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-sm">
        <label className="font-bold">আপনার নাম</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="যেমন: Rahim Das"
          className="mt-2 w-full rounded-xl border p-3"
        />

        <label className="mt-5 block font-bold">মোবাইল নম্বর</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="10 digit mobile number"
          className="mt-2 w-full rounded-xl border p-3"
        />

        <button
          onClick={() => {
            if (!name.trim() || phone.length < 10) {
              alert("সঠিক নাম ও 10 সংখ্যার মোবাইল নম্বর দিন।");
              return;
            }

            setUser({ name, phone });
            go("home");
          }}
          className="mt-6 w-full rounded-xl bg-green-700 py-3 font-black text-white"
        >
          চালিয়ে যান
        </button>
      </div>
    </PageWrap>
  );
}

function PageWrap({ title, subtitle, children }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:py-12">
      {title && <h1 className="text-3xl font-black md:text-4xl">{title}</h1>}
      {subtitle && <p className="mt-2 text-slate-500">{subtitle}</p>}
      <div className={title ? "mt-8" : ""}>{children}</div>
    </main>
  );
}

function Empty({ icon: Icon, text }) {
  return (
    <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
      <Icon size={48} className="mx-auto text-slate-300" />
      <p className="mt-4 font-bold text-slate-500">{text}</p>
    </div>
  );
}
```
