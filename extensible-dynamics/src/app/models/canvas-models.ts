export interface Permissions {
  create_discussion_topic: boolean;
  create_announcement: boolean;
  attach: boolean;
}

export interface BlueprintRestrictions {
  content: boolean;
  points: boolean;
  due_dates: boolean;
  availability_dates: boolean;
}

export interface BlueprintRestrictionsByObjectType {
  assignment: BlueprintRestrictions;
  wiki_page: BlueprintRestrictions;
}

export interface GradingPeriod {
  id: number;
  title: string;
  start_date: Date;
  end_date?: Date;
  close_date: Date;
  weight: number;
  is_closed: boolean;
}

export interface Grade {
  html_url: string;
  current_grade: string;
  final_grade: string;
  current_score: string;
  final_score: string;
  current_points: number;
  unposted_current_grade: string;
  unposted_final_grade: string;
  unposted_current_score: string;
  unposted_final_score: string;
  unposted_current_points: number;
}

export interface User {
  id: number;
  name: string;
  sortable_name: string;
  short_name: string;
  sis_user_id: string;
  sis_import_id: number;
  integration_id: string;
  login_id: string;
  avatar_url: string;
  enrollments?: Enrollment[];
  email: string;
  locale: string;
  last_login: Date;
  time_zone: string;
  bio: string;
  unposted_final_grade: string;
  unposted_current_score: string;
  unposted_final_score: string;
  unposted_current_points: number;
}

export interface Enrollment {
  id: number;
  course_id: number;
  sis_course_id: string;
  course_integration_id: string;
  course_section_id: number;
  section_integration_id: string;
  sis_account_id: string;
  sis_section_id: string;
  sis_user_id: string;
  enrollment_state: string;
  limit_privileges_to_course_section: boolean;
  sis_import_id: number;
  root_account_id: number;
  type: string;
  user_id: number;
  associated_user_id?: any;
  role: string;
  role_id: number;
  created_at: Date;
  updated_at?: Date;
  start_at: Date;
  end_at?: Date;
  last_activity_at?: Date;
  last_attended_at?: Date;
  total_activity_time: number;
  html_url: string;
  grades: Grade;
  user: User;
  override_grade: string;
  override_score: number;
  unposted_current_grade: string;
  unposted_final_grade: string;
  unposted_current_score: string;
  unposted_final_score: string;
  has_grading_periods: boolean;
  totals_for_all_grading_periods_option: boolean;
  current_grading_period_title: string;
  current_grading_period_id: number;
  current_period_override_grade: string;
  current_period_override_score: number;
  current_period_unposted_current_score: number;
  current_period_unposted_final_score: number;
  current_period_unposted_current_grade: string;
  current_period_unposted_final_grade: string;
}

export interface CalendarLink {
  ics: string
}

export interface Term {
  id: number;
  name: string;
  start_at: Date;
  end_at?: Date
}

export interface CourseProgress {
  requirement_count: number;
  requirement_completed_count: number;
  next_requirement_url?: string;
  completed_at?: Date;
}

export interface Course {
  id: number;
  sis_course_id: string;
  uuid: string;
  integration_id: string;
  sis_import_id?: number;
  name: string;
  course_code: string;
  workflow_state: string;
  account_id: number;
  root_account_id: number;
  enrollment_term_id: number;
  grading_periods?: GradingPeriod[];
  grading_standard_id?: number;
  grade_passback_setting: string;
  created_at?: Date;
  start_at?: Date;
  end_at?: Date;
  locale: string;
  enrollments?: Enrollment[];
  total_students: number;
  calendar?: CalendarLink;
  default_view: string;
  syllabus_body: string;
  needs_grading_count: number;
  term?: Term;
  course_progress?: CourseProgress;
  apply_assignment_group_weights: boolean;
  permissions: Permissions;
  is_public: boolean;
  is_public_to_auth_users: boolean;
  public_syllabus: boolean;
  public_syllabus_to_auth: boolean;
  public_description: string;
  storage_quota_mb: number;
  storage_quota_used_mb: number;
  hide_final_grades: boolean;
  license: string;
  allow_student_assignment_edits: boolean;
  allow_wiki_comments: boolean;
  allow_student_forum_attachments: boolean;
  open_enrollment: boolean;
  self_enrollment: boolean;
  restrict_enrollments_to_course_dates: boolean;
  course_format: string;
  access_restricted_by_date: boolean;
  time_zone: string;
  blueprint: boolean;
  blueprint_restrictions: BlueprintRestrictions;
  blueprint_restrictions_by_object_type: BlueprintRestrictionsByObjectType;
  template: boolean;
}

export interface NeedsGradingCount {
  section_id: string;
  needs_grading_count: number;
}

export interface TurnitinSettings {
  originality_report_visibility: string;
  s_paper_check: boolean;
  internet_check: boolean;
  journal_check: boolean;
  exclude_biblio: boolean;
  exclude_quoted: boolean;
  exclude_small_matches_type: string;
  exclude_small_matches_value: number;
}

export interface ExternalToolTagAttributes {
  url: string;
  new_tab: boolean;
  resource_link_id: string;
}

export interface LockInfo {
  asset_string: string;
  unlock_at?: Date;
  lock_at?: Date;
  context_module: string;
  manually_locked: boolean;
}

export interface GroupTopicChildren {
  id: number;
  group_id: number;
}

export interface FileAttachment {
  content_type: string;
  url: string;
  filename: string;
  display_name: string;
}

export interface DiscussionTopic {
  id: number;
  title: string;
  message: string;
  html_url: string;
  posted_at: Date;
  last_reply_at?: Date;
  require_initial_post: boolean;
  user_can_see_posts: boolean;
  discussion_subentry_count: number;
  read_state: string;
  unread_count: number;
  subscribed: boolean;
  subscription_hold: string;
  assignment_id?: number;
  delayed_post_at?: Date;
  published: boolean;
  lock_at?: Date;
  locked: boolean;
  pinned: boolean;
  locked_for_user: boolean;
  lock_info: LockInfo;
  lock_explanation: string;
  user_name: string;
  topic_children: number[];
  group_topic_children: GroupTopicChildren[];
  root_topic_id?: number;
  podcast_url: string;
  discussion_type: string;
  group_category_id?: number;
  attachments: FileAttachment[];
  permissions: Permissions;
  allow_rating: boolean;
  only_graders_can_rate: boolean;
  sort_by_rating: boolean;
}

export interface MediaComment {
  content_type: string;
  display_name: string;
  media_id: string;
  media_type: string;
  url: string;
}

export interface SubmissionComment {
  id: number;
  author_id: number;
  author_name: string;
  author: string;
  comment: string;
  created_at: Date;
  edited_at: Date;
  media_comment: MediaComment;
}

export interface Submission {
  assignment_id: number;
  assignment: Assignment;
  course: Course;
  attempt: number;
  body: string;
  grade: string;
  grade_matches_current_submission: boolean;
  html_url: string;
  preview_url: string;
  score: number;
  submission_comments: SubmissionComment[];
  submission_type: string;
  submitted_at: Date;
  url?: string;
  user_id: number;
  grader_id: number;
  graded_at: Date;
  user: User;
  late: boolean;
  assignment_visible: boolean;
  excused: boolean;
  missing: boolean;
  late_policy_status: string;
  points_deducted: number;
  seconds_late: number;
  workflow_state: string;
  extra_attempts: number;
  anonymous_id: string;
  posted_at: Date;
  read_status: string;
}

export interface RubricRating {
  id: string;
  criterion_id: string;
  description: string;
  long_description: string;
  points: number;
}


export interface RubricCriterion {
  id: string;
  description: string;
  long_description: string;
  points: number;
  criterion_use_range: boolean;
  ratings: RubricRating[];
}

export interface RubricAssessment {
  id: number;
  rubric_id: number;
  rubric_association_id: number;
  score: number;
  artifact_type: string;
  artifact_id: number;
  artifact_attempt: number;
  assessment_type: string;
  assessor_id: number;
  data: any;
  comments: any;
}

export interface RubricAssociation {
  id: number;
  rubric_id: number;
  association_id: number;
  association_type: string;
  use_for_grading: boolean;
  summary_data: string;
  purpose: string;
  hide_score_total: boolean;
  hide_points: boolean;
  hide_outcome_results: boolean;
}



export interface Rubric {
  id: number;
  title: string;
  context_id: number;
  context_type: string;
  points_possible: number;
  reusable: boolean;
  read_only: boolean;
  free_form_criterion_comments: boolean;
  hide_score_total: boolean;
  data: RubricCriterion[];
  assessments: RubricAssessment[];
  associations: RubricAssociation[];
}

export interface AssignmentOverride {
  id: number;
  assignment_id: number;
  student_ids: number[];
  group_id: number;
  course_section_id: number;
  title: string;
  due_at?: Date;
  all_day: boolean;
  all_day_date: string;
  unlock_at?: Date;
  lock_at?: Date;
}

export interface ScoreStatistic {
  min: number;
  mean: number;
  max: number;
}

export interface RubricSettings {
  id: number;
  title: string;
  points_possible: number;
  free_form_criterion_comments: boolean;
  hide_score_total: boolean;
  hide_points: boolean;
}

export interface Assignment {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at?: Date;
  due_at?: Date;
  lock_at?: Date;
  unlock_at?: Date;
  has_overrides: boolean;
  all_dates: Date[];
  course_id: number;
  html_url: string;
  submissions_download_url: string;
  assignment_group_id: number;
  due_date_required: boolean;
  allowed_extensions: string[];
  max_name_length: number;
  turnitin_enabled: boolean;
  vericite_enabled: boolean;
  turnitin_settings: TurnitinSettings;
  grade_group_students_individually: boolean;
  external_tool_tag_attributes: ExternalToolTagAttributes;
  peer_reviews: boolean;
  automatic_peer_reviews: boolean;
  peer_review_count: number;
  peer_reviews_assign_at?: Date;
  intra_group_peer_reviews: boolean;
  group_category_id: number;
  needs_grading_count: number;
  needs_grading_count_by_section: NeedsGradingCount[];
  position: number;
  post_to_sis: boolean;
  integration_id: string;
  integration_data: Map<string, string>;
  points_possible: number;
  submission_types: string[];
  has_submitted_submissions: boolean;
  grading_type: string;
  grading_standard_id?: number;
  published: boolean;
  unpublishable: boolean;
  only_visible_to_overrides: boolean;
  locked_for_user: boolean;
  lock_info: LockInfo;
  lock_explanation: string;
  quiz_id: number;
  anonymous_submissions: boolean;
  discussion_topic: DiscussionTopic;
  freeze_on_copy: boolean;
  frozen: boolean;
  frozen_attributes: string[];
  submission: Submission;
  use_rubric_for_grading: boolean;
  rubric_settings: RubricSettings;
  rubric: RubricCriterion[];
  assignment_visibility: number[];
  overrides: AssignmentOverride[];
  omit_from_final_grade: boolean;
  moderated_grading: boolean;
  grader_count: number;
  final_grader_id?: number;
  grader_comments_visible_to_graders: boolean;
  graders_anonymous_to_graders: boolean;
  grader_names_visible_to_final_grader: boolean;
  anonymous_grading: boolean;
  allowed_attempts: number;
  post_manually: boolean;
  score_statistics: ScoreStatistic;
  can_submit: boolean;
}
