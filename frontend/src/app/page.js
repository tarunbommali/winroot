"use client";
import { motion } from "framer-motion";
import {
  Sparkles,
  Brush,
  Wrench,
  Scissors,
  Tv,
  UtensilsCrossed,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const accentColor = "text-indigo-500";

function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-800 flex flex-col items-center justify-center font-sans">
      {/* Hero Section */}
      <section className="text-center px-6 py-24 w-full">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-4xl md:text-6xl font-bold mb-4 text-gray-900"
        >
          WinRoot
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeInUp}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-600"
        >
          Your one-stop platform for trusted services and smart shopping —
          launching soon!
        </motion.p>
        <motion.button
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeInUp}
          disabled
          className="bg-indigo-500 text-white px-6 py-3 rounded-full text-lg font-medium cursor-not-allowed opacity-70"
        >
          🚧 Coming Soon
        </motion.button>
      </section>

      {/* Services */}
      <section className="w-full max-w-6xl px-6 py-16">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-3xl font-bold text-center mb-12 text-gray-800"
        >
          Our Services
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { title: "Home Cleaning", icon: <Sparkles size={32} className={accentColor} /> },
            { title: "Beauty at Home", icon: <Brush size={32} className={accentColor} /> },
            { title: "Appliance Repair", icon: <Wrench size={32} className={accentColor} /> },
          ].map((service, i) => (
            <motion.div
              key={service.title}
              custom={i + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition"
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">
                Trusted professionals at your doorstep.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="w-full max-w-6xl px-6 py-16">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-3xl font-bold text-center mb-12 text-gray-800"
        >
          Featured Products
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { title: "Grooming Kit", icon: <Scissors size={32} className={accentColor} /> },
            { title: "Smart LED", icon: <Tv size={32} className={accentColor} /> },
            { title: "Kitchen Set", icon: <UtensilsCrossed size={32} className={accentColor} /> },
          ].map((product, i) => (
            <motion.div
              key={product.title}
              custom={i + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition"
            >
              <div className="mb-4 flex justify-center">{product.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {product.title}
              </h3>
              <p className="text-gray-600 text-sm">
                Quality products for daily lifestyle needs.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-10 text-center text-sm text-gray-500">
        © 2025 WinRoot. All rights reserved.
      </footer>
    </main>
  );
}

export default Page;
