import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { fadeUp, stagger } from '../utils/animations';

const articleContent: Record<string, { title: string, definition: string, details: string[] }> = {
  "React": {
    title: "React",
    definition: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    details: [
      "React makes it painless to create interactive UIs. By designing simple views for each state in your application, React will efficiently update and render just the right components when your data changes.",
      "As an AI/ML Explorer, I use React to build dynamic, responsive frontends for complex AI tools and dashboards, ensuring that sophisticated backend logic is presented through a clean, accessible user interface."
    ]
  },
  "TypeScript": {
    title: "TypeScript",
    definition: "A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
    details: [
      "TypeScript adds additional syntax to JavaScript to support a tighter integration with your editor. Catch errors early in your editor.",
      "I leverage TypeScript heavily in my full-stack projects (like LeadBot_AI) to enforce type safety, improve code maintainability, and ensure that large-scale agentic workflows remain robust and bug-free."
    ]
  },
  "Node.js": {
    title: "Node.js",
    definition: "An asynchronous event-driven JavaScript runtime designed to build scalable network applications.",
    details: [
      "Node.js allows developers to write server-side code using JavaScript, unifying the development language across the stack.",
      "I utilize Node.js to power the backend of my scalable web applications, handling asynchronous requests efficiently, especially when interfacing with third-party APIs or running agentic loops."
    ]
  },
  "Python": {
    title: "Python",
    definition: "A high-level, general-purpose programming language known for its readability and massive ecosystem in data science and AI.",
    details: [
      "Python is the undisputed king of Machine Learning, Artificial Intelligence, and data manipulation.",
      "It is my primary language for building Machine Learning models, natural language processing pipelines (like my Hybrid Chatbot), and running heavy AI inferences (like Face-Recognition-System)."
    ]
  },
  "Machine Learning": {
    title: "Machine Learning",
    definition: "A branch of artificial intelligence (AI) and computer science which focuses on the use of data and algorithms to imitate the way that humans learn.",
    details: [
      "Machine learning algorithms build a model based on sample data, known as training data, in order to make predictions or decisions without being explicitly programmed to do so.",
      "I have deployed various ML systems across diverse roles, from Dataset Finders to predictive modeling, translating complex data into actionable business intelligence."
    ]
  },
  "Agentic AI": {
    title: "Agentic AI",
    definition: "Artificial intelligence systems capable of autonomous goal-directed behavior, reasoning, and tool use.",
    details: [
      "Unlike traditional AI that simply answers prompts, Agentic AI can break down complex goals into steps, research information, and execute multi-stage tasks autonomously.",
      "Projects like Agentic-Research-Bot and LeadBot_AI highlight my expertise in orchestrating AI agents to handle end-to-end tasks, such as automating research papers or lead generation."
    ]
  },
  "HTML": {
    title: "HTML",
    definition: "The standard markup language for documents designed to be displayed in a web browser.",
    details: [
      "HTML provides the fundamental structure of web pages, which is then enhanced and modified by technologies like CSS and JavaScript.",
      "I write clean, semantic HTML to ensure my applications are accessible, SEO-friendly, and perfectly structured before any styling or React logic is applied."
    ]
  },
  "CSS": {
    title: "CSS",
    definition: "A style sheet language used for describing the presentation of a document written in HTML.",
    details: [
      "CSS is what brings the web to life, allowing developers to create stunning, responsive, and animated user interfaces.",
      "I pair advanced CSS (and frameworks like Tailwind) with framer-motion to craft immersive digital experiences, sleek terminal-themed UIs, and glowing animations."
    ]
  },
  "JavaScript": {
    title: "JavaScript",
    definition: "A lightweight, interpreted, or just-in-time compiled programming language with first-class functions.",
    details: [
      "JavaScript is the core scripting language of the web, enabling interactive web pages and complex frontend logic.",
      "As a full-stack developer, JavaScript is my bread and butter for breathing life into web applications, handling DOM manipulation, and interfacing with backend services."
    ]
  },
  "C++": {
    title: "C++",
    definition: "A cross-platform language that can be used to create high-performance applications.",
    details: [
      "C++ gives programmers a high level of control over system resources and memory, making it ideal for performance-critical applications.",
      "My foundational understanding of C++ algorithms aids me in optimizing logic, understanding memory management, and writing highly efficient code even in higher-level languages."
    ]
  },
  "Java": {
    title: "Java",
    definition: "A high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible.",
    details: [
      "Java is a write once, run anywhere language, renowned for its enterprise-level stability, strong memory management, and massive ecosystem.",
      "Understanding Java's strict object-oriented paradigms heavily influences how I structure robust, scalable architectures across my backend projects."
    ]
  },
  "Vibe Coding": {
    title: "Vibe Coding",
    definition: "An intuitive, flow-state approach to development where you trust your instincts and let AI assistants handle the boilerplate.",
    details: [
      "Vibe coding is about collaborating seamlessly with AI, writing natural language prompts, and guiding the architecture while the AI writes the code.",
      "I embrace vibe coding to rapidly prototype and build the future. It allows me to focus on the 'what' and 'why' of problem-solving while Agentic AI handles the 'how'."
    ]
  }
};

export default function Article() {
  const { skillId } = useParams<{ skillId: string }>();
  const skillName = skillId ? decodeURIComponent(skillId) : 'Unknown Skill';
  
  const content = articleContent[skillName] || {
    title: skillName,
    definition: "Technology module loaded successfully.",
    details: [
      `An in-depth look at ${skillName}, a critical technology in modern software engineering.`,
      `As an AI/ML Explorer and Full-Stack Developer, I leverage ${skillName} to architect solutions that are not only performant but also future-proof. My experience with it allows me to seamlessly integrate complex workflows and deliver outstanding digital products.`
    ]
  };

  return (
    <div style={{ background: 'var(--bg-primary)', paddingTop: '100px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px 80px' }}>
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                color: 'var(--text-secondary)', textDecoration: 'none',
                fontFamily: 'JetBrains Mono', fontSize: '13px',
                transition: 'color 0.2s',
              }}
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
            <div className="section-header">// skill definition</div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--text-primary)', marginBottom: '16px' }}>
              {content.title}
            </h1>
            <div style={{ width: '60px', height: '2px', background: 'var(--accent-primary)', marginBottom: '32px' }} />
          </motion.div>

          <motion.div variants={fadeUp} className="terminal-window">
            <div className="terminal-titlebar">
              <div className="terminal-dot red" />
              <div className="terminal-dot yellow" />
              <div className="terminal-dot green" />
              <span style={{ marginLeft: '16px', fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>
                ~ whatis_{content.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.sh
              </span>
            </div>
            <div className="terminal-body" style={{ padding: '32px' }}>
              <p style={{ color: 'var(--accent-primary)', marginBottom: '24px' }}>
                $ <span style={{ color: 'var(--text-primary)' }}>define {content.title}</span>
              </p>
              
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '16px' }}>
                <span style={{ color: 'var(--accent-secondary)' }}>&gt; Core Definition:</span> {content.definition}
              </p>
              <br />
              
              {content.details.map((paragraph, index) => (
                <div key={index}>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '16px' }}>
                    {paragraph}
                  </p>
                  <br />
                </div>
              ))}
              
              <p style={{ color: 'var(--accent-primary)' }}>
                $ <span className="blink" style={{ color: 'var(--text-primary)' }}>_</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
