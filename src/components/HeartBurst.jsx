"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const hearts = ["💕", "💖", "💗", "💓", "💘", "💝", "❤️", "🩷"]

export function useHeartBurst() {
    const [bursts, setBursts] = useState([])

    const triggerBurst = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2

        const newHearts = Array.from({ length: 12 }, (_, i) => ({
            id: Date.now() + i,
            x,
            y,
            heart: hearts[Math.floor(Math.random() * hearts.length)],
            angle: (i * 30) + Math.random() * 20,
            distance: 60 + Math.random() * 40,
            size: 16 + Math.random() * 12,
        }))

        setBursts(prev => [...prev, ...newHearts])

        setTimeout(() => {
            setBursts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)))
        }, 1000)
    }, [])

    const BurstContainer = () => (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            <AnimatePresence>
                {bursts.map((burst) => (
                    <motion.div
                        key={burst.id}
                        className="absolute"
                        style={{
                            left: burst.x,
                            top: burst.y,
                            fontSize: burst.size,
                        }}
                        initial={{ 
                            opacity: 1, 
                            scale: 0,
                            x: 0,
                            y: 0,
                        }}
                        animate={{ 
                            opacity: 0, 
                            scale: 1.2,
                            x: Math.cos(burst.angle * Math.PI / 180) * burst.distance,
                            y: Math.sin(burst.angle * Math.PI / 180) * burst.distance - 20,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                            duration: 0.8,
                            ease: "easeOut",
                        }}
                    >
                        {burst.heart}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )

    return { triggerBurst, BurstContainer }
}
