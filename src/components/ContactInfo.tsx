import React, { useState } from 'react';
import { User, Mail, Phone, Github, Linkedin, ChevronDown, ChevronUp } from 'lucide-react';

export const ContactInfo: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg border border-gray-600 overflow-hidden">
      {/* Header - Always visible */}
      <button
        onClick={toggleExpanded}
        className="w-full p-4 flex items-center justify-between hover:bg-white hover:bg-opacity-5 transition-all duration-200"
      >
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          <span className="text-white text-sm font-bold">CONTACT</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {/* Expandable Content */}
      <div className={`transition-all duration-300 ease-in-out ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="px-4 pb-4 space-y-3">
          {/* Name */}
          <div className="flex items-center gap-3 p-2 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-10 transition-all duration-200">
            <User className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400">Name</p>
              <p className="text-white text-sm font-medium">Puspender</p>
            </div>
          </div>

          {/* Email */}
          <a 
            href="mailto:puspenderprem@gmail.com"
            className="flex items-center gap-3 p-2 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-10 transition-all duration-200 group"
          >
            <Mail className="w-4 h-4 text-green-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-white text-sm font-medium group-hover:text-green-400 transition-colors">your.email@example.com</p>
            </div>
          </a>

          {/* Phone */}
          <a 
            href="tel:+918630589503"
            className="flex items-center gap-3 p-2 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-10 transition-all duration-200 group"
          >
            <Phone className="w-4 h-4 text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs text-gray-400">Phone</p>
              <p className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors">+91 12345 67890</p>
            </div>
          </a>

          {/* GitHub */}
          <a 
            href="https://github.com/puspender01"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-10 transition-all duration-200 group"
          >
            <Github className="w-4 h-4 text-purple-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs text-gray-400">GitHub</p>
              <p className="text-white text-sm font-medium group-hover:text-purple-400 transition-colors">@yourusername</p>
            </div>
          </a>

          {/* LinkedIn */}
          <a 
            href="https://linkedin.com/in/puspender01"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-10 transition-all duration-200 group"
          >
            <Linkedin className="w-4 h-4 text-blue-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs text-gray-400">LinkedIn</p>
              <p className="text-white text-sm font-medium group-hover:text-blue-500 transition-colors">Your Profile</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};