"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ScreenContainer from "../ScreenContainer"

export default function AnniversaryScreen({ onNext, triggerBurst }) {
    const [timeSince, setTimeSince] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    const specialDate = new Date("2025-01-20T15:15:00")

    const handleClick = (e) => {
        triggerBurst?.(e)
        onNext()
    }

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date()
            const diff = now.getTime() - specialDate.getTime()
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24))
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((diff % (1000 * 60)) / 1000)
            
            setTimeSince({ days, hours, minutes, seconds })
        }

        calculateTime()
        const interval = setInterval(calculateTime, 1000)
        
        return () => clearInterval(interval)
    }, [])

    return (
        <ScreenContainer>
            <div className="text-center max-w-3xl mx-auto">
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <motion.div 
                        className="w-36 h-36 md:w-40 md:h-40 mx-auto bg-pink-500/10 rounded-full flex items-center justify-center backdrop-blur-md border-2 border-pink-400/30 overflow-hidden"
                        animate={{
                            boxShadow: [
                                "0 0 30px rgba(236, 72, 153, 0.2)",
                                "0 0 60px rgba(236, 72, 153, 0.5)",
                                "0 0 30px rgba(236, 72, 153, 0.2)",
                            ],
                        }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    >
                        <img
                            src="/gifs/anniversary.gif"
                            alt="img"
                            className="w-28 md:w-32 object-cover rounded-full"
                        />
                    </motion.div>
                </motion.div>

                <motion.h1
                    className="text-4xl md:text-6xl font-bold text-pink-400 mb-8 text-balance leading-tight"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1.2 }}
                >
                    Happy Anniversary{" "}
                    <motion.span
                        className="text-purple-400"
                        animate={{
                            color: ["#c084fc", "#f472b6", "#c084fc"],
                        }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    >
                        Cutiepiee
                    </motion.span>
                </motion.h1>

                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1.2 }}
                >
                    <p className="text-xl md:text-2xl text-pink-200 mb-8 text-pretty">
                        We've been together for
                    </p>

                    <motion.div
                        className="flex flex-wrap justify-center gap-4 md:gap-8"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 2.2, duration: 1, type: "spring" }}
                    >
                        {[
                            { value: timeSince.days, label: "Days" },
                            { value: String(timeSince.hours).padStart(2, '0'), label: "Hours" },
                            { value: String(timeSince.minutes).padStart(2, '0'), label: "Minutes" },
                            { value: String(timeSince.seconds).padStart(2, '0'), label: "Seconds" },
                        ].map((item, index) => (
                            <motion.div
                                key={item.label}
                                className="flex flex-col items-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.4 + index * 0.2, duration: 0.8 }}
                            >
                                <motion.div 
                                    className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                                    animate={{
                                        textShadow: [
                                            "0 0 10px rgba(236, 72, 153, 0.3)",
                                            "0 0 25px rgba(236, 72, 153, 0.5)",
                                            "0 0 10px rgba(236, 72, 153, 0.3)",
                                        ],
                                    }}
                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                >
                                    {item.value}
                                </motion.div>
                                <span className="text-pink-300 text-sm md:text-base mt-2">{item.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.p 
                        className="text-xl md:text-2xl text-pink-200 mt-8 text-pretty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3.5, duration: 1 }}
                    >
                        and counting...
                    </motion.p>
                </motion.div>

                <motion.button
                    onClick={handleClick}
                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 4, duration: 1 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10">Continue Our Story 💫</span>
                </motion.button>
            </div>
        </ScreenContainer>
    )
}
