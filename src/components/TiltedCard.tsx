import type { SpringOptions } from 'framer-motion';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface TiltedCardProps {
  imageSrc: React.ComponentProps<'img'>['src'];
  altText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties['height'];
  containerWidth?: React.CSSProperties['width'];
  imageHeight?: React.CSSProperties['height'];
  imageWidth?: React.CSSProperties['width'];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  className?: string;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  className = '',
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });
  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className="group xs:h-[80px] xs:w-[80px] relative flex aspect-square h-[70px] w-[70px] flex-col items-center justify-center [perspective:800px] sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px] lg:h-[140px] lg:w-[140px]"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 block text-center text-sm sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className={`relative [transform-style:preserve-3d] ` + className}
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="absolute top-0 left-0 z-2 h-full w-full [transform:translateZ(0)] rounded-[15px] object-cover transition duration-100 will-change-transform"
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        />
        {displayOverlayContent && overlayContent && (
          <motion.div
            className="absolute right-0 left-0 z-4 mx-auto w-fit [transform:translateZ(60px)] rounded-md bg-black p-1.5 text-center text-white opacity-80 will-change-transform"
            style={{
              top: '12%',
              boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.3)',
              textShadow: '0 0 3px rgba(255,255,255,0.5)',
            }}
          >
            {overlayContent}
          </motion.div>
        )}
      </motion.div>
    </figure>
  );
}
