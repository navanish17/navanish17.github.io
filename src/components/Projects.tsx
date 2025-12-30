import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import profileData from '@/data/profile.json';

const Projects = () => {
  const featuredProjects = profileData.projects.filter((p) => p.featured);
  const otherProjects = profileData.projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Section Header */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="section-divider" />
              <span className="section-label">Projects</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">
              Selected Work
            </h2>
            <p className="text-muted-foreground">
              Projects I've built and contributed to
            </p>
          </div>

          {/* Featured Projects */}
          <div className="lg:col-span-9 space-y-6">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className="card-interactive p-6 md:p-8 group"
              >
                <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6">
                  {/* Project Number */}
                  <span className="font-display text-5xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Project Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-2xl font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <ArrowUpRight 
                        size={24} 
                        className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" 
                      />
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="badge-orange"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 pt-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Github size={16} />
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Other Projects */}
            {otherProjects.length > 0 && (
              <div className="pt-8">
                <h3 className="text-lg font-medium text-muted-foreground mb-6">
                  Other Projects
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {otherProjects.map((project) => (
                    <div
                      key={project.id}
                      className="card-interactive p-5 group"
                    >
                      <div className="relative z-10">
                        <h4 className="font-semibold group-hover:text-primary transition-colors mb-2">
                          {project.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-3">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="icon-button p-2"
                            >
                              <Github size={18} />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="icon-button p-2"
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
