import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Loader, Bot, Image as ImageIcon, Upload, Trash2, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const AskAIModal = ({ isOpen, onClose, suggestedQuestions }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (answer && typingIndex < answer.length) {
      const timer = setTimeout(() => {
        setTypingIndex(typingIndex + 1);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [answer, typingIndex]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAnswer('');
    setTypingIndex(0);

    try {
      const prompt = `Imagine you are a mentor guiding students about climate change. Explain the following question using scientific terminology and concepts that remain accessible for 9th to 10th graders. Ensure important terms are bolded, such as **CO2**, **greenhouse gases**, and **sustainability**. Include specific reasons related to climate dynamics and potential solutions involving technology. Your response should be informative and concise, not exceeding 100 words. Here is the question: ${question}`; 
      let result;
      if (image) {
        const imageData = await fileToGenerativePart(image);
        result = await model.generateContent([prompt, imageData]);
      } else {
        result = await model.generateContent(prompt);
      }
      
      setAnswer(result.response.text());
    } catch (error) {
      console.error('Error fetching answer from Gemini API:', error);
      setAnswer('An error occurred while fetching the answer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const fileToGenerativePart = async (file) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-indigo-500 shadow-lg shadow-indigo-500/50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-300 flex items-center">
            <Bot className="w-8 h-8 mr-2 text-green-400" />
            Cosmic AI Assistant
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4 relative">
            <textarea
              id="question"
              rows={3}
              className="w-full px-4 py-3 text-white bg-indigo-800 bg-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 placeholder-indigo-300 resize-none"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything about climate action..."
            ></textarea>
            <div className="absolute right-3 bottom-3 text-indigo-300 text-sm">
              {question.length}/500
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <label htmlFor="image-upload" className="flex items-center space-x-2 cursor-pointer bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-colors">
                <Upload className="w-5 h-5" />
                <span>Upload Image</span>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                ref={fileInputRef}
              />
              {image && (
                <button
                  onClick={removeImage}
                  className="text-red-400 hover:text-red-300 transition-colors flex items-center"
                >
                  <Trash2 className="w-5 h-5 mr-1" />
                  Remove Image
                </button>
              )}
            </div>
            {imagePreview && (
              <div className="mt-4 relative">
                <img
                  src={imagePreview}
                  alt="Uploaded image"
                  className="max-w-full h-auto rounded-md border-2 border-indigo-500"
                />
                <div className="absolute top-2 left-2 bg-indigo-800 bg-opacity-75 text-white px-2 py-1 rounded-md text-sm">
                  {image.name}
                </div>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading || question.length === 0}
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center w-full font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Launch Query
              </>
            )}
          </button>
        </form>
        {answer && (
  <div className="bg-indigo-800 bg-opacity-50 p-6 rounded-md mb-6 border border-indigo-400">
    <h3 className="text-lg font-semibold text-yellow-300 mb-3 flex items-center">
      <Bot className="w-6 h-6 mr-2 text-green-400" />
      Cosmic AI Response:
    </h3>
    <p className="text-white font-mono">
      {answer
        .substring(0, typingIndex)
        .split(/(\*\*.*?\*\*)/) // Split on bold tags
        .map((part, index) =>
          part.match(/\*\*(.*?)\*\*/) ? (
            <span key={index} className="bg-yellow-300 text-black px-2 py-1 rounded-md">
              {part.replace(/\*\*(.*?)\*\*/, '$1')} {/* Remove the bold markers */}
            </span>
          ) : (
            part // Just return the part if it doesn't match
          )
        )}
      {typingIndex < answer.length && <span className="animate-pulse">|</span>}
    </p>
  </div>
)}

        <div className="bg-indigo-800 bg-opacity-50 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-yellow-300 mb-3 flex items-center">
            <Sparkles className="w-5 h-5 mr-2" />
            Cosmic Queries:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestedQuestions.map((q, index) => (
              <button
                key={index}
                onClick={() => setQuestion(q)}
                className="text-left px-4 py-2 bg-indigo-700 bg-opacity-50 rounded-md hover:bg-indigo-600 transition-colors text-blue-300 hover:text-blue-100 flex items-center"
              >
                <ImageIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{q}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskAIModal;