import React, { useEffect, useState } from 'react'
import './App.css'

const AITool = ({ name, description, botId, icon }) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen && botId) {
      const client = new CozeWebSDK.WebChatClient({
        config: {
          bot_id: botId,
        },
        componentProps: {
          title: name,
          icon: icon,
          lang: 'zh-CN',
          layout: 'pc',
          width: 800,
        },
        el: document.getElementById(`coze-container-${botId}`),
      });

      return () => {
        client.destroy();
      }
    }
  }, [isOpen, botId, name, icon]);

  const openTool = () => {
    setIsOpen(true)
  }

  const closeTool = () => {
    setIsOpen(false)
  }

  return (
    <div className="ai-tool">
      <h2>{name}</h2>
      <p>{description}</p>
      <button onClick={openTool}>Open Tool</button>
      {isOpen && (
        <div className="tool-modal">
          <div className="tool-content">
            <button className="close-btn" onClick={closeTool}>Close</button>
            <div id={`coze-container-${botId}`} style={{ width: '100%', height: '500px' }}></div>
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  const tools = [
    {
      name: "Coze AI Assistant",
      description: "An AI-powered chatbot for general assistance.",
      botId: "7330182852614******", // 请替换为您的实际bot_id
      icon: "https://lf-bot-studio-plugin-resource.coze.cn/obj/bot-studio-platform-plugin-tos/artist/image/7e813aa2c7e14ebb9e2d1a989acfb128.png"
    },
    {
      name: "AI Study Planner",
      description: "Plan your study schedule with AI assistance.",
      botId: "your_study_planner_bot_id", // 请替换为实际的bot_id
      icon: "https://example.com/study-planner-icon.png"
    },
    {
      name: "AI Flashcard Generator",
      description: "Generate flashcards for your study topics using AI.",
      botId: "your_flashcard_generator_bot_id", // 请替换为实际的bot_id
      icon: "https://example.com/flashcard-generator-icon.png"
    }
  ]

  return (
    <div className="App">
      <h1>AI Study Hub</h1>
      <div className="tool-container">
        {tools.map((tool, index) => (
          <AITool key={index} name={tool.name} description={tool.description} botId={tool.botId} icon={tool.icon} />
        ))}
      </div>
    </div>
  )
}

export default App