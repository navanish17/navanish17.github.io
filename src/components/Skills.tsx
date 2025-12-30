import profileData from '@/data/profile.json';

const skillCategories = [
  { key: 'languages', label: 'Languages', icon: '{ }' },
  { key: 'frameworks', label: 'Frameworks', icon: '⚡' },
  { key: 'tools', label: 'Tools', icon: '🔧' },
  { key: 'other', label: 'Other', icon: '✦' },
] as const;

const Skills = () => {
  return (
    <section id="skills" className="section-padding bg-secondary/20">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Section Header */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="section-divider" />
              <span className="section-label">Skills</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">
              Technologies
            </h2>
            <p className="text-muted-foreground">
              Tools I use to bring ideas to life
            </p>
          </div>

          {/* Skills Grid */}
          <div className="lg:col-span-9">
            <div className="grid sm:grid-cols-2 gap-6">
              {skillCategories.map((category) => (
                <div 
                  key={category.key} 
                  className="card-interactive p-6 group"
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-2xl">{category.icon}</span>
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
                        {category.label}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills[category.key].map((skill) => (
                        <span
                          key={skill}
                          className="skill-tag"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
