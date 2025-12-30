import { MapPin, Mail } from 'lucide-react';
import profileData from '@/data/profile.json';

const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Section Label */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="section-divider" />
              <span className="section-label">About</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold">
              A bit about me
            </h2>
          </div>

          {/* Content */}
          <div className="lg:col-span-9">
            <div className="card-interactive p-8 md:p-10">
              <div className="relative z-10 space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {profileData.bio}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-3 px-4 py-2 bg-secondary/50 rounded-lg">
                    <MapPin size={18} className="text-primary" />
                    <span className="text-sm text-foreground">
                      {profileData.location}
                    </span>
                  </div>
                  <a
                    href={`mailto:${profileData.email}`}
                    className="flex items-center gap-3 px-4 py-2 bg-secondary/50 rounded-lg hover:bg-primary/10 transition-colors group"
                  >
                    <Mail size={18} className="text-primary" />
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                      {profileData.email}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
