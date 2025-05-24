import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import logoSrc from '../../imagens/Logo.png';

export const Footer: React.FC = () => {
  
  const socialLinks = [
    { href: "#", icon: Facebook, label: "Facebook" },
    { href: "#", icon: Instagram, label: "Instagram" },
    { href: "#", icon: Twitter, label: "Twitter" },
    { href: "#", icon: Youtube, label: "Youtube" },
  ];

  const quickLinks = [
    { href: "/", label: "Início" },
    { href: "/products", label: "Produtos" },
    { href: "/cart", label: "Carrinho" }, 
  ];

  const categoryLinks = [
    { href: "/category/electronics", label: "Eletrônicos" }, 
    
  ];

  return (
  
    <footer className="text-white bg-gray-900 dark:bg-gray-950">
      <div className="container px-4 py-12 mx-auto sm:px-6 lg:px-8 sm:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:gap-12">
     
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block">
               <div className="flex items-center gap-2">
           
              <div className="w-auto h-14 sm:h-16"> 
                 <img
                    src={logoSrc}
                    alt="RocketLabStore Logo"
                    className="object-contain w-auto h-full" 
                  />
              </div>
            </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-300 dark:text-gray-400">
              Sua loja online de tecnologia e produtos inovadores. Qualidade, confiança e os melhores preços em um só lugar.
            </p>
            <div className="flex pt-2 space-x-3">
              {socialLinks.map(social => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors duration-150 hover:text-orange-500 dark:hover:text-orange-400"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              ))}
            </div>
          </div>

          
          <div>
            <h3 className="mb-4 text-base font-semibold text-orange-500 sm:text-lg dark:text-orange-400">Links Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-gray-300 transition-colors dark:text-gray-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        
          {categoryLinks.length > 0 && (
            <div>
              <h3 className="mb-4 text-base font-semibold text-orange-500 sm:text-lg dark:text-orange-400">Categorias</h3>
              <ul className="space-y-2">
                {categoryLinks.map(link => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-gray-300 transition-colors dark:text-gray-400 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}


        
          <div>
            <h3 className="mb-4 text-base font-semibold text-orange-500 sm:text-lg dark:text-orange-400">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="flex-shrink-0 w-5 h-5 mt-1 text-orange-500 dark:text-orange-400" />
                <div className="text-sm text-gray-300 dark:text-gray-400">
                  <p>Rua da Tecnologia, 123</p>
                  <p>São Paulo - SP, 01234-567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                <a href="tel:+5511999999999" className="text-sm text-gray-300 dark:text-gray-400 hover:text-white">(11) 99999-9999</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                <a href="mailto:contato@rocketstore.com" className="text-sm text-gray-300 dark:text-gray-400 hover:text-white">contato@rocketstore.com</a>
              </div>
            </div>

          
            <div className="mt-6">
              <h4 className="mb-2 font-medium text-white">Newsletter</h4>
              <form onSubmit={(e) => { e.preventDefault(); alert('Inscrição na newsletter (simulação)!'); }}>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Seu melhor email"
                    className="flex-1 px-3 py-2.5 bg-gray-800 dark:bg-gray-700/50 border border-gray-700 dark:border-gray-600 rounded-md text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 shadow-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white transition-colors bg-orange-500 rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                  >
                    Assinar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      
        <div className="pt-8 mt-10 border-t border-gray-700 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-xs text-gray-400 dark:text-gray-500 sm:text-sm">
              © {new Date().getFullYear()} RocketStore. Todos os direitos reservados.
            </div>
            <div className="flex gap-4 text-xs sm:gap-6 sm:text-sm">
              <Link to="/privacy" className="text-gray-400 transition-colors dark:text-gray-500 hover:text-white">
                Política de Privacidade
              </Link>
              <Link to="/terms" className="text-gray-400 transition-colors dark:text-gray-500 hover:text-white">
                Termos de Uso
              </Link>
             
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};