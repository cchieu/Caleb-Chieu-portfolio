import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function WhatsAppFAB() {
  const { language } = useLanguage();

  return (
    <motion.a
      href="https://wa.me/254700000000"
      target="_blank"
      rel="noopener noreferrer"
      title={language === 'en' ? "Chat on WhatsApp with Caleb" : "Zungumza kwenye WhatsApp na Caleb"}
      id="whatsapp-chat-fab"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25d366] text-white flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.5)] cursor-pointer transition-shadow"
    >
      <MessageCircle size={28} className="fill-white text-[#25d366]" />
    </motion.a>
  );
}
