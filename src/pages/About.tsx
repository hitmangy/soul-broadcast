import { ArrowLeft, Heart, Radio } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="glass-hover rounded-full p-3 mb-6 inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="glass rounded-3xl p-8 animate-fade-in">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📻</div>
            <h1 className="text-3xl font-bold mb-2">About Quran Radio</h1>
          </div>

          <div className="space-y-6 text-muted-foreground">
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Radio className="w-5 h-5 text-secondary" />
                <h2 className="text-xl font-semibold text-foreground">Our Mission</h2>
              </div>
              <p>
                Quran Radio brings you 24/7 access to beautiful Quran recitations and Islamic 
                radio stations from around the world. Listen to your favorite reciters anytime, 
                anywhere.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-secondary" />
                <h2 className="text-xl font-semibold text-foreground">Features</h2>
              </div>
              <ul className="space-y-2 list-disc list-inside">
                <li>High-quality audio streaming</li>
                <li>Multiple language support</li>
                <li>Sleep timer for bedtime listening</li>
                <li>Volume control</li>
                <li>Beautiful, modern interface</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Support</h2>
              <p>
                May Allah accept your listening and increase you in beneficial knowledge. 
                If you enjoy this app, please share it with your family and friends.
              </p>
            </section>

            <div className="text-center pt-6 border-t border-white/10">
              <p className="text-sm">
                Made with <Heart className="w-4 h-4 inline text-red-500" /> for the Muslim Ummah
              </p>
              <p className="text-xs mt-2">Version 1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
