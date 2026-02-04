import { create } from 'zustand';
import type { Project, ProjectMilestone, ConversationMessage } from '@/types';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  currentMilestone: ProjectMilestone | null;
  createConversation: ConversationMessage[];

  // Wizard state
  wizardStep: 'ideation' | 'planning' | 'setup' | 'building' | 'polish' | 'deploy';
  ideaDescription: string;
  selectedNiche: string;
  selectedTechStack: string[];

  // Actions - Projects
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project | null) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  addProject: (project: Project) => void;

  // Actions - Milestones
  setCurrentMilestone: (milestone: ProjectMilestone | null) => void;
  updateMilestone: (milestoneId: string, updates: Partial<ProjectMilestone>) => void;

  // Actions - Conversation
  addCreateMessage: (message: ConversationMessage) => void;
  clearCreateConversation: () => void;

  // Actions - Wizard
  setWizardStep: (step: ProjectState['wizardStep']) => void;
  setIdeaDescription: (description: string) => void;
  setSelectedNiche: (niche: string) => void;
  setSelectedTechStack: (stack: string[]) => void;
  resetWizard: () => void;

  // Reset
  reset: () => void;
}

const initialWizardState = {
  wizardStep: 'ideation' as const,
  ideaDescription: '',
  selectedNiche: '',
  selectedTechStack: [],
};

const initialState = {
  projects: [],
  currentProject: null,
  currentMilestone: null,
  createConversation: [],
  ...initialWizardState,
};

export const useProjectStore = create<ProjectState>()((set) => ({
  ...initialState,

  // Projects
  setProjects: (projects) => set({ projects }),
  setCurrentProject: (currentProject) => set({ currentProject }),
  updateProject: (projectId, updates) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId ? { ...p, ...updates } : p
      ),
      currentProject:
        state.currentProject?.id === projectId
          ? { ...state.currentProject, ...updates }
          : state.currentProject,
    })),
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),

  // Milestones
  setCurrentMilestone: (currentMilestone) => set({ currentMilestone }),
  updateMilestone: (milestoneId, updates) =>
    set((state) => {
      if (!state.currentProject) return state;

      const updatedMilestones = state.currentProject.milestones.map((m) =>
        m.id === milestoneId ? { ...m, ...updates } : m
      );

      return {
        currentProject: {
          ...state.currentProject,
          milestones: updatedMilestones,
        },
        currentMilestone:
          state.currentMilestone?.id === milestoneId
            ? { ...state.currentMilestone, ...updates }
            : state.currentMilestone,
      };
    }),

  // Conversation
  addCreateMessage: (message) =>
    set((state) => ({
      createConversation: [...state.createConversation, message],
    })),
  clearCreateConversation: () => set({ createConversation: [] }),

  // Wizard
  setWizardStep: (wizardStep) => set({ wizardStep }),
  setIdeaDescription: (ideaDescription) => set({ ideaDescription }),
  setSelectedNiche: (selectedNiche) => set({ selectedNiche }),
  setSelectedTechStack: (selectedTechStack) => set({ selectedTechStack }),
  resetWizard: () => set(initialWizardState),

  // Reset
  reset: () => set(initialState),
}));
