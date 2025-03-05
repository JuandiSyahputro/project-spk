// File: app/not-found.tsx

import Link from "next/link";
import * as motion from "motion/react-client";
import StarsBackground from "@/components/ui/stars-background";

export default function NotFound() {
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden  dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 text-gray-900`}>
      {/* Background Galaxy (hanya muncul di dark mode) */}
      <StarsBackground />

      {/* Container untuk konten */}
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center relative z-10">
        {/* Judul */}
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 100 }} className="text-9xl font-bold mb-4">
          <motion.div className="inline-flex" initial={{ y: -20 }} animate={{ y: 0 }} transition={{ delay: 5, duration: 0.5, repeat: Infinity, repeatDelay: 1.5, repeatType: "reverse" }}>
            4
          </motion.div>
          <motion.div className="inline-flex" initial={{ y: -20 }} animate={{ y: 0 }} transition={{ delay: 5, duration: 1, repeat: Infinity, repeatDelay: 1, repeatType: "reverse" }}>
            0
          </motion.div>
          <motion.div className="inline-flex" initial={{ y: -20 }} animate={{ y: 0 }} transition={{ delay: 5, duration: 1.5, repeat: Infinity, repeatDelay: 0.5, repeatType: "reverse" }}>
            4
          </motion.div>
        </motion.div>

        {/* Pesan */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }} className="text-2xl mb-8">
          Oops! Halaman yang Anda cari tidak ditemukan.
        </motion.p>

        {/* Tombol Kembali ke Beranda */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.5 }}>
          <Link href="/" className={`inline-block px-6 py-3 rounded-lg font-semibold transition-colors duration-300dark:bg-white dark:hover:text-purple-900 dark:hover:bg-purple-100 bg-blue-600 text-white hover:bg-blue-700`}>
            Kembali
          </Link>
        </motion.div>
      </motion.div>

      {/* Animasi Bintang (hanya muncul di dark mode) */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="absolute hidden dark:block bottom-8 text-sm text-gray-300 z-10">
        <p>✨ Anda tersesat di antariksa! ✨</p>
      </motion.div>
    </div>
  );
}
