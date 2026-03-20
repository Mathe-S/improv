import CommunityForm from "./CommunityForm";

export default function CommunityPage() {
  return (
    <div className="min-h-screen pt-32 px-8 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-12 text-spotlight">Community</h1>

      <div className="py-20 border-y border-white/10">
        <h2 className="text-2xl mb-6">Hello Dear Sir! </h2>
        <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
          I'm new to Imrpov, if you want to get updates about the game additions and new tools and also be informed if we host online session you can participate, feel free to sign up. (This will be always free)
        </p>

        <CommunityForm />
      </div>
    </div>
  );
}
