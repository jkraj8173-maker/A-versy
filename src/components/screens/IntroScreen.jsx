"use client"

import { motion } from "framer-motion"
import ScreenContainer from "../ScreenContainer"

export default function IntroScreen({ onNext, triggerBurst }) {
    const handleClick = (e) => {
        triggerBurst?.(e)
        onNext()
    }

    return (
        <ScreenContainer>
            <div className="text-center max-w-2xl mx-auto">
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, scale: 0.5, y: -30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold text-pink-400 mb-4 text-balance"
                        animate={{
                            textShadow: [
                                "0 0 20px rgba(236, 72, 153, 0.3)",
                                "0 0 40px rgba(236, 72, 153, 0.6)",
                                "0 0 20px rgba(236, 72, 153, 0.3)",
                            ],
                        }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    >
                        It's Our Special Day
                    </motion.h1>
                </motion.div>

                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 1.2 }}
                >
                    <motion.div 
                        className="w-36 h-36 md:w-40 md:h-40 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center backdrop-blur-md border-2 border-pink-400/30"
                        animate={{
                            boxShadow: [
                                "0 0 30px rgba(168, 85, 247, 0.2)",
                                "0 0 50px rgba(168, 85, 247, 0.4)",
                                "0 0 30px rgba(168, 85, 247, 0.2)",
                            ],
                        }}
                        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                        <img
                            src="/gifs/intro.gif"
                            alt="Cute romantic illustration"
                            className="w-28 md:w-32 object-cover"
                        />
                    </motion.div>
                </motion.div>

                <motion.p
                    className="text-xl md:text-2xl text-gray-300 mb-12 text-pretty"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 1.2 }}
                >
                    I made something special for you...
                </motion.p>

                <motion.button
                    onClick={handleClick}
                    className="group relative px-8 py-4 bg-pink-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.8, duration: 1 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
                        animate={{
                            background: [
                                "linear-gradient(45deg, #ec4899, #8b5cf6)",
                                "linear-gradient(45deg, #8b5cf6, #ec4899)",
                                "linear-gradient(45deg, #ec4899, #8b5cf6)",
                            ],
                        }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                    />

                    <span className="relative z-10 flex items-center gap-2">
                        Start Our Journey ✨
                    </span>
                </motion.button>
            </div>
        </ScreenContainer>
    )
}
