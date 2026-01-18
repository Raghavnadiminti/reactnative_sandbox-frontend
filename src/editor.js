import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import axios from 'axios'; 
import { 
  Play, 
  Smartphone, 
  Tablet, 
  RefreshCw,
  FileCode,
  AlertCircle,
  ExternalLink,
  Cpu,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// --- Components ---

// 1. Grid Background (Same as Landing Page)
const GridBackground = () => (
  <div className="absolute inset-0 w-full h-full -z-10 opacity-40 pointer-events-none" 
    style={{
      backgroundImage: `linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)`,
      backgroundSize: '40px 40px'
    }}
  ></div>
);

// 2. Retro Icon Button
const IconButton = ({ icon: Icon, onClick, active, title }) => (
  <button 
    onClick={onClick}
    title={title}
    className={`p-2 border-2 border-black rounded-lg transition-all active:translate-y-1 active:shadow-none ${
      active 
        ? 'bg-yellow-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
        : 'bg-white hover:bg-slate-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
    }`}
  >
    <Icon size={18} className="text-black" strokeWidth={2.5} />
  </button>
);

// 3. Retro File Tab
const FileTab = ({ name, active }) => (
  <div className={`
    flex items-center gap-2 px-4 py-2 text-sm font-bold font-mono border-r-2 border-black cursor-pointer select-none
    ${active 
      ? 'bg-white text-black border-t-0' 
      : 'bg-slate-200 text-slate-500 hover:bg-slate-300 border-b-2'
    }
  `}>
    <FileCode size={16} strokeWidth={2.5} className={active ? 'text-purple-600' : 'text-slate-500'} />
    {name}
  </div>
);

export default function EditorPage() {
  const navigate = useNavigate();

  // --- STATE ---
  const [code, setCode] = useState(`import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, Human! 👋</Text>
      <View style={styles.box}>
        <Text>Run me!</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  box: {
    padding: 20,
    backgroundColor: '#ffde03',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  }
});`);

  const [isRunning, setIsRunning] = useState(false);
  const [device, setDevice] = useState('ios'); 
  const [error, setError] = useState(null);
  
  // Link State
  const [previewUrl, setPreviewUrl] = useState("https://16.170.241.164:3018");
  const [refreshKey, setRefreshKey] = useState(0);

  // Helper for Browser ID
  function getBrowserId() {
    let id = localStorage.getItem("browser_id");
    if (!id) {
      id = crypto.randomUUID();   
      localStorage.setItem("browser_id", id);
    }
    return id;
  }

  // --- API HANDLER ---
  const handleRun = async () => {
    setIsRunning(true);
    setError(null);

    try {
      const userId = getBrowserId();
      const response = await axios.post('http://13.51.195.150:5000/runcode', {
        userId: userId,
        code: code
      });
      
      console.log("Server Response:", response);

      if (response.data && response.data.url) {
        setPreviewUrl(response.data.url);
        setRefreshKey(prev => prev + 1); 
      } else {
        setError("Invalid response");
      }

    } catch (err) {
      console.error("Build Error:", err);
      setError("Failed to run");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#FFFDF5] text-black font-sans overflow-hidden">
      
      <GridBackground />

      {/* --- Header --- */}
      <header className="h-18 bg-white border-b-2 border-black flex items-center justify-between px-6 py-3 z-20">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="p-2 border-2 border-black rounded-lg hover:bg-slate-100 transition-colors">
            <ArrowLeft size={20} strokeWidth={3} />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white border-2 border-black rounded-lg flex items-center justify-center font-mono font-bold text-xl shadow-[3px_3px_0px_0px_rgba(100,100,100,0.5)]">
              RN
            </div>
            <h1 className="text-xl font-bold font-mono tracking-tighter hidden md:block">
              reactnative-pad
            </h1>
          </div>
        </div>

        {/* Center: Run Button (The Star of the Show) */}
        <div className="flex items-center">
           <button 
             onClick={handleRun}
             disabled={isRunning}
             className={`
               flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold border-2 border-black text-black transition-all
               shadow-[4px_4px_0px_0px_black] active:translate-x-1 active:translate-y-1 active:shadow-none
               ${error 
                  ? 'bg-rose-400 hover:bg-rose-500' 
                  : 'bg-green-400 hover:bg-green-500'
               }
               disabled:opacity-70 disabled:cursor-wait
             `}
           >
             {isRunning ? <RefreshCw size={20} className="animate-spin" /> : error ? <AlertCircle size={20} /> : <Play size={20} fill="black" />}
             {isRunning ? 'Bundling...' : error ? 'Error (Retry)' : 'Run Code'}
           </button>
        </div>

        {/* Right: Placeholder for layout balance */}
        <div className="w-32 hidden md:block"></div> 
      </header>

      <main className="flex-1 flex overflow-hidden">
        
        {/* --- LEFT: Editor --- */}
        <section className="flex-1 flex flex-col min-w-0 border-r-2 border-black bg-white">
          
          {/* File Tabs */}
          <div className="flex items-center bg-slate-100 border-b-2 border-black">
            <FileTab name="App.js" active={true} />
            <div className="flex-1 bg-slate-200 h-full border-b-2 border-black"></div>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 relative">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              theme="vs-dark"
              onChange={(value) => setCode(value)}
              options={{ 
                minimap: { enabled: false }, 
                fontSize: 14, 
                fontFamily: "'Fira Code', monospace",
                padding: { top: 20 }
              }}
            />
          </div>
        </section>

        {/* --- RIGHT: Preview --- */}
        <section className="w-[450px] bg-[#FFFDF5] flex flex-col border-l-0 relative">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
          
          {/* Toolbar */}
          <div className="h-14 flex items-center justify-between px-6 border-b-2 border-black bg-white">
             <div className="flex gap-2">
               <IconButton icon={Smartphone} active={device === 'ios'} onClick={() => setDevice('ios')} title="iOS View" />
               <IconButton icon={Tablet} active={device === 'android'} onClick={() => setDevice('android')} title="Android View" />
             </div>
             
             {/* External Link Button */}
             <a 
               href={previewUrl} 
               target="_blank" 
               rel="noreferrer"
               className="flex items-center gap-2 text-xs font-bold font-mono border-2 border-black px-3 py-1.5 rounded-lg hover:bg-purple-200 transition-colors shadow-[2px_2px_0px_0px_black] active:translate-y-0.5 active:shadow-none bg-white"
             >
                Open Tab <ExternalLink size={14} />
             </a>
          </div>

          {/* Simulator Canvas */}
          <div className="flex-1 flex items-center justify-center p-6 overflow-hidden relative">
            
            <motion.div 
              initial={false}
              animate={{ 
                width: device === 'ios' ? '320px' : '360px',
                height: device === 'ios' ? '640px' : '600px',
                borderRadius: device === 'ios' ? '40px' : '20px'
              }}
              className="bg-white relative border-4 border-black overflow-hidden z-10 flex flex-col"
              style={{
                boxShadow: '12px 12px 0px 0px rgba(0,0,0,0.15)' // Hard shadow for the phone
              }}
            >
              {/* Notch */}
              {device === 'ios' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-xl z-20"></div>
              )}
              
              {/* Status Bar */}
              <div className="h-8 bg-white flex items-center justify-between px-6 text-[10px] font-bold text-black select-none shrink-0 border-b-2 border-slate-100 z-10 relative">
                <span>9:41</span>
                <div className="flex gap-1 items-center">
                   <span>5G</span>
                   <div className="w-4 h-2 bg-black rounded-[1px]"></div>
                </div>
              </div>

              {/* IFrame Container */}
              <div className="flex-1 w-full bg-white relative">
                 <iframe 
                 
                   src={previewUrl}
                   title="App Preview"
                   className="w-full h-full border-0"
                   allow="camera; microphone; geolocation"
                   sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                 />
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black rounded-full opacity-20 z-20 pointer-events-none"></div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}