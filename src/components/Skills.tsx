import profileData from '@/data/profile.json';

const skillCategories = [
  { key: 'languages', label: 'Languages' },
  { key: 'frameworks', label: 'Frameworks' },
  { key: 'tools', label: 'Tools' },
  { key: 'other', label: 'Other' },
] as const;

const Skills = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="container-wide">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Section Label */}
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Skills
            </span>
          </div>

          {/* Content */}
          <div className="md:col-span-3 space-y-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">
                Technologies I Work With
              </h2>
              <p className="text-muted-foreground">
                Tools and technologies I use to bring ideas to life
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid sm:grid-cols-2 gap-8">
              {skillCategories.map((category) => (
                <div key={category.key} className="space-y-4">
                  <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    {category.label}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {profileData.skills[category.key].map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-secondary rounded-full text-sm font-medium text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
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
