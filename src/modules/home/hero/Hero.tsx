import ButtonLink from "@/components/ui/ButtonLink";

const Hero = () => {
  return (
    <div className="relative min-h-0 w-full flex-1 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute top-0 left-0 w-full h-full object-cover"
        poster="/home/desktop-cover.png"
      >
        <source src="/home/hero-video.mp4" type="video/mp4" />
        Tu navegador no soporta videos en HTML5.
      </video>
      <div className="absolute bottom-0 left-0 w-full h-64 md:h-56 pl-4 pr-4 pb-12 md:px-18 z-50 flex flex-col gap-6 md:flex-row justify-between bg-linear-to-t from-black/20 to-transparent">
        <div className="flex flex-col items-start justify-end h-full text-white gap-2">
          <p className="text-lg md:text-xl">New Collection</p>
          <h1 className="text-4xl md:text-5xl">
            Estar fuera.
            <br />
            Una manera muy nuestra de estar.
          </h1>
        </div>
        <div className="flex flex-row felx-start items-end gap-4">
          <ButtonLink href="/" variant="solid">Ver editorial</ButtonLink>
          <ButtonLink href="/" variant="outline">Ver productos</ButtonLink>
        </div>
      </div>
    </div>
  );
}

export default Hero