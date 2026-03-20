import { useState, useEffect, useRef, FormEvent, UIEvent } from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle2, Truck, ShieldCheck, Clock, ChevronRight, ChevronLeft, MapPin, User, ChevronDown, Flame } from 'lucide-react';

const PlatformIcon = ({ platform }: { platform: string }) => {
  if (platform === 'tiktok') {
    return (
      <div className="bg-black p-1 rounded-full shadow-sm">
        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      </div>
    );
  }
  if (platform === 'facebook') {
    return (
      <div className="bg-blue-600 p-1 rounded-full shadow-sm">
        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </div>
    );
  }
  if (platform === 'instagram') {
    return (
      <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-1 rounded-full shadow-sm">
        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      </div>
    );
  }
  return null;
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(1380); // 23 minutes countdown

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="font-display text-2xl font-black text-[#FE2C55] tracking-wider drop-shadow-[0_0_8px_rgba(254,44,85,0.5)]">
      {formatTime(timeLeft)}
    </div>
  );
};

const FloatingUrgencyIndicator = ({ scrollToForm }: { scrollToForm: () => void }) => {
  const [stock, setStock] = useState(12);
  const [viewers, setViewers] = useState(8);

  useEffect(() => {
    // Decrease stock randomly
    const stockInterval = setInterval(() => {
      setStock(prev => {
        if (prev <= 3) return prev; // Don't go below 3
        // 30% chance to decrease by 1
        if (Math.random() > 0.7) {
          return prev - 1;
        }
        return prev;
      });
    }, 4000); // Check every 4 seconds

    // Fluctuate viewers
    const viewersInterval = setInterval(() => {
      setViewers(prev => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
        const next = prev + change;
        if (next < 5) return 5;
        if (next > 15) return 15;
        return next;
      });
    }, 3000); // Check every 3 seconds

    return () => {
      clearInterval(stockInterval);
      clearInterval(viewersInterval);
    };
  }, []);

  // Calculate progress bar width (assuming max stock was 20)
  const progressWidth = `${(stock / 20) * 100}%`;

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none md:hidden px-4">
      <button 
        onClick={scrollToForm}
        className="pointer-events-auto group relative w-full max-w-[340px] bg-zinc-950/80 backdrop-blur-xl rounded-2xl p-1 shadow-[0_10px_40px_rgba(254,44,85,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-300 overflow-hidden border border-[#FE2C55]/40"
      >
        {/* Sweeping Shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-20"></div>
        
        <div className="relative flex items-center w-full bg-zinc-900/50 rounded-xl p-2.5 gap-3 z-10">
          {/* Flame Icon Container */}
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#FE2C55] to-orange-500 shadow-[0_0_20px_rgba(254,44,85,0.5)] shrink-0">
            <div className="absolute inset-0 rounded-full animate-ping bg-[#FE2C55] opacity-30"></div>
            <Flame className="w-6 h-6 text-white animate-pulse" />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 text-left">
            <div className="flex items-baseline gap-1">
              <span className="font-display font-black text-base uppercase text-white tracking-wide drop-shadow-md">
                ¡SOLO QUEDAN <span className="text-[#FE2C55] text-lg transition-all duration-500">{stock}</span>!
              </span>
            </div>
            
            {/* Mini Progress Bar */}
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden mt-1 mb-1 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-[#FE2C55] to-orange-400 rounded-full relative transition-all duration-1000 ease-out"
                style={{ width: progressWidth }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            
            <span className="text-[10px] text-zinc-300 font-medium uppercase tracking-wider flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              {viewers} personas comprando
            </span>
          </div>

          {/* Action Arrow */}
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-white shrink-0 border border-white/10 group-hover:bg-[#FE2C55] group-hover:border-[#FE2C55] transition-all duration-300">
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </button>
    </div>
  );
};

export default function App() {
  const [currentImg, setCurrentImg] = useState(0);

  const images = [
    "https://ae01.alicdn.com/kf/A994490424d3a47d7a5aeaac3cd04063aZ.jpg",
    "https://ae01.alicdn.com/kf/A71d58f9e53fc46e39beba29def3aef82z.jpg",
    "https://ae01.alicdn.com/kf/Af53474c878ce41c2913126e9da0a1efb5.jpg",
    "https://ae01.alicdn.com/kf/Ab5f7307e24404bf5b5fc9a72dbac5b4bk.jpg",
    "https://ae01.alicdn.com/kf/A873008271bc44e3a9a150f7fd2c2ad99H.jpg",
    "https://ae01.alicdn.com/kf/A6c6cf5d04d5e4629a9a1cbba4c4fc64bD.jpg"
  ];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    district: '',
    address: '',
    reference: '',
    coordinates: '',
    deliveryTime: 'Mañana (9:00 AM - 1:00 PM)',
    quantity: '1'
  });

  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const reviews = [
    {
      id: 1,
      name: "María G.",
      rating: 5,
      text: "¡Increíble! Trabajo 8 horas frente a la computadora y esto me ha salvado el cuello. Lo uso todos los días.",
      verified: true,
      date: "Hace 2 días",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      platform: "tiktok"
    },
    {
      id: 2,
      name: "Carlos R.",
      rating: 5,
      text: "La función de calor es una maravilla. Se siente como un masaje profesional. Totalmente recomendado.",
      verified: true,
      date: "Hace 1 semana",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      platform: "facebook"
    },
    {
      id: 3,
      name: "Ana L.",
      rating: 5,
      text: "Lo compré para mi mamá que sufre de dolores en la espalda baja y está fascinada. Excelente calidad.",
      verified: true,
      date: "Hace 2 semanas",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      platform: "instagram"
    },
    {
      id: 4,
      name: "Jorge M.",
      rating: 4,
      text: "Muy buen producto, aprieta bastante bien y la batería dura mucho. El envío fue súper rápido.",
      verified: true,
      date: "Hace 1 mes",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      platform: "tiktok"
    },
    {
      id: 5,
      name: "Lucía F.",
      rating: 5,
      text: "Dudé al principio pero vale cada centavo. Me relaja muchísimo antes de dormir. 10/10.",
      verified: true,
      date: "Hace 1 mes",
      avatar: "https://randomuser.me/api/portraits/women/17.jpg",
      platform: "instagram"
    },
    {
      id: 6,
      name: "Roberto V.",
      rating: 5,
      text: "Llegó en el tiempo indicado y el pago contra entrega me dio mucha confianza. El masajeador es potente.",
      verified: true,
      date: "Hace 2 meses",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      platform: "facebook"
    }
  ];

  const handleGetLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            coordinates: `${position.coords.latitude},${position.coords.longitude}`
          }));
          setLocationSuccess(true);
          setIsLocating(false);
        },
        (error) => {
          alert("No pudimos obtener tu ubicación. Por favor, asegúrate de dar permisos a tu navegador.");
          setIsLocating(false);
        }
      );
    } else {
      alert("Tu navegador no soporta geolocalización.");
      setIsLocating(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.coordinates) {
      alert("⚠️ Por favor, ingresa tu dirección o comparte tu ubicación GPS.");
      return;
    }

    const WA_NUMBER = "51919749480"; 
    
    const message = `*¡Hola! Quiero hacer un pedido:* 🚀\n\n` +
      `*Producto:* Masajeador Cervical Pro 3D 🔥\n` +
      `*Cantidad:* ${formData.quantity}\n\n` +
      `*Mis datos:*\n` +
      `👤 Nombre: ${formData.name}\n` +
      `📱 Teléfono: ${formData.phone}\n` +
      `🏙️ Ciudad: ${formData.city}\n` +
      `🏘️ Distrito: ${formData.district}\n` +
      `📍 Dirección: ${formData.address}\n` +
      `🗺️ Ubicación/Coordenadas: ${formData.coordinates}\n` +
      (formData.reference ? `🏠 Referencia: ${formData.reference}\n` : '') +
      `⏰ Horario: ${formData.deliveryTime}\n\n` +
      `Por favor, confírmenme el pedido. ¡Gracias!`;

    const waUrl = `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent(message)}`;
    
    // Track TikTok Pixel Event
    if ((window as any).ttq) {
      (window as any).ttq.track('CompletePayment', {
        content_id: 'MCP-3D-001',
        content_type: 'product',
        content_name: 'Masajeador Cervical Pro 3D',
        quantity: formData.quantity,
        value: formData.quantity * 79,
        currency: 'PEN'
      });
    }

    window.open(waUrl, '_blank');
  };

  const scrollToForm = () => {
    if ((window as any).ttq) {
      (window as any).ttq.track('InitiateCheckout', {
        content_id: 'MCP-3D-001',
        content_type: 'product',
        content_name: 'Masajeador Cervical Pro 3D',
        value: 79,
        currency: 'PEN'
      });
    }
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const sliderRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Track TikTok Pixel ViewContent Event
    if ((window as any).ttq) {
      (window as any).ttq.track('ViewContent', {
        content_id: 'MCP-3D-001',
        content_type: 'product',
        content_name: 'Masajeador Cervical Pro 3D',
        value: 79,
        currency: 'PEN'
      });
    }

    // Auto-scroll main images every 4 seconds
    const imageInterval = setInterval(() => {
      if (sliderRef.current) {
        const width = sliderRef.current.clientWidth;
        const maxScrollLeft = sliderRef.current.scrollWidth - width;
        const currentScroll = sliderRef.current.scrollLeft;
        
        if (currentScroll >= maxScrollLeft - 10) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          sliderRef.current.scrollBy({ left: width, behavior: 'smooth' });
        }
      }
    }, 4000);

    // Auto-scroll reviews every 5 seconds
    const reviewInterval = setInterval(() => {
      if (reviewsRef.current) {
        // Approximate width of a review card + gap
        const scrollAmount = 320 + 16; 
        const maxScrollLeft = reviewsRef.current.scrollWidth - reviewsRef.current.clientWidth;
        const currentScroll = reviewsRef.current.scrollLeft;
        
        if (currentScroll >= maxScrollLeft - 10) {
          reviewsRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          reviewsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 5000);

    return () => {
      clearInterval(imageInterval);
      clearInterval(reviewInterval);
    };
  }, []);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== currentImg) {
      setCurrentImg(newIndex);
    }
  };

  const scrollToImg = (index: number) => {
    if (sliderRef.current) {
      const width = sliderRef.current.clientWidth;
      sliderRef.current.scrollTo({
        left: width * index,
        behavior: 'smooth'
      });
    }
    setCurrentImg(index);
  };

  return (
    <div className="min-h-screen bg-black font-sans text-white pb-24 selection:bg-[#FE2C55] selection:text-white">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#FE2C55] via-[#ff2e5e] to-[#25F4EE] text-white text-center py-2.5 px-4 text-sm font-display font-bold tracking-widest uppercase animate-pulse shadow-md flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
        <span>¡Envío Gratis a todo el Perú! 🇵🇪</span>
        <span className="bg-black/20 px-2 py-0.5 rounded-full text-[10px] sm:text-xs">🔥 ÚLTIMAS UNIDADES</span>
      </div>

      <main className="max-w-md mx-auto bg-zinc-950 shadow-2xl overflow-hidden border-x border-zinc-900">
        {/* Hero Section */}
        <section className="relative aspect-square bg-zinc-900 group">
          {/* Floating Badge */}
          <div 
            className="absolute top-4 left-4 z-10 bg-[#FE2C55] text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-[0_0_15px_rgba(254,44,85,0.6)] animate-pulse border border-white/20 flex items-center justify-center"
            style={{ width: '174.462px', height: '24.5875px' }}
          >
            🔥 Últimas unidades
          </div>
          {/* Product Image Slider */}
          <div 
            ref={sliderRef}
            onScroll={handleScroll}
            className="w-full h-full overflow-x-auto snap-x snap-mandatory hide-scrollbar flex touch-pan-x"
          >
            {images.map((img, idx) => (
              <img 
                key={idx}
                src={img} 
                alt={`Masajeador Cervical ${idx + 1}`} 
                className="min-w-full h-full object-cover shrink-0 snap-center"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>

          {/* Slider Dots */}
          <div className="absolute bottom-28 left-0 right-0 flex justify-center gap-2 z-10">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`h-2 rounded-full transition-all cursor-pointer ${i === currentImg ? 'bg-[#FE2C55] w-6 shadow-[0_0_10px_#FE2C55]' : 'bg-white/40 w-2'}`}
                onClick={() => scrollToImg(i)}
              />
            ))}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-6 pointer-events-none">
            <div className="text-white">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#25F4EE] text-[#25F4EE] drop-shadow-[0_0_8px_rgba(37,244,238,0.8)]" />
                ))}
                <span className="text-sm font-bold ml-2 text-zinc-300">+10,000 vendidos</span>
              </div>
              <h1 className="text-3xl font-display font-black tracking-tight leading-tight mb-2 drop-shadow-lg">
                Masajeador Cervical Pro 3D 🔥
              </h1>
              <p className="text-zinc-300 font-medium drop-shadow-md text-lg">Alivio inmediato y relajación profunda 💆‍♂️</p>
            </div>
          </div>
        </section>

        {/* Price & Urgency */}
        <section className="p-6 bg-zinc-950">
          <div className="flex items-end gap-3 mb-4">
            <span className="text-5xl font-display font-black text-[#25F4EE] tracking-tighter drop-shadow-[0_0_15px_rgba(37,244,238,0.3)]">S/ 109.00</span>
            <span className="text-xl text-zinc-500 line-through font-bold mb-1.5">S/ 218.00</span>
            <span className="bg-[#FE2C55]/20 text-[#FE2C55] border border-[#FE2C55]/30 text-sm font-black px-2.5 py-1 rounded-md mb-2.5 uppercase tracking-wider">
              -50%
            </span>
          </div>

          <div className="mb-5">
            <div className="flex justify-between text-xs font-bold text-[#FE2C55] mb-1.5 uppercase tracking-wider">
              <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5" /> ¡Últimas unidades disponibles!</span>
              <span>12 en stock</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2.5 overflow-hidden border border-zinc-700">
              <div className="bg-gradient-to-r from-[#FE2C55] to-[#ff2e5e] h-full rounded-full w-[85%] animate-pulse"></div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-4 flex items-center justify-between mb-6 shadow-lg border border-zinc-800">
            <div className="flex items-center gap-2 text-white font-bold">
              <Clock className="w-5 h-5 text-[#FE2C55] animate-pulse" />
              <span>La oferta termina en:</span>
            </div>
            <CountdownTimer />
          </div>

          <button 
            onClick={scrollToForm}
            className="group relative w-full bg-[#FE2C55] text-white text-xl font-display font-black py-4 rounded-2xl shadow-[0_0_20px_rgba(254,44,85,0.4)] hover:shadow-[0_0_30px_rgba(254,44,85,0.6)] hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide overflow-hidden border border-white/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            <span className="relative z-10 flex items-center gap-2 drop-shadow-md">Comprar Ahora <ChevronRight className="w-6 h-6" /></span>
          </button>
        </section>

        {/* Trust Badges */}
        <section className="py-6 px-4 grid grid-cols-2 gap-4 bg-zinc-900 border-y border-zinc-800">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="bg-zinc-800 p-3 rounded-full shadow-inner text-[#25F4EE] border border-zinc-700">
              <Truck className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-white">Envío Gratis</span>
            <span className="text-xs text-zinc-400">A todo el Perú</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="bg-zinc-800 p-3 rounded-full shadow-inner text-[#25F4EE] border border-zinc-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-white">Pago Contra Entrega</span>
            <span className="text-xs text-zinc-400">Paga al recibir en casa</span>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 py-10 bg-zinc-950">
          <h2 className="text-3xl font-display font-black tracking-tight mb-8 text-center text-white leading-tight">Dile adiós al estrés y dolor 🚀</h2>
          
          {/* Product Video */}
          <div className="mb-8 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 relative">
            <div className="absolute inset-0 border-2 border-[#25F4EE]/20 rounded-3xl pointer-events-none z-10"></div>
            <video 
              src="https://video.aliexpress-media.com/play/u/ae_sg_item/3001411603564/p/1/e/6/t/10301/5000232654188.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-auto"
            />
          </div>

          <div className="space-y-4">
            {[
              { title: "Calor Terapéutico", desc: "Penetra los músculos y acelera la relajación." },
              { title: "Masaje Profundo 3D", desc: "Imita manos reales para liberar tensión." },
              { title: "Inalámbrico y Ergonómico", desc: "Úsalo en casa, oficina o el auto." },
            ].map((feature, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={idx} 
                className="flex gap-4 items-start bg-zinc-900 p-5 rounded-2xl border border-zinc-800 shadow-lg"
              >
                <div className="bg-[#25F4EE]/10 p-2.5 rounded-full text-[#25F4EE] shrink-0 shadow-inner border border-[#25F4EE]/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white tracking-tight">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm mt-0.5">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Image Showcase */}
        <section className="py-12 bg-black border-t border-zinc-900">
          <div className="space-y-8 px-4 max-w-md mx-auto">
            
            {/* Uso Múltiple - Elementos Separados */}
            <div className="text-center mb-6 mt-4">
              <h3 className="text-4xl font-display font-black tracking-tight text-white mb-2">Uso Múltiple</h3>
              <p className="text-zinc-400 font-medium text-lg">Disfrútalo en todo tu cuerpo</p>
            </div>

            <div className="space-y-6">
              {/* Cuello */}
              <div className="bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 relative group">
                <img src="https://ae01.alicdn.com/kf/A994490424d3a47d7a5aeaac3cd04063aZ.jpg" alt="Cuello y Hombros" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-20">
                  <h4 className="text-2xl font-display font-black tracking-tight text-white drop-shadow-lg">Cuello y Hombros</h4>
                </div>
              </div>

              {/* Cintura */}
              <div className="bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 relative group">
                <img src="https://ae01.alicdn.com/kf/Ab5f7307e24404bf5b5fc9a72dbac5b4bk.jpg" alt="Cintura y Espalda" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-20">
                  <h4 className="text-2xl font-display font-black tracking-tight text-white drop-shadow-lg">Cintura y Espalda</h4>
                </div>
              </div>

              {/* Pantorrillas */}
              <div className="bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 relative group">
                <img src="https://ae01.alicdn.com/kf/A873008271bc44e3a9a150f7fd2c2ad99H.jpg" alt="Pantorrillas" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-20">
                  <h4 className="text-2xl font-display font-black tracking-tight text-white drop-shadow-lg">Pantorrillas</h4>
                </div>
              </div>

              {/* Muslos */}
              <div className="bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 relative group">
                <img src="https://ae01.alicdn.com/kf/A6c6cf5d04d5e4629a9a1cbba4c4fc64bD.jpg" alt="Muslos" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-20">
                  <h4 className="text-2xl font-display font-black tracking-tight text-white drop-shadow-lg">Muslos</h4>
                </div>
              </div>
            </div>

            {/* Alivia el Dolor - Elementos Separados */}
            <div className="text-center mb-6 mt-12">
              <h3 className="text-4xl font-display font-black tracking-tight text-white mb-3 leading-tight">Alivia el Dolor,<br/>Mejora tu Vida</h3>
              <p className="text-zinc-400 font-medium text-lg">Solución para cada molestia</p>
            </div>

            <div className="space-y-4">
              <div className="bg-zinc-900 rounded-3xl p-5 shadow-2xl border border-zinc-800 flex items-center gap-4 hover:border-[#FE2C55]/50 transition-colors">
                <div className="bg-[#FE2C55]/20 p-4 rounded-2xl text-[#FE2C55] shrink-0 border border-[#FE2C55]/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1 tracking-tight">Molestias en hombros y cuello</h4>
                  <p className="text-zinc-400 text-sm">Relaja la tensión acumulada por el estrés diario.</p>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-3xl p-5 shadow-2xl border border-zinc-800 flex items-center gap-4 hover:border-[#25F4EE]/50 transition-colors">
                <div className="bg-[#25F4EE]/20 p-4 rounded-2xl text-[#25F4EE] shrink-0 border border-[#25F4EE]/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1 tracking-tight">Dolor e hinchazón del trapecio</h4>
                  <p className="text-zinc-400 text-sm">Amasado profundo que desinflama el músculo.</p>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-3xl p-5 shadow-2xl border border-zinc-800 flex items-center gap-4 hover:border-[#FE2C55]/50 transition-colors">
                <div className="bg-[#FE2C55]/20 p-4 rounded-2xl text-[#FE2C55] shrink-0 border border-[#FE2C55]/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1 tracking-tight">Fatiga cervical</h4>
                  <p className="text-zinc-400 text-sm">Restaura la curva natural y alivia la pesadez.</p>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-3xl p-5 shadow-2xl border border-zinc-800 flex items-center gap-4 hover:border-[#25F4EE]/50 transition-colors">
                <div className="bg-[#25F4EE]/20 p-4 rounded-2xl text-[#25F4EE] shrink-0 border border-[#25F4EE]/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1 tracking-tight">Dolor de piernas</h4>
                  <p className="text-zinc-400 text-sm">Mejora la circulación y reduce la fatiga muscular.</p>
                </div>
              </div>
            </div>

            {/* Amasado Preciso */}
            <div className="bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">
              <div className="p-6 pb-4">
                <p className="text-zinc-400 font-medium text-sm leading-tight mb-3 text-center">Se adapta al arco del cuello, soporta eficazmente el cuello para mantener una buena postura</p>
                <h3 className="text-3xl font-display font-black tracking-tight text-white text-center">Amasado preciso</h3>
              </div>
              <div className="relative">
                <img src="https://ae01.alicdn.com/kf/A71d58f9e53fc46e39beba29def3aef82z.jpg" alt="Amasado Preciso" className="w-full object-cover" referrerPolicy="no-referrer" />
                {/* Overlays */}
                <div className="absolute top-[12%] left-2 bg-black/80 backdrop-blur-md text-white p-2.5 rounded-xl shadow-lg max-w-[150px] border border-white/10">
                  <p className="text-sm font-bold mb-0.5 text-[#25F4EE]">Ángulo de 45°</p>
                  <p className="text-[10px] opacity-90 leading-tight text-zinc-300">Adecuado para diferentes grosores</p>
                </div>
                <div className="absolute top-[35%] left-2 bg-black/80 backdrop-blur-md text-white p-2.5 rounded-xl shadow-lg max-w-[150px] border border-white/10">
                  <p className="text-sm font-bold mb-0.5 text-[#FE2C55]">Cabezal flexible</p>
                  <p className="text-[10px] opacity-90 leading-tight text-zinc-300">Se adapta a tu cuello</p>
                </div>
                <div className="absolute top-[58%] left-2 bg-black/80 backdrop-blur-md text-white p-2.5 rounded-xl shadow-lg max-w-[150px] border border-white/10">
                  <p className="text-sm font-bold mb-0.5 text-[#25F4EE]">Motor potente</p>
                  <p className="text-[10px] opacity-90 leading-tight text-zinc-300">Más potencia sin pausas</p>
                </div>
                <div className="absolute top-[81%] left-2 bg-black/80 backdrop-blur-md text-white p-2.5 rounded-xl shadow-lg max-w-[150px] border border-white/10">
                  <p className="text-sm font-bold mb-0.5 text-[#FE2C55]">Agarre octogonal</p>
                  <p className="text-[10px] opacity-90 leading-tight text-zinc-300">Masaje más fuerte y profundo</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Reseñas Interactivas */}
        <section className="py-12 bg-slate-950 border-t border-slate-900">
          <div className="max-w-md mx-auto">
            <div className="px-4 mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-display font-black text-white">Lo que dicen<br/>nuestros clientes</h3>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-slate-400 text-sm ml-2 font-medium">4.9/5 (128 reseñas)</span>
                </div>
              </div>
            </div>

            {/* Carousel Horizontal de Reseñas */}
            <div 
              ref={reviewsRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4 hide-scrollbar touch-pan-x -mx-4 sm:mx-0 sm:px-0"
            >
              {/* Spacer for padding inside scroll area on mobile */}
              <div className="w-1 shrink-0 sm:hidden"></div>
              {reviews.map((review, idx) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  key={review.id}
                  className="w-[85vw] max-w-[320px] bg-slate-900 p-5 rounded-3xl border border-slate-800 flex flex-col shadow-lg relative shrink-0 snap-center"
                >
                  {idx === 0 && (
                    <div className="absolute -top-3 -right-2 bg-[#FE2C55] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg transform rotate-6 z-10">
                      ¡Más útil!
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={review.avatar} 
                          alt={review.name} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-slate-700 shadow-inner"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute -bottom-1 -right-1">
                          <PlatformIcon platform={review.platform} />
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-bold text-base">{review.name}</p>
                        {review.verified && (
                          <div className="flex items-center gap-1 bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide mt-1 w-fit shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Certificado de Compra</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-700 text-slate-700'}`} 
                      />
                    ))}
                  </div>

                  <p className="text-slate-300 text-base leading-relaxed flex-grow italic">"{review.text}"</p>
                  <span className="text-slate-500 text-xs mt-3 block">{review.date}</span>
                </motion.div>
              ))}
              {/* Spacer for padding inside scroll area on mobile */}
              <div className="w-1 shrink-0 sm:hidden"></div>
            </div>
          </div>
        </section>

        {/* Order Form */}
        <form id="order-form" onSubmit={handleSubmit} className="p-6 bg-slate-950">
          <h2 className="text-3xl font-display font-black text-white mb-6 text-center">Completa tu pedido 📝</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">Nombre Completo</label>
              <input 
                required
                type="text" 
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
                placeholder="Ej. Juan Pérez"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">Teléfono / Celular</label>
              <input 
                required
                type="tel" 
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
                placeholder="Ej. 987654321"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">Ciudad</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
                  placeholder="Ej. Lima"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1">Distrito</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
                  placeholder="Ej. Miraflores"
                  value={formData.district}
                  onChange={e => setFormData({...formData, district: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">Dirección Exacta <span className="text-rose-500">*</span></label>
              <input 
                required
                type="text" 
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
                placeholder="Ej. Av. Larco 123, Dpto 402"
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">Coordenadas GPS o Link de Maps (Opcional)</label>
              <div className="space-y-3">
                <button 
                  type="button"
                  onClick={handleGetLocation}
                  disabled={isLocating || locationSuccess}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-colors ${locationSuccess ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'}`}
                >
                  {isLocating ? (
                    <span className="animate-pulse">Obteniendo ubicación...</span>
                  ) : locationSuccess ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" /> Ubicación guardada
                    </>
                  ) : (
                    <>
                      <MapPin className="w-5 h-5" /> Compartir mi ubicación actual
                    </>
                  )}
                </button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-800"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-slate-950 px-2 text-slate-500">O pega un link de Google Maps</span>
                  </div>
                </div>
                <input 
                  type="text" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
                  placeholder="Ej. https://maps.app.goo.gl/..."
                  value={formData.coordinates}
                  onChange={e => setFormData({...formData, coordinates: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">Referencia (Opcional)</label>
              <input 
                type="text" 
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
                placeholder="Frente al parque, casa verde"
                value={formData.reference}
                onChange={e => setFormData({...formData, reference: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">Horario de entrega</label>
              <select 
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
                value={formData.deliveryTime}
                onChange={e => setFormData({...formData, deliveryTime: e.target.value})}
              >
                <option value="Mañana (9:00 AM - 1:00 PM)">Mañana (9:00 AM - 1:00 PM)</option>
                <option value="Tarde (1:00 PM - 5:00 PM)">Tarde (1:00 PM - 5:00 PM)</option>
                <option value="Noche (5:00 PM - 9:00 PM)">Noche (5:00 PM - 9:00 PM)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">Cantidad</label>
              <select 
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
                value={formData.quantity}
                onChange={e => setFormData({...formData, quantity: e.target.value})}
              >
                <option value="1">1 Unidad - S/ 109.00</option>
                <option value="2">2 Unidades - S/ 209.00 (Mejor Oferta)</option>
                <option value="3">3 Unidades - S/ 299.00</option>
              </select>
            </div>

            <button 
              type="submit"
              className="group relative w-full bg-gradient-to-r from-[#FE2C55] to-[#ff2e5e] text-white text-xl font-display font-black py-4 rounded-2xl shadow-[0_4px_20px_rgba(254,44,85,0.5)] hover:shadow-[0_8px_25px_rgba(254,44,85,0.6)] hover:-translate-y-1 active:scale-95 transition-all duration-300 mt-6 uppercase tracking-wide flex items-center justify-center gap-2 overflow-hidden border border-white/20 animate-heartbeat"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              <span className="relative z-10 flex items-center gap-2 drop-shadow-md">Confirmar mi compra <ChevronRight className="w-6 h-6" /></span>
            </button>
            <p className="text-center text-slate-500 text-xs mt-4 flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Tus datos están seguros. Pago 100% contra entrega.
            </p>
          </div>
        </form>

        {/* FAQ Section */}
        <section className="py-12 bg-slate-50 px-4 border-t border-slate-200">
          <h2 className="text-3xl font-display font-black text-slate-900 mb-8 text-center">Preguntas Frecuentes</h2>
          <div className="space-y-3">
            {[
              {
                q: "¿Tengo que pagar por adelantado?",
                a: "¡No! Para tu total seguridad y confianza, pagas el 100% del valor del producto en efectivo o transferencia únicamente cuando lo recibes en la puerta de tu casa."
              },
              {
                q: "¿Cuánto demora el envío?",
                a: "Los envíos en Lima Metropolitana demoran de 24 a 48 horas. Para provincias, el tiempo estimado es de 2 a 4 días hábiles dependiendo de la agencia."
              },
              {
                q: "¿El producto tiene garantía?",
                a: "Sí, todos nuestros masajeadores cuentan con 3 meses de garantía por defectos de fábrica. Si tienes algún problema, te lo cambiamos sin costo."
              },
              {
                q: "¿Es inalámbrico o necesita estar conectado?",
                a: "El masajeador cuenta con una batería recargable de larga duración. Puedes usarlo de forma inalámbrica en cualquier lugar de tu casa, oficina o auto."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left flex justify-between items-center bg-white active:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-800 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer / Legal Links (Crucial for FB/TikTok Ads Compliance) */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4 mt-12 text-center text-sm">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-2">
            <a href="#" className="hover:text-white transition-colors">Políticas de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-white transition-colors">Políticas de Reembolso</a>
          </div>
          <p className="text-xs opacity-70 max-w-2xl">
            Este sitio no es parte del sitio web de Facebook o Facebook Inc. Además, este sitio NO está respaldado por Facebook de ninguna manera. FACEBOOK es una marca registrada de FACEBOOK, Inc.
          </p>
          <p className="text-xs opacity-70 mt-2">
            Contacto: soporte@tienda.com | WhatsApp: +51 919 749 480
          </p>
          <p className="text-xs opacity-50 mt-4">
            &copy; {new Date().getFullYear()} Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Floating Urgency Indicator for Mobile */}
      <FloatingUrgencyIndicator scrollToForm={scrollToForm} />
    </div>
  );
}
