import Image from "next/image"

type ProductGalleryProps = {
  title: string
  mainImage: string | null
  images: string[]
}

const ProductGallery = ({ title, mainImage, images }: ProductGalleryProps) => {
  if (!mainImage) {
    return <div className="aspect-4/5 w-full bg-neutral-100 md:aspect-square" />
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative aspect-4/5 w-full overflow-hidden bg-neutral-100 md:aspect-square">
        <Image
          src={mainImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover"
        />
      </div>

      {images.length > 0 ? (
        <ul className="hidden grid-cols-2 gap-2 md:grid lg:grid-cols-3">
          {images.map((src, index) => (
            <li
              key={`${src}-${index}`}
              className="relative aspect-square overflow-hidden bg-neutral-100"
            >
              <Image
                src={src}
                alt={`${title} — imagen ${index + 2}`}
                fill
                sizes="(max-width: 1024px) 25vw, 18vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default ProductGallery
