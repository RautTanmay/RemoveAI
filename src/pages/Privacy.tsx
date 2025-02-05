import React from 'react';

function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-indigo">
          <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            We collect information that you provide directly to us when using our services, including images you upload for background removal.
          </p>

          <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to provide and improve our services, process your requests, and communicate with you.
          </p>

          <h2 className="text-xl font-semibold mb-4">3. Data Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="text-xl font-semibold mb-4">4. Data Retention</h2>
          <p className="mb-4">
            We retain your information only for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal requirements.
          </p>

          <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
          <p className="mb-4">
            You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your information.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privacy;