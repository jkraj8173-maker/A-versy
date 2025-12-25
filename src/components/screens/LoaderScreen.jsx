"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import ScreenContainer from "../ScreenContainer"

export default function LoaderScreen({ onComplete }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete()
        }, 5000)

        return () => clearTimeout(timer)
    }, [onComplete])

    return (
        <ScreenContainer>
            <div className="text-center">
                <motion.div
                    className="mb-8"
                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <motion.div
                        className="text-8xl mb-4 inline-block"
                        animate={{
                            scale: [1, 1.15, 1],
                            rotate: [0, 8, -8, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    >
                        💖
                    </motion.div>
                </motion.div>

                <motion.h1
                    className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1.2 }}
                >
                    Loading something special...
                </motion.h1>

                <motion.div
                    className="w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8, duration: 1 }}
                >
                    <motion.div
                        className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 2.2, duration: 2, ease: "easeInOut" }}
                    />
                </motion.div>

                <motion.div
                    className="mt-8 flex justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-3 h-3 bg-pink-400 rounded-full"
                            animate={{
                                y: [0, -15, 0],
                                opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                                duration: 1.2,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.2,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </motion.div>
            </div>
        </ScreenContainer>
    )
}
