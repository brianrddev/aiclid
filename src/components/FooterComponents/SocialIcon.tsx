type SocialIconProps = {
  iconSrc: string;
  href?: string;
  alt?: string;
};

export default function SocialIcon({
  iconSrc,
  href = '#',
  alt = 'Social media icon',
}: SocialIconProps) {
  return (
    <div className="hover:bg-opacity-5 m-1 h-9 w-9 rounded-full leading-normal text-white uppercase hover:bg-black">
      <a
        type="button"
        className="flex h-full items-center justify-center"
        href={href}
      >
        <img src={iconSrc} alt={alt} className="mx-auto h-4 w-4" />
      </a>
    </div>
  );
}
