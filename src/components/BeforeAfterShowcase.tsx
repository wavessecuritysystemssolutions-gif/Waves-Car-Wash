import {useState} from 'react';
import {MoveHorizontal, Sparkles} from 'lucide-react';
import {IMAGES} from '../data/wavesData';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#081B33] via-[#0F294A] to-[#0284C7] text-white p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sparkles className="w-8 h-8 text-[#00B4D8] mb-2" aria-hidden="true" />
        <span className="text-sm font-display font-medium text-slate-200">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

const GALLERY_ITEMS = [
  {
    src: IMAGES.hero,
    alt: 'Doorstep car wash in Chennai driveway with snow foam and pressure washer',
    caption: 'Doorstep Pressure & Foam Setup',
    detail: 'Home driveway wash · Self-contained unit',
  },
  {
    src: IMAGES.foamWash,
    alt: 'Snow foam rinse on SUV alloy wheels and wheel arches',
    caption: 'Wheel Arch & Alloy Foam Clean',
    detail: 'pH-neutral snow foam · Brake dust removal',
  },
  {
    src: IMAGES.interiorVacuum,
    alt: 'Interior vacuuming and leather seat detailing in Chennai',
    caption: 'Interior Vacuum & Cabin Wipe-Down',
    detail: 'Upholstery extraction · Console detailing',
  },
];

export function BeforeAfterShowcase() {
  const [sliderPos, setSliderPos] = useState(52);

  return (
    <div className="space-y-10">
      {/* Interactive Before & After Slider */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-xl font-display font-semibold text-[#081B33]">
              Before &amp; After Doorstep Wash Comparison
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Drag the divider to compare Chennai road dust buildup against a freshly washed, detailed finish.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 shrink-0">
            <button
              type="button"
              onClick={() => setSliderPos(15)}
              className="px-3 py-1.5 rounded-md border border-slate-200 hover:border-[#00B4D8] hover:text-[#081B33] transition-colors whitespace-nowrap"
            >
              Show After
            </button>
            <button
              type="button"
              onClick={() => setSliderPos(50)}
              className="px-3 py-1.5 rounded-md border border-slate-200 hover:border-[#00B4D8] hover:text-[#081B33] transition-colors whitespace-nowrap"
            >
              Split 50/50
            </button>
            <button
              type="button"
              onClick={() => setSliderPos(85)}
              className="px-3 py-1.5 rounded-md border border-slate-200 hover:border-[#00B4D8] hover:text-[#081B33] transition-colors whitespace-nowrap"
            >
              Show Before
            </button>
          </div>
        </div>

        <div className="relative w-full aspect-[16/9] max-h-[520px] rounded-xl overflow-hidden bg-[#081B33] select-none">
          {/* Base Layer: After (Clean Glossy Finish) */}
          <ImageWithFallback
            src={IMAGES.afterGloss}
            alt="Sedan exterior after Waves Car Wash doorstep cleaning and detailing"
            fallbackTitle="After Wash — Glossy Exterior Finish"
            className="w-full h-full object-cover"
          />

          {/* Overlay Layer: Before (Dusty Vehicle, clipped by sliderPos) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{clipPath: `inset(0 ${100 - sliderPos}% 0 0)`}}
          >
            <ImageWithFallback
              src={IMAGES.beforeDusty}
              alt="Sedan exterior covered in Chennai road dust before doorstep wash"
              fallbackTitle="Before Wash — Road Dust & Grime"
              className="w-full h-full object-cover scale-x-[-1]"
            />
          </div>

          {/* Crisp Labels */}
          <div className="pointer-events-none absolute top-4 left-4 bg-[#081B33]/85 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-md">
            Before Wash
          </div>
          <div className="pointer-events-none absolute top-4 right-4 bg-[#0284C7]/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-md">
            After Waves Wash
          </div>

          {/* Divider Line & Handle */}
          <div
            className="pointer-events-none absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)]"
            style={{left: `${sliderPos}%`}}
          >
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-[#081B33] shadow-lg border border-slate-200 flex items-center justify-center">
              <MoveHorizontal className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>

          {/* Accessible Range Input Overlay */}
          <input
            type="range"
            min={0}
            max={100}
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            aria-label="Slide to compare car exterior before and after wash"
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
          />
        </div>
      </div>

      {/* 3-Column Photo Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GALLERY_ITEMS.map((item) => (
          <figure
            key={item.caption}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <ImageWithFallback
                src={item.src}
                alt={item.alt}
                fallbackTitle={item.caption}
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
              />
            </div>
            <figcaption className="p-4">
              <p className="font-display font-semibold text-base text-[#081B33]">
                {item.caption}
              </p>
              <p className="mt-1 text-xs text-slate-500">{item.detail}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
