export enum Difficulty {
  Beginner = "初级",
  Intermediate = "中级",
  Advanced = "高级",
}

export enum GrammarCategory {
  NonFinite = "非谓语动词",
  RelativeClause = "定语从句",
  AdverbialClause = "状语从句",
  Conjunction = "连词",
  NounClause = "名词性从句",
  ParticiplePhrase = "分词短语",
}

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  sentence: string; // Use "____" for blanks
  options: Option[];
  correctAnswerId: string;
  difficulty: Difficulty;
  category: GrammarCategory;
  explanation: {
    rule: string;
    example: string;
    commonMistake: string;
    reviewLink?: string;
  };
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
}
