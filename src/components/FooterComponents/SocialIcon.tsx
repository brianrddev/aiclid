type SocialIconProps = {
  iconSrc: string;
  href?: string;
  alt?: string;
}

export default function SocialIcon({ iconSrc, href = "#", alt = "Social media icon" }: SocialIconProps) {
  return (
    <div className="m-1 h-9 w-9 rounded-full border-2 border-white leading-normal text-white uppercase hover:bg-black hover:bg-opacity-5">
      <a type="button" className="flex items-center justify-center h-full" href={href}>
        <img 
          src={iconSrc}
          alt={alt}
          className="mx-auto h-4 w-4"
        />
      </a>
    </div>
  );
}
