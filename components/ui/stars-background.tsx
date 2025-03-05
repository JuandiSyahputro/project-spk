import * as motion from "motion/react-client";

const StarsBackground = () => (
  <div className="absolute inset-0 overflow-hidden h-screen hidden dark:block w-full">
    {/* Bintang-bintang */}
    <svg className="absolute w-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 1000 }).map((_, i) => (
        <motion.circle
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1, ease: "easeOut", repeat: Infinity, repeatDelay: i * 0.1, repeatType: "reverse" }}
          key={i}
          cx={Math.random() * 1000}
          cy={Math.random() * 1000}
          r={Math.random() * 2}
          fill="white"
        />
      ))}
    </svg>

    {/* Planet */}
    <svg className="absolute bottom-0 right-0 w-64 h-64" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="80" fill="#1E3A8A" /> {/* Warna planet biru tua */}
      <circle cx="120" cy="80" r="10" fill="#3B82F6" /> {/* Warna spot biru cerah */}
      <circle cx="80" cy="120" r="15" fill="#2563EB" /> {/* Warna spot biru sedang */}
    </svg>
  </div>
);

export default StarsBackground;
