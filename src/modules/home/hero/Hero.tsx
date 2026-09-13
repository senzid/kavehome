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
        className="absolute top-0 left-0 h-full w-full object-cover"
        poster="/home/desktop-cover.png"
      >
        <source src="/home/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute bottom-0 left-0 z-20 flex h-64 w-full flex-col justify-between gap-6 bg-linear-to-t from-black/20 to-transparent pb-12 pl-4 pr-4 md:h-56 md:flex-row md:px-18">
        <div className="flex h-full flex-col items-start justify-end gap-2 text-white">
          <p className="text-lg md:text-xl">New Collection</p>
          <h1 className="text-4xl md:text-5xl">
            Estar fuera.
            <br />
            Una manera muy nuestra de estar.
          </h1>
        </div>
        <div className="flex flex-row items-end gap-4">
          <ButtonLink href="/products" variant="solid">
            Ver editorial
          </ButtonLink>
          <ButtonLink href="/products" variant="solid">
            Ver productos
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};

export default Hero;
