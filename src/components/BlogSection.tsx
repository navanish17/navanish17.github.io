import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import profileData from '@/data/profile.json';

const BlogSection = () => {
  return (
    <section id="blog" className="section-padding">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Section Header */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="section-divider" />
              <span className="section-label">Blog</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">
              Thoughts & Writing
            </h2>
            <p className="text-muted-foreground">
              Research and insights
            </p>
          </div>

          {/* Blog Posts */}
          <div className="lg:col-span-9 space-y-4">
            {profileData.blogs.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="card-interactive p-6 group block"
              >
                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
                  {/* Date & Time */}
                  <div className="flex items-center gap-4 md:w-44 shrink-0 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-primary" />
                      <span>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-primary" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors flex items-center gap-3">
                      {post.title}
                      <ArrowRight
                        size={18}
                        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary"
                      />
                    </h3>
                    <p className="text-muted-foreground mt-1 line-clamp-1">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="badge-orange text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
