import { useEffect, useRef, useState } from "react";

import {
  Brain,
  Send,
  Sparkles,
  Bot,
  User,
  Circle,
  Trash2
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

function AIAssistant() {

  const [query, setQuery] = useState("");

  const [typing, setTyping] = useState(false);

  const chatEndRef = useRef(null);

  const suggestedPrompts = [

    "Show land records of Uttar Pradesh",

    "Analyze mining suitability",

    "Generate GIS summary",

    "Show encroachment report",

    "Predict development potential",

    "Satellite coverage status"

  ];

  const [messages, setMessages] = useState([

    {

      id: 1,

      sender: "assistant",

      text:
        "Welcome Officer. I am the Government AI Land Intelligence Assistant. Ask me anything related to GIS, land records, analytics or development planning.",

      time: "Now"

    }

  ]);

  useEffect(() => {

    chatEndRef.current?.scrollIntoView({

      behavior: "smooth"

    });

  }, [messages, typing]);

  function getAIResponse(text) {

    const q = text.toLowerCase();

    if (q.includes("uttar")) {

      return "Uttar Pradesh contains multiple high-potential government land parcels. AI recommends Agra, Kanpur and Prayagraj for future infrastructure planning.";

    }

    if (q.includes("mining")) {

      return "Mining suitability is HIGH in selected mineral zones. Environmental monitoring is recommended before approval.";

    }

    if (q.includes("gis")) {

      return "GIS analysis completed successfully. All administrative layers are synchronized with the current map.";

    }

    if (q.includes("report")) {

      return "Government report can be generated using available GIS records and AI analytics.";

    }

    if (q.includes("satellite")) {

      return "Satellite imagery indicates normal monitoring status with no abnormal land changes detected.";

    }

    return "Analysis completed successfully. No critical anomalies were detected. AI recommends proceeding with detailed GIS verification before administrative approval.";

  }

  function sendMessage(text = query) {

    if (!text.trim()) return;

    const userMessage = {

      id: Date.now(),

      sender: "user",

      text,

      time: new Date().toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

      })

    };

    setMessages((prev) => [

      ...prev,

      userMessage

    ]);

    setQuery("");

    setTyping(true);

    setTimeout(() => {

      const aiMessage = {

        id: Date.now() + 1,

        sender: "assistant",

        text: getAIResponse(text),

        time: new Date().toLocaleTimeString([], {

          hour: "2-digit",

          minute: "2-digit"

        })

      };

      setMessages((prev) => [

        ...prev,

        aiMessage

      ]);

      setTyping(false);

    }, 1200);

  }

  function clearConversation() {

    setMessages([

      {

        id: 1,

        sender: "assistant",

        text:
          "Conversation cleared. How can I assist you with Government Land Intelligence today?",

        time: "Now"

      }

    ]);

  }

  function handleKeyDown(e) {

    if (e.key === "Enter") {

      sendMessage();

    }

  }
    return (

    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mt-8">

      {/* Header */}

      <div className="bg-[#071A2D] text-white px-6 py-5 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold flex items-center gap-3">

            <Brain size={24} />

            AI Land Intelligence Assistant

          </h2>

          <p className="text-sm text-slate-300 mt-1">

            Government AI Engine v2.0

          </p>

        </div>

        <div className="flex items-center gap-2 text-green-300 font-medium">

          <Circle

            size={10}

            fill="currentColor"

          />

          Online

        </div>

      </div>

      {/* Suggested Prompts */}

      <div className="border-b bg-slate-50 px-6 py-4">

        <p className="text-sm font-semibold text-slate-600 mb-3">

          Suggested Prompts

        </p>

        <div className="flex flex-wrap gap-3">

          {

            suggestedPrompts.map((item) => (

              <button

                key={item}

                onClick={() => sendMessage(item)}

                className="px-4 py-2 rounded-full bg-white border border-slate-300 hover:bg-[#071A2D] hover:text-white transition"

              >

                {item}

              </button>

            ))

          }

        </div>

      </div>

      {/* Chat */}

      <div className="h-[520px] overflow-y-auto px-6 py-6 bg-slate-50">

        <AnimatePresence>

          {

            messages.map((message) => (

              <motion.div

                key={message.id}

                initial={{ opacity: 0, y: 15 }}

                animate={{ opacity: 1, y: 0 }}

                exit={{ opacity: 0 }}

                className={`mb-6 flex ${

                  message.sender === "user"

                    ? "justify-end"

                    : "justify-start"

                }`}

              >

                <div

                  className={`max-w-[80%] rounded-2xl px-5 py-4 shadow ${

                    message.sender === "user"

                      ? "bg-[#2563EB] text-white"

                      : "bg-white border"

                  }`}

                >

                  <div className="flex items-center gap-2 mb-2">

                    {

                      message.sender === "user"

                        ? <User size={16} />

                        : <Bot size={16} />

                    }

                    <span className="font-semibold">

                      {

                        message.sender === "user"

                          ? "Officer"

                          : "Assistant"

                      }

                    </span>

                  </div>

                  <p className="leading-7">

                    {message.text}

                  </p>

                  <p className="text-xs mt-3 opacity-70">

                    {message.time}

                  </p>

                </div>

              </motion.div>

            ))

          }

        </AnimatePresence>

        {

          typing && (

            <motion.div

              initial={{ opacity: 0 }}

              animate={{ opacity: 1 }}

              className="flex"

            >

              <div className="bg-white border rounded-2xl px-5 py-4 shadow">

                <div className="flex items-center gap-2">

                  <Bot size={16} />

                  <span className="font-semibold">

                    Assistant

                  </span>

                </div>

                <div className="flex gap-2 mt-4">

                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>

                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:150ms]"></span>

                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:300ms]"></span>

                </div>

              </div>

            </motion.div>

          )

        }

        <div ref={chatEndRef}></div>

      </div>

      {/* Input */}

      <div className="border-t bg-white p-5">

        <div className="flex gap-3">

          <input

            value={query}

            onChange={(e) =>

              setQuery(e.target.value)

            }

            onKeyDown={handleKeyDown}

            placeholder="Ask about GIS, Land Records, Analytics or Reports..."

            className="flex-1 rounded-xl border px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500"

          />

          <button

            onClick={() => sendMessage()}

            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 rounded-xl flex items-center gap-2"

          >

            <Send size={18} />

            Send

          </button>

          <button

            onClick={clearConversation}

            className="border rounded-xl px-5 hover:bg-red-50 hover:text-red-600 transition"

          >

            <Trash2 size={18} />

          </button>

        </div>

      </div>

    </div>

  );

}

export default AIAssistant;