import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Badge } from '@/components/ui/badge';
import profileData from '@/data/profile.json';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Import blog content
import understandingReactHooks from '@/content/blogs/understanding-react-hooks.md?raw';
import buildingScalableSystems from '@/content/blogs/building-scalable-systems.md?raw';
import futureOfAiDevelopment from '@/content/blogs/future-of-ai-development.md?raw';

const blogContentMap: Record<string, string> = {
  'understanding-react-hooks': understandingReactHooks,
  'building-scalable-systems': buildingScalableSystems,
  'future-of-ai-development': futureOfAiDevelopment,
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = profileData.blogs.find((b) => b.id === id);
  const content = id ? blogContentMap[id] : null;

  if (!post || !content) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="section-padding">
          <div className="container-narrow text-center">
            <h1 className="font-display text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link
              to="/#blog"
              className="inline-flex items-center gap-2 text-accent hover:underline"
            >
              <ArrowLeft size={16} />
              Back to all posts
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Header */}
        <section className="pt-32 pb-16 border-b border-border">
          <div className="container-narrow">
            <Link
              to="/#blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to all posts
            </Link>

            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                {post.readTime}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <article className="container-narrow prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="font-display text-3xl font-bold mt-12 mb-6 first:mt-0">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-display text-xl font-semibold mt-8 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-4 text-foreground/90">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                code: ({ children, className }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="block bg-secondary p-4 rounded-lg overflow-x-auto text-sm font-mono mb-4">
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="bg-secondary rounded-lg overflow-x-auto mb-6">
                    {children}
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground my-6">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-accent hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
