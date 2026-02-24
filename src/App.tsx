import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  RotateCcw, 
  BookOpen, 
  Trophy,
  AlertCircle,
  ExternalLink,
  GraduationCap,
  Layout
} from 'lucide-react';
import { questions } from './data/questions';
import { Question, Difficulty, GrammarCategory } from './types';

const App: React.FC = () => {
  const [showCover, setShowCover] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [history, setHistory] = useState<{ questionId: string; isCorrect: boolean }[]>([]);

  const currentQuestion = questions[currentIndex];

  const handleStart = () => {
    setShowCover(false);
  };

  const handleOptionSelect = (id: string) => {
    if (isSubmitted) return;
    setSelectedOptionId(id);
  };

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    
    const isCorrect = selectedOptionId === currentQuestion.correctAnswerId;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setHistory(prev => [...prev, { questionId: currentQuestion.id, isCorrect }]);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsSubmitted(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResults(false);
    setHistory([]);
    setShowCover(true);
  };

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case Difficulty.Beginner: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case Difficulty.Intermediate: return 'bg-amber-100 text-amber-700 border-amber-200';
      case Difficulty.Advanced: return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (showCover) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans overflow-hidden relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100/50 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 p-8 md:p-12 text-center border border-white relative z-10"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-3xl mb-8 shadow-xl shadow-indigo-200 rotate-3">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight font-display">
            Grammar<span className="text-indigo-600">Master</span>
          </h1>
          
          <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-md mx-auto">
            专为初中生打造的英语语法互动练习。通过情境化选择与即时反馈，轻松掌握复杂句法结构。
          </p>

          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { label: '核心考点', value: '8+', icon: BookOpen },
              { label: '难度分级', value: '3级', icon: Layout },
              { label: '即时反馈', value: '100%', icon: CheckCircle2 },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <stat.icon className="w-5 h-5 text-indigo-500 mx-auto mb-2" />
                <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>

          <button 
            onClick={handleStart}
            className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-200 bg-indigo-600 font-pj rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200"
          >
            开启语法挑战
            <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="mt-8 flex items-center justify-center gap-6 text-slate-400 text-sm font-medium">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 非谓语动词</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 定语从句</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 状语从句</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center border border-slate-100"
        >
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center">
              <Trophy className="w-12 h-12 text-indigo-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">练习完成!</h2>
          <p className="text-slate-500 mb-8">太棒了，你已经完成了所有语法挑战。</p>
          
          <div className="bg-slate-50 rounded-2xl p-6 mb-8">
            <div className="text-5xl font-bold text-indigo-600 mb-2">
              {score} <span className="text-2xl text-slate-400">/ {questions.length}</span>
            </div>
            <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">最终得分</div>
          </div>

          <div className="space-y-4">
            <p className="text-slate-600 italic">
              {score === questions.length ? "完美无缺！你是语法大师！" : 
               score >= questions.length * 0.7 ? "表现出色！继续保持。" : 
               "加油！多加练习，你会更棒的。"}
            </p>
            <button 
              onClick={resetQuiz}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              重新开始
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-lg tracking-tight">GrammarMaster</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1 text-sm font-medium text-slate-500">
              <Layout className="w-4 h-4" />
              <span>初中语法专项</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>
            <div className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {currentIndex + 1} / {questions.length}
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-100">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-indigo-600"
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Question */}
          <div className="lg:col-span-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="p-6 md:p-10">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(currentQuestion.difficulty)}`}>
                      {currentQuestion.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                      {currentQuestion.category}
                    </span>
                  </div>

                  {/* Sentence */}
                  <div className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-800">
                      {currentQuestion.sentence.split('______').map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className={`inline-flex items-center justify-center min-w-[120px] px-4 py-1 mx-2 border-b-2 transition-all duration-300 ${
                              isSubmitted 
                                ? (selectedOptionId === currentQuestion.correctAnswerId ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-rose-500 text-rose-600 bg-rose-50')
                                : (selectedOptionId ? 'border-indigo-500 text-indigo-600 bg-indigo-50' : 'border-slate-300 text-slate-400')
                            }`}>
                              {selectedOptionId 
                                ? currentQuestion.options.find(o => o.id === selectedOptionId)?.text 
                                : '______'}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </h2>
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {currentQuestion.options.map((option) => {
                      const isSelected = selectedOptionId === option.id;
                      const isCorrect = option.id === currentQuestion.correctAnswerId;
                      
                      let buttonClass = "p-5 rounded-2xl border-2 text-left transition-all duration-200 flex items-center justify-between group ";
                      
                      if (isSubmitted) {
                        if (isCorrect) {
                          buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-700";
                        } else if (isSelected) {
                          buttonClass += "border-rose-500 bg-rose-50 text-rose-700";
                        } else {
                          buttonClass += "border-slate-100 bg-white text-slate-400 opacity-50";
                        }
                      } else {
                        buttonClass += isSelected 
                          ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md" 
                          : "border-slate-100 bg-slate-50 hover:border-indigo-200 hover:bg-white text-slate-600 hover:shadow-sm";
                      }

                      return (
                        <button
                          key={option.id}
                          onClick={() => handleOptionSelect(option.id)}
                          disabled={isSubmitted}
                          className={buttonClass}
                        >
                          <span className="font-semibold text-lg">{option.text}</span>
                          {isSubmitted && isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                          {isSubmitted && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-rose-500" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-end">
                    {!isSubmitted ? (
                      <button
                        onClick={handleSubmit}
                        disabled={!selectedOptionId}
                        className={`px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 ${
                          selectedOptionId 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700' 
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        提交答案
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all flex items-center gap-2"
                      >
                        {currentIndex < questions.length - 1 ? '下一题' : '查看结果'}
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Explanation Card (Visible after submission) */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="border-t border-slate-100 bg-slate-50/50"
                    >
                      <div className="p-6 md:p-10">
                        <div className="flex items-start gap-4 mb-6">
                          <div className={`p-2 rounded-lg ${selectedOptionId === currentQuestion.correctAnswerId ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                            <BookOpen className={`w-6 h-6 ${selectedOptionId === currentQuestion.correctAnswerId ? 'text-emerald-600' : 'text-rose-600'}`} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">详解卡片</h3>
                            <p className="text-slate-500 text-sm">掌握语法规则，告别易错点</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <section>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">语法规则</h4>
                              <p className="text-slate-700 leading-relaxed">{currentQuestion.explanation.rule}</p>
                            </section>
                            <section>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">典型例句</h4>
                              <div className="bg-white p-4 rounded-xl border border-slate-100 italic text-indigo-600">
                                "{currentQuestion.explanation.example}"
                              </div>
                            </section>
                          </div>
                          <div className="space-y-6">
                            <section>
                              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                常见误区
                              </h4>
                              <p className="text-slate-700 leading-relaxed">{currentQuestion.explanation.commonMistake}</p>
                            </section>
                            {currentQuestion.explanation.reviewLink && (
                              <section>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">扩展学习</h4>
                                <a 
                                  href={currentQuestion.explanation.reviewLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium group"
                                >
                                  查看相关语法复习链接
                                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </a>
                              </section>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </main>

      {/* Footer / Motivation */}
      <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-slate-400 text-sm">
        <p>© 2024 GrammarMaster · 助力初中生攻克英语语法</p>
      </footer>
    </div>
  );
};

export default App;
