/**
 * Organigram component examples and usage demonstrations
 * This file serves as documentation and testing for the Organigram component
 */

import Organigram from './Organigram';
import { teamMembers } from '@/data/team';

// Basic usage example
const BasicExample = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold text-center mb-8">Basic Organigram</h2>
        <Organigram />
      </div>
    </div>
  );
};

// With autoplay enabled
const AutoplayExample = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold text-center mb-8">Organigram with Autoplay</h2>
        <Organigram 
          showAutoplay={true}
          autoplayDelay={4000}
        />
      </div>
    </div>
  );
};

// Custom styled example
const CustomStyledExample = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold text-center mb-8">Custom Styled Organigram</h2>
        <Organigram 
          className="shadow-2xl rounded-3xl overflow-hidden"
          showAutoplay={false}
        />
      </div>
    </div>
  );
};

// Dark theme example
const DarkThemeExample = () => {
  return (
    <div className="min-h-screen bg-gray-900 dark-theme">
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold text-center mb-8 text-white">Dark Theme Organigram</h2>
        <Organigram />
      </div>
    </div>
  );
};

// Compact version for smaller spaces
const CompactExample = () => {
  return (
    <div className="bg-white p-4">
      <h2 className="text-xl font-semibold text-center mb-4">Compact Organigram</h2>
      <div className="max-w-4xl mx-auto">
        <Organigram className="py-4" />
      </div>
    </div>
  );
};

// Main examples component
const OrganigramExamples = () => {
  return (
    <div className="space-y-16">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">Organigram Component Examples</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Demonstrating various configurations and use cases for the team organigram component
        </p>
      </div>
      
      <BasicExample />
      <AutoplayExample />
      <CustomStyledExample />
      <DarkThemeExample />
      <CompactExample />
      
      <div className="bg-gray-50 p-8 rounded-lg mx-4">
        <h2 className="text-2xl font-bold mb-6">Usage Instructions</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Usage:</h3>
            <pre className="text-sm bg-white p-4 rounded border overflow-x-auto">
{`import Organigram from '@/components/Organigram';

// Simple usage
<Organigram />

// With autoplay
<Organigram 
  showAutoplay={true}
  autoplayDelay={3000}
/>

// Custom styling
<Organigram 
  className="custom-styles"
/>`}
            </pre>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Features:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Mobile-first responsive design
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Category-based team organization
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Swiper.js powered carousels
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Framer Motion animations
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Dark theme support
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Accessibility compliant
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Custom navigation and pagination
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Props:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-sm font-semibold">Prop</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Type</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Default</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 text-sm font-mono">className</td>
                  <td className="px-4 py-2 text-sm">string</td>
                  <td className="px-4 py-2 text-sm">''</td>
                  <td className="px-4 py-2 text-sm">Additional CSS classes</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2 text-sm font-mono">showAutoplay</td>
                  <td className="px-4 py-2 text-sm">boolean</td>
                  <td className="px-4 py-2 text-sm">false</td>
                  <td className="px-4 py-2 text-sm">Enable carousel autoplay</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-mono">autoplayDelay</td>
                  <td className="px-4 py-2 text-sm">number</td>
                  <td className="px-4 py-2 text-sm">3000</td>
                  <td className="px-4 py-2 text-sm">Autoplay delay in milliseconds</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Responsive Breakpoints:</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded border">
              <h4 className="font-medium mb-2">Mobile (320px+)</h4>
              <p className="text-sm text-gray-600">1.5 slides visible</p>
            </div>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-medium mb-2">Large Mobile (480px+)</h4>
              <p className="text-sm text-gray-600">2 slides visible</p>
            </div>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-medium mb-2">Tablet (768px+)</h4>
              <p className="text-sm text-gray-600">3 slides visible</p>
            </div>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-medium mb-2">Desktop (1024px+)</h4>
              <p className="text-sm text-gray-600">4 slides visible</p>
            </div>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-medium mb-2">Large Desktop (1280px+)</h4>
              <p className="text-sm text-gray-600">5 slides visible</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganigramExamples;

// Individual exports for modular usage
export {
  BasicExample,
  AutoplayExample,
  CustomStyledExample,
  DarkThemeExample,
  CompactExample
};