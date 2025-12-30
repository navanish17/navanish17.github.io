import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import profileData from '@/data/profile.json';

const BlogSection = () => {
  return (
    <section id="blog" className="section-padding bg-secondary/30">
      <div className="container-wide">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Section Label */}
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Blog
            </span>
          </div>

          {/* Content */}
          <div className="md:col-span-3 space-y-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">
                Thoughts & Writing
              </h2>
              <p className="text-muted-foreground">
                Research, insights, and things I've learned along the way
              </p>
            </div>

            {/* Blog Posts */}
            <div className="space-y-1">
              {profileData.blogs.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="group block py-6 border-b border-border/50 last:border-0"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Date */}
                    <span className="text-sm text-muted-foreground md:w-32 shrink-0">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>

                    {/* Post Content */}
                    <div className="flex-1 space-y-2">
                      <h3 className="font-display text-xl font-semibold group-hover:text-accent transition-colors inline-flex items-center gap-2">
                        {post.title}
                        <ArrowRight
                          size={18}
                          className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                        />
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="font-normal text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        <span className="text-xs text-muted-foreground">
                          · {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
