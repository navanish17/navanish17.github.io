import profileData from '@/data/profile.json';

const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container-narrow">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Section Label */}
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              About
            </span>
          </div>

          {/* Content */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-semibold">
              A bit about me
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{profileData.bio}</p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-muted-foreground">
                  Based in {profileData.location}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <a
                  href={`mailto:${profileData.email}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {profileData.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
