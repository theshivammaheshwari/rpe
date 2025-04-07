import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    title: "SNIP & SJR Explained Simply",
    subtitle: "Understanding Journal Metric",
    description: "How do we measure a journal's importance?",
    presenter: "• Shivam Maheshwari 24PCS001 • Ritik Kumar 24PPH002",
    mentor: "Dr. Vikas Sharma"
  },
  
  {
    title: "🎯 What is SNIP?",
    subtitle: "(Source Normalized Impact per Paper)",
    sections: [
      {
        title: "Imagine this... 🌟",
        points: [
          "Like comparing apples to oranges 🍎🍊",
          "Math papers get fewer citations",
          "Biology papers get many citations",
          "How to compare fairly? 🤔"
        ]
      },
      {
        title: "SNIP helps! 🎯",
        points: [
          "Adjusts for field differences",
          "Makes fair comparisons",
          "Like using a calculator that knows different subjects! 🧮"
        ]
      }
    ],
    formula: {
      title: "The Magic Formula ✨",
      text: "SNIP = Citations ÷ Expected Citations in Field"
    }
  },
  {
    title: "🎮 Let's Play with SNIP!",
    subtitle: "Mathematical Examples",
    examples: [
      {
        title: "📐 Math Journal Example",
        calculation: [
          "Given:",
          "• Actual Citations = 30",
          "• Expected Citations = 10",
          "",
          "SNIP = 30 ÷ 10 = 3.0",
          "",
          "This means the journal has 3x more impact than expected!"
        ]
      },
      {
        title: "🧬 Biology Journal Example",
        calculation: [
          "Given:",
          "• Actual Citations = 100",
          "• Expected Citations = 50",
          "",
          "SNIP = 100 ÷ 50 = 2.0",
          "",
          "This shows 2x more impact than expected!"
        ]
      }
    ],
    conclusion: "The Math journal (SNIP = 3.0) has higher relative impact than the Biology journal (SNIP = 2.0)!"
  },
  
  {
    title: "👑 What is SJR?",
    subtitle: "(SCImago Journal Rank)",
    sections: [
      {
        title: "Think of it like... 🎭",
        points: [
          "A popularity contest 🌟",
          "But with VIP votes!",
          "Like getting likes from celebrities 📱",
          "More valuable than regular likes"
        ]
      },
      {
        title: "How it Works 🎮",
        points: [
          "Citations are like votes",
          "Famous journal's vote = More points",
          "Like a game of tag with bonus points! 🎯",
          "More prestige = More influence"
        ]
      }
    ],
    formula: {
      title: "The Cool Formula 🎨",
      text: "SJR = (Σ Citations × Prestige of Source Journals) ÷ Total Published Articles"
    }
  },

  {
    title: "🎮 Let's Play with SJR!",
    subtitle: "Mathematical Examples",
    examples: [
      {
        title: "📊 Journal A Example",
        calculation: [
          "Given:",
          "• Base Citations = 100",
          "• Citing Journal's Prestige = 1.5",
          "",
          "Weighted Citations = 100 × 1.5 = 150",
          "Total Articles = 40",
          "SJR Score = 150 ÷ Total Articles = 3.75",
          "",
          "High prestige citations boost the score!"
        ]
      },
      {
        title: "📈 Journal B Example",
        calculation: [
          "Given:",
          "• Base Citations = 150",
          "• Citing Journal's Prestige = 1.0",
          "",
          "Weighted Citations = 150 × 1.0 = 150",
          "Total Articles = 30",
          "SJR Score = 150 ÷ Total Articles = 3.0",
          "",
          "More citations but lower prestige impact!"
        ]
      }
    ],
    conclusion: "Journal A has higher SJR despite fewer citations due to prestigious sources!"
  },

  {
    title: "🤝 SNIP vs SJR: Friends Not Rivals!",
    sections: [
      {
        title: "🎯 SNIP is like...",
        points: [
          "A fair sports referee 🏃‍♂️",
          "Considers field differences",
          "Makes everything equal",
          "Perfect for comparing different subjects"
        ]
      },
      {
        title: "👑 SJR is like...",
        points: [
          "A social media influencer counter 📱",
          "Cares about who's sharing",
          "Values prestigious connections",
          "Perfect for measuring importance"
        ]
      }
    ],
    conclusion: "Use both! They're like two friends helping you understand journal importance! 🤝"
  },
  {
    title: "🎓 Quick Tips to Remember!",
    sections: [
      {
        title: "🎯 SNIP",
        points: [
          "Fair comparison",
          "Field-specific",
          "Like sports handicaps",
          "Easy to understand"
        ]
      },
      {
        title: "👑 SJR",
        points: [
          "Prestige matters",
          "Quality over quantity",
          "Like social influence",
          "Complex but powerful"
        ]
      },
      {
        title: "🌟 Together",
        points: [
          "Complete picture",
          "Better decisions",
          "Use both metrics",
          "Smart choice!"
        ]
      }
    ],
    conclusion: "It's like having two super tools to measure journal awesomeness! 🚀"
  },
  {
    title: "🎉 Thank You!",
    subtitle: "Questions? Let's Chat! 🗣️",
    contact: {
      title: "📧 Contact Us",
      emails: [
        "Shivam: 24pcs001@lnmiit.ac.in",
        "Ritik: 24pph002@lnmiit.ac.in"
      ]
    },
    funFact: {
      title: "🌟 Fun Fact",
      text: "Using both SNIP & SJR is like having superhero powers in academic publishing! 💪"
    }
  }
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const renderMathExample = (example) => (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="p-8 bg-white rounded-2xl shadow-xl"
    >
      <h3 className="text-3xl mb-6 text-gray-800">{example.title}</h3>
      <pre className="text-lg text-gray-700 font-mono whitespace-pre-wrap">
        {example.calculation.join('\n')}
      </pre>
    </motion.div>
  );

  const renderSlideContent = (slide) => {
    if (currentSlide === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            {slide.title}
          </motion.h1>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl mb-12 text-gray-700"
          >
            {slide.subtitle}
          </motion.h2>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-3xl text-blue-600 mb-16"
          >
            {slide.description}
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-2xl mb-8 text-gray-600"
          >
            {slide.presenter}
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-xl text-gray-500"
          >
            Under the guidance of<br />
            <span className="text-green-600 text-2xl">{slide.mentor}</span>
          </motion.div>
        </div>
      );
    }

    if (slide.examples) {
      return (
        <div className="h-full flex flex-col items-center justify-center p-8">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-bold text-center mb-6 text-gray-800"
          >
            {slide.title}
          </motion.h1>
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl text-center mb-12 text-gray-700"
          >
            {slide.subtitle}
          </motion.h2>
          <div className="grid grid-cols-2 gap-8 w-full max-w-7xl">
            {slide.examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 * (index + 1) }}
              >
                {renderMathExample(example)}
              </motion.div>
            ))}
          </div>
          {slide.conclusion && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-12 text-center p-8 bg-white rounded-2xl shadow-xl w-full max-w-3xl"
            >
              <p className="text-2xl text-blue-600">{slide.conclusion}</p>
            </motion.div>
          )}
        </div>
      );
    }

    if (currentSlide === slides.length - 1) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-7xl font-bold mb-8 text-gray-800"
          >
            {slide.title}
          </motion.h1>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl mb-16 text-gray-700"
          >
            {slide.subtitle}
          </motion.h2>
          <div className="grid grid-cols-2 gap-16 w-full max-w-6xl">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="p-8 bg-white rounded-2xl shadow-xl"
            >
              <h3 className="text-3xl mb-6 text-gray-800">{slide.contact.title}</h3>
              {slide.contact.emails.map((email, index) => (
                <p key={index} className="text-xl text-gray-600 mb-4">{email}</p>
              ))}
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="p-8 bg-white rounded-2xl shadow-xl"
            >
              <h3 className="text-3xl mb-6 text-gray-800">{slide.funFact.title}</h3>
              <p className="text-xl text-gray-600">{slide.funFact.text}</p>
            </motion.div>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col items-center justify-center">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-6xl font-bold text-center mb-6 text-gray-800"
        >
          {slide.title}
        </motion.h1>
        {slide.subtitle && (
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl text-center mb-12 text-gray-700"
          >
            {slide.subtitle}
          </motion.h2>
        )}
        {slide.sections && (
          <div className="grid grid-cols-2 gap-12 w-full max-w-7xl px-8">
            {slide.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 * (index + 1) }}
                className="p-8 bg-white rounded-2xl shadow-xl"
              >
                <h3 className="text-3xl mb-6 text-gray-800">{section.title}</h3>
                <ul className="space-y-4">
                  {section.points.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 * i + 0.5 }}
                      className="text-xl text-gray-600"
                    >
                      • {point}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}
        {slide.formula && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 text-center p-8 bg-white rounded-2xl shadow-xl w-full max-w-3xl"
          >
            <h3 className="text-3xl mb-6 text-gray-800">{slide.formula.title}</h3>
            <p className="text-3xl text-green-600">{slide.formula.text}</p>
          </motion.div>
        )}
        {slide.conclusion && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 text-center p-8 bg-white rounded-2xl shadow-xl w-full max-w-3xl"
          >
            <p className="text-2xl text-blue-600">{slide.conclusion}</p>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full h-full flex items-center justify-center p-12"
        >
          {renderSlideContent(slides[currentSlide])}
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;