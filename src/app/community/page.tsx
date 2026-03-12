import CommunityForm from "./CommunityForm";

export default function CommunityPage() {
  return (
    <div className="min-h-screen pt-32 px-8 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-12 text-spotlight">Community</h1>
      
      <div className="py-20 border-y border-white/10">
        <h2 className="text-2xl mb-6">Join the Ensemble</h2>
        <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
          We are building a community of improvisers dedicated to the principles of spontaneity and narrative. 
          The journaling and sharing features are currently under construction.
        </p>
        
        <CommunityForm />
      </div>
    </div>
  );
}
