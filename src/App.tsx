import React, { useState, useCallback } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Grid, Upload, Image as ImageIcon, Gauge } from 'lucide-react';
import { Github, Linkedin } from 'lucide-react';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

interface BeforeAfterExample {
  original: string;
  processed: string;
}

const examples: BeforeAfterExample[] = [
  {
    original: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    processed: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"
  },
  {
    original: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
    processed: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80"
  },
  {
    original: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    processed: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80"
  },
  {
    original: "https://images.unsplash.com/photo-1459478309853-2c33a60058e7?w=400",
    processed: "https://images.unsplash.com/photo-1459478309853-2c33a60058e7?w=400&q=80"
  }
];

function MainContent() {
  const [file, setFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      setError(null);
      handleImageUpload(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: 15 * 1024 * 1024, // 15MB
    multiple: false
  });

  const handleImageUpload = async (file: File) => {
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('image_file', file);

    try {
      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': '2cr9kgQmdAzvn536ipG2cVRr' // Replace with your valid API key
        },
        body: formData
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setProcessedImage(url);
      } else {
        const errorData = await response.json();
        setError(errorData.errors?.[0]?.title || 'Error removing background. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Remove Background from Images
        </h1>
        <p className="text-sm sm:text-lg text-gray-600">
          100% automatic and free background removal. Get perfect cutouts in seconds.
        </p>
      </div>

      {/* Upload Area */}
      <div className="mb-12 sm:mb-16">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-600'}`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            Drag & Drop your image here
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">or click to browse</p>
          <button className="bg-indigo-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-md hover:bg-indigo-700 text-sm">
            Choose Image
          </button>
          <p className="text-xs text-gray-500 mt-2">Supports JPG, PNG - Max 15MB</p>
        </div>

        {error && (
          <div className="mt-4 text-red-600 text-sm text-center">
            {error}
          </div>
        )}
        
        {loading && (
          <div className="mt-4 text-indigo-600 text-sm text-center">
            Processing your image...
          </div>
        )}

        {processedImage && (
          <div className="mt-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex flex-col md:flex-row gap-6">
                  {file && (
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Original</h4>
                      <div className="relative aspect-square">
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt="Original" 
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Processed</h4>
                    <div className="relative aspect-square bg-[#f0f0f0] rounded-lg">
                      <img 
                        src={processedImage} 
                        alt="Processed" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <a 
                    href={processedImage}
                    download="processed-image.png"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-3 rounded-full hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <ImageIcon className="w-5 h-5" />
                    <span className="font-medium">Download Processed Image</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-12 sm:mb-16">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <div className="text-indigo-600 mb-3 sm:mb-4">
            <Upload className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Instant Remove</h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Remove background in less than 5 seconds
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <div className="text-indigo-600 mb-3 sm:mb-4">
            <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">High Resolution</h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Export in high quality up to 4K resolution
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <div className="text-indigo-600 mb-3 sm:mb-4">
            <Gauge className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">100% Automated</h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Powered by advanced AI technology
          </p>
        </div>
      </div>

      {/* Before & After Examples */}
      <section className="mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Before & After</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {examples.map((example, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1">
                <img
                  src={example.original}
                  alt="Original"
                  className="w-full h-40 sm:h-48 object-cover rounded-lg"
                />
                <span className="absolute top-2 left-2 bg-white px-2 py-0.5 rounded text-xs sm:text-sm">
                  Original
                </span>
              </div>
              <div className="relative flex-1">
                <img
                  src={example.processed}
                  alt="Processed"
                  className="w-full h-40 sm:h-48 object-cover rounded-lg"
                />
                <span className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-0.5 rounded text-xs sm:text-sm">
                  Processed
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function App() {
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12 sm:h-16">
            <Link to="/" className="flex items-center space-x-1 sm:space-x-2">
              <Grid className="h-5 w-5 sm:h-8 sm:w-8 text-indigo-600" />
              <span className="text-sm sm:text-xl font-semibold text-gray-900">RemoveAI</span>
            </Link>
            <nav className="flex space-x-3 sm:space-x-6">
              <Link to="/" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900">Home</Link>
              <Link to="/terms" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900">Tools</Link>
            </nav>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-gray-600">
            <p>© 2024 RemoveAI. All rights reserved.</p>
            <div className="flex space-x-4 sm:space-x-6 mt-3 md:mt-0">
              <Link to="/terms" className="hover:text-gray-900">Terms</Link>
              <Link to="/privacy" className="hover:text-gray-900">Privacy</Link>
            </div>
            <div className="flex space-x-3 sm:space-x-4 mt-3 md:mt-0">
              <a 
                href="https://github.com/RautTanmay" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-gray-600"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/tanmayraut/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-gray-600"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
