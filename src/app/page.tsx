import Link from 'next/link';
import { Code, BookOpen, Sparkles, Rocket, Check, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              Vibe Coding Academy
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-violet-600 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm text-violet-700 dark:border-violet-800 dark:bg-violet-900/30 dark:text-violet-300">
            <Sparkles className="mr-2 h-4 w-4" />
            AI-Powered Learning Platform
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl">
            Learn to Code by{' '}
            <span className="text-violet-600">Actually Building</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Stop watching tutorials. Start building real apps with an AI mentor by your side.
            From absolute beginner to shipping your first product.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-lg bg-violet-600 px-6 text-base font-medium text-white transition-colors hover:bg-violet-700"
            >
              Start Learning Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-lg border border-zinc-200 px-6 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              Not Another Tutorial Platform
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Three learning modes that work together to get you from zero to deploying real apps.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Learn */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-700 dark:bg-zinc-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Learn
              </h3>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                Interactive lessons with your AI tutor. No long videos - just conversational
                learning that adapts to your pace.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  'Bite-sized lessons (5-15 min)',
                  'Ask questions anytime',
                  'Progress at your own pace',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-500">
                    <Check className="h-4 w-4 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Practice */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-700 dark:bg-zinc-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Practice
              </h3>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                Hands-on coding challenges with instant AI feedback. Fix bugs, build features,
                and level up your skills.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  'Real-time code review',
                  'Progressive hints (not answers)',
                  'Learn from mistakes',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-500">
                    <Check className="h-4 w-4 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Create */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-700 dark:bg-zinc-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                <Rocket className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Create
              </h3>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                Build and deploy real applications with guided milestones. Your AI co-founder
                helps you ship.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  'Build portfolio projects',
                  'Deploy to the web',
                  'Guided step-by-step',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-500">
                    <Check className="h-4 w-4 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              How It Works
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              From complete beginner to shipping your first app in weeks, not months.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: 1,
                title: 'Start Learning',
                description:
                  'Begin with the fundamentals. Your AI tutor adapts to your pace and knowledge level.',
              },
              {
                step: 2,
                title: 'Practice Daily',
                description:
                  'Apply what you learn with hands-on challenges. Get instant feedback on your code.',
              },
              {
                step: 3,
                title: 'Build Projects',
                description:
                  'Create real applications with guided milestones. From idea to deployed product.',
              },
              {
                step: 4,
                title: 'Ship & Share',
                description:
                  'Deploy your apps to the web and build your portfolio. Show the world what you made.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mb-4 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-600 font-bold dark:bg-violet-900/30 dark:text-violet-400">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-violet-600">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Start Building?
          </h2>
          <p className="mt-4 text-violet-100">
            Join thousands of learners who are building real apps, not just watching tutorials.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-white px-6 text-base font-medium text-violet-600 transition-colors hover:bg-violet-50"
          >
            Start Learning Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <p className="mt-4 text-sm text-violet-200">
            No credit card required. Start with free modules.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-12 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
                <Code className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                Vibe Coding Academy
              </span>
            </div>
            <p className="text-sm text-zinc-500">
              Learn to code by building real projects with AI guidance.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
