import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const features = [
  {
    title: 'Predictive Routing',
    description:
      'Navly learns your habits and adapts routes in real time, blending traffic, weather, and personal preferences for effortless travel.',
    accent: 'Live Insights'
  },
  {
    title: 'Immersive Map Layers',
    description:
      'Dive into multi-layer perspectives with ambient lighting, AR-ready overlays, and intelligent zoom levels tuned to how you navigate.',
    accent: 'Spatial Awareness'
  },
  {
    title: 'Voice-First Guidance',
    description:
      'Conversational prompts, contextual reminders, and a tone that feels human — Navly keeps you moving without missing a beat.',
    accent: 'Human-Centered'
  }
];

const highlights = [
  {
    label: 'Seamless Sync',
    detail: 'Works across iPhone, CarPlay, and Apple Watch from launch.'
  },
  {
    label: 'Privacy First',
    detail: 'Your journeys stay encrypted end-to-end. No compromises.'
  },
  {
    label: 'Built for Explorers',
    detail: 'Discover curated routes, hidden gems, and mindful detours.'
  }
];

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// Star Particle Component
function StarField({ count = 100 }) {
  const stars = Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.8 + 0.2,
    twinkleSpeed: Math.random() * 3 + 2
  }));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: star.twinkleSpeed,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}

// Solar System Component with Sun, Planets, and Moons
function SolarSystem({ scrollY }) {
  const [basePosition, setBasePosition] = useState({ x: 1200, y: 400 });

  useEffect(() => {
    const updatePosition = () => {
      setBasePosition({
        x: window.innerWidth * 0.75,
        y: window.innerHeight * 0.5
      });
    };
    
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  // Scale and opacity based on scroll
  const systemScale = useTransform(scrollY, [0, 1500], [0.8, 1.0], { clamp: true });
  const systemOpacity = useTransform(scrollY, [0, 500, 2500], [0.8, 0.95, 0.7], { clamp: true });

  // Planet configurations: {name, radius, orbitSpeed, color, size, hasMoons}
  const planets = [
    { name: 'Mercury', radius: 80, orbitSpeed: 0.88, color: 'rgba(139, 140, 142, 0.9)', size: 12 },
    { name: 'Venus', radius: 120, orbitSpeed: 0.62, color: 'rgba(255, 204, 102, 0.9)', size: 16 },
    { name: 'Earth', radius: 160, orbitSpeed: 0.38, color: 'rgba(59, 130, 246, 0.9)', size: 18, hasMoons: true },
    { name: 'Mars', radius: 200, orbitSpeed: 0.24, color: 'rgba(220, 38, 38, 0.9)', size: 14 },
    { name: 'Jupiter', radius: 260, orbitSpeed: 0.1, color: 'rgba(251, 191, 36, 0.9)', size: 32 },
    { name: 'Saturn', radius: 320, orbitSpeed: 0.08, color: 'rgba(251, 191, 36, 0.85)', size: 28 }
  ];

  // Calculate orbital progress for each planet (different speeds)
  const planetOrbits = planets.map((planet, index) => {
    const orbitProgress = useTransform(scrollY, [0, 3000], [index * 0.5, (index * 0.5) + Math.PI * 2 * planet.orbitSpeed]);
    return {
      ...planet,
      orbitProgress,
      x: useTransform(orbitProgress, (p) => Math.cos(p) * planet.radius),
      y: useTransform(orbitProgress, (p) => Math.sin(p) * planet.radius * 0.7) // Elliptical
    };
  });

  return (
    <motion.div
      className="pointer-events-none fixed -z-10"
      style={{
        left: basePosition.x,
        top: basePosition.y,
        scale: systemScale,
        opacity: systemOpacity
      }}
    >
      {/* Sun - Center */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative h-24 w-24 sm:h-32 sm:w-32"
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          {/* Sun Core */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 shadow-[0_0_60px_rgba(251,191,36,0.8),0_0_120px_rgba(251,146,60,0.6)]" />
          <motion.div
            className="absolute inset-[-20%] rounded-full blur-2xl"
            style={{
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(251, 146, 60, 0.3) 50%, transparent 100%)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>
      </div>

      {/* Orbital Paths */}
      {planets.map((planet) => (
        <motion.div
          key={`orbit-${planet.name}`}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            opacity: useTransform(scrollY, [0, 500], [0, 0.1], { clamp: true })
          }}
        >
          <svg width={planet.radius * 2.2} height={planet.radius * 1.54} className="opacity-20">
            <ellipse
              cx={planet.radius * 1.1}
              cy={planet.radius * 0.77}
              rx={planet.radius * 1.1}
              ry={planet.radius * 0.77}
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          </svg>
        </motion.div>
      ))}

      {/* Planets */}
      {planetOrbits.map((planet) => (
        <motion.div
          key={planet.name}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            x: useTransform(planet.x, (x) => `${x}px`),
            y: useTransform(planet.y, (y) => `${y}px`)
          }}
        >
          {/* Planet */}
          <motion.div
            className="relative rounded-full"
            style={{
              width: `${planet.size}px`,
              height: `${planet.size}px`,
              background: planet.color,
              boxShadow: `0 0 ${planet.size * 2}px ${planet.color}`
            }}
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: planet.name === 'Jupiter' ? 20 : planet.name === 'Saturn' ? 15 : 30,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {/* Special features for specific planets */}
            {planet.name === 'Earth' && (
              <>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/60 via-green-500/40 to-blue-600/60" />
                <div className="absolute top-[20%] left-[30%] h-[25%] w-[40%] rounded-full bg-green-600/50 blur-sm" />
                <div className="absolute bottom-[25%] right-[20%] h-[20%] w-[35%] rounded-full bg-green-600/40 blur-sm" />
              </>
            )}
            {planet.name === 'Jupiter' && (
              <>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/60 via-orange-300/50 to-amber-500/60" />
                <div className="absolute top-[10%] left-0 right-0 h-[8%] bg-orange-600/40 rounded-full" />
                <div className="absolute top-[30%] left-0 right-0 h-[6%] bg-amber-700/30 rounded-full" />
                <div className="absolute top-[50%] left-0 right-0 h-[7%] bg-orange-600/35 rounded-full" />
              </>
            )}
            {planet.name === 'Saturn' && (
              <>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300/60 via-amber-400/50 to-yellow-400/60" />
                {/* Saturn's rings */}
                <div className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[180%] h-[20%] border-2 border-yellow-200/30 rounded-full" />
                <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[160%] h-[15%] border border-yellow-300/20 rounded-full" />
              </>
            )}
          </motion.div>

          {/* Earth's Moons */}
          {planet.hasMoons && (
            <>
              {[0, Math.PI].map((offset, i) => {
                const moonOrbit = useTransform(
                  scrollY,
                  [0, 3000],
                  [offset, offset + Math.PI * 2 * 2] // Faster orbit
                );
                const moonX = useTransform(moonOrbit, (p) => Math.cos(p) * 28);
                const moonY = useTransform(moonOrbit, (p) => Math.sin(p) * 28);
                
                return (
                  <motion.div
                    key={`moon-${i}`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400"
                    style={{
                      width: '6px',
                      height: '6px',
                      x: useTransform(moonX, (x) => `${x}px`),
                      y: useTransform(moonY, (y) => `${y}px`),
                      boxShadow: '0 0 8px rgba(148, 163, 184, 0.6)'
                    }}
                  />
                );
              })}
            </>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Orbital Ring Component
function OrbitalRing({ radius, duration = 20, delay = 0, color = 'rgba(99, 102, 241, 0.3)' }) {
  return (
    <motion.div
      className="absolute rounded-full border"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        borderColor: color,
        borderWidth: '1px',
        left: '50%',
        top: '50%',
        x: '-50%',
        y: '-50%'
      }}
      animate={{
        rotate: 360
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
        delay
      }}
    />
  );
}

// Nebula Component
function Nebula({ scrollY, position = 'top' }) {
  const opacity = useTransform(
    scrollY,
    position === 'top' ? [0, 500, 1000] : [1000, 2000, 3000],
    position === 'top' ? [0.4, 0.6, 0.3] : [0.3, 0.5, 0.2],
    { clamp: true }
  );

  return (
    <motion.div
      className={`pointer-events-none fixed ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 right-0 h-96`}
      style={{
        opacity,
        background: `radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)`
      }}
    />
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.95, 0.98]);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Affiliated', id: 'affiliated' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <motion.nav
      style={{
        opacity: navbarOpacity
      }}
      className="fixed top-0 left-0 right-0 z-50 mx-auto w-full max-w-7xl px-6 pt-3 sm:px-10 lg:px-16"
    >
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-gradient-to-r from-slate-900/40 via-indigo-900/20 to-slate-900/40 px-5 py-2 backdrop-blur-xl transition-all duration-300 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
        <motion.button
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400/80 via-indigo-500/80 to-purple-600/80 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
            whileHover={{ boxShadow: '0 0 30px rgba(99, 102, 241, 0.8)' }}
          >
            <span className="text-base font-semibold tracking-tight text-white">N</span>
          </motion.div>
          <span className="text-base font-medium tracking-tight text-slate-100">Navly</span>
        </motion.button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <motion.button
              key={link.id}
              onClick={() => {
                scrollToSection(link.id);
                setIsOpen(false);
              }}
              className="relative px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-slate-100"
              whileHover={{ y: -1 }}
            >
              {link.label}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 shadow-[0_0_10px_rgba(99,102,241,0.6)]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 blur-sm"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 rounded-lg p-2 md:hidden"
          aria-label="Toggle menu"
        >
          <motion.span
            className="h-0.5 w-6 bg-slate-300"
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="h-0.5 w-6 bg-slate-300"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="h-0.5 w-6 bg-slate-300"
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
        className="mt-2 overflow-hidden rounded-full border border-white/10 bg-gradient-to-r from-slate-900/40 via-indigo-900/20 to-slate-900/40 backdrop-blur-xl md:hidden shadow-[0_0_30px_rgba(99,102,241,0.2)]"
      >
        <div className="flex flex-col gap-0.5 p-2">
          {navLinks.map((link) => (
            <motion.button
              key={link.id}
              onClick={() => {
                scrollToSection(link.id);
                setIsOpen(false);
              }}
              className="px-4 py-2 text-left text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-slate-100 rounded-lg"
              whileHover={{ x: 4 }}
            >
              {link.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}

function App() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const bg1Y = useTransform(scrollY, [0, 500], [0, -50]);
  const bg2Y = useTransform(scrollY, [0, 500], [0, 50]);
  const bg3Y = useTransform(scrollY, [0, 500], [0, -30]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-950 via-indigo-950/30 to-slate-950 text-slate-100">
      {/* Starfield Background */}
      <StarField count={150} />

      {/* Deep Space Background Layers */}
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.15)_0%,_transparent_50%),_radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.1)_0%,_transparent_50%)]" />
        <motion.div
          style={{ y: bg1Y }}
          className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"
        />
        <motion.div
          style={{ y: bg2Y }}
          className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl"
        />
        <motion.div
          style={{ y: bg3Y }}
          className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl"
        />
      </div>

      {/* Solar System */}
      <SolarSystem scrollY={scrollY} />

      {/* Nebula Effects */}
      <Nebula scrollY={scrollY} position="top" />
      <Nebula scrollY={scrollY} position="bottom" />

      <Navbar />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24 pb-16 sm:px-10 lg:px-16">
        {/* Hero Section */}
        <motion.section
          id="home"
          style={{ y: heroY, opacity: heroOpacity }}
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
          className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        >
          <motion.div variants={containerVariants} className="space-y-8">
            <motion.span variants={fadeIn} className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-900/20 px-4 py-1 text-xs uppercase tracking-[0.3em] text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              Coming Soon on iOS
            </motion.span>
            <motion.h1
              variants={fadeIn}
              className="max-w-2xl text-balance text-4xl font-semibold leading-tight text-slate-50 sm:text-5xl lg:text-6xl bg-gradient-to-r from-slate-100 via-indigo-200 to-purple-200 bg-clip-text text-transparent"
            >
              🚀 Navly — An intelligent GPS app coming soon.
            </motion.h1>
            <motion.h2
              variants={fadeIn}
              className="max-w-2xl text-balance text-2xl font-medium text-slate-200 sm:text-3xl"
            >
              Experience navigation reimagined.
            </motion.h2>
            <motion.p variants={fadeIn} className="max-w-xl text-lg text-slate-300 sm:text-xl">
              Intuitive, anticipatory, and crafted with the polish you expect from a premium Apple-grade experience.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col gap-4 sm:flex-row">
              <motion.a
                href="https://discord.gg/vze2zUEr3D"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)' }}
                whileTap={{ scale: 0.96 }}
                className="glow-hover inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 px-8 py-3 text-base font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.5)]"
              >
                Join Our Discord
              </motion.a>
              <motion.a
                href="https://duneworksstudios.org/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)' }}
                whileTap={{ scale: 0.96 }}
                className="glow-hover inline-flex items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-900/20 px-8 py-3 text-base font-semibold text-slate-100 backdrop-blur-sm shadow-[0_0_20px_rgba(99,102,241,0.2)]"
              >
                Visit Duneworks Studios
              </motion.a>
            </motion.div>

            <motion.div variants={fadeIn} className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -6, borderColor: 'rgba(99, 102, 241, 0.5)', boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' }}
                  className="rounded-2xl border border-indigo-500/20 bg-indigo-900/10 p-4 backdrop-blur-sm"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-indigo-300/80">{item.label}</p>
                  <p className="mt-2 text-sm text-slate-200/90">{item.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="relative overflow-hidden rounded-[2.75rem] border border-indigo-500/20 bg-gradient-to-br from-indigo-900/20 via-slate-950/40 to-purple-900/20 p-8 pb-24 backdrop-blur-xl shadow-[0_0_40px_rgba(99,102,241,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-blue-500/10" />
            <div className="absolute left-1/2 top-10 h-48 w-48 -translate-x-1/2 rounded-full bg-indigo-400/30 blur-3xl" />
            <div className="relative z-10 flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="text-sm text-slate-300/80">Live Journey</p>
                  <p className="text-3xl font-semibold text-white">Brooklyn → Manhattan</p>
                </div>
                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-200 shadow-[0_0_10px_rgba(16,185,129,0.3)]">ETA 12 min</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="glass-panel border-indigo-500/20 bg-indigo-900/10 p-4"
              >
                <div className="flex items-center justify-between text-sm text-slate-200/90">
                  <span>Next Turn</span>
                  <span className="text-indigo-300">Atlantic Ave • 500 ft</span>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-slate-800">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-4 text-xs text-slate-200/80 sm:grid-cols-2"
              >
                <div className="rounded-2xl border border-indigo-500/20 bg-indigo-900/20 p-4">
                  <p className="text-slate-400">Route Mode</p>
                  <p className="mt-1 text-lg font-semibold text-white">Adaptive • Flow</p>
                </div>
                <div className="rounded-2xl border border-indigo-500/20 bg-indigo-900/20 p-4">
                  <p className="text-slate-400">Ambient Conditions</p>
                  <p className="mt-1 text-lg font-semibold text-white">Clear Skies • 68°F</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.62, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-900/20 via-slate-950/20 to-purple-900/20 p-5 text-sm text-slate-300"
              >
                Navly surfaces meaningful context — from micro-climate shifts to calendar-aware reminders — so every drive feels effortless.
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-32 space-y-10"
        >
          <motion.div variants={fadeIn} className="max-w-2xl space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-indigo-400/70">Why Navly</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl bg-gradient-to-r from-slate-100 to-indigo-200 bg-clip-text text-transparent">
              Navigation, elevated for the next decade.
            </h2>
            <p className="text-base text-slate-300">
              Navly blends real-time intelligence with immersive visuals and human-centered guidance. Every interaction is purposeful, so you stay oriented and inspired on every journey.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                variants={fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-900/10 via-slate-950/20 to-purple-900/10 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(99,102,241,0.1)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-indigo-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 space-y-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-900/20 px-3 py-1 text-xs uppercase tracking-[0.35em] text-indigo-300/70">
                    {feature.accent}
                  </span>
                  <h3 className="text-xl font-semibold text-slate-50">{feature.title}</h3>
                  <p className="text-sm text-slate-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Affiliated Section */}
        <motion.section
          id="affiliated"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerChildren}
          className="mt-32 space-y-10"
        >
          <motion.div variants={fadeIn} className="max-w-3xl space-y-5">
            <p className="text-sm uppercase tracking-[0.35em] text-indigo-400/70">Affiliated & Partners</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl bg-gradient-to-r from-slate-100 to-indigo-200 bg-clip-text text-transparent">
              Crafted in partnership with industry leaders.
            </h2>
            <p className="text-base leading-relaxed text-slate-300">
              Navly is proudly made and powered by <strong className="font-semibold text-indigo-300">Duneworks Studios</strong>, in collaboration with our partner <strong className="font-semibold text-purple-300">MCP Studios</strong>. Together, we&apos;re merging design, data, and artistry into one seamless platform.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              variants={fadeIn}
              className="group relative overflow-hidden rounded-[2.5rem] border border-indigo-500/30 bg-gradient-to-br from-indigo-900/20 via-slate-950/30 to-purple-900/20 p-10 backdrop-blur-xl transition-all duration-500 hover:border-indigo-400/50 shadow-[0_0_40px_rgba(99,102,241,0.2)]"
            >
              {/* Orbital Rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <OrbitalRing radius={120} duration={25} delay={0} color="rgba(99, 102, 241, 0.3)" />
                <OrbitalRing radius={160} duration={30} delay={5} color="rgba(139, 92, 246, 0.2)" />
              </div>
              
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.35),_transparent_60%)]" />
              <div className="relative z-10 flex flex-col items-start gap-6 text-left">
                <div className="flex items-center gap-3 rounded-full border border-indigo-500/30 bg-indigo-900/30 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/70 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                  <motion.div
                    className="h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Duneworks Studios
                </div>
                <p className="text-lg text-slate-200">
                  Building soulful digital experiences that fuse cinematic design with adaptive intelligence.
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-slate-300">
                  <span className="rounded-full border border-indigo-500/20 bg-indigo-900/20 px-3 py-1">Design Systems</span>
                  <span className="rounded-full border border-indigo-500/20 bg-indigo-900/20 px-3 py-1">Spatial Computing</span>
                  <span className="rounded-full border border-indigo-500/20 bg-indigo-900/20 px-3 py-1">Emergent AI</span>
                </div>
                <motion.a
                  href="https://duneworksstudios.org/"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.03, x: 4 }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-indigo-300 hover:text-indigo-200"
                >
                  Explore Duneworks Studios →
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="group relative overflow-hidden rounded-[2.5rem] border border-purple-500/30 bg-gradient-to-br from-purple-900/20 via-slate-950/30 to-indigo-900/20 p-10 backdrop-blur-xl transition-all duration-500 hover:border-purple-400/50 shadow-[0_0_40px_rgba(139,92,246,0.2)]"
            >
              {/* Orbital Rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <OrbitalRing radius={120} duration={20} delay={0} color="rgba(139, 92, 246, 0.3)" />
                <OrbitalRing radius={160} duration={25} delay={7} color="rgba(99, 102, 241, 0.2)" />
              </div>
              
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.35),_transparent_60%)]" />
              <div className="relative z-10 flex flex-col items-start gap-6 text-left">
                <div className="flex items-center gap-3 rounded-full border border-purple-500/30 bg-purple-900/30 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/70 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                  <motion.div
                    className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  MCP Studios
                </div>
                <p className="text-lg text-slate-200">
                  Pioneering next-generation creative solutions and innovative technology partnerships.
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-slate-300">
                  <span className="rounded-full border border-purple-500/20 bg-purple-900/20 px-3 py-1">Creative Innovation</span>
                  <span className="rounded-full border border-purple-500/20 bg-purple-900/20 px-3 py-1">Tech Partnerships</span>
                  <span className="rounded-full border border-purple-500/20 bg-purple-900/20 px-3 py-1">Future Vision</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeIn}
          className="mt-32 rounded-[3rem] border border-indigo-500/20 bg-gradient-to-br from-indigo-900/20 via-slate-950/60 to-purple-900/20 p-10 text-center backdrop-blur-xl sm:p-16 shadow-[0_0_50px_rgba(99,102,241,0.2)]"
        >
          <div className="mx-auto max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-indigo-300/70">Stay in the Loop</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl bg-gradient-to-r from-slate-100 to-indigo-200 bg-clip-text text-transparent">
              Be first when Navly touches down on the App Store.
            </h2>
            <p className="text-base text-slate-300">
              Hop into our Discord to preview builds, shape upcoming features, and connect with explorers around the world.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <motion.a
                href="https://discord.gg/vze2zUEr3D"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 px-8 py-3 text-base font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.5)]"
              >
                Join Our Discord
              </motion.a>
              <motion.a
                href="https://duneworksstudios.org/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-900/20 px-8 py-3 text-base font-semibold text-slate-100 backdrop-blur-sm shadow-[0_0_20px_rgba(99,102,241,0.2)]"
              >
                Visit Duneworks Studios
              </motion.a>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-32 flex flex-col gap-4 border-t border-indigo-500/20 pt-8 text-center text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:text-left"
        >
          {/* Starfield Background for Footer */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg opacity-30">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 1.5 + 0.5}px`,
                  height: `${Math.random() * 1.5 + 0.5}px`,
                  opacity: Math.random() * 0.5 + 0.2
                }}
              />
            ))}
          </div>
          <p className="relative z-10 text-slate-300 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            Made and Powered by Duneworks Studios ⚡
          </p>
          <p className="relative z-10 text-slate-400/80">
            © {new Date().getFullYear()} Navly and Duneworks Studios. All rights reserved.
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
