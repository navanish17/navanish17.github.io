import { Github, Linkedin, Twitter, Heart } from 'lucide-react';
import profileData from '@/data/profile.json';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/10 bg-secondary/30">
      <div className="container-wide py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-primary rounded-full" />
            <p className="text-sm text-muted-foreground">
              © {currentYear} {profileData.name}
            </p>
          </div>

          {/* Made with */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart size={14} className="text-primary fill-primary" /> 
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {profileData.social.github && (
              <a
                href={profileData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-button p-2"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            )}
            {profileData.social.linkedin && (
              <a
                href={profileData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-button p-2"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            )}
            {profileData.social.twitter && (
              <a
                href={profileData.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-button p-2"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
