import React, { useState, useRef, useEffect } from 'react';
import GlassPanel from './GlassPanel';
import NeuButton from './NeuButton';
import menuData from '../data/menu.json';
import { Send, Bot, User, Calendar, MessageSquare } from 'lucide-react';

export default function AIDiningAssistant({ onPreFillReservation }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Assalam-o-Alaikum! Welcome to Mashriq Restaurant's dining concierge. I can tell you about our signature platters, menu prices, Creme cafe specialties, or help you book a table. What are you craving today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const quickPrompts = [
    "What are your signature dishes?",
    "Show me Creme cafe menu",
    "How much is the Chicken Mandi?",
    "Book a table for 4"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const msgText = textToSend || input;
    if (!msgText.trim()) return;

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      sender: 'user',
      text: msgText
    };
    setMessages(prev => [...prev, newUserMessage]);
    if (!textToSend) setInput('');

    // Trigger typing indicator
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generateAIResponse(msgText);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: responseText
      }]);
      setIsTyping(false);
    }, 800);
  };

  const generateAIResponse = (query) => {
    const q = query.toLowerCase();

    // 1. Booking Triggers
    if (q.includes('book') || q.includes('reserv') || q.includes('table') || q.includes('seat')) {
      // Try to parse party size if possible
      let size = 2;
      const sizeMatch = q.match(/\b(for|of)\s+(\d+)\b/) || q.match(/\b(\d+)\s+(people|persons|guests|guest|pax)\b/);
      if (sizeMatch) {
        size = parseInt(sizeMatch[1] || sizeMatch[0]);
      } else {
        // Look for standalone numbers
        const numMatch = q.match(/\b(\d+)\b/);
        if (numMatch) size = parseInt(numMatch[1]);
      }
      
      // Callback to pre-fill the form in App.jsx
      if (onPreFillReservation) {
        onPreFillReservation({ partySize: size });
      }
      return `Certainly! I've pre-selected a table for ${size} guests in our booking system below. Please scroll down to the Reservation form to complete your contact information, or tap 'Prefer WhatsApp' for direct human assistance!`;
    }

    // 2. Signatures
    if (q.includes('signature') || q.includes('special') || q.includes('best') || q.includes('popular') || q.includes('recom')) {
      const signatures = [];
      menuData.forEach(cat => {
        cat.items.forEach(item => {
          if (item.signature) {
            signatures.push(`${item.name} (Rs. ${item.price})`);
          }
        });
      });
      return `Our top signature items include: \n\n• ${signatures.join('\n• ')}\n\nWould you like me to tell you more about any of these?`;
    }

    // 3. Specific Dishes
    if (q.includes('mandi')) {
      return "Our Mashriq Chicken Mandi (Rs. 2299) is a true bestseller. It features slow-cooked spiced chicken served over fragrant mandi rice with sweet pickles, toum, and daqoos sauce. It is generous enough for sharing!";
    }
    if (q.includes('platter') || q.includes('mixed grill')) {
      return "The Mashriq Mixed Grill Platter (Rs. 4999) is perfect for family gatherings. It includes a premium selection of signature kebabs, malai boti, tikka, and is served with fresh salad, house sauces, rice, and fresh tandoor naan.";
    }
    if (q.includes('hummus')) {
      return "Our Hummus Bil Dajaj (Rs. 1199) is an authentic Lebanese appetizer made of creamy, rich hummus topped with Arabic-spiced chicken, olive oil, and served with warm, freshly baked khubz.";
    }
    if (q.includes('kunafa')) {
      return "For dessert, our Mashriq Special Kunafa (Rs. 649) is a sweet Middle Eastern delicacy with a warm cheese center, crispy semolina topping, and sweet rosewater syrup.";
    }
    if (q.includes('rosh') || q.includes('mutton') || q.includes('chaamp')) {
      return "Our lamb/mutton selection is excellent! We serve Mutton Chaamp (Rs. 2999) chargrilled over open coals, Lamb Rosh (classic slow-cooked tribal recipe), and Mutton Karahi (from Rs. 2299 half to Rs. 4499 full) in Lahori, Achari, and White styles.";
    }

    // 4. Creme Cafe / Coffee
    if (q.includes('creme') || q.includes('cafe') || q.includes('coffee') || q.includes('latte') || q.includes('frappe') || q.includes('shake')) {
      return "Crème by Ahmad is our premium dessert and coffee lounge! We serve core espresso classics like Cappuccino (Rs. 699), Flat White (Rs. 749), Spanish Latte (Rs. 899), and our photogenic Lotus Cloud Latte (Rs. 1099). For cold cravings, try the Lotus Royale Shake (Rs. 1199) or our Cookies & Cream Shake (Rs. 1149).";
    }

    // 5. Pizza & Pasta
    if (q.includes('pizza') || q.includes('pasta') || q.includes('italian')) {
      return "We offer authentic Neapolitan-style thin crust pizzas like the Mashriq Special Pizza (Rs. 2399) and deep pan varieties like Malai Boti Pizza (Rs. 1999). For pasta lovers, our Smoked Chicken Tagliatelle (Rs. 1499) in roasted garlic cream is a customer favorite!";
    }

    // 6. Karahi & Desi
    if (q.includes('karahi') || q.includes('handi') || q.includes('desi') || q.includes('pakistani')) {
      return "We serve authentic Chicken and Mutton Karahis cooked in tomato-led Lahori style, Creamy White style, and Achari style (prices range from Rs. 1399 half-chicken to Rs. 4499 full-mutton). We also offer rich clay-pot Handis like Patiala Chicken Handi (Rs. 1599).";
    }

    // 7. General Price / Menu checks
    if (q.includes('price') || q.includes('cost') || q.includes('menu') || q.includes('how much')) {
      // Look if they specified a category
      return "Our menu caters to all budgets. Apptizers start at Rs. 599, Karahis & Continental mains are between Rs. 1399 and Rs. 2699, and our premium Family Platters are Rs. 4999. Tandoor breads start at Rs. 99. You can browse the full menu catalog interactively right above this section!";
    }

    // 8. Location & Timing
    if (q.includes('location') || q.includes('where') || q.includes('address') || q.includes('time') || q.includes('hour') || q.includes('open')) {
      return "Mashriq Restaurant is located on GT Road, Small Industry Estate, Gujrat, Punjab (near Kunjah corridor). We are open daily from 12:00 PM to 12:00 AM (midnight). There is ample secure family parking and garden seating available.";
    }

    // Default Fallback
    return "I'm not sure if I have the exact detail on that, but you can find it in our digital menu explorer above. We serve Arabic, Lebanese, Pakistani Karahis, Continental Steaks, and fresh Crème Café desserts. Let me know if you would like me to assist with your table reservation!";
  };

  return (
    <GlassPanel className="w-full max-w-2xl mx-auto flex flex-col h-[400px] sm:h-[500px] overflow-hidden border border-espresso/10">
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-espresso/5 border-b border-espresso/10 flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-royal-gold/20 flex items-center justify-center text-royal-gold">
          <Bot size={18} className="sm:w-[22px] sm:h-[22px]" />
        </div>
        <div className="text-left">
          <h3 className="font-serif font-bold text-espresso text-sm sm:text-base">AI Dining Assistant</h3>
          <p className="text-[10px] sm:text-xs text-taupe-text">Mashriq Concierge</p>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3 sm:space-y-4 text-xs sm:text-sm scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 sm:gap-3 max-w-[90%] sm:max-w-[85%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === 'user' 
                  ? 'bg-terracotta/20 text-terracotta' 
                  : 'bg-espresso/10 text-espresso'
              }`}
            >
              {msg.sender === 'user' ? <User size={14} className="sm:w-4 sm:h-4" /> : <Bot size={14} className="sm:w-4 sm:h-4" />}
            </div>
            
            <div
              className={`p-3 sm:p-4 rounded-2xl text-left whitespace-pre-line leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-terracotta text-white rounded-tr-none'
                  : 'bg-white text-espresso rounded-tl-none border border-espresso/5 shadow-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2.5 sm:gap-3 mr-auto max-w-[90%] sm:max-w-[85%]">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-espresso/10 text-espresso flex items-center justify-center shrink-0">
              <Bot size={14} className="sm:w-4 sm:h-4" />
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white border border-espresso/5 shadow-sm rounded-tl-none flex items-center gap-1.5 py-2.5 sm:py-3">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-taupe-text/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-taupe-text/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-taupe-text/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <div className="px-4 sm:px-6 py-2 flex flex-wrap gap-1.5 sm:gap-2 bg-espresso/5 border-t border-espresso/5 max-h-[80px] sm:max-h-[100px] overflow-y-auto no-scrollbar">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold bg-white text-taupe-text border border-espresso/10 hover:border-terracotta hover:text-terracotta transition-all cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Panel */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 sm:p-4 bg-white border-t border-espresso/10 flex gap-2 sm:gap-3 items-center"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about dishes, or type 'Book a table'..."
          className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-espresso/10 text-xs sm:text-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta bg-cream-bg/50"
        />
        <NeuButton
          type="submit"
          gold
          className="w-10 h-10 sm:w-12 sm:h-12 !p-0 !rounded-xl shrink-0 flex items-center justify-center"
        >
          <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
        </NeuButton>
      </form>
    </GlassPanel>
  );
}
