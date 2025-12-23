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
        
        <form className="max-w-md mx-auto flex gap-4">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 bg-white/5 border border-white/20 px-4 text-white focus:outline-none focus:border-accent-red"
          />
          <button className="px-6 py-3 bg-white text-black font-bold hover:bg-zinc-200 transition-colors">
            NOTIFY ME
          </button>
        </form>
      </div>
    </div>
  );
}
