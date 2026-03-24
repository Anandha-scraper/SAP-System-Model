"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Package,
  BarChart3,
  Shield,
  Users,
} from "lucide-react";

export default function LoginCardSection() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userIdError, setUserIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showRejectedPopup, setShowRejectedPopup] = useState(false);
  const [rejectedMessage, setRejectedMessage] = useState('');
  const [showAlreadyRequestedPopup, setShowAlreadyRequestedPopup] = useState(false);
  const [alreadyRequestedMessage, setAlreadyRequestedMessage] = useState('');
  const [showAlreadyExistsPopup, setShowAlreadyExistsPopup] = useState(false);
  const [alreadyExistsMessage, setAlreadyExistsMessage] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeFeature, setActiveFeature] = useState(0);
  const [prevIsLogin, setPrevIsLogin] = useState(true);

  // Login state
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  // Registration state
  const [regData, setRegData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    fatherName: '',
    dob: ''
  });

  const features = [
    {
      icon: Package,
      title: "Inventory Management",
      description: "Streamline your warehouse operations with real-time stock tracking. Manage Material Master data, process Stock Entries, and maintain optimal inventory levels across all locations."
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Transform your data into actionable insights. Generate comprehensive Log Reports, visualize trends with interactive charts, and export detailed analytics for informed decision-making."
    },
    {
      icon: Shield,
      title: "Secure & Valid Authorization",
      description: "Enterprise-grade security powered by Firebase. Multi-role access control, complete audit trails, and end-to-end encryption keep your sensitive data protected at all times."
    },
    {
      icon: Users,
      title: "User Management",
      description: "Simplified user onboarding with admin approval workflow. Submit your registration request and receive login credentials via email once approved by your administrator."
    }
  ];

  // Auto-change features every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [features.length]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    // Draw grid/box pattern with orange lines on dark blue background
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gridSize = 60;
      const lineWidth = 0.5;
      const alpha = 0.08;
      
      ctx.strokeStyle = `rgba(246, 128, 72, ${alpha})`;
      ctx.lineWidth = lineWidth;
      
      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Animate boxes with orange color - bold and highly visible (80-100% opacity)
      const time = Date.now() * 0.001;
      const boxSize = 20;
      
      for (let i = 0; i < 18; i++) {
        const x = ((Math.sin(time * 0.4 + i * 1.2) * 0.5 + 0.5) * (canvas.width / gridSize)) * gridSize;
        const y = ((Math.cos(time * 0.35 + i * 0.9) * 0.5 + 0.5) * (canvas.height / gridSize)) * gridSize;
        
        const pulseAlpha = 0.8 + Math.sin(time + i) * 0.2;
        ctx.strokeStyle = `rgba(246, 128, 72, ${pulseAlpha})`;
        ctx.lineWidth = 2.5;
        
        // Draw animated box with rotation
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.sin(time * 0.5 + i) * 0.3);
        ctx.strokeRect(-boxSize / 2, -boxSize / 2, boxSize, boxSize);
        ctx.restore();
        
        // Draw smaller inner box
        const innerSize = boxSize * 0.5;
        ctx.strokeStyle = `rgba(246, 128, 72, ${pulseAlpha * 0.85})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(x - innerSize / 2, y - innerSize / 2, innerSize, innerSize);
      }
      
      // Draw floating particles with orange color - larger and highly visible (80-100% opacity)
      for (let i = 0; i < 10; i++) {
        const px = ((Math.sin(time * 0.6 + i * 2.1) * 0.5 + 0.5) * canvas.width);
        const py = ((Math.cos(time * 0.5 + i * 1.7) * 0.5 + 0.5) * canvas.height);
        const particleSize = 5 + Math.sin(time + i) * 3;
        
        ctx.fillStyle = `rgba(246, 128, 72, ${0.85 + Math.sin(time * 2 + i) * 0.15})`;
        ctx.beginPath();
        ctx.arc(px, py, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let animationFrame = 0;
    const animate = () => {
      drawGrid();
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      setSize();
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleToggleMode = () => {
    setIsAnimating(true);
    setPrevIsLogin(isLogin);
    setIsLogin(!isLogin);
    setUserIdError('');
    setPasswordError('');
    setRegData({
      firstName: '',
      lastName: '',
      email: '',
      fatherName: '',
      dob: ''
    });
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleRegChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegData({...regData, [name]: value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserIdError("");
    setPasswordError("");
    setIsLoading(true);

    const startTime = Date.now();

    if (isLogin) {
      try {
        const response = await fetch(`${(import.meta as any).env.VITE_API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, password })
        });

        const data = await response.json();

        if (response.ok && data.token) {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('user', JSON.stringify(data.user));

          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, 2000 - elapsedTime);

          setTimeout(() => navigate('/home'), remainingTime);
        } else {
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, 2000 - elapsedTime);

          setTimeout(() => {
            setIsLoading(false);
            const errorMsg = (data.message || '').toLowerCase();
            if (errorMsg.includes('user') && errorMsg.includes('not found')) {
              setUserIdError('Invalid User ID');
            } else if (errorMsg.includes('password') || errorMsg.includes('incorrect')) {
              setPasswordError('Invalid Password');
            } else {
              setUserIdError('Invalid User ID');
              setPasswordError('Invalid Password');
            }
            setTimeout(() => { setUserIdError(''); setPasswordError(''); }, 2000);
          }, remainingTime);
        }
      } catch (error) {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 2000 - elapsedTime);
        setTimeout(() => {
          setIsLoading(false);
          setUserIdError('Invalid User ID');
          setPasswordError('Invalid Password');
          setTimeout(() => { setUserIdError(''); setPasswordError(''); }, 2000);
        }, remainingTime);
      }
    } else {
      try {
        const response = await fetch(`${(import.meta as any).env.VITE_API_URL}/auth/register-request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(regData)
        });

        const data = await response.json();

        if (response.ok) {
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, 2000 - elapsedTime);

          setTimeout(() => {
            setIsLoading(false);
            setShowSuccess(true);
            setRegData({ firstName: '', lastName: '', email: '', fatherName: '', dob: '' });
            setTimeout(() => { setShowSuccess(false); setIsLogin(true); }, 4000);
          }, remainingTime);
        } else {
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, 2000 - elapsedTime);

          setTimeout(() => {
            setIsLoading(false);
            if (data.status === 'already_requested') {
              setAlreadyRequestedMessage(data.message);
              setShowAlreadyRequestedPopup(true);
            } else if (data.status === 'already_exists') {
              setAlreadyExistsMessage(data.message);
              setShowAlreadyExistsPopup(true);
            } else if (data.status === 'rejected') {
              setRejectedMessage(data.message);
              setShowRejectedPopup(true);
            } else {
              setErrorMessage(data.message || 'Failed to send registration request.');
              setShowErrorPopup(true);
            }
          }, remainingTime);
        }
      } catch (error) {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 2000 - elapsedTime);
        setTimeout(() => {
          setIsLoading(false);
          setErrorMessage('Failed to send registration request. Please check your connection.');
          setShowErrorPopup(true);
        }, remainingTime);
      }
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0D1A63 0%, #1A2CA3 50%, #0D1A63 100%)' }}>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes iconPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0.5rem 1.5rem rgba(246, 128, 72, 0.3); }
          50% { transform: scale(1.05); box-shadow: 0 0.75rem 2rem rgba(246, 128, 72, 0.5); }
        }
        @keyframes floatSquare {
          0%, 100% { opacity: 0.15; transform: translateY(0px) rotate(0deg); }
          50% { opacity: 0.3; transform: translateY(-8px) rotate(3deg); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-30px); }
        }
        @keyframes slideOutLeft {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(30px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .popup-overlay {
          position: fixed; inset: 0; background: rgba(13, 26, 99, 0.7);
          display: flex; align-items: center; justify-content: center; z-index: 50; padding: 1rem;
        }
        .popup-content {
          background: #ffffff; border: 1px solid rgba(246, 128, 72, 0.2);
          border-radius: 1rem; padding: 1.5rem; max-width: 28rem; width: 100%;
          box-shadow: 0 25px 50px -12px rgba(13, 26, 99, 0.3);
        }
        .floating-square {
          position: absolute;
          background: rgba(246, 128, 72, 0.08);
          animation: floatSquare 3s ease-in-out infinite;
        }
        .form-slide-enter-login {
          animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .form-slide-enter-signup {
          animation: slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .form-slide-exit-login {
          animation: slideOutLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .form-slide-exit-signup {
          animation: slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .shimmer-btn {
          background: linear-gradient(90deg, #F68048 0%, #FF9B6B 25%, #F68048 50%, #FF9B6B 75%, #F68048 100%);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      {/* Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Floating decorative squares */}
      <div className="floating-square" style={{ width: '50px', height: '50px', top: '8%', left: '6%', borderRadius: '6px' }}></div>
      <div className="floating-square" style={{ width: '35px', height: '35px', top: '55%', left: '9%', borderRadius: '5px', animationDelay: '0.7s' }}></div>
      <div className="floating-square" style={{ width: '70px', height: '70px', top: '18%', left: '14%', borderRadius: '8px', animationDelay: '1.2s' }}></div>

      {/* Left Content Section */}
      <div className="relative hidden lg:flex flex-col justify-between p-12" style={{ zIndex: 1 }}>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-wide text-white">NOVA</span>
        </div>

        <div className="flex items-end justify-center h-[500px]">
          <div className="text-center">
            <div 
              className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-2xl"
              style={{ 
                background: 'linear-gradient(135deg, #F68048 0%, #FF9B6B 100%)',
                animation: 'iconPulse 2s ease-in-out infinite',
                borderRadius: '18px'
              }}
            >
              {(() => {
                const IconComponent = features[activeFeature].icon;
                return <IconComponent className="w-10 h-10 text-white" strokeWidth={1.5} />;
              })()}
            </div>
            <h1 
              className="text-5xl font-bold mb-4 text-white"
              style={{ 
                animation: 'fadeSlideIn 0.5s ease-out',
                textShadow: '0 2px 30px rgba(0,0,0,0.3)'
              }}
            >
              {features[activeFeature].title}
            </h1>
            <p 
              className="text-lg text-justify max-w-md mx-auto text-white/85"
              style={{ 
                animation: 'fadeSlideIn 0.5s ease-out 0.1s both',
                lineHeight: '1.7'
              }}
            >
              {features[activeFeature].description}
            </p>
            <div className="flex gap-3 mt-8 justify-center">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`rounded-full transition-all duration-300 ${
                    activeFeature === index ? 'active' : ''
                  }`}
                  style={{
                    height: '8px',
                    width: activeFeature === index ? '32px' : '8px',
                    backgroundColor: activeFeature === index ? '#F68048' : 'rgba(255,255,255,0.25)',
                    borderRadius: activeFeature === index ? '6px' : '50%',
                    boxShadow: activeFeature === index ? '0 0 15px rgba(246, 128, 72, 0.5)' : 'none'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8 text-sm text-white/60">
          <a href="#" className="hover:text-[#F68048] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#F68048] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#F68048] transition-colors">Contact</a>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex items-center justify-center p-8 relative" style={{ zIndex: 1 }}>
        {/* Success Message */}
        {showSuccess && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-gradient-to-r from-[#F68048] to-[#FF9B6B] text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <div>
                <h4 className="font-semibold">Request Sent Successfully!</h4>
                <p className="text-sm text-orange-100">Your registration request has been sent to the administrator.</p>
              </div>
            </div>
          </div>
        )}

        {/* Popups */}
        {showRejectedPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Previous Request Rejected</h3>
                  <p className="text-gray-600 text-sm mt-1">{rejectedMessage || "Your previous registration request was rejected by admin."}</p>
                </div>
              </div>
              <button onClick={() => setShowRejectedPopup(false)} className="w-full py-2 px-4 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-lg hover:from-red-500 hover:to-red-600 transition-all shadow-md">OK</button>
            </div>
          </div>
        )}

        {showAlreadyRequestedPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Request Already Submitted</h3>
                  <p className="text-gray-600 text-sm mt-1">{alreadyRequestedMessage || "Your registration request is already pending approval."}</p>
                </div>
              </div>
              <button onClick={() => setShowAlreadyRequestedPopup(false)} className="w-full py-2 px-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all shadow-md">OK</button>
            </div>
          </div>
        )}

        {showAlreadyExistsPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Account Already Exists</h3>
                  <p className="text-gray-600 text-sm mt-1">{alreadyExistsMessage || "An account with this email already exists. Please login."}</p>
                </div>
              </div>
              <button onClick={() => { setShowAlreadyExistsPopup(false); setIsLogin(true); }} className="w-full py-2 px-4 bg-gradient-to-r from-[#1A2CA3] to-[#2845D6] text-white rounded-lg hover:from-[#2845D6] hover:to-[#3552E8] transition-all shadow-md">Go to Login</button>
            </div>
          </div>
        )}

        {showErrorPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Registration Error</h3>
                  <p className="text-gray-600 text-sm mt-1">{errorMessage}</p>
                </div>
              </div>
              <button onClick={() => setShowErrorPopup(false)} className="w-full py-2 px-4 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-lg hover:from-red-500 hover:to-red-600 transition-all shadow-md">OK</button>
            </div>
          </div>
        )}

        {/* Login Card */}
        <div className="w-full max-w-[420px]">
          <Card className="border-white/10 bg-white/98 backdrop-blur-xl supports-[backdrop-filter]:bg-white/95 shadow-2xl">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl text-gray-800">{isLogin ? 'Welcome back!' : 'Create Account'}</CardTitle>
              <CardDescription className="text-gray-500">
                {isLogin ? 'Welcome back! Please enter your details.' : 'Please enter your details to sign up.'}
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-5 relative overflow-hidden min-h-[340px]">
              {isLogin ? (
                <form onSubmit={handleSubmit} className={`space-y-5 ${isAnimating ? (prevIsLogin ? 'form-slide-exit-login' : 'form-slide-enter-login') : ''}`}>
                  <div className="space-y-2">
                    <Label htmlFor="userId" className="text-gray-700 font-medium">User ID</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#1A2CA3' }} />
                      <Input
                        id="userId"
                        type="text"
                        placeholder="Enter your User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className={`pl-10 h-12 bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-[#1A2CA3] focus:ring-2 focus:ring-[#1A2CA3]/20 ${userIdError ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {userIdError && <p className="text-xs text-red-500">{userIdError}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#1A2CA3' }} />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`pl-10 pr-10 h-12 bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-[#1A2CA3] focus:ring-2 focus:ring-[#1A2CA3]/20 ${passwordError ? 'border-red-500' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1A2CA3] transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox id="remember" className="border-[#1A2CA3] data-[state=checked]:bg-[#1A2CA3] data-[state=checked]:text-white" />
                      <Label htmlFor="remember" className="text-gray-600 cursor-pointer">Remember for 30 days</Label>
                    </div>
                    <a href="#" className="text-sm hover:text-[#1A2CA3] font-medium" style={{ color: '#1A2CA3' }}>Forgot password?</a>
                  </div>

                  <Button type="submit" className="w-full h-12 text-base font-medium bg-gradient-to-r from-[#1A2CA3] to-[#2845D6] hover:from-[#2845D6] hover:to-[#3552E8] text-white shadow-md hover:shadow-lg transition-all" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Log in"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className={`space-y-5 ${isAnimating ? (!prevIsLogin ? 'form-slide-exit-signup' : 'form-slide-enter-signup') : ''}`}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name</Label>
                      <Input id="firstName" name="firstName" type="text" placeholder="John" value={regData.firstName} onChange={handleRegChange} required className="h-12 bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-[#1A2CA3] focus:ring-2 focus:ring-[#1A2CA3]/20" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name</Label>
                      <Input id="lastName" name="lastName" type="text" placeholder="Doe" value={regData.lastName} onChange={handleRegChange} required className="h-12 bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-[#1A2CA3] focus:ring-2 focus:ring-[#1A2CA3]/20" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#1A2CA3' }} />
                      <Input id="email" name="email" type="email" placeholder="john@example.com" value={regData.email} onChange={handleRegChange} required className="pl-10 h-12 bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-[#1A2CA3] focus:ring-2 focus:ring-[#1A2CA3]/20" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fatherName" className="text-gray-700 font-medium">Father's Name</Label>
                    <Input id="fatherName" name="fatherName" type="text" placeholder="Father's name" value={regData.fatherName} onChange={handleRegChange} required className="h-12 bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-[#1A2CA3] focus:ring-2 focus:ring-[#1A2CA3]/20" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob" className="text-gray-700 font-medium">Date of Birth</Label>
                    <Input id="dob" name="dob" type="date" value={regData.dob} onChange={handleRegChange} required className="h-12 bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-[#1A2CA3] focus:ring-2 focus:ring-[#1A2CA3]/20" />
                  </div>

                  <Button type="submit" className="w-full h-12 text-base font-medium bg-gradient-to-r from-[#1A2CA3] to-[#2845D6] hover:from-[#2845D6] hover:to-[#3552E8] text-white shadow-md hover:shadow-lg transition-all" disabled={isLoading}>
                    {isLoading ? "Sending Request..." : "Sign Up"}
                  </Button>
                </form>
              )}

              {!isLogin && (
                <>
                  <Separator className="bg-gray-200 my-4" />
                  <p className="text-center text-xs text-gray-500">
                    Note: Registration requires admin approval. You will receive your credentials via email.
                  </p>
                </>
              )}
            </CardContent>

            <CardFooter className="flex items-center justify-center text-sm text-gray-500 pb-2 pt-0 mt-2">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button onClick={handleToggleMode} className="ml-1 hover:text-[#2845D6] hover:underline font-medium" style={{ color: '#1A2CA3' }}>
                {isLogin ? "Sign Up" : "Log in"}
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
