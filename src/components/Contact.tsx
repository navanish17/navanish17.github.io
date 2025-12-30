import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import profileData from '@/data/profile.json';

const Contact = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="container-narrow">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Section Label */}
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Contact
            </span>
          </div>

          {/* Content */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">
                Let's Connect
              </h2>
              <p className="text-muted-foreground">
                Have a project in mind or just want to chat? Feel free to reach out.
              </p>
            </div>

            {/* Email */}
            <a
              href={`mailto:${profileData.email}`}
              className="group inline-flex items-center gap-3 text-xl md:text-2xl font-medium hover:text-accent transition-colors"
            >
              <Mail size={24} />
              <span className="link-underline">{profileData.email}</span>
            </a>

            {/* Social Links */}
            <div className="flex items-center gap-6 pt-4">
              {profileData.social.github && (
                <a
                  href={profileData.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
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
                  className="text-muted-foreground hover:text-foreground transition-colors"
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
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={24} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
