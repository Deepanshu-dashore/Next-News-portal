'use client';

import { Container } from '@/components/ui/Container';

interface RegionalNewsHeroProps {
  region: string;
}

export function RegionalNewsHero({ region }: RegionalNewsHeroProps) {
  const isIndia = region.toLowerCase() === 'india';
  
  // Custom themes for different regions
  const themes = {
    india: {
        bg: 'from-orange-500 via-white to-green-500', // Saffron, White, Green
        text: 'text-gray-900',
        accent: 'bg-blue-600',
        badge: 'INDIA NEWS HUB',
        desc: 'In-depth coverage from across the subcontinent'
    },
    world: {
        bg: 'from-blue-900 via-indigo-950 to-black',
        text: 'text-white',
        accent: 'bg-red-600',
        badge: 'GLOBAL PULSE',
        desc: 'Real-time updates from every corner of the planet'
    }
  };

  const currentTheme = isIndia ? themes.india : themes.world;

  return (
    <div className={`relative py-20 overflow-hidden`}>
      {/* Background with dynamic theme */}
      <div className={`absolute inset-0 bg-linear-to-br ${currentTheme.bg} opacity-90`} />
      
      {/* Texture/Pattern overlay */}
      <div 
        style={{ backgroundImage: `url('/design.svg')` }} 
        className="pointer-events-none absolute inset-0 bg-repeat opacity-[0.05]" 
        aria-hidden 
      />

      <Container>
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white ${currentTheme.accent} rounded-sm shadow-lg`}>
              {currentTheme.badge}
            </span>
            <div className="h-px flex-1 bg-white/20" />
          </div>

          <h1 className={`text-6xl md:text-8xl font-black mb-6 uppercase tracking-tightest leading-[0.85] ${currentTheme.text} drop-shadow-2xl`}>
             <span className="block opacity-90">{region}</span>
             <span className="block text-transparent bg-clip-text bg-linear-to-r from-current to-white/50">Bulletins</span>
          </h1>

          <p className={`text-xl md:text-2xl font-medium max-w-2xl leading-relaxed ${currentTheme.text} opacity-80`}>
             {currentTheme.desc}
          </p>
        </div>
      </Container>
      
      {/* Decorative element */}
      <div className="absolute right-[-10%] bottom-[-20%] w-[50%] aspect-square bg-white/5 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}
