"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ScreenContainer from "../ScreenContainer"

export default function MessageScreen({ triggerBurst, musicEnabled, onMusicStart, onMusicStop }) {
    const [showOverlay, setShowOverlay] = useState(false)
    const [displayedText, setDisplayedText] = useState("")
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const audioRef = useRef(null)
    const scrollRef = useRef(null)

    const romanticMessage = `My Dearest Cutiepiee,

Every day with you feels like a beautiful dream that I never want to wake up from. You've brought so much joy, laughter, and warmth into my life that I can't imagine a world without you in it.

From the moment we first met, I knew there was something special about you. Your smile lights up my darkest days, your laugh is my favorite sound in the world, and your love has made me a better person.

Thank you for being my partner, my best friend, and my greatest love. Thank you for all the little moments that make up our big love story - the morning coffees, the late-night conversations, the silly jokes, and the quiet moments where we just exist together in perfect harmony.

I promise to love you through all of life's adventures, to support your dreams, to laugh with you, cry with you, and grow old with you. You are my today, my tomorrow, and my always.

Happy Anniversary, my beautiful soul. Here's to many more years of love, laughter, and endless happiness together.

With all my love and devotion,
Your Dudu`

    const startMusic = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0
            audioRef.current.play().catch(() => {})
            onMusicStart?.()
            const fadeInterval = setInterval(() => {
                if (audioRef.current && audioRef.current.volume < 0.7) {
                    audioRef.current.volume = Math.min(1, audioRef.current.volume + 0.05)
                } else {
                    clearInterval(fadeInterval)
                }
            }, 100)
        }
    }

    const stopMusic = () => {
        if (audioRef.current && audioRef.current.volume > 0) {
            const audio = audioRef.current
            const fadeInterval = setInterval(() => {
                if (audio.volume > 0.05) {
                    audio.volume = Math.max(0, audio.volume - 0.05)
                } else {
                    audio.volume = 0
                    audio.pause()
                    onMusicStop?.()
                    clearInterval(fadeInterval)
                }
            }, 100)
        }
    }

    useEffect(() => {
        if (musicEnabled) {
            const timer = setTimeout(() => {
                startMusic()
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [musicEnabled])

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.volume = 0
            }
        }
    }, [])

    const handleCardClick = (e) => {
        triggerBurst?.(e)
        setShowOverlay(true)
        setDisplayedText("")
        setIsTypingComplete(false)
    }

    const closeOverlay = () => {
        setShowOverlay(false)
        setDisplayedText("")
        setIsTypingComplete(false)
    }

    useEffect(() => {
        if (showOverlay && displayedText.length < romanticMessage.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(romanticMessage.slice(0, displayedText.length + 1))
            }, 35)
            return () => clearTimeout(timeout)
        } else if (displayedText.length === romanticMessage.length) {
            setIsTypingComplete(true)
        }
    }, [showOverlay, displayedText, romanticMessage])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [displayedText])

    const handleSendLove = (e) => {
        triggerBurst?.(e)
        setTimeout(() => {
            window.open("https://instagram.com/jk_rajsingh", "_blank")
        }, 300)
    }

    return (
        <ScreenContainer>
            <audio ref={audioRef} src="/mannat.mp3" loop />
            <div className="w-full max-w-4xl mx-auto text-center relative">
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                >
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 bg-clip-text text-transparent mb-4 text-balance leading-tight"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                    >
                        A Special Message For You
                    </motion.h1>
                </motion.div>

                <motion.div
                    className="relative group mb-8"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1, duration: 1.2 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.6 }}
                        onClick={handleCardClick}
                        className="w-80 h-48 mx-auto bg-gradient-to-br from-pink-900/40 via-purple-900/40 to-pink-800/40 backdrop-blur-lg rounded-2xl border-2 border-pink-400/50 shadow-2xl relative overflow-hidden cursor-pointer"
                    >
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" 
                        />
                        <motion.div
                            className="absolute inset-0"
                            animate={{
                                boxShadow: [
                                    "inset 0 0 30px rgba(236, 72, 153, 0.1)",
                                    "inset 0 0 50px rgba(236, 72, 153, 0.3)",
                                    "inset 0 0 30px rgba(236, 72, 153, 0.1)",
                                ],
                            }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        />

                        <div className="flex flex-col items-center justify-center h-full p-6 relative z-10">
                            <motion.div
                                className="text-6xl mb-4"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 8, -8, 0],
                                }}
                                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                            >
                                💌
                            </motion.div>

                            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                For You, My Cutiepiee
                            </h3>

                            <motion.p 
                                className="text-purple-300 text-sm"
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            >
                                Click to read my message
                            </motion.p>
                        </div>
                    </motion.div>
                </motion.div>

                <AnimatePresence>
                    {showOverlay && (
                        <motion.div
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            exit={{ opacity: 0 }}
                            onClick={closeOverlay}
                        >
                            <motion.div
                                className="w-full max-w-2xl bg-gradient-to-b from-purple-950/50 via-black/90 to-pink-950/50 rounded-2xl shadow-2xl border-2 border-pink-400/40 p-8 relative"
                                initial={{ scale: 0.7, opacity: 0, y: 60 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.7, opacity: 0, y: 60 }}
                                transition={{ duration: 0.6 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={closeOverlay}
                                    className="absolute top-4 right-4 text-pink-400 hover:text-pink-300 text-2xl transition-colors duration-300"
                                >
                                    ×
                                </button>

                                <motion.div 
                                    className="text-center mb-6"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                >
                                    <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                        Happy Anniversary!
                                    </h3>
                                    <p className="text-purple-300">This is just for you, Aradhya</p>
                                </motion.div>

                                <div
                                    ref={scrollRef}
                                    className="h-72 overflow-y-auto pr-4 mb-6"
                                    style={{
                                        scrollbarWidth: "thin",
                                        scrollbarColor: "rgba(236, 72, 153, 0.5) rgba(0, 0, 0, 0.2)",
                                    }}
                                >
                                    <div className="text-sm text-pink-100 leading-relaxed text-left whitespace-pre-line">
                                        {displayedText}
                                        {!isTypingComplete && (
                                            <motion.span 
                                                className="inline-block w-0.5 h-4 bg-pink-400 ml-1"
                                                animate={{ opacity: [1, 0, 1] }}
                                                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                                            />
                                        )}
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {isTypingComplete && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8 }}
                                            className="text-center"
                                        >
                                            <motion.button
                                                onClick={handleSendLove}
                                                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-500"
                                                whileHover={{ scale: 1.08 }}
                                                whileTap={{ scale: 0.95 }}
                                                animate={{
                                                    boxShadow: [
                                                        "0 0 20px rgba(236, 72, 153, 0.4)",
                                                        "0 0 50px rgba(236, 72, 153, 0.7)",
                                                        "0 0 20px rgba(236, 72, 153, 0.4)",
                                                    ],
                                                }}
                                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                            >
                                                Send Love to Dudu
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </ScreenContainer>
    )
}
