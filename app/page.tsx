import { ThemeSwitcher } from "./components/ThemeSwitcher";

export default function Home() {
  // In a real app, this would come from your data source
  const todaysDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short', 
    year: 'numeric'
  });

  return (
    <div className="max-w-2xl">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Proverb 1</h1>
        <div className="flex items-center gap-4 text-sm text-fg/70">
          <span>KJV · {todaysDate}</span>
        </div>
      </header>
      
      <div className="prose prose-lg max-w-none">
        <p className="mb-4 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nunc et arcu 
          facilisis tincidunt. Integer vel ligula nec neque tempor interdum, non congue 
          justo viverra. Curabitur at tellus sed elit consequat tincidunt, sit amet porta erat 
          placerat. Donec in purus nec augue laoreet fermentum vitae id nisl.
        </p>

        <p className="mb-4 leading-relaxed">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere 
          cubilia curae; Aenean non tortor eu mauris hendrerit finibus. Morbi ac erat 
          sed ipsum facilisis sagittis. Nulla facilisi. Suspendisse potenti. Phasellus non 
          lorem vel lacus interdum pretium nec et massa.
        </p>

        <p className="leading-relaxed">
          Aliquam erat volutpat. Nam consequat, tortor sed suscipit tristique, erat sapien 
          tempor justo, at faucibus urna purus in lorem. Quisque vitae eros eu turpis 
          cursus accumsan. Sed ut libero vitae sapien bibendum dictum, at tincidunt 
          urna dignissim.
        </p>
      </div>
    </div>
  );
}
