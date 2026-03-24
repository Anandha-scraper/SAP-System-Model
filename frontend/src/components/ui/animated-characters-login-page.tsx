"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";


interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

const Pupil = ({ 
  size = 12, 
  maxDistance = 5,
  pupilColor = "black",
  forceLookX,
  forceLookY
}: PupilProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculatePupilPosition = () => {
    if (!pupilRef.current) return { x: 0, y: 0 };

    // If forced look direction is provided, use that instead of mouse tracking
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const pupil = pupilRef.current.getBoundingClientRect();
    const pupilCenterX = pupil.left + pupil.width / 2;
    const pupilCenterY = pupil.top + pupil.height / 2;

    const deltaX = mouseX - pupilCenterX;
    const deltaY = mouseY - pupilCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={pupilRef}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
};




interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

const EyeBall = ({ 
  size = 48, 
  pupilSize = 16, 
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY
}: EyeBallProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };

    // If forced look direction is provided, use that instead of mouse tracking
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const eye = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;

    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: `${size}px`,
        height: isBlinking ? '2px' : `${size}px`,
        backgroundColor: eyeColor,
        overflow: 'hidden',
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}
    </div>
  );
};





function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userIdError, setUserIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
  const [isPurplePeeking, setIsPurplePeeking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showRejectedPopup, setShowRejectedPopup] = useState(false);
  const [rejectedMessage, setRejectedMessage] = useState('');
  const [showAlreadyRequestedPopup, setShowAlreadyRequestedPopup] = useState(false);
  const [alreadyRequestedMessage, setAlreadyRequestedMessage] = useState('');
  const [showAlreadyExistsPopup, setShowAlreadyExistsPopup] = useState(false);
  const [alreadyExistsMessage, setAlreadyExistsMessage] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  // Registration form data
  const [regData, setRegData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    fatherName: '',
    dob: ''
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blinking effect for purple character
  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000; // Random between 3-7 seconds

    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsPurpleBlinking(true);
        setTimeout(() => {
          setIsPurpleBlinking(false);
          scheduleBlink();
        }, 150); // Blink duration 150ms
      }, getRandomBlinkInterval());

      return blinkTimeout;
    };

    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  // Blinking effect for black character
  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000; // Random between 3-7 seconds

    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsBlackBlinking(true);
        setTimeout(() => {
          setIsBlackBlinking(false);
          scheduleBlink();
        }, 150); // Blink duration 150ms
      }, getRandomBlinkInterval());

      return blinkTimeout;
    };

    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  // Looking at each other animation when typing starts
  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true);
      const timer = setTimeout(() => {
        setIsLookingAtEachOther(false);
      }, 800); // Look at each other for 1.5 seconds, then back to tracking mouse
      return () => clearTimeout(timer);
    } else {
      setIsLookingAtEachOther(false);
    }
  }, [isTyping]);

  // Purple sneaky peeking animation when typing password and it's visible
  useEffect(() => {
    if (password.length > 0 && showPassword) {
      const schedulePeek = () => {
        const peekInterval = setTimeout(() => {
          setIsPurplePeeking(true);
          setTimeout(() => {
            setIsPurplePeeking(false);
          }, 800); // Peek for 800ms
        }, Math.random() * 3000 + 2000); // Random peek every 2-5 seconds
        return peekInterval;
      };

      const firstPeek = schedulePeek();
      return () => clearTimeout(firstPeek);
    } else {
      setIsPurplePeeking(false);
    }
  }, [password, showPassword, isPurplePeeking]);

  const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3; // Focus on head area

    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    // Face movement (limited range)
    const faceX = Math.max(-15, Math.min(15, deltaX / 20));
    const faceY = Math.max(-10, Math.min(10, deltaY / 30));

    // Body lean (skew for lean while keeping bottom straight) - negative to lean towards mouse
    const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120));

    return { faceX, faceY, bodySkew };
  };

  const purplePos = calculatePosition(purpleRef);
  const blackPos = calculatePosition(blackRef);
  const yellowPos = calculatePosition(yellowRef);
  const orangePos = calculatePosition(orangeRef);

  const handleToggleMode = () => {
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
      // Login logic
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            password: password
          })
        });

        const data = await response.json();

        if (response.ok && data.token) {
          // Store JWT token in sessionStorage
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('user', JSON.stringify(data.user));

          // Ensure loader shows for at least 2 seconds
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, 2000 - elapsedTime);

          setTimeout(() => {
            navigate('/home');
          }, remainingTime);
        } else {
          // Ensure loader shows for at least 2 seconds
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, 2000 - elapsedTime);

          setTimeout(() => {
            setIsLoading(false);

            // Determine error type from message
            const errorMsg = (data.message || '').toLowerCase();
            if (errorMsg.includes('user') && errorMsg.includes('not found')) {
              setUserIdError('Invalid User ID');
            } else if (errorMsg.includes('password') || errorMsg.includes('incorrect')) {
              setPasswordError('Invalid Password');
            } else {
              // Default: show error on both fields
              setUserIdError('Invalid User ID');
              setPasswordError('Invalid Password');
            }

            // Auto-clear errors after 2 seconds
            setTimeout(() => {
              setUserIdError('');
              setPasswordError('');
            }, 2000);
          }, remainingTime);
        }
      } catch (error) {
        // Ensure loader shows for at least 2 seconds
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 2000 - elapsedTime);

        setTimeout(() => {
          setIsLoading(false);
          setUserIdError('Invalid User ID');
          setPasswordError('Invalid Password');
          console.error('Login error:', error);

          // Auto-clear errors after 2 seconds
          setTimeout(() => {
            setUserIdError('');
            setPasswordError('');
          }, 2000);
        }, remainingTime);
      }
    } else {
      // Registration logic
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register-request`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(regData)
        });

        const data = await response.json();

        if (response.ok) {
          // Ensure loader shows for at least 2 seconds
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, 2000 - elapsedTime);

          setTimeout(() => {
            setIsLoading(false);
            setShowSuccess(true);
            setRegData({
              firstName: '',
              lastName: '',
              email: '',
              fatherName: '',
              dob: ''
            });

            setTimeout(() => {
              setShowSuccess(false);
              setIsLogin(true);
            }, 4000);
          }, remainingTime);
        } else {
          // Ensure loader shows for at least 2 seconds
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, 2000 - elapsedTime);

          setTimeout(() => {
            setIsLoading(false);
            console.error('Registration failed:', data);

            // Handle specific error cases
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
              setErrorMessage(data.message || 'Failed to send registration request. Please try again.');
              setShowErrorPopup(true);
            }
          }, remainingTime);
        }
      } catch (error) {
        // Ensure loader shows for at least 2 seconds
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 2000 - elapsedTime);

        setTimeout(() => {
          setIsLoading(false);
          console.error('Registration error:', error);
          setErrorMessage('Failed to send registration request. Please check your connection and try again.');
          setShowErrorPopup(true);
        }, remainingTime);
      }
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Content Section */}
      <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-primary/90 via-primary to-primary/80 p-12 text-primary-foreground">
        <div className="relative z-20">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <div className="size-8 rounded-lg bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="size-4" />
            </div>
            <span>YourBrand</span>
          </div>
        </div>

        <div className="relative z-20 flex items-end justify-center h-[500px]">
          {/* Cartoon Characters */}
          <div className="relative" style={{ width: '550px', height: '400px' }}>
            {/* Purple tall rectangle character - Back layer */}
            <div 
              ref={purpleRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: '70px',
                width: '180px',
                height: (isTyping || (password.length > 0 && !showPassword)) ? '440px' : '400px',
                backgroundColor: '#6C3FF5',
                borderRadius: '10px 10px 0 0',
                zIndex: 1,
                transform: (password.length > 0 && showPassword)
                  ? `skewX(0deg)`
                  : (isTyping || (password.length > 0 && !showPassword))
                    ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)` 
                    : `skewX(${purplePos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              {/* Eyes */}
              <div 
                className="absolute flex gap-8 transition-all duration-700 ease-in-out"
                style={{
                  left: (password.length > 0 && showPassword) ? `${20}px` : isLookingAtEachOther ? `${55}px` : `${45 + purplePos.faceX}px`,
                  top: (password.length > 0 && showPassword) ? `${35}px` : isLookingAtEachOther ? `${65}px` : `${40 + purplePos.faceY}px`,
                }}
              >
                <EyeBall 
                  size={18} 
                  pupilSize={7} 
                  maxDistance={5} 
                  eyeColor="white" 
                  pupilColor="#2D2D2D" 
                  isBlinking={isPurpleBlinking}
                  forceLookX={(password.length > 0 && showPassword) ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                  forceLookY={(password.length > 0 && showPassword) ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                />
                <EyeBall 
                  size={18} 
                  pupilSize={7} 
                  maxDistance={5} 
                  eyeColor="white" 
                  pupilColor="#2D2D2D" 
                  isBlinking={isPurpleBlinking}
                  forceLookX={(password.length > 0 && showPassword) ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                  forceLookY={(password.length > 0 && showPassword) ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                />
              </div>
            </div>

            {/* Black tall rectangle character - Middle layer */}
            <div 
              ref={blackRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: '240px',
                width: '120px',
                height: '310px',
                backgroundColor: '#2D2D2D',
                borderRadius: '8px 8px 0 0',
                zIndex: 2,
                transform: (password.length > 0 && showPassword)
                  ? `skewX(0deg)`
                  : isLookingAtEachOther
                    ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                    : (isTyping || (password.length > 0 && !showPassword))
                      ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)` 
                      : `skewX(${blackPos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              {/* Eyes */}
              <div 
                className="absolute flex gap-6 transition-all duration-700 ease-in-out"
                style={{
                  left: (password.length > 0 && showPassword) ? `${10}px` : isLookingAtEachOther ? `${32}px` : `${26 + blackPos.faceX}px`,
                  top: (password.length > 0 && showPassword) ? `${28}px` : isLookingAtEachOther ? `${12}px` : `${32 + blackPos.faceY}px`,
                }}
              >
                <EyeBall 
                  size={16} 
                  pupilSize={6} 
                  maxDistance={4} 
                  eyeColor="white" 
                  pupilColor="#2D2D2D" 
                  isBlinking={isBlackBlinking}
                  forceLookX={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? 0 : undefined}
                  forceLookY={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? -4 : undefined}
                />
                <EyeBall 
                  size={16} 
                  pupilSize={6} 
                  maxDistance={4} 
                  eyeColor="white" 
                  pupilColor="#2D2D2D" 
                  isBlinking={isBlackBlinking}
                  forceLookX={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? 0 : undefined}
                  forceLookY={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? -4 : undefined}
                />
              </div>
            </div>

            {/* Orange semi-circle character - Front left */}
            <div 
              ref={orangeRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: '0px',
                width: '240px',
                height: '200px',
                zIndex: 3,
                backgroundColor: '#FF9B6B',
                borderRadius: '120px 120px 0 0',
                transform: (password.length > 0 && showPassword) ? `skewX(0deg)` : `skewX(${orangePos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              {/* Eyes - just pupils, no white */}
              <div 
                className="absolute flex gap-8 transition-all duration-200 ease-out"
                style={{
                  left: (password.length > 0 && showPassword) ? `${50}px` : `${82 + (orangePos.faceX || 0)}px`,
                  top: (password.length > 0 && showPassword) ? `${85}px` : `${90 + (orangePos.faceY || 0)}px`,
                }}
              >
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
              </div>
            </div>

            {/* Yellow tall rectangle character - Front right */}
            <div 
              ref={yellowRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: '310px',
                width: '140px',
                height: '230px',
                backgroundColor: '#E8D754',
                borderRadius: '70px 70px 0 0',
                zIndex: 4,
                transform: (password.length > 0 && showPassword) ? `skewX(0deg)` : `skewX(${yellowPos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              {/* Eyes - just pupils, no white */}
              <div 
                className="absolute flex gap-6 transition-all duration-200 ease-out"
                style={{
                  left: (password.length > 0 && showPassword) ? `${20}px` : `${52 + (yellowPos.faceX || 0)}px`,
                  top: (password.length > 0 && showPassword) ? `${35}px` : `${40 + (yellowPos.faceY || 0)}px`,
                }}
              >
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
              </div>
              {/* Horizontal line for mouth */}
              <div 
                className="absolute w-20 h-[4px] bg-[#2D2D2D] rounded-full transition-all duration-200 ease-out"
                style={{
                  left: (password.length > 0 && showPassword) ? `${10}px` : `${40 + (yellowPos.faceX || 0)}px`,
                  top: (password.length > 0 && showPassword) ? `${88}px` : `${88 + (yellowPos.faceY || 0)}px`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="relative z-20 flex items-center gap-8 text-sm text-primary-foreground/60">
          <a href="#" className="hover:text-primary-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary-foreground transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-primary-foreground transition-colors">
            Contact
          </a>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute top-1/4 right-1/4 size-64 bg-primary-foreground/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>

      {/* Right Login Section */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-[420px]">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 text-lg font-semibold mb-12">
            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="size-4 text-primary" />
            </div>
            <span>YourBrand</span>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <div>
                <h4 className="font-semibold text-green-800">Request Sent Successfully!</h4>
                <p className="text-sm text-green-600">Your registration request has been sent to the administrator for approval.</p>
              </div>
            </div>
          )}

          {/* Rejected Popup */}
          {showRejectedPopup && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-background rounded-lg p-6 max-w-md w-full shadow-xl">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Previous Request Rejected</h3>
                    <p className="text-muted-foreground text-sm mt-1">{rejectedMessage || "Your previous registration request was rejected by admin."}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowRejectedPopup(false)}
                  className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          )}

          {/* Already Requested Popup */}
          {showAlreadyRequestedPopup && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-background rounded-lg p-6 max-w-md w-full shadow-xl">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Request Already Submitted</h3>
                    <p className="text-muted-foreground text-sm mt-1">{alreadyRequestedMessage || "Your registration request is already pending approval."}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAlreadyRequestedPopup(false)}
                  className="w-full py-2 px-4 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          )}

          {/* Already Exists Popup */}
          {showAlreadyExistsPopup && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-background rounded-lg p-6 max-w-md w-full shadow-xl">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Account Already Exists</h3>
                    <p className="text-muted-foreground text-sm mt-1">{alreadyExistsMessage || "An account with this email already exists. Please login."}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAlreadyExistsPopup(false);
                    setIsLogin(true);
                  }}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Go to Login
                </button>
              </div>
            </div>
          )}

          {/* Error Popup */}
          {showErrorPopup && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-background rounded-lg p-6 max-w-md w-full shadow-xl">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Registration Error</h3>
                    <p className="text-muted-foreground text-sm mt-1">{errorMessage}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowErrorPopup(false)}
                  className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {isLogin ? 'Welcome back!' : 'Create Account'}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isLogin 
                ? 'Welcome back! Please enter your details.' 
                : 'Please enter your details to sign up.'}
            </p>
          </div>

          {isLogin ? (
            /* ========== LOGIN FORM ========== */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="userId" className="text-sm font-medium">User ID</Label>
                <Input
                  id="userId"
                  type="text"
                  placeholder="Enter your User ID"
                  value={userId}
                  autoComplete="off"
                  onChange={(e) => setUserId(e.target.value)}
                  onFocus={() => setIsTyping(true)}
                  onBlur={() => setIsTyping(false)}
                  required
                  className={`h-12 bg-background border-border/60 focus:border-primary ${userIdError ? 'border-red-500' : ''}`}
                />
                {userIdError && (
                  <p className="text-sm text-red-500">{userIdError}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`h-12 pr-10 bg-background border-border/60 focus:border-primary ${passwordError ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-sm text-red-500">{passwordError}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Remember for 30 days
                  </Label>
                </div>
                <a
                  href="#"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Forgot password?
                </a>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium" 
                size="lg" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Log in"}
              </Button>
            </form>
          ) : (
            /* ========== REGISTRATION FORM ========== */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={regData.firstName}
                    onChange={handleRegChange}
                    required
                    className="h-12 bg-background border-border/60 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={regData.lastName}
                    onChange={handleRegChange}
                    required
                    className="h-12 bg-background border-border/60 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={regData.email}
                  onChange={handleRegChange}
                  required
                  className="h-12 bg-background border-border/60 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherName" className="text-sm font-medium">Father's Name</Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  type="text"
                  placeholder="Father's name"
                  value={regData.fatherName}
                  onChange={handleRegChange}
                  required
                  className="h-12 bg-background border-border/60 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob" className="text-sm font-medium">Date of Birth</Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={regData.dob}
                  onChange={handleRegChange}
                  required
                  className="h-12 bg-background border-border/60 focus:border-primary"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium" 
                size="lg" 
                disabled={isLoading}
              >
                {isLoading ? "Sending Request..." : "Sign Up"}
              </Button>
            </form>
          )}

          {/* Toggle Login/Signup */}
          <div className="text-center text-sm text-muted-foreground mt-8">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              onClick={handleToggleMode} 
              className="text-foreground font-medium hover:underline"
            >
              {isLogin ? "Sign Up" : "Log in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



export const Component = LoginPage;
