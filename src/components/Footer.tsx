import SocialLinks from './FooterComponents/SocialLinks';
import NewsForm from './FooterComponents/NewsForm';

export default function Footer() {
  return (
    <footer className="bg-black text-center text-white">
      <div className="container mx-auto pt-6">
        <SocialLinks />
        <div className="mt-6">
          <NewsForm />
        </div>
        <div className="mt-6 px-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas.
        </div>
        <div className="bg-opacity-20 bg-black p-4 text-center border-t border-gray-700 mt-6">
          <a href="">AICLID &copy;</a>
        </div>
      </div>
    </footer>
  );
}
