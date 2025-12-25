"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import ScreenContainer from '../ScreenContainer';

export default function PhotoGalleryScreen({ onNext, triggerBurst }) {
    const photos = [
        "/images/1.jpg",
        "/images/2.jpg",
        "/images/3.jpg",
        "/images/4.jpg",
    ]

    const [details, setDetails] = React.useState(null)

    const [sliderRef] = useKeenSlider({
        loop: true,
        detailsChanged(s) {
            setDetails(s.track.details)
        },
        initial: 2,
    })

    function scaleStyle(idx) {
        if (!details) return {}
        const slide = details.slides[idx]
        const scale_size = 0.7
        const scale = 1 - (scale_size - scale_size * slide.portion)
        return {
            transform: `scale(${scale})`,
            WebkitTransform: `scale(${scale})`,
        }
    }

    const handleClick = (e) => {
        triggerBurst?.(e)
        onNext()
    }

    return (
        <ScreenContainer>
            <motion.section
                className="flex items-center justify-center py-8 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                <div className="max-w-4xl mx-auto flex flex-col items-center justify-center w-full">
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 text-balance text-center leading-tight"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                    >
                        Our Beautiful Memories
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1.2 }}
                        className="text-white/60 mb-4"
                    >
                        (Swipe for more)
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 1.2 }}
                        className='flex h-90 w-80 sm:h-100 sm:w-90'>
                        <div ref={sliderRef} className="zoom-out keen-slider cursor-grab active:cursor-grabbing">
                            {photos.map((photo, index) => (
                                <div key={index} className="keen-slider__slide zoom-out__slide p-4">
                                    <div className="relative w-full h-full p-2 bg-purple-500/10 rounded-2xl flex items-center justify-center backdrop-blur-md border-2 border-pink-400/30 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                                        <Image
                                            src={photo}
                                            fill
                                            sizes="400px"
                                            alt={`Memory ${index + 1}`}
                                            className="w-full h-full object-contain p-2 rounded-xl"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.8 }}
                                            loading="lazy"
                                            style={scaleStyle(index)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.button
                        onClick={handleClick}
                        className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex mx-auto mt-8"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.5, duration: 1 }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                    >
                         <motion.div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative z-10">Read My Message 💌</span>
                    </motion.button>
                </div>
            </motion.section>
        </ScreenContainer>
    );
}
