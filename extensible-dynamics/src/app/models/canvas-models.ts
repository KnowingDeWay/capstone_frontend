export interface Permissions {
  create_discussion_topic: boolean;
  create_announcement: boolean;
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
