const posts = [
  {
    id: 1,
    title: "The Art of Minimalist Design in Modern Web Development",
    excerpt:
      "Less is more — how stripping away the unnecessary reveals the essence of great user experiences and why every pixel should earn its place.",
    content: `
<p>There's a quiet revolution happening in web design. After years of cramming every pixel with content, gradients, and animations, the industry is rediscovering an old truth: simplicity is the ultimate sophistication.</p>

<h2>Why Minimalism Works</h2>

<p>Minimalist design isn't about removing things until nothing is left. It's about removing things until only what matters remains. Every element on the page should serve a purpose — if it doesn't guide the user or communicate something essential, it's noise.</p>

<p>Consider the most successful digital products of the past decade. Notion, Linear, Stripe — they all share a commitment to clean interfaces where content breathes and functionality is intuitive rather than overwhelming.</p>

<blockquote>Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away. — Antoine de Saint-Exupéry</blockquote>

<h2>The Three Pillars</h2>

<p>Effective minimalist design rests on three principles:</p>

<ul>
<li><strong>Intentional whitespace</strong> — Space isn't empty; it's a design element that creates hierarchy and focus.</li>
<li><strong>Typography as UI</strong> — When you strip away decorative elements, your type choices become the primary visual language.</li>
<li><strong>Purposeful color</strong> — A restrained palette with one or two accent colors creates more impact than a rainbow ever could.</li>
</ul>

<h2>Practical Steps</h2>

<p>Start your next project by designing the content first. Before picking colors or building components, write out what the user needs to see and do. Then build only what supports those goals. You'll be surprised how much you can leave out — and how much better the result feels.</p>

<p>The hardest part of minimalist design isn't the aesthetic. It's the discipline to say no to features, decorations, and complexities that don't serve the user. But that discipline is what separates good design from great design.</p>
    `,
    date: "2026-02-28",
    author: "Elena Marchetti",
  },
  {
    id: 2,
    title: "Building Resilient APIs: Lessons from Five Years in Production",
    excerpt:
      "Real-world patterns for designing APIs that handle failure gracefully, scale under pressure, and remain a joy to maintain years later.",
    content: `
<p>After five years of building and maintaining APIs that serve millions of requests daily, I've learned that the difference between a good API and a great one isn't in the happy path — it's in how it handles everything that goes wrong.</p>

<h2>Design for Failure First</h2>

<p>Every external call will eventually fail. Every database query will eventually time out. Every downstream service will eventually go down. The question isn't <em>if</em> but <em>when</em>, and your API's behavior in those moments defines the user experience.</p>

<p>Start every endpoint design by asking: "What happens when this fails?" Build your error responses before your success responses. Implement circuit breakers before you implement caching. This inverted approach leads to fundamentally more resilient systems.</p>

<h2>The Idempotency Imperative</h2>

<p>Network failures mean requests get retried. If your POST endpoint creates a duplicate record on retry, you have a bug — not a network problem. Every mutating operation should accept an idempotency key:</p>

<pre data-language="plaintext" data-language-label="Plain text"><code class="language-plaintext">POST /api/orders
Idempotency-Key: ord_8x7k2m9p
Content-Type: application/json

{
  "items": [{ "sku": "WIDGET-01", "quantity": 2 }],
  "payment_method": "pm_card_visa"
}</code></pre>

<p>Store the key, the response, and the status. On retry, return the stored response. This single pattern eliminates entire categories of production bugs.</p>

<h2>Version from Day One</h2>

<p>You will need to make breaking changes. Accept this reality on day one and version your API accordingly. URL-based versioning (<code>/v1/users</code>) is simpler to reason about than header-based versioning, and your future self will thank you for the clarity.</p>

<h3>Rate Limiting as a Feature</h3>

<p>Rate limits aren't just protection — they're a communication tool. Clear rate limit headers tell clients exactly where they stand and help them build better integrations. Treat your rate limiter as a first-class feature, not an afterthought.</p>

<p>The best APIs I've worked with all share one quality: they make the right thing easy and the wrong thing hard. That's the standard we should all aim for.</p>
    `,
    date: "2026-02-20",
    author: "Marcus Chen",
  },
  {
    id: 3,
    title: "Why I Switched from VS Code to Neovim (And Back Again)",
    excerpt:
      "A developer's honest journey through editor wars, productivity rabbit holes, and the surprising lesson about tools versus craft.",
    content: `
<p>Six months ago, I did what every developer eventually considers: I switched to Neovim. Full-time. Cold turkey. I configured LSPs, spent weekends tweaking Lua configs, and learned motions until they became muscle memory. Here's what actually happened.</p>

<h2>The Honeymoon Phase</h2>

<p>The first two weeks were electric. Modal editing felt like unlocking a superpower. Moving through code without touching the mouse was genuinely faster for navigation. My dotfiles became a work of art. I felt like a <em>real</em> developer.</p>

<p>I could refactor entire files without my hands leaving the home row. Macros let me make repetitive changes in seconds. The terminal-native workflow meant everything lived in one place.</p>

<h2>The Reality Check</h2>

<p>By month three, I noticed something uncomfortable. I was spending more time configuring my editor than writing code. Every new language meant a new LSP setup. Every plugin update risked breaking something. My config repo had more commits than my actual projects.</p>

<blockquote>The tool should serve the craft, not become the craft itself.</blockquote>

<p>I also missed things I didn't expect to miss: the debugger integration, GitLens inline blame, the extensions ecosystem that "just works." Not because Neovim couldn't do these things — but because the friction of making them work was constant.</p>

<h2>The Return</h2>

<p>I went back to VS Code, but I brought the best parts of Neovim with me. The Vim extension gives me modal editing. Custom keybindings replicate my most-used motions. I get 80% of the Neovim magic with 20% of the configuration overhead.</p>

<h3>The Real Lesson</h3>

<p>The best editor is the one that disappears. The one where you stop thinking about the tool and start thinking about the problem. For some people that's Neovim. For me, it turned out to be a Vim-flavored VS Code.</p>

<p>Stop optimizing your tools and start shipping your work. The editor doesn't matter nearly as much as what you build with it.</p>
    `,
    date: "2026-02-14",
    author: "Jordan Reeves",
  },
  {
    id: 4,
    title: "A Practical Guide to React Server Components",
    excerpt:
      "Cut through the hype — here's what React Server Components actually change about how we build apps, with concrete examples you can use today.",
    content: `
<p>React Server Components (RSC) represent the biggest shift in React's architecture since hooks. But beneath the conference talks and Twitter debates, there's a pragmatic set of patterns that can genuinely improve your applications. Let's cut through the noise.</p>

<h2>The Mental Model</h2>

<p>Think of RSC as a way to run components on the server and send their <em>rendered output</em> — not their code — to the client. The client never downloads the component's JavaScript, never executes it, never bundles it. The HTML just appears.</p>

<p>This means a Server Component can directly access your database, read from the filesystem, or call internal APIs — all without exposing those operations to the browser or adding to the client bundle.</p>

<h2>When to Use Server vs Client Components</h2>

<p>The decision is simpler than it seems:</p>

<ul>
<li><strong>Server Components</strong> — Data fetching, accessing backend resources, rendering static or semi-static content, anything that doesn't need interactivity.</li>
<li><strong>Client Components</strong> — Event handlers (onClick, onChange), browser APIs, state (useState, useReducer), effects (useEffect), interactive UI.</li>
</ul>

<p>The key insight: most of your app is probably Server Component material. The interactive bits — forms, modals, dropdowns — are islands of client code in a sea of server-rendered content.</p>

<h2>A Concrete Example</h2>

<p>Consider a blog post page. The post content, author info, and related articles are all static once fetched. Only the comment form and like button need client interactivity. With RSC, the entire page minus those two elements ships zero JavaScript to the client.</p>

<pre data-language="jsx" data-language-label="JSX"><code class="language-jsx">// PostPage.server.js — runs on the server
async function PostPage({ params }) {
  const post = await db.posts.find(params.id);
  const related = await db.posts.related(post.id);

  return (
    &lt;article&gt;
      &lt;h1&gt;{post.title}&lt;/h1&gt;
      &lt;PostContent content={post.body} /&gt;
      &lt;CommentForm postId={post.id} /&gt;  {/* Client Component */}
      &lt;RelatedPosts posts={related} /&gt;
    &lt;/article&gt;
  );
}</code></pre>

<h3>The Migration Path</h3>

<p>You don't need to rewrite your app. Start with leaf components that fetch data and have no interactivity. Convert those to Server Components. Work your way up. The architecture supports incremental adoption by design.</p>

<p>RSC isn't a silver bullet, but for content-heavy applications with clear server/client boundaries, it's a genuinely better architecture. Give it a try on your next feature — the performance wins speak for themselves.</p>
    `,
    date: "2026-02-07",
    author: "Priya Sharma",
  },
  {
    id: 5,
    title: "The Psychology of Great Onboarding Flows",
    excerpt:
      "What cognitive science tells us about first impressions in software — and how to design onboarding that converts visitors into loyal users.",
    content: `
<p>You have about eight seconds. That's how long a new user will give your product before deciding whether to invest more time or close the tab. Great onboarding doesn't just teach your product — it creates momentum.</p>

<h2>The Cognitive Load Problem</h2>

<p>Most onboarding fails because it front-loads information. Feature tours, tooltip storms, and five-step wizards all make the same mistake: they treat onboarding as education. But users didn't sign up to learn — they signed up to accomplish something.</p>

<p>Cognitive load theory tells us that working memory can hold roughly four chunks of information at once. Every tooltip, every choice, every unfamiliar term consumes one of those precious slots. Overwhelm the user's working memory and they won't just forget your features — they'll leave.</p>

<h2>The Aha Moment Framework</h2>

<p>Every successful product has an "aha moment" — the point where the user first experiences real value. For Slack, it's receiving a message in a channel. For Dropbox, it's seeing a file sync across devices. For Figma, it's watching someone else's cursor move in real-time.</p>

<p>Your entire onboarding should be a guided path to that moment. Nothing else matters until the user has felt your product's core value.</p>

<blockquote>Don't teach the product. Deliver the value. The teaching happens naturally after the user cares enough to learn.</blockquote>

<h2>Patterns That Work</h2>

<ul>
<li><strong>Progressive disclosure</strong> — Show only what's needed right now. Reveal complexity as the user grows.</li>
<li><strong>Empty states as onboarding</strong> — That blank dashboard isn't a bug; it's a canvas. Use it to guide the first action.</li>
<li><strong>Social proof in context</strong> — "12,000 teams created their first project in under 2 minutes" reduces anxiety at decision points.</li>
<li><strong>Celebration micro-interactions</strong> — A confetti animation or a congratulatory message after the first completed action creates an emotional hook.</li>
</ul>

<h3>Measuring Success</h3>

<p>Track your activation rate — the percentage of signups who reach the aha moment within their first session. This single metric tells you more about your onboarding's effectiveness than any satisfaction survey. If it's below 40%, your onboarding is your biggest growth lever.</p>

<p>The best onboarding feels invisible. The user simply... starts using the product, and everything clicks. That's not magic — it's design.</p>
    `,
    date: "2026-01-30",
    author: "Aisha Okonkwo",
  },
  {
    id: 6,
    title: "Debugging Performance: A Chrome DevTools Deep Dive",
    excerpt:
      "Beyond console.log — advanced profiling techniques that helped me cut a React app's load time from 4.2s to 1.1s with real before-and-after data.",
    content: `
<p>Last month I inherited a React application that took 4.2 seconds to become interactive on a mid-range phone. Six weeks later, it loads in 1.1 seconds. Here's every technique I used, in the order I applied them.</p>

<h2>Step 1: Establish a Baseline</h2>

<p>Before optimizing anything, measure everything. Open Chrome DevTools, go to the Performance tab, and record a full page load with CPU throttling set to 4x and network throttling on "Fast 3G." This simulates a real-world mobile experience.</p>

<p>The key metrics to capture: First Contentful Paint (FCP), Largest Contentful Paint (LCP), Time to Interactive (TTI), and Total Blocking Time (TBT). Write these down. You can't improve what you don't measure.</p>

<h2>Step 2: The Bundle Audit</h2>

<p>Run <code>npx source-map-explorer build/static/js/*.js</code> and prepare to be horrified. In our case, three libraries accounted for 60% of the bundle:</p>

<ul>
<li><strong>moment.js</strong> (320KB) — Replaced with dayjs (2KB) for identical functionality.</li>
<li><strong>lodash</strong> (72KB full) — Switched to individual imports: <code>import debounce from 'lodash/debounce'</code> (1KB).</li>
<li><strong>A rich text editor</strong> loaded on every page — Lazy-loaded it only on the editor route.</li>
</ul>

<p>These three changes alone cut the bundle from 890KB to 340KB.</p>

<h2>Step 3: Render Profiling</h2>

<p>The React DevTools Profiler is your best friend. Record an interaction and look for components that re-render when they shouldn't. In our app, a context provider at the root was causing the entire tree to re-render on every state change.</p>

<pre data-language="javascript" data-language-label="JavaScript"><code class="language-javascript">// Before: one giant context
const AppContext = createContext({ user, theme, cart, notifications });

// After: split by update frequency
const UserContext = createContext(user);
const ThemeContext = createContext(theme);
const CartContext = createContext(cart);</code></pre>

<p>Splitting the context reduced unnecessary re-renders by 73%.</p>

<h3>Step 4: Image Optimization</h3>

<p>Serve WebP with PNG fallbacks. Use <code>loading="lazy"</code> on images below the fold. Serve responsive sizes with <code>srcset</code>. These changes improved LCP by 800ms on their own.</p>

<h3>The Results</h3>

<p>After all optimizations: FCP dropped from 2.1s to 0.6s, LCP from 3.8s to 0.9s, TTI from 4.2s to 1.1s. The Lighthouse score went from 34 to 96. More importantly, the bounce rate dropped 22% and session duration increased 35%.</p>

<p>Performance isn't a feature — it's the foundation. Every millisecond you save is a user who stays.</p>
    `,
    date: "2026-01-22",
    author: "Tomás Rivera",
  },
];

export default posts;
