import SocialLinks from './FooterComponents/SocialLinks';
import NewsForm from './FooterComponents/NewsForm';
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
    <footer className="bg-black text-white">
      {/* Main section */}
      <div className="container mx-auto grid grid-cols-1 gap-8 px-6 py-12 md:grid-cols-2">
        {/* Contact Form */}
        <div className="transition-transform">
          <h3 className="mb-4 text-xl font-semibold after:mt-1 after:block after:h-1 after:w-12 after:bg-white">
            Contáctanos
          </h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleInputChange}
              placeholder="Nombre"
              className="w-full rounded-none border-b border-white bg-transparent px-4 py-2 text-white placeholder-gray-400 transition-all focus:border-white focus:shadow-[0_0_10px_rgba(255,255,255,0.3)] focus:outline-none"
            />
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              placeholder="Correo electrónico"
              className="w-full rounded-none border-b border-white bg-transparent px-4 py-2 text-white placeholder-gray-400 transition-all focus:border-white focus:shadow-[0_0_10px_rgba(255,255,255,0.3)] focus:outline-none"
            />
            <input
              type="tel"
              name="phone"
              value={formState.phone}
              onChange={handleInputChange}
              placeholder="Teléfono"
              className="w-full rounded-none border-b border-white bg-transparent px-4 py-2 text-white placeholder-gray-400 transition-all focus:border-white focus:shadow-[0_0_10px_rgba(255,255,255,0.3)] focus:outline-none"
            />
            <input
              type="text"
              name="subject"
              value={formState.subject}
              onChange={handleInputChange}
              placeholder="Asunto"
              className="w-full rounded-none border-b border-white bg-transparent px-4 py-2 text-white placeholder-gray-400 transition-all focus:border-white focus:shadow-[0_0_10px_rgba(255,255,255,0.3)] focus:outline-none"
            />
            <textarea
              name="message"
              value={formState.message}
              onChange={handleInputChange}
              placeholder="Mensaje"
              rows={4}
              className="w-full rounded-none border-b border-white bg-gray-200 px-4 py-2 text-white placeholder-gray-400 transition-all focus:border-white focus:shadow-[0_0_10px_rgba(255,255,255,0.3)] focus:outline-none"
            ></textarea>
            <button
              type="submit"
              className="w-full border border-white bg-transparent py-2 text-white transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            >
              Enviar mensaje
            </button>
          </form>
        </div>

        {/* Información y Mapa */}
        <div className="transition-transform">
          <h3 className="mb-4 text-xl font-semibold after:mt-1 after:block after:h-1 after:w-12 after:bg-white">
            Nuestra ubicación
          </h3>
          <div className="mb-6 space-y-2 text-sm">
            <p className="flex items-start">
              <svg
                className="mr-2 h-5 w-5 flex-shrink-0"
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
                className="mr-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>+34 928 000 000</span>
            </p>
            <p className="flex items-center">
              <svg
                className="mr-2 h-5 w-5"
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
              className="h-64 w-full filter"
              frameBorder="0"
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
            />
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto flex flex-col items-center justify-between space-y-4 px-6 md:flex-row md:space-y-0">
          <SocialLinks />
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} AICLID. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
