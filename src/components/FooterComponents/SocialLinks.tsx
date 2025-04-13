import SocialIcon from './SocialIcon';

export default function SocialLinks() {
  return (
    <div className="mb-6 flex w-full justify-center">
      {/* Twitter/X */}
      <SocialIcon 
        iconSrc="/socials/github_dark.svg" 
        href="" 
        alt="Twitter"
      />
      
      {/* GitHub */}
      <SocialIcon 
        iconSrc="/socials/github_dark.svg" 
        href="" 
        alt="GitHub"
      />
      
      {/* Instagram */}
      <SocialIcon 
        iconSrc="/socials/instagram_dark.svg" 
        href="" 
        alt="Instagram"
      />
      
      {/* LinkedIn */}
      <SocialIcon 
        iconSrc="/socials/linkedin.svg" 
        href="" 
        alt="LinkedIn"
      />
    </div>
  );
}
