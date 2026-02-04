// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  experience_level: 'beginner' | 'some_experience' | 'intermediate';
  learning_goal?: string;
  niche_interest?: string;
  preferred_pace: 'slow' | 'moderate' | 'fast';
  hours_per_week?: number;
  subscription_tier: 'free' | 'pro' | 'premium';
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  onboarding_completed: boolean;
  current_module_id?: string;
  current_project_id?: string;
  total_time_spent: number; // in minutes
  streak_days: number;
  last_active_at: string;
}

// Module Types
export interface Module {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: ModuleContent;
  order_index: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimated_duration: number; // in minutes
  prerequisites: string[]; // module IDs
  category: ModuleCategory;
  icon: string;
  is_free: boolean;
}

export type ModuleCategory =
  | 'fundamentals'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'deployment'
  | 'tools';

export interface ModuleContent {
  introduction: string;
  learning_objectives: string[];
  sections: LessonSection[];
  summary: string;
  next_steps: string[];
}

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  code_example?: CodeExample;
  mini_challenge?: MiniChallenge;
}

export interface CodeExample {
  language: string;
  code: string;
  explanation: string;
  highlight_lines?: number[];
}

export interface MiniChallenge {
  question: string;
  expected_answer_keywords: string[];
  hint: string;
}

// Progress Types
export interface UserProgress {
  id: string;
  user_id: string;
  module_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completion_percentage: number;
  started_at?: string;
  completed_at?: string;
  time_spent: number; // in minutes
  notes?: string;
}

// Challenge Types
export interface Challenge {
  id: string;
  module_id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: ChallengeType;
  estimated_time: number; // in minutes
  starter_code: string;
  solution_code: string;
  test_cases: TestCase[];
  hints: ChallengeHint[];
  learning_goals: string[];
  order_index: number;
}

export type ChallengeType =
  | 'fix_bug'
  | 'build_feature'
  | 'refactor'
  | 'debug';

export interface TestCase {
  id: string;
  description: string;
  input?: string;
  expected_output: string;
  is_hidden: boolean;
}

export interface ChallengeHint {
  level: number;
  text: string;
}

export interface ChallengeAttempt {
  id: string;
  user_id: string;
  challenge_id: string;
  code: string;
  status: 'pending' | 'passed' | 'failed';
  test_results?: TestResult[];
  hints_used: number;
  submitted_at: string;
  feedback?: string;
}

export interface TestResult {
  test_case_id: string;
  passed: boolean;
  actual_output?: string;
  error_message?: string;
}

// Project Types
export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  niche: string;
  tech_stack: string[];
  status: ProjectStatus;
  github_url?: string;
  deployed_url?: string;
  milestones: ProjectMilestone[];
  started_at: string;
  completed_at?: string;
  is_showcase: boolean;
}

export type ProjectStatus =
  | 'ideation'
  | 'planning'
  | 'building'
  | 'polishing'
  | 'deploying'
  | 'completed';

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  order_index: number;
  status: 'pending' | 'in_progress' | 'completed';
  tasks: ProjectTask[];
  completed_at?: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  code_files?: string[];
}

// Conversation Types
export interface Conversation {
  id: string;
  user_id: string;
  context_type: 'learn' | 'practice' | 'create';
  context_id: string; // module_id, challenge_id, or project_id
  messages: ConversationMessage[];
  created_at: string;
  updated_at: string;
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: MessageMetadata;
}

export interface MessageMetadata {
  code_review?: CodeReview;
  hint_level?: number;
  milestone_reference?: string;
}

export interface CodeReview {
  overall_feedback: string;
  issues: CodeIssue[];
  suggestions: string[];
  praise: string[];
}

export interface CodeIssue {
  line_number?: number;
  type: 'bug' | 'style' | 'performance' | 'best_practice';
  description: string;
  suggestion: string;
}

// AI Types
export interface AIRequest {
  context_type: 'learn' | 'practice' | 'create';
  context_id: string;
  user_message: string;
  conversation_history: ConversationMessage[];
  user_context: UserContext;
  additional_context?: Record<string, unknown>;
}

export interface UserContext {
  user_id: string;
  experience_level: string;
  completed_modules: string[];
  current_module?: string;
  current_project?: Project;
  learning_style?: string;
}

export interface AIResponse {
  message: string;
  metadata?: MessageMetadata;
  suggested_actions?: SuggestedAction[];
}

export interface SuggestedAction {
  type: 'go_to_practice' | 'go_to_module' | 'show_hint' | 'run_code' | 'next_milestone';
  label: string;
  payload?: Record<string, unknown>;
}

// Dashboard Types
export interface DashboardStats {
  modules_completed: number;
  total_modules: number;
  challenges_solved: number;
  total_challenges: number;
  projects_completed: number;
  current_streak: number;
  total_time_spent: number;
  skill_levels: SkillLevel[];
}

export interface SkillLevel {
  skill: string;
  level: number; // 0-100
  category: ModuleCategory;
}

// Onboarding Types
export interface OnboardingData {
  experience_level: 'beginner' | 'some_experience' | 'intermediate';
  learning_goal: string;
  niche_interest: string;
  preferred_pace: 'slow' | 'moderate' | 'fast';
  hours_per_week: number;
}
