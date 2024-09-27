import { useState, useEffect } from 'react'
import { HelpCircle, MessageSquare } from 'lucide-react'
import HelpModal from './HelpModal'
import AskAIModal from './AskAIModal'

const Footer = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
  const [isAskAIModalOpen, setIsAskAIModalOpen] = useState(false)
  const [isButtonVisible, setIsButtonVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const toggleHelpModal = () => {
    setIsHelpModalOpen((prev) => !prev)
  }

  const toggleAskAIModal = () => {
    setIsAskAIModalOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setIsButtonVisible(false)
      } else {
        setIsButtonVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const suggestedQuestions = [
    "What are the main goals of SDG 13?",
    "How does climate change affect biodiversity?",
    "What can I do to reduce my carbon footprint?",
    "How are extreme weather events linked to climate change?",
    "What is the Paris Agreement and why is it important?"
  ]

  return (
    <>
      <HelpModal isOpen={isHelpModalOpen} onClose={toggleHelpModal} />
      <AskAIModal 
        isOpen={isAskAIModalOpen} 
        onClose={toggleAskAIModal}
        suggestedQuestions={suggestedQuestions}
      />

      <footer className="mt-8 text-center relative pb-24">
        <button
          onClick={toggleHelpModal}
          className="bg-yellow-400 text-indigo-800 px-6 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors flex items-center mx-auto transform hover:scale-110 transition-transform"
        >
          <HelpCircle className="w-6 h-6 mr-2" />
          Need Help?
        </button>

        {/* Floating Ask AI button */}
        <button
          onClick={toggleAskAIModal}
          className={`fixed bottom-6 right-6 bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 flex items-center shadow-lg transform hover:scale-110 hover:rotate-3 z-50 ${
            isButtonVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
          aria-label="Ask AI"
        >
          <MessageSquare className="w-6 h-6 mr-2" />
          Ask AI
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
            New
          </span>
        </button>
      </footer>
    </>
  )
}

export default Footer