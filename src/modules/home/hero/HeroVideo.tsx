"use client"

import { useEffect, useRef, useState } from "react"

const playIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className="size-4"
  >
    <path
      d="M5.5 3V21L18.5 12L5.5 3Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const pauseIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className="size-4"
  >
    <path
      d="M7.97058 3V21M15.9706 3V21"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const HeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause()
      setIsPlaying(false)
      return
    }
    setIsPlaying(!video.paused)
  }, [])

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute top-0 left-0 h-full w-full object-cover"
        poster="/home/desktop-cover.png"
        aria-label="Vídeo de la nueva colección"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/home/hero-video.mp4" type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pausar vídeo" : "Reproducir vídeo"}
        className="absolute bottom-1 right-1 z-30 bg-white/40 p-1.5 text-black/60 hover:bg-white/50 md:bottom-3 md:right-3"
      >
        {isPlaying ? pauseIcon : playIcon}
      </button>
    </>
  )
}

export default HeroVideo
