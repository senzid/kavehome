import MediaFrame from "@/components/ui/MediaFrame"

type ProductGalleryProps = {
  title: string
  mainImage: string | null
  images: string[]
}

const ProductGallery = ({ title, mainImage, images }: ProductGalleryProps) => {
  if (!mainImage) {
    return <MediaFrame className="md:aspect-square" />
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <MediaFrame
        src={mainImage}
        alt={title}
        priority
        sizes="(max-width: 768px) 100vw, 55vw"
        className="md:aspect-square"
      />

      {images.length > 0 ? (
        <ul className="hidden grid-cols-2 gap-2 md:grid lg:grid-cols-3">
          {images.map((src, index) => (
            <li key={`${src}-${index}`}>
              <MediaFrame
                src={src}
                alt={`${title} — imagen ${index + 2}`}
                aspect="square"
                sizes="(max-width: 1024px) 25vw, 18vw"
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default ProductGallery
