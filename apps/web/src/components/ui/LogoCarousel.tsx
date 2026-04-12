import Image from 'next/image'

const CLIENT_LOGOS = [
  { src: '/logos/clients/on-running.webp', alt: 'On Running' },
  { src: '/logos/clients/hyundai.svg', alt: 'Hyundai' },
  { src: '/logos/clients/guilds.webp', alt: 'Guilds' },
  { src: '/logos/clients/canon.png', alt: 'Canon' },
  { src: '/logos/clients/swae-lee.webp', alt: 'Swae Lee' },
  { src: '/logos/clients/porsche.svg', alt: 'Porsche' },
  { src: '/logos/clients/wonderful-indonesia.webp', alt: 'Wonderful Indonesia' },
  { src: '/logos/clients/gamestop.png', alt: 'GameStop' },
  { src: '/logos/clients/art-villas.webp', alt: 'Art Villas' },
  { src: '/logos/clients/walmart.svg', alt: 'Walmart' },
  { src: '/logos/clients/mile-end.webp', alt: 'Mile End' },
  { src: '/logos/clients/dji.png', alt: 'DJI' },
  { src: '/logos/clients/mrs-sippy.webp', alt: 'Mrs Sippy' },
  { src: '/logos/clients/polarpro.png', alt: 'PolarPro' },
  { src: '/logos/clients/rotary.png', alt: 'Rotary' },
  { src: '/logos/clients/smallrig.webp', alt: 'SmallRig' },
]

function LogoRow() {
  return (
    <div className="flex shrink-0 items-center gap-16 pr-16">
      {CLIENT_LOGOS.map(({ src, alt }) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          width={160}
          height={54}
          className="h-11 w-auto object-contain opacity-70 grayscale"
        />
      ))}
    </div>
  )
}

/**
 * Continuous marquee of client logos with faded edges.
 * Two copies of the logo row animate side-by-side for seamless looping.
 */
export function LogoCarousel() {
  return (
    <div
      className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, transparent 5%, black 18%, black 82%, transparent 95%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 5%, black 18%, black 82%, transparent 95%, transparent 100%)',
      }}
    >
      {/* Scrolling track — two copies for seamless loop */}
      <div className="flex w-max animate-marquee">
        <LogoRow />
        <LogoRow />
      </div>
    </div>
  )
}
