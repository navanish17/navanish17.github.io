import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import profileData from '@/data/profile.json';

const Projects = () => {
  const featuredProjects = profileData.projects.filter((p) => p.featured);
  const otherProjects = profileData.projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding bg-secondary/30">
      <div className="container-wide">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Section Label */}
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Projects
            </span>
          </div>

          {/* Content */}
          <div className="md:col-span-3 space-y-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">
                Selected Work
              </h2>
              <p className="text-muted-foreground">
                Some projects I've built and contributed to
              </p>
            </div>

            {/* Featured Projects */}
            <div className="space-y-8">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group bg-card rounded-lg p-6 md:p-8 card-hover border border-border/50"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Project Number */}
                    <span className="font-display text-4xl font-light text-muted-foreground/30">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Project Details */}
                    <div className="flex-1 space-y-4">
                      <h3 className="font-display text-2xl font-semibold group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="font-normal"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-4 pt-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
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
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Github size={16} />
                            Source
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Other Projects */}
            {otherProjects.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-muted-foreground">
                  Other Projects
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {otherProjects.map((project) => (
                    <div
                      key={project.id}
                      className="group p-4 rounded-lg border border-border/50 hover:border-border transition-colors"
                    >
                      <h4 className="font-medium group-hover:text-accent transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Github size={16} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
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
