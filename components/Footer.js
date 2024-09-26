import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import HelpModal from './HelpModal';

const Footer = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const toggleHelpModal = () => {
    setIsHelpModalOpen((prev) => !prev);
  };

  return (
    <>
      <HelpModal isOpen={isHelpModalOpen} onClose={toggleHelpModal} />

      <footer className="mt-8 text-center">
        <button
          onClick={toggleHelpModal}
          className="bg-yellow-400 text-indigo-800 px-6 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors flex items-center mx-auto transform hover:scale-110 transition-transform"
        >
          <HelpCircle className="w-6 h-6 mr-2" />
          Need Help?
        </button>
      </footer>
    </>
  );
};

export default Footer;
