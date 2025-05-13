import React from 'react';
import { Palette, Users, Image, Code, Globe, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          About Our Gallery
        </h1>
        <p className="max-w-3xl mx-auto text-xl text-slate-600 dark:text-slate-400">
          A digital space dedicated to the celebration and appreciation of art in all its forms.
        </p>
      </div>
      
      {/* Mission Section */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 mb-12">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Palette className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="ml-4 text-2xl font-bold text-slate-900 dark:text-white">
            Our Mission
          </h2>
        </div>
        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
          We believe that art should be accessible to everyone. Our mission is to create a digital space
          where artists can showcase their work and art enthusiasts can discover new pieces that move them.
          By bridging the gap between creators and admirers, we hope to foster a vibrant community centered
          around artistic expression.
        </p>
      </div>
      
      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="ml-3 text-xl font-semibold text-slate-900 dark:text-white">
                Inclusivity
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              We welcome artists of all backgrounds and styles. Our platform is designed to be a diverse
              showcase of creativity without boundaries.
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Image className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="ml-3 text-xl font-semibold text-slate-900 dark:text-white">
                Quality
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              We strive to present artwork in the highest quality possible, ensuring that the digital
              experience does justice to the original piece.
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="ml-3 text-xl font-semibold text-slate-900 dark:text-white">
                Passion
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              We are driven by a genuine love for art and a desire to share that passion with others through
              an engaging and interactive platform.
            </p>
          </div>
        </div>
      </div>
      
      {/* Technology Section */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
          Built With Modern Technology
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="ml-3 text-xl font-semibold text-slate-900 dark:text-white">
                State-of-the-Art Web Technology
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Our gallery is built using the latest web technologies, ensuring a smooth and responsive
              experience across all devices. From high-resolution image rendering to intuitive navigation,
              we've designed every aspect with user experience in mind.
            </p>
          </div>
          
          <div>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="ml-3 text-xl font-semibold text-slate-900 dark:text-white">
                Art API Integration
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              We've integrated with leading art collection APIs to bring you a diverse range of historical
              and contemporary works. This allows us to showcase both renowned masterpieces and emerging
              talent on a single platform.
            </p>
          </div>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Alex Rivera",
              role: "Founder & Creative Director",
              bio: "Art historian and digital enthusiast with a passion for making art accessible to everyone."
            },
            {
              name: "Jamie Chen",
              role: "Lead Developer",
              bio: "Tech expert specializing in creating seamless and interactive digital experiences for art lovers."
            },
            {
              name: "Sam Taylor",
              role: "Curator",
              bio: "Contemporary art specialist with an eye for emerging talent and innovative artistic expressions."
            }
          ].map((member, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
                  {member.role}
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Contact Section */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
          Get In Touch
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
          Have questions, suggestions, or want to collaborate? We'd love to hear from you!
        </p>
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div className="rounded-md bg-blue-50 dark:bg-blue-900/20 p-4 text-blue-700 dark:text-blue-300">
              <p className="text-center">
                <strong>Email:</strong> contact@artgallery.example
              </p>
            </div>
            <div className="rounded-md bg-blue-50 dark:bg-blue-900/20 p-4 text-blue-700 dark:text-blue-300">
              <p className="text-center">
                <strong>Follow us on social media</strong> for the latest updates and featured artworks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};