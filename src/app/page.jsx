"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LoaderScreen from "@/components/screens/LoaderScreen"
import IntroScreen from "@/components/screens/IntroScreen"
import AnniversaryScreen from "@/components/screens/AnniversaryScreen"
import PhotoGalleryScreen from "@/components/screens/PhotoGalleryScreen"
import MessageScreen from "@/components/screens/MessageScreen"
import { useHeartBurst } from "@/components/HeartBurst"
import MusicButton from "@/components/MusicButton"
import MusicPrompt from "@/components/MusicPrompt"

export default function AnniversaryApp() {
  const [currentScreen, setCurrentScreen] = useState("loader")
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [showMusicPrompt, setShowMusicPrompt] = useState(false)
  const [promptHandled, setPromptHandled] = useState(false)
  const [musicEnabled, setMusicEnabled] = useState(false)
  const bgMusicRef = useRef(null)
  const { triggerBurst, BurstContainer } = useHeartBurst()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!promptHandled) {
        setShowMusicPrompt(true)
      }
    }, 1500)
    return () => clearTimeout(timer)
  }, [promptHandled])

  const fadeOutBgMusic = () => {
    return new Promise((resolve) => {
      if (bgMusicRef.current && bgMusicRef.current.volume > 0) {
        const audio = bgMusicRef.current
        const fadeInterval = setInterval(() => {
          if (audio.volume > 0.05) {
            audio.volume = Math.max(0, audio.volume - 0.05)
          } else {
            audio.volume = 0
            audio.pause()
            setMusicPlaying(false)
            clearInterval(fadeInterval)
            resolve()
          }
        }, 100)
      } else {
        resolve()
      }
    })
  }

  const startBgMusic = () => {
    if (bgMusicRef.current && !musicPlaying) {
      bgMusicRef.current.volume = 0
      bgMusicRef.current.play().catch(() => {})
      const fadeInterval = setInterval(() => {
        if (bgMusicRef.current && bgMusicRef.current.volume < 0.7) {
          bgMusicRef.current.volume = Math.min(1, bgMusicRef.current.volume + 0.05)
        } else {
          clearInterval(fadeInterval)
        }
      }, 100)
      setMusicPlaying(true)
    }
  }

  const toggleMusic = () => {
    if (musicPlaying) {
      fadeOutBgMusic()
      setMusicEnabled(false)
    } else {
      if (currentScreen !== "message") {
        startBgMusic()
      }
      setMusicEnabled(true)
    }
  }

  const handleMusicConfirm = () => {
    setShowMusicPrompt(false)
    setPromptHandled(true)
    setMusicEnabled(true)
    startBgMusic()
  }

  const handleMusicDecline = () => {
    setShowMusicPrompt(false)
    setPromptHandled(true)
    setMusicEnabled(false)
  }

  const goToIntro = () => {
    setCurrentScreen("intro")
  }
  const goToAnniversary = () => setCurrentScreen("anniversary")
  const goToGallery = () => setCurrentScreen("gallery")
  
  const goToMessage = async () => {
    await fadeOutBgMusic()
    setCurrentScreen("message")
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-black to-purple-950 overflow-hidden">
      <audio ref={bgMusicRef} src="/arz-kiya-hai.mp3" loop />
      <BurstContainer />

      <MusicPrompt 
        isOpen={showMusicPrompt} 
        onConfirm={handleMusicConfirm} 
        onDecline={handleMusicDecline} 
      />

      <MusicButton isPlaying={musicPlaying} onClick={toggleMusic} />

      <AnimatePresence mode="wait">
        {currentScreen === "loader" && <LoaderScreen key="loader" onComplete={goToIntro} />}
        {currentScreen === "intro" && <IntroScreen key="intro" onNext={goToAnniversary} triggerBurst={triggerBurst} />}
        {currentScreen === "anniversary" && <AnniversaryScreen key="anniversary" onNext={goToGallery} triggerBurst={triggerBurst} />}
        {currentScreen === "gallery" && <PhotoGalleryScreen key="gallery" onNext={goToMessage} triggerBurst={triggerBurst} />}
        {currentScreen === "message" && (
          <MessageScreen 
            key="message" 
            triggerBurst={triggerBurst} 
            musicEnabled={musicEnabled}
            onMusicStart={() => setMusicPlaying(true)}
            onMusicStop={() => setMusicPlaying(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 2,
          delay: 2,
        }}
        className="fixed bottom-4 right-4 text-[13px] text-white/40 pointer-events-none z-50 font-light">
        Made with love by Jeet
      </motion.div>
    </div>
  )
}
