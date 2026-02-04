import { create } from 'zustand';
import type { Module, UserProgress, Challenge, ChallengeAttempt, ConversationMessage } from '@/types';

interface LearningState {
  // Modules
  modules: Module[];
  currentModule: Module | null;
  moduleProgress: Map<string, UserProgress>;

  // Challenges
  challenges: Challenge[];
  currentChallenge: Challenge | null;
  challengeAttempts: ChallengeAttempt[];

  // Conversations
  learnConversation: ConversationMessage[];
  practiceConversation: ConversationMessage[];

  // UI State
  activeTab: 'learn' | 'practice' | 'create';
  isChatOpen: boolean;

  // Actions - Modules
  setModules: (modules: Module[]) => void;
  setCurrentModule: (module: Module | null) => void;
  updateModuleProgress: (moduleId: string, progress: UserProgress) => void;

  // Actions - Challenges
  setChallenges: (challenges: Challenge[]) => void;
  setCurrentChallenge: (challenge: Challenge | null) => void;
  addChallengeAttempt: (attempt: ChallengeAttempt) => void;

  // Actions - Conversations
  addLearnMessage: (message: ConversationMessage) => void;
  addPracticeMessage: (message: ConversationMessage) => void;
  clearLearnConversation: () => void;
  clearPracticeConversation: () => void;

  // Actions - UI
  setActiveTab: (tab: 'learn' | 'practice' | 'create') => void;
  setIsChatOpen: (open: boolean) => void;

  // Reset
  reset: () => void;
}

const initialState = {
  modules: [],
  currentModule: null,
  moduleProgress: new Map(),
  challenges: [],
  currentChallenge: null,
  challengeAttempts: [],
  learnConversation: [],
  practiceConversation: [],
  activeTab: 'learn' as const,
  isChatOpen: false,
};

export const useLearningStore = create<LearningState>()((set) => ({
  ...initialState,

  // Modules
  setModules: (modules) => set({ modules }),
  setCurrentModule: (currentModule) => set({ currentModule }),
  updateModuleProgress: (moduleId, progress) =>
    set((state) => {
      const newProgress = new Map(state.moduleProgress);
      newProgress.set(moduleId, progress);
      return { moduleProgress: newProgress };
    }),

  // Challenges
  setChallenges: (challenges) => set({ challenges }),
  setCurrentChallenge: (currentChallenge) => set({ currentChallenge }),
  addChallengeAttempt: (attempt) =>
    set((state) => ({
      challengeAttempts: [...state.challengeAttempts, attempt],
    })),

  // Conversations
  addLearnMessage: (message) =>
    set((state) => ({
      learnConversation: [...state.learnConversation, message],
    })),
  addPracticeMessage: (message) =>
    set((state) => ({
      practiceConversation: [...state.practiceConversation, message],
    })),
  clearLearnConversation: () => set({ learnConversation: [] }),
  clearPracticeConversation: () => set({ practiceConversation: [] }),

  // UI
  setActiveTab: (activeTab) => set({ activeTab }),
  setIsChatOpen: (isChatOpen) => set({ isChatOpen }),

  // Reset
  reset: () => set(initialState),
}));
