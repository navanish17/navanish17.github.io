import { Mail, Github, Linkedin, Twitter, Send } from 'lucide-react';
import profileData from '@/data/profile.json';

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-secondary/20">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Section Header */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="section-divider" />
              <span className="section-label">Contact</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">
              Let's Connect
            </h2>
            <p className="text-muted-foreground">
              Have a project in mind?
            </p>
          </div>

          {/* Contact Card */}
          <div className="lg:col-span-9">
            <div className="card-interactive p-8 md:p-10">
              <div className="relative z-10 space-y-8">
                {/* Email CTA */}
                <div>
                  <p className="text-muted-foreground mb-4">
                    Feel free to reach out for collaborations or just a friendly hello
                  </p>
                  <a
                    href={`mailto:${profileData.email}`}
                    className="group inline-flex items-center gap-4 text-xl md:text-2xl font-semibold hover:text-primary transition-colors"
                  >
                    <span className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Mail size={24} />
                    </span>
                    <span className="link-underline">{profileData.email}</span>
                    <Send 
                      size={20} 
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" 
                    />
                  </a>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-border" />

                {/* Social Links */}
                <div>
                  <p className="text-sm text-muted-foreground mb-4">Or find me on</p>
                  <div className="flex items-center gap-3">
                    {profileData.social.github && (
                      <a
                        href={profileData.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-button p-4 bg-secondary/50 rounded-xl"
                        aria-label="GitHub"
                      >
                        <Github size={24} />
                      </a>
                    )}
                    {profileData.social.linkedin && (
                      <a
                        href={profileData.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-button p-4 bg-secondary/50 rounded-xl"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={24} />
                      </a>
                    )}
                    {profileData.social.twitter && (
                      <a
                        href={profileData.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-button p-4 bg-secondary/50 rounded-xl"
                        aria-label="Twitter"
                      >
                        <Twitter size={24} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
