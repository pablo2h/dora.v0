/**
 * ProfileCard component examples and usage demonstrations
 * This file serves as documentation and testing for the ProfileCard component
 */

import ProfileCard from './ProfileCard';
import { teamMembers } from '@/data/team';
import { artists } from '@/data/artists';

// Example usage with team member data
const TeamMemberExample = () => {
  const teamMember = teamMembers[0]; // Pablo Rabaglia
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Team Member Example</h2>
      <div className="max-w-xs">
        <ProfileCard
          profile={teamMember}
          variant="team"
          onClick={() => console.log('Team member clicked:', teamMember.name)}
        />
      </div>
    </div>
  );
};

// Example usage with artist data
const ArtistExample = () => {
  const artist = artists[0]; // Rosario Smowing
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Artist Example</h2>
      <div className="max-w-xs">
        <ProfileCard
          profile={artist}
          variant="artist"
          onClick={() => console.log('Artist clicked:', artist.name)}
        />
      </div>
    </div>
  );
};

// Grid layout example
const GridExample = () => {
  const sampleTeamMembers = teamMembers.slice(0, 4);
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Grid Layout Example</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sampleTeamMembers.map((member) => (
          <ProfileCard
            key={member.id}
            profile={member}
            variant="team"
            onClick={() => console.log('Clicked:', member.name)}
          />
        ))}
      </div>
    </div>
  );
};

// Custom styling example
const CustomStyledExample = () => {
  const artist = artists[1]; // La tercera fase del plan
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Custom Styled Example</h2>
      <div className="max-w-xs">
        <ProfileCard
          profile={artist}
          variant="artist"
          className="border-2 border-dashed border-blue-300 hover:border-blue-500"
          onClick={() => console.log('Custom styled artist clicked:', artist.name)}
        />
      </div>
    </div>
  );
};

// Main examples component
const ProfileCardExamples = () => {
  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-2">ProfileCard Component Examples</h1>
        <p className="text-gray-600">Demonstrating various use cases and configurations</p>
      </div>
      
      <TeamMemberExample />
      <ArtistExample />
      <GridExample />
      <CustomStyledExample />
      
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Usage Instructions</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Basic Usage:</h3>
          <pre className="text-sm bg-white p-2 rounded border overflow-x-auto">
{`import ProfileCard from '@/components/ProfileCard';

// For team members
<ProfileCard 
  profile={teamMemberData} 
  variant="team" 
  onClick={handleClick} 
/>

// For artists
<ProfileCard 
  profile={artistData} 
  variant="artist" 
  onClick={handleClick} 
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardExamples;

// Individual exports for modular usage
export {
  TeamMemberExample,
  ArtistExample,
  GridExample,
  CustomStyledExample
};