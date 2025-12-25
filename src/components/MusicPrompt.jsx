"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Music, Heart } from "lucide-react"

export default function MusicPrompt({ isOpen, onConfirm, onDecline }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative mx-4 p-8 rounded-3xl bg-gradient-to-br from-purple-900/90 to-pink-900/90 border border-white/20 backdrop-blur-xl shadow-2xl max-w-sm w-full text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-4 inline-block"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                <Music className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <h2 className="text-2xl font-bold text-white mb-2">
              Play Music? <Heart className="inline w-5 h-5 text-pink-400 fill-pink-400" />
            </h2>
            
            <p className="text-white/70 mb-6 text-sm">
              This experience is best with music. Would you like to turn it on?
            </p>

            <div className="flex gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onConfirm}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-pink-500/25 transition-all"
              >
                Yes, play!
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDecline}
                className="px-6 py-3 rounded-full bg-white/10 text-white/80 font-medium hover:bg-white/20 transition-all border border-white/20"
              >
                No thanks
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
