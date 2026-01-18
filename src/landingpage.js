import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Smartphone, 
  Code2, 
  Zap, 
  Github, 
  ArrowRight,
  Terminal,
  Cpu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Components ---

// 1. Retro Badge
const RetroBadge = ({ icon: Icon, text, color }) => (
  <div className={`flex items-center gap-2 px-4 py-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg font-bold text-sm hover:-translate-y-1 transition-transform cursor-default ${color}`}>
    <Icon size={18} className="text-black" strokeWidth={2.5} />
    {text}
  </div>
);

// 2. Grid Background
const GridBackground = () => (
  <div className="absolute inset-0 w-full h-full -z-10 opacity-40 pointer-events-none" 
    style={{
      backgroundImage: `linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)`,
      backgroundSize: '40px 40px'
    }}
  ></div>
);

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black font-sans relative overflow-x-hidden selection:bg-black selection:text-white">
      
      <GridBackground />

      {/* --- Navigation --- */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-black text-white border-2 border-black rounded-lg flex items-center justify-center font-mono font-bold text-xl shadow-[4px_4px_0px_0px_rgba(100,100,100,0.5)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
            RN
          </div>
          <span className="text-xl font-bold font-mono tracking-tighter border-b-2 border-transparent hover:border-black transition-colors">
            reactnative-pad
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#" className="font-bold border-b-2 border-transparent hover:border-black transition-all">Showcase</a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer" 
            className="p-2 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors"
          >
            <Github size={20} strokeWidth={2.5} />
          </a>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-32 text-center flex flex-col items-center">
        
        {/* Playful Tag */}
        {/* <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 rotate-[-2deg]" 
        >
          <span className="px-4 py-2 bg-yellow-300 border-2 border-black font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            v1.0 • Now in Public Beta 🚧
          </span>
        </motion.div> */}

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight mb-10" 
        >
          {/* Changed this to display:block to force it to be its own line */}
          <span className="block text-slate-900 mb-4 leading-tight">
            Learn React Native
          </span>
          
          {/* Added inline-block and leading-normal to handle spacing properly */}
          <span className="inline-block relative text-white bg-black px-4 py-1 decoration-wavy underline decoration-yellow-400 leading-normal mx-2 transform -rotate-1">
             In Your Browser.
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl font-medium text-slate-600 max-w-2xl mb-10 leading-relaxed border-l-4 border-yellow-400 pl-6 text-left md:text-center md:border-l-0 md:pl-0"
        >
          Forget XCode. Forget 20GB downloads. Just write React Native code and see it run instantly. It's like magic, but with more JavaScript.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <button 
            onClick={()=>{navigate('/editor')}}
            className="group relative px-8 py-4 bg-purple-500 text-white rounded-xl font-bold text-lg border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all flex items-center gap-3"
          >
            Start Coding
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} strokeWidth={3} />
          </button>
          
          <button 
            onClick={()=>{navigate('/editor')}}
            className="px-8 py-4 bg-white text-black rounded-xl font-bold text-lg border-2 border-black shadow-[6px_6px_0px_0px_rgba(200,200,200,1)] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all"
          >
            View Examples
          </button>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          <RetroBadge icon={Zap} text="Fast Previews" color="bg-orange-200" />
          <RetroBadge icon={Smartphone} text="iOS & Android" color="bg-blue-200" />
          <RetroBadge icon={Cpu} text="Browser Native" color="bg-green-200" />
        </motion.div>

      </main>

      {/* --- Visual Mockup --- */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 max-w-4xl mx-auto px-4"
      >
        <div className="bg-white rounded-t-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          
          {/* Header Bar */}
          <div className="bg-slate-100 border-b-2 border-black h-12 flex items-center px-4 justify-between">
            <div className="flex gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-black bg-red-400"></div>
              <div className="w-4 h-4 rounded-full border-2 border-black bg-yellow-400"></div>
              <div className="w-4 h-4 rounded-full border-2 border-black bg-green-400"></div>
            </div>
            <div className="font-mono text-sm font-bold bg-white px-3 py-1 border-2 border-black rounded-md">
              App.js
            </div>
            <div className="w-12"></div>
          </div>

          {/* Code & Preview Area */}
          <div className="p-0 flex flex-col md:flex-row h-64">
             
             {/* Code Editor Side */}
             <div className="flex-1 p-6 font-mono text-sm space-y-3 bg-white text-slate-800 overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-black">
                <p><span className="text-purple-600 font-bold">import</span> React <span className="text-purple-600 font-bold">from</span> 'react';</p>
                <p><span className="text-purple-600 font-bold">import</span> {'{ Text, View }'} <span className="text-purple-600 font-bold">from</span> 'rn';</p>
                <p className="pt-2"><span className="text-blue-600 font-bold">export default</span> <span className="text-purple-600 font-bold">fn</span>() {'{'}</p>
                <p className="pl-4">return (</p>
                <p className="pl-8 text-slate-600">{'<View style={{ center: true }}>'}</p>
                <p className="pl-12 text-black bg-yellow-100 w-fit px-1">{'<Text>Hello Human!</Text>'}</p>
                <p className="pl-8 text-slate-600">{'</View>'}</p>
                <p className="pl-4">);</p>
                <p>{'}'}</p>
             </div>

             {/* Preview Side */}
             <div className="w-full md:w-64 bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Abstract decorative shapes */}
                <div className="absolute top-4 right-4 text-slate-200">
                  <Terminal size={100} strokeWidth={1} />
                </div>
                
                <div className="bg-white border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] z-10 text-center">
                  <div className="text-2xl mb-2">👋</div>
                  <div className="font-bold">Hello Human!</div>
                </div>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}