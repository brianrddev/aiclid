import SocialLinks from './FooterComponents/SocialLinks';
import { useState } from 'react';

export default function Footer() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process form submission
    console.log(formState);
    // Reset form
    setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <footer
      id="footer"
      className="flex min-h-[100vh] flex-col bg-black text-base text-white sm:text-base"
    >
      {/* Main section */}
      <div className="container mx-auto grid min-h-0 flex-1 grid-cols-1 gap-4 px-2 py-4 sm:px-6 sm:py-12 md:grid-cols-2">
        {/* Contact Form */}
        <div className="flex flex-col justify-center gap-2 text-[15px] transition-transform sm:text-base">
          <h3 className="mb-1 text-base font-semibold after:mt-1 after:block after:h-0.5 after:w-10 after:bg-white sm:mb-4 sm:text-xl">
            Contáctanos
          </h3>
          <form className="space-y-1 sm:space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleInputChange}
              placeholder="Nombre"
              className="w-full rounded-none border-b border-white bg-transparent px-2 py-1 text-[15px] text-white placeholder-gray-400 transition-all focus:border-white focus:shadow-[0_0_10px_rgba(255,255,255,0.3)] focus:outline-none sm:text-base"
            />
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              placeholder="Correo electrónico"
              className="w-full rounded-none border-b border-white bg-transparent px-2 py-1 text-[15px] text-white placeholder-gray-400 transition-all focus:border-white focus:shadow-[0_0_10px_rgba(255,255,255,0.3)] focus:outline-none sm:text-base"
            />
            <textarea
              name="message"
              value={formState.message}
              onChange={handleInputChange}
              placeholder="Mensaje"
              rows={2}
              className="w-full rounded-none border-b border-white bg-gray-200 px-2 py-1 text-[15px] text-white placeholder-gray-400 transition-all focus:border-white focus:shadow-[0_0_10px_rgba(255,255,255,0.3)] focus:outline-none sm:text-base"
            ></textarea>
            <button
              type="submit"
              className="w-full border border-white bg-transparent py-1.5 text-[15px] text-white transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] sm:text-base"
            >
              Enviar mensaje
            </button>
          </form>
        </div>
        {/* Información y Mapa */}
        <div className="flex flex-col justify-center gap-2 text-[15px] transition-transform sm:text-base">
          <h3 className="mb-1 text-base font-semibold after:mt-1 after:block after:h-0.5 after:w-10 after:bg-white sm:mb-4 sm:text-xl">
            Nuestra ubicación
          </h3>
          <div className="mb-2 flex flex-col items-start justify-between space-y-1 text-xs sm:mb-6 sm:flex-row sm:items-center sm:space-y-0 sm:text-sm">
            <p className="flex items-start">
              <svg
                className="mr-2 h-4 w-4 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                Calle Zonzamas, 22
                <br />
                35500 Arrecife, Lanzarote
              </span>
            </p>
            <p className="flex items-center">
              <svg
                className="mr-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>+34 928 000 000</span>
            </p>
            <p className="flex items-center">
              <svg
                className="mr-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>contacto@aiclid.org</span>
            </p>
          </div>
          <div className="overflow-hidden border border-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            <iframe
              src="https://maps.google.com/maps?q=Zonzamas%2C%20Lanzarote&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-28 w-full filter sm:h-64"
              frameBorder="0"
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
            />
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-800 py-2 sm:py-6">
        <div className="container mx-auto flex flex-col items-center justify-between space-y-2 px-2 sm:space-y-4 sm:px-6 md:flex-row md:space-y-0">
          <SocialLinks />
          <p className="text-xs opacity-80 sm:text-sm">
            © {new Date().getFullYear()} AICLID. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
