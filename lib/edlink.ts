// To parse this data:
//
//   import { Convert, EdlinkV2Address, EdlinkV2Enrollment, EdlinkV2EnrollmentState, EdlinkV2Agent, EdlinkV2Relationship, EdlinkV2Person, EdlinkV2Demographics, EdlinkV2Role, EdlinkV2GradeLevel, EdlinkV2Subject, EdlinkV2Section, EdlinkV2SectionState, EdlinkV2Class, EdlinkV2ClassState, EdlinkV2Session, EdlinkV2SessionState, EdlinkV2SessionType, EdlinkV2District, EdlinkV2School, EdlinkV2Course, EdlinkV1OrganizationType, EdlinkV1Organization, EdlinkV1Person, EdlinkV1Term, EdlinkV1Enrollment, EdlinkV1EnrollmentType, EdlinkV1Assignment, EdlinkV1Submission, EdlinkV1Provider, EdlinkV1Permission, EdlinkV1Integration, EdlinkV1Team, EdlinkV1IntegrationStatus, EdlinkV1Event, EdlinkV1Source } from "./file";
//
//   const edlinkV2Address = Convert.toEdlinkV2Address(json);
//   const edlinkV2Enrollment = Convert.toEdlinkV2Enrollment(json);
//   const edlinkV2EnrollmentState = Convert.toEdlinkV2EnrollmentState(json);
//   const edlinkV2Agent = Convert.toEdlinkV2Agent(json);
//   const edlinkV2Relationship = Convert.toEdlinkV2Relationship(json);
//   const edlinkV2Person = Convert.toEdlinkV2Person(json);
//   const edlinkV2Demographics = Convert.toEdlinkV2Demographics(json);
//   const edlinkV2Role = Convert.toEdlinkV2Role(json);
//   const edlinkV2GradeLevel = Convert.toEdlinkV2GradeLevel(json);
//   const edlinkV2Subject = Convert.toEdlinkV2Subject(json);
//   const edlinkV2Section = Convert.toEdlinkV2Section(json);
//   const edlinkV2SectionState = Convert.toEdlinkV2SectionState(json);
//   const edlinkV2Class = Convert.toEdlinkV2Class(json);
//   const edlinkV2ClassState = Convert.toEdlinkV2ClassState(json);
//   const edlinkV2Session = Convert.toEdlinkV2Session(json);
//   const edlinkV2SessionState = Convert.toEdlinkV2SessionState(json);
//   const edlinkV2SessionType = Convert.toEdlinkV2SessionType(json);
//   const edlinkV2District = Convert.toEdlinkV2District(json);
//   const edlinkV2School = Convert.toEdlinkV2School(json);
//   const edlinkV2Course = Convert.toEdlinkV2Course(json);
//   const edlinkV1OrganizationType = Convert.toEdlinkV1OrganizationType(json);
//   const edlinkV1Organization = Convert.toEdlinkV1Organization(json);
//   const edlinkV1Person = Convert.toEdlinkV1Person(json);
//   const edlinkV1Term = Convert.toEdlinkV1Term(json);
//   const edlinkV1Enrollment = Convert.toEdlinkV1Enrollment(json);
//   const edlinkV1EnrollmentType = Convert.toEdlinkV1EnrollmentType(json);
//   const edlinkV1Assignment = Convert.toEdlinkV1Assignment(json);
//   const edlinkV1Submission = Convert.toEdlinkV1Submission(json);
//   const edlinkV1Provider = Convert.toEdlinkV1Provider(json);
//   const edlinkV1Permission = Convert.toEdlinkV1Permission(json);
//   const edlinkV1Integration = Convert.toEdlinkV1Integration(json);
//   const edlinkV1Team = Convert.toEdlinkV1Team(json);
//   const edlinkV1IntegrationStatus = Convert.toEdlinkV1IntegrationStatus(json);
//   const edlinkV1Event = Convert.toEdlinkV1Event(json);
//   const edlinkV1Source = Convert.toEdlinkV1Source(json);
//   const edlinkV2Date = Convert.toEdlinkV2Date(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/**
 * Any representation of the location of something in the real world.
 */
export interface EdlinkV2Address {
    city?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    postal_code?: string;
    /**
     * Can represent a state or province.
     */
    state?: string;
    street?: string;
    /**
     * The second line of the address.
     */
    unit?: string;
}

/**
 * An Enrollment describes a Person's relationship with a Class.
 *
 * Optionally, in systems that support Sections, an Enrollment can also refer
 * to a specific Section associated with the Class.
 */
export interface EdlinkV2Enrollment {
    class_id?: string;
    /**
     * When the object was first seen by Edlink.
     */
    created_date?: Date;
    end_date?: Date;
    external_object_type?: ExternalObjectType;
    /**
     * The globally unique identifier for the object.
     */
    id?: string;
    person_id?: string;
    primary?: boolean;
    /**
     * Object containing non-standard properties that
     * may be of interest to the developer.
     */
    properties?: { [key: string]: any };
    role?: EdlinkV2Role;
    section_id?: string;
    start_date?: Date;
    state?: EdlinkV2EnrollmentState;
    /**
     * When the object was last changed in Edlink.
     */
    updated_date?: Date;
}

export enum ExternalObjectType {
    Agent = 'agent',
    Announcement = 'announcement',
    Answer = 'answer',
    Assessment = 'assessment',
    AssessmentQuestion = 'assessment-question',
    AssessmentSubmissionBody = 'assessment-submission-body',
    Assignment = 'assignment',
    Class = 'class',
    Content = 'content',
    ContentModule = 'content-module',
    Course = 'course',
    District = 'district',
    Enrollment = 'enrollment',
    FileSubmissionBody = 'file-submission-body',
    Grade = 'grade',
    Person = 'person',
    Rubric = 'rubric',
    School = 'school',
    Section = 'section',
    Session = 'session',
    Submission = 'submission',
    SubmissionAttempt = 'submission-attempt',
    SubmissionBody = 'submission-body',
    Tag = 'tag',
    TextSubmissionBody = 'text-submission-body',
    URLSubmissionBody = 'url-submission-body'
}

export enum EdlinkV2Role {
    Administrator = 'administrator',
    Aide = 'aide',
    Designer = 'designer',
    DistrictAdministrator = 'district-administrator',
    Guardian = 'guardian',
    Member = 'member',
    Observer = 'observer',
    Parent = 'parent',
    Student = 'student',
    Ta = 'ta',
    Teacher = 'teacher'
}

export enum EdlinkV2EnrollmentState {
    Active = 'active',
    Completed = 'completed',
    Dropped = 'dropped',
    Inactive = 'inactive',
    Pending = 'pending',
    Upcoming = 'upcoming'
}

/**
 * An Agent describes the relationship between two people, and is typically
 * used to represent a connection between a student and their parent or guardian.
 * If a data source provides emergency contacts, this is how they are
 * represented in Edlink.
 */
export interface EdlinkV2Agent {
    /**
     * When the object was first seen by Edlink.
     */
    created_date?: Date;
    external_object_type?: ExternalObjectType;
    /**
     * The globally unique identifier for the object.
     */
    id?: string;
    observer_id?: string;
    /**
     * Object containing non-standard properties that
     * may be of interest to the developer.
     */
    properties?: { [key: string]: any };
    relationship?: EdlinkV2Relationship;
    target_id?: string;
    /**
     * When the object was last changed in Edlink.
     */
    updated_date?: Date;
}

export enum EdlinkV2Relationship {
    Aide = 'aide',
    Guardian = 'guardian',
    Parent = 'parent'
}

/**
 * A Person within a data source.
 */
export interface EdlinkV2Person {
    /**
     * When the object was first seen by Edlink.
     */
    created_date?: Date;
    demographics?: Demographics;
    display_name?: string;
    district_id?: string;
    email?: string;
    external_object_type?: ExternalObjectType;
    first_name?: string;
    grade_levels?: EdlinkV2GradeLevel[];
    graduation_year?: number;
    /**
     * The globally unique identifier for the object.
     */
    id?: string;
    last_name?: string;
    locale?: string;
    middle_name?: string;
    phone?: string;
    picture_url?: string;
    /**
     * Object containing non-standard properties that
     * may be of interest to the developer.
     */
    properties?: { [key: string]: any };
    roles?: EdlinkV2Role[];
    school_ids?: string[];
    time_zone?: string;
    /**
     * When the object was last changed in Edlink.
     */
    updated_date?: Date;
}

export interface Demographics {
    birthday?: Date;
    english_language_learner?: boolean;
    gender?: GenderIdentity;
    residence_status?: PublicSchoolResidenceStatus;
}

export enum GenderIdentity {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}

/**
 * An indication of the location of a persons legal residence relative
 * to (within or outside) the boundaries of the public school attended
 * and its administrative unit.
 *
 * https://ceds.ed.gov/CEDSElementDetails.aspx?TermxTopicId=20863
 */
export enum PublicSchoolResidenceStatus {
    The01652 = '01652',
    The01653 = '01653',
    The01654 = '01654',
    The01655 = '01655',
    The01656 = '01656'
}

/**
 * The typical grade or combination of grade-levels,
 * developmental levels, or age-levels for which an
 * assessment is designed.
 *
 * https://ceds.ed.gov/element/000177
 */
export enum EdlinkV2GradeLevel {
    Birth = 'Birth',
    It = 'IT',
    Kg = 'KG',
    Other = 'Other',
    PR = 'PR',
    PS = 'PS',
    Pk = 'PK',
    Prenatal = 'Prenatal',
    The01 = '01',
    The02 = '02',
    The03 = '03',
    The04 = '04',
    The05 = '05',
    The06 = '06',
    The07 = '07',
    The08 = '08',
    The09 = '09',
    The10 = '10',
    The11 = '11',
    The12 = '12',
    The13 = '13',
    Tk = 'TK',
    Ug = 'UG'
}

export interface EdlinkV2Demographics {
    birthday?: Date;
    english_language_learner?: boolean;
    gender?: GenderIdentity;
    residence_status?: PublicSchoolResidenceStatus;
}

/**
 * A Section describes a group of students within a Class.
 */
export interface EdlinkV2Section {
    class_id?: string;
    /**
     * When the object was first seen by Edlink.
     */
    created_date?: Date;
    description?: string;
    external_object_type?: ExternalObjectType;
    /**
     * The globally unique identifier for the object.
     */
    id?: string;
    locale?: string;
    name?: string;
    periods?: string[];
    picture_url?: string;
    /**
     * Object containing non-standard properties that
     * may be of interest to the developer.
     */
    properties?: { [key: string]: any };
    state?: EdlinkV2SectionState;
    time_zone?: string;
    /**
     * When the object was last changed in Edlink.
     */
    updated_date?: Date;
}

export enum EdlinkV2SectionState {
    Active = 'active',
    Archived = 'archived',
    Completed = 'completed',
    Inactive = 'inactive',
    Upcoming = 'upcoming'
}

/**
 * A Class is an instance of a Course. Many People can be Enrolled in a Class.
 */
export interface EdlinkV2Class {
    course_id?: string;
    /**
     * When the object was first seen by Edlink.
     */
    created_date?: Date;
    description?: string;
    external_object_type?: ExternalObjectType;
    grade_levels?: EdlinkV2GradeLevel[];
    /**
     * The globally unique identifier for the object.
     */
    id?: string;
    locale?: string;
    name?: string;
    periods?: string[];
    picture_url?: string;
    /**
     * Object containing non-standard properties that
     * may be of interest to the developer.
     */
    properties?: { [key: string]: any };
    school_id?: string;
    session_ids?: string[];
    state?: EdlinkV2ClassState;
    subjects?: EdlinkV2Subject[];
    time_zone?: string;
    /**
     * When the object was last changed in Edlink.
     */
    updated_date?: Date;
}

export enum EdlinkV2ClassState {
    Active = 'active',
    Archived = 'archived',
    Completed = 'completed',
    Inactive = 'inactive',
    Template = 'template',
    Upcoming = 'upcoming'
}

/**
 * The intended major subject area of the education course.
 *
 * https://ceds.ed.gov/element/001518
 */
export enum EdlinkV2Subject {
    Ceds01 = 'CEDS.01',
    Ceds02 = 'CEDS.02',
    Ceds03 = 'CEDS.03',
    Ceds04 = 'CEDS.04',
    Ceds05 = 'CEDS.05',
    Ceds07 = 'CEDS.07',
    Ceds08 = 'CEDS.08',
    Ceds09 = 'CEDS.09',
    Ceds10 = 'CEDS.10',
    Ceds11 = 'CEDS.11',
    Ceds12 = 'CEDS.12',
    Ceds13 = 'CEDS.13',
    Ceds14 = 'CEDS.14',
    Ceds15 = 'CEDS.15',
    Ceds16 = 'CEDS.16',
    Ceds17 = 'CEDS.17',
    Ceds18 = 'CEDS.18',
    Ceds19 = 'CEDS.19',
    Ceds20 = 'CEDS.20',
    Ceds21 = 'CEDS.21',
    Ceds22 = 'CEDS.22',
    Ceds23 = 'CEDS.23',
    Ceds24 = 'CEDS.24',
    El01 = 'EL.01',
    El02 = 'EL.02'
}

/**
 * A Session describes any sort of grading period, such as a semester, term, or school year.
 */
export interface EdlinkV2Session {
    /**
     * When the object was first seen by Edlink.
     */
    created_date?: Date;
    district_id?: string;
    end_date?: Date;
    external_object_type?: ExternalObjectType;
    /**
     * The globally unique identifier for the object.
     */
    id?: string;
    name?: string;
    /**
     * Object containing non-standard properties that
     * may be of interest to the developer.
     */
    properties?: { [key: string]: any };
    school_id?: string;
    start_date?: Date;
    state?: EdlinkV2SessionState;
    type?: EdlinkV2SessionType;
    /**
     * When the object was last changed in Edlink.
     */
    updated_date?: Date;
}

export enum EdlinkV2SessionState {
    Active = 'active',
    Completed = 'completed',
    Upcoming = 'upcoming'
}

export enum EdlinkV2SessionType {
    GradingPeriod = 'grading_period',
    SchoolYear = 'school_year',
    Semester = 'semester',
    Term = 'term'
}

/**
 * An Edlink District is the highest level object in a source. There will
 * always be exactly one District for a source.
 */
export interface EdlinkV2District {
    /**
     * When the object was first seen by Edlink.
     */
    created_date?: Date;
    external_object_type?: ExternalObjectType;
    /**
     * The globally unique identifier for the object.
     */
    id?: string;
    locale?: string;
    location?: EdlinkV2DistrictLocation;
    name?: string;
    picture_url?: string;
    /**
     * Object containing non-standard properties that
     * may be of interest to the developer.
     */
    properties?: { [key: string]: any };
    time_zone?: string;
    /**
     * When the object was last changed in Edlink.
     */
    updated_date?: Date;
}

/**
 * Any representation of the location of something in the real world.
 */
export interface EdlinkV2DistrictLocation {
    city?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    postal_code?: string;
    /**
     * Can represent a state or province.
     */
    state?: string;
    street?: string;
    /**
     * The second line of the address.
     */
    unit?: string;
}

/**
 * An Edlink School represents a school within a data source. There will
 * always be at least one school.
 *
 * If no schools are present within a data source, we will create a district
 * office placeholder school. For example, `Edlink University (District Office)`.
 * In some cases, this school will be generated to store any classes that
 * are not associated with a school within the data source.
 */
export interface EdlinkV2School {
    /**
     * When the object was first seen by Edlink.
     */
    created_date?: Date;
    district_id?: string;
    external_object_type?: ExternalObjectType;
    grade_levels?: EdlinkV2GradeLevel[];
    /**
     * The globally unique identifier for the object.
     */
    id?: string;
    locale?: string;
    location?: EdlinkV2SchoolLocation;
    name?: string;
    picture_url?: string;
    /**
     * Object containing non-standard properties that
     * may be of interest to the developer.
     */
    properties?: { [key: string]: any };
    time_zone?: string;
    /**
     * When the object was last changed in Edlink.
     */
    updated_date?: Date;
}

/**
 * Any representation of the location of something in the real world.
 */
export interface EdlinkV2SchoolLocation {
    city?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    postal_code?: string;
    /**
     * Can represent a state or province.
     */
    state?: string;
    street?: string;
    /**
     * The second line of the address.
     */
    unit?: string;
}

/**
 * A Course is a plan of study. Most of the time, many Classes of a single Course are taught
 * in the same Session.
 *
 * For example, a school offers a Data Structures & Algorithms Course. There might be
 * several Classes of that course,
 * each with a different teacher and a different set of students enrolled in it.
 *
 * You might imagine that a Course would be found in your university's course listing,
 * whereas a Class or Section
 * would be what you actually Enrolled in during the class registration period.
 */
export interface EdlinkV2Course {
    code?: string;
    /**
     * When the object was first seen by Edlink.
     */
    created_date?: Date;
    district_id?: string;
    external_object_type?: ExternalObjectType;
    grade_levels?: EdlinkV2GradeLevel[];
    /**
     * The globally unique identifier for the object.
     */
    id?: string;
    name?: string;
    /**
     * Object containing non-standard properties that
     * may be of interest to the developer.
     */
    properties?: { [key: string]: any };
    school_id?: string;
    session_id?: string;
    subjects?: EdlinkV2Subject[];
    /**
     * When the object was last changed in Edlink.
     */
    updated_date?: Date;
}

export interface EdlinkV1OrganizationEnrollment {
    end_date?: Date;
    id?: string;
    organization?: EdlinkV1Organization;
    person?: PurpleV1Person;
    source?: EdlinkV1OrganizationSource;
    start_date?: Date;
    type?: EdlinkV1EnrollmentType;
}

export interface EdlinkV1Organization {
    ancestry?: string[];
    description?: string;
    enrollments?: EdlinkV1OrganizationEnrollment[];
    icon_url?: string;
    id?: string;
    name?: string;
    source?: EdlinkV1OrganizationSource;
    state?: string;
    terms?: string[];
    time_zone?: string;
    type?: EdlinkV1OrganizationType;
}

export interface PurpleV1Person {
    birthday?: Date;
    display_name?: string;
    email?: string;
    first_name?: string;
    gender?: string;
    id?: string;
    last_name?: string;
    locale?: string;
    middle_name?: string;
    phone?: string;
    picture_url?: string;
    role?: EdlinkV2Role;
    roles?: EdlinkV2Role[];
    source?: EdlinkV1OrganizationSource;
    time_zone?: string;
}

export interface EdlinkV1OrganizationSource {
    created_date?: Date;
    id?: string;
    import_interval?: number;
    log_retention_time?: number;
    name?: string;
    status?: string;
    updated_date?: Date;
}

export enum EdlinkV1EnrollmentType {
    Administrator = 'administrator',
    Aide = 'aide',
    Designer = 'designer',
    DistrictAdministrator = 'district-administrator',
    Guardian = 'guardian',
    Observer = 'observer',
    Parent = 'parent',
    Student = 'student',
    Ta = 'ta',
    Teacher = 'teacher'
}

export enum EdlinkV1OrganizationType {
    Course = 'course',
    District = 'district',
    School = 'school',
    Section = 'section'
}

export interface EdlinkV1Person {
    birthday?: Date;
    display_name?: string;
    email?: string;
    first_name?: string;
    gender?: string;
    id?: string;
    last_name?: string;
    locale?: string;
    middle_name?: string;
    phone?: string;
    picture_url?: string;
    role?: EdlinkV2Role;
    roles?: EdlinkV2Role[];
    source?: EdlinkV1PersonSource;
    time_zone?: string;
}

export interface EdlinkV1PersonSource {
    created_date?: Date;
    id?: string;
    import_interval?: number;
    log_retention_time?: number;
    name?: string;
    status?: string;
    updated_date?: Date;
}

export interface EdlinkV1Term {
    end_date?: Date;
    id?: string;
    name?: string;
    start_date?: Date;
}

export interface EdlinkV1EnrollmentOrganization {
    ancestry?: string[];
    description?: string;
    enrollments?: EdlinkV1Enrollment[];
    icon_url?: string;
    id?: string;
    name?: string;
    source?: EdlinkV1EnrollmentSource;
    state?: string;
    terms?: string[];
    time_zone?: string;
    type?: EdlinkV1OrganizationType;
}

export interface EdlinkV1Enrollment {
    end_date?: Date;
    id?: string;
    organization?: EdlinkV1EnrollmentOrganization;
    person?: EdlinkV1EnrollmentPerson;
    source?: EdlinkV1EnrollmentSource;
    start_date?: Date;
    type?: EdlinkV1EnrollmentType;
}

export interface EdlinkV1EnrollmentSource {
    created_date?: Date;
    id?: string;
    import_interval?: number;
    log_retention_time?: number;
    name?: string;
    status?: string;
    updated_date?: Date;
}

export interface EdlinkV1EnrollmentPerson {
    birthday?: Date;
    display_name?: string;
    email?: string;
    first_name?: string;
    gender?: string;
    id?: string;
    last_name?: string;
    locale?: string;
    middle_name?: string;
    phone?: string;
    picture_url?: string;
    role?: EdlinkV2Role;
    roles?: EdlinkV2Role[];
    source?: EdlinkV1EnrollmentSource;
    time_zone?: string;
}

export interface EdlinkV1Assignment {
    course?: EdlinkV1AssignmentCourse;
    description?: string;
    description_plaintext?: string;
    display_date?: Date;
    due_date?: Date;
    grading_type?: string;
    id?: string;
    lock_date?: Date;
    personalized?: boolean;
    points_possible?: number;
    published?: boolean;
    source?: EdlinkV1AssignmentSource;
    students?: string[];
    submission_types?: string[];
    title?: string;
    url?: string;
}

export interface PurpleV1Enrollment {
    end_date?: Date;
    id?: string;
    organization?: EdlinkV1AssignmentCourse;
    person?: FluffyV1Person;
    source?: EdlinkV1AssignmentSource;
    start_date?: Date;
    type?: EdlinkV1EnrollmentType;
}

export interface EdlinkV1AssignmentCourse {
    ancestry?: string[];
    description?: string;
    enrollments?: PurpleV1Enrollment[];
    icon_url?: string;
    id?: string;
    name?: string;
    source?: EdlinkV1AssignmentSource;
    state?: string;
    terms?: string[];
    time_zone?: string;
    type?: EdlinkV1OrganizationType;
}

export interface FluffyV1Person {
    birthday?: Date;
    display_name?: string;
    email?: string;
    first_name?: string;
    gender?: string;
    id?: string;
    last_name?: string;
    locale?: string;
    middle_name?: string;
    phone?: string;
    picture_url?: string;
    role?: EdlinkV2Role;
    roles?: EdlinkV2Role[];
    source?: EdlinkV1AssignmentSource;
    time_zone?: string;
}

export interface EdlinkV1AssignmentSource {
    created_date?: Date;
    id?: string;
    import_interval?: number;
    log_retention_time?: number;
    name?: string;
    status?: string;
    updated_date?: Date;
}

export interface EdlinkV1Submission {
    assignment?: V1Assignment;
    attempts?: number;
    body?: string;
    created_date?: Date;
    graded_date?: Date;
    id?: string;
    late?: boolean;
    missing?: boolean;
    score?: number;
    source?: AssignmentSource;
    type?: string;
    url?: string;
}

export interface V1Assignment {
    course?: AssignmentCourse;
    description?: string;
    description_plaintext?: string;
    display_date?: Date;
    due_date?: Date;
    grading_type?: string;
    id?: string;
    lock_date?: Date;
    personalized?: boolean;
    points_possible?: number;
    published?: boolean;
    source?: AssignmentSource;
    students?: string[];
    submission_types?: string[];
    title?: string;
    url?: string;
}

export interface FluffyV1Enrollment {
    end_date?: Date;
    id?: string;
    organization?: AssignmentCourse;
    person?: TentacledV1Person;
    source?: AssignmentSource;
    start_date?: Date;
    type?: EdlinkV1EnrollmentType;
}

export interface AssignmentCourse {
    ancestry?: string[];
    description?: string;
    enrollments?: FluffyV1Enrollment[];
    icon_url?: string;
    id?: string;
    name?: string;
    source?: AssignmentSource;
    state?: string;
    terms?: string[];
    time_zone?: string;
    type?: EdlinkV1OrganizationType;
}

export interface TentacledV1Person {
    birthday?: Date;
    display_name?: string;
    email?: string;
    first_name?: string;
    gender?: string;
    id?: string;
    last_name?: string;
    locale?: string;
    middle_name?: string;
    phone?: string;
    picture_url?: string;
    role?: EdlinkV2Role;
    roles?: EdlinkV2Role[];
    source?: AssignmentSource;
    time_zone?: string;
}

export interface AssignmentSource {
    created_date?: Date;
    id?: string;
    import_interval?: number;
    log_retention_time?: number;
    name?: string;
    status?: string;
    updated_date?: Date;
}

export interface EdlinkV1Provider {
    allows_data_sync?: boolean;
    application?: string;
    configuration?: string;
    icon_url?: string;
    id?: string;
    name?: string;
    requires_administrator_consent?: boolean;
    requires_administrator_login?: boolean;
    requires_remote_configuration?: boolean;
}

export interface EdlinkV1Permission {
    active?: boolean;
    description?: string;
    group?: string;
    id?: string;
    name?: string;
    scoped?: boolean;
}

export interface EdlinkV1Integration {
    access_token?: string;
    created_date?: Date;
    id?: string;
    permissions?: string[];
    provider?: V1Provider;
    scope?: string;
    source?: EdlinkV1IntegrationSource;
    status?: EdlinkV1IntegrationStatus;
    targets?: string[];
    team?: V1Team;
    updated_date?: Date;
}

export interface V1Provider {
    allows_data_sync?: boolean;
    application?: string;
    configuration?: string;
    icon_url?: string;
    id?: string;
    name?: string;
    requires_administrator_consent?: boolean;
    requires_administrator_login?: boolean;
    requires_remote_configuration?: boolean;
}

export interface EdlinkV1IntegrationSource {
    created_date?: Date;
    id?: string;
    import_interval?: number;
    log_retention_time?: number;
    name?: string;
    status?: string;
    updated_date?: Date;
}

export enum EdlinkV1IntegrationStatus {
    Active = 'active',
    Disabled = 'disabled',
    Inactive = 'inactive'
}

export interface V1Team {
    alias?: string;
    city?: string;
    country?: string;
    id?: string;
    name?: string;
    state?: string;
    street_address?: string;
    type?: string;
    unit_number?: string;
    zip?: string;
}

export interface EdlinkV1Team {
    alias?: string;
    city?: string;
    country?: string;
    id?: string;
    name?: string;
    state?: string;
    street_address?: string;
    type?: string;
    unit_number?: string;
    zip?: string;
}

export interface EdlinkV1Event {
    created_date?: Date;
    data?: any;
    id?: string;
    type?: string;
}

export interface EdlinkV1Source {
    created_date?: Date;
    id?: string;
    import_interval?: number;
    log_retention_time?: number;
    name?: string;
    status?: string;
    updated_date?: Date;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toEdlinkV2Address(json: string): EdlinkV2Address {
        return cast(JSON.parse(json), r('EdlinkV2Address'));
    }

    public static edlinkV2AddressToJson(value: EdlinkV2Address): string {
        return JSON.stringify(uncast(value, r('EdlinkV2Address')), null, 2);
    }

    public static toEdlinkV2Enrollment(json: string): EdlinkV2Enrollment {
        return cast(JSON.parse(json), r('EdlinkV2Enrollment'));
    }

    public static edlinkV2EnrollmentToJson(value: EdlinkV2Enrollment): string {
        return JSON.stringify(uncast(value, r('EdlinkV2Enrollment')), null, 2);
    }

    public static toEdlinkV2EnrollmentState(json: string): EdlinkV2EnrollmentState {
        return cast(JSON.parse(json), r('EdlinkV2EnrollmentState'));
    }

    public static edlinkV2EnrollmentStateToJson(value: EdlinkV2EnrollmentState): string {
        return JSON.stringify(uncast(value, r('EdlinkV2EnrollmentState')), null, 2);
    }

    public static toEdlinkV2Agent(json: string): EdlinkV2Agent {
        return cast(JSON.parse(json), r('EdlinkV2Agent'));
    }

    public static edlinkV2AgentToJson(value: EdlinkV2Agent): string {
        return JSON.stringify(uncast(value, r('EdlinkV2Agent')), null, 2);
    }

    public static toEdlinkV2Relationship(json: string): EdlinkV2Relationship {
        return cast(JSON.parse(json), r('EdlinkV2Relationship'));
    }

    public static edlinkV2RelationshipToJson(value: EdlinkV2Relationship): string {
        return JSON.stringify(uncast(value, r('EdlinkV2Relationship')), null, 2);
    }

    public static toEdlinkV2Person(json: string): EdlinkV2Person {
        return cast(JSON.parse(json), r('EdlinkV2Person'));
    }

    public static edlinkV2PersonToJson(value: EdlinkV2Person): string {
        return JSON.stringify(uncast(value, r('EdlinkV2Person')), null, 2);
    }

    public static toEdlinkV2Demographics(json: string): EdlinkV2Demographics {
        return cast(JSON.parse(json), r('EdlinkV2Demographics'));
    }

    public static edlinkV2DemographicsToJson(value: EdlinkV2Demographics): string {
        return JSON.stringify(uncast(value, r('EdlinkV2Demographics')), null, 2);
    }

    public static toEdlinkV2Role(json: string): EdlinkV2Role {
        return cast(JSON.parse(json), r('EdlinkV2Role'));
    }

    public static edlinkV2RoleToJson(value: EdlinkV2Role): string {
        return JSON.stringify(uncast(value, r('EdlinkV2Role')), null, 2);
    }

    public static toEdlinkV2GradeLevel(json: string): EdlinkV2GradeLevel {
        return cast(JSON.parse(json), r('EdlinkV2GradeLevel'));
    }

    public static edlinkV2GradeLevelToJson(value: EdlinkV2GradeLevel): string {
        return JSON.stringify(uncast(value, r('EdlinkV2GradeLevel')), null, 2);
    }

    public static toEdlinkV2Subject(json: string): EdlinkV2Subject {
        return cast(JSON.parse(json), r('EdlinkV2Subject'));
    }

    public static edlinkV2SubjectToJson(value: EdlinkV2Subject): string {
        return JSON.stringify(uncast(value, r('EdlinkV2Subject')), null, 2);
    }

    public static toEdlinkV2Section(json: string): EdlinkV2Section {
        return cast(JSON.parse(json), r('EdlinkV2Section'));
    }

    public static edlinkV2SectionToJson(value: EdlinkV2Section): string {
        return JSON.stringify(uncast(value, r('EdlinkV2Section')), null, 2);
    }

    public static toEdlinkV2SectionState(json: string): EdlinkV2SectionState {
        return cast(JSON.parse(json), r('EdlinkV2SectionState'));
    }

    public static edlinkV2SectionStateToJson(value: EdlinkV2SectionState): string {
        return JSON.stringify(uncast(value, r('EdlinkV2SectionState')), null, 2);
    }

    public static toEdlinkV2Class(json: string): EdlinkV2Class {
        return cast(JSON.parse(json), r('EdlinkV2Class'));
    }

    public static edlinkV2ClassToJson(value: EdlinkV2Class): string {
        return JSON.stringify(uncast(value, r('EdlinkV2Class')), null, 2);
    }

    public static toEdlinkV2ClassState(json: string): EdlinkV2ClassState {
        return cast(JSON.parse(json), r('EdlinkV2ClassState'));
    }

    public static edlinkV2ClassStateToJson(value: EdlinkV2ClassState): string {
        return JSON.stringify(uncast(value, r('EdlinkV2ClassState')), null, 2);
    }

    public static toEdlinkV2Session(json: string): EdlinkV2Session {
        return cast(JSON.parse(json), r('EdlinkV2Session'));
    }

    public static edlinkV2SessionToJson(value: EdlinkV2Session): string {
        return JSON.stringify(uncast(value, r('EdlinkV2Session')), null, 2);
    }

    public static toEdlinkV2SessionState(json: string): EdlinkV2SessionState {
        return cast(JSON.parse(json), r('EdlinkV2SessionState'));
    }

    public static edlinkV2SessionStateToJson(value: EdlinkV2SessionState): string {
        return JSON.stringify(uncast(value, r('EdlinkV2SessionState')), null, 2);
    }

    public static toEdlinkV2SessionType(json: string): EdlinkV2SessionType {
        return cast(JSON.parse(json), r('EdlinkV2SessionType'));
    }

    public static edlinkV2SessionTypeToJson(value: EdlinkV2SessionType): string {
        return JSON.stringify(uncast(value, r('EdlinkV2SessionType')), null, 2);
    }

    public static toEdlinkV2District(json: string): EdlinkV2District {
        return cast(JSON.parse(json), r('EdlinkV2District'));
    }

    public static edlinkV2DistrictToJson(value: EdlinkV2District): string {
        return JSON.stringify(uncast(value, r('EdlinkV2District')), null, 2);
    }

    public static toEdlinkV2School(json: string): EdlinkV2School {
        return cast(JSON.parse(json), r('EdlinkV2School'));
    }

    public static edlinkV2SchoolToJson(value: EdlinkV2School): string {
        return JSON.stringify(uncast(value, r('EdlinkV2School')), null, 2);
    }

    public static toEdlinkV2Course(json: string): EdlinkV2Course {
        return cast(JSON.parse(json), r('EdlinkV2Course'));
    }

    public static edlinkV2CourseToJson(value: EdlinkV2Course): string {
        return JSON.stringify(uncast(value, r('EdlinkV2Course')), null, 2);
    }

    public static toEdlinkV1OrganizationType(json: string): EdlinkV1OrganizationType {
        return cast(JSON.parse(json), r('EdlinkV1OrganizationType'));
    }

    public static edlinkV1OrganizationTypeToJson(value: EdlinkV1OrganizationType): string {
        return JSON.stringify(uncast(value, r('EdlinkV1OrganizationType')), null, 2);
    }

    public static toEdlinkV1Organization(json: string): EdlinkV1Organization {
        return cast(JSON.parse(json), r('EdlinkV1Organization'));
    }

    public static edlinkV1OrganizationToJson(value: EdlinkV1Organization): string {
        return JSON.stringify(uncast(value, r('EdlinkV1Organization')), null, 2);
    }

    public static toEdlinkV1Person(json: string): EdlinkV1Person {
        return cast(JSON.parse(json), r('EdlinkV1Person'));
    }

    public static edlinkV1PersonToJson(value: EdlinkV1Person): string {
        return JSON.stringify(uncast(value, r('EdlinkV1Person')), null, 2);
    }

    public static toEdlinkV1Term(json: string): EdlinkV1Term {
        return cast(JSON.parse(json), r('EdlinkV1Term'));
    }

    public static edlinkV1TermToJson(value: EdlinkV1Term): string {
        return JSON.stringify(uncast(value, r('EdlinkV1Term')), null, 2);
    }

    public static toEdlinkV1Enrollment(json: string): EdlinkV1Enrollment {
        return cast(JSON.parse(json), r('EdlinkV1Enrollment'));
    }

    public static edlinkV1EnrollmentToJson(value: EdlinkV1Enrollment): string {
        return JSON.stringify(uncast(value, r('EdlinkV1Enrollment')), null, 2);
    }

    public static toEdlinkV1EnrollmentType(json: string): EdlinkV1EnrollmentType {
        return cast(JSON.parse(json), r('EdlinkV1EnrollmentType'));
    }

    public static edlinkV1EnrollmentTypeToJson(value: EdlinkV1EnrollmentType): string {
        return JSON.stringify(uncast(value, r('EdlinkV1EnrollmentType')), null, 2);
    }

    public static toEdlinkV1Assignment(json: string): EdlinkV1Assignment {
        return cast(JSON.parse(json), r('EdlinkV1Assignment'));
    }

    public static edlinkV1AssignmentToJson(value: EdlinkV1Assignment): string {
        return JSON.stringify(uncast(value, r('EdlinkV1Assignment')), null, 2);
    }

    public static toEdlinkV1Submission(json: string): EdlinkV1Submission {
        return cast(JSON.parse(json), r('EdlinkV1Submission'));
    }

    public static edlinkV1SubmissionToJson(value: EdlinkV1Submission): string {
        return JSON.stringify(uncast(value, r('EdlinkV1Submission')), null, 2);
    }

    public static toEdlinkV1Provider(json: string): EdlinkV1Provider {
        return cast(JSON.parse(json), r('EdlinkV1Provider'));
    }

    public static edlinkV1ProviderToJson(value: EdlinkV1Provider): string {
        return JSON.stringify(uncast(value, r('EdlinkV1Provider')), null, 2);
    }

    public static toEdlinkV1Permission(json: string): EdlinkV1Permission {
        return cast(JSON.parse(json), r('EdlinkV1Permission'));
    }

    public static edlinkV1PermissionToJson(value: EdlinkV1Permission): string {
        return JSON.stringify(uncast(value, r('EdlinkV1Permission')), null, 2);
    }

    public static toEdlinkV1Integration(json: string): EdlinkV1Integration {
        return cast(JSON.parse(json), r('EdlinkV1Integration'));
    }

    public static edlinkV1IntegrationToJson(value: EdlinkV1Integration): string {
        return JSON.stringify(uncast(value, r('EdlinkV1Integration')), null, 2);
    }

    public static toEdlinkV1Team(json: string): EdlinkV1Team {
        return cast(JSON.parse(json), r('EdlinkV1Team'));
    }

    public static edlinkV1TeamToJson(value: EdlinkV1Team): string {
        return JSON.stringify(uncast(value, r('EdlinkV1Team')), null, 2);
    }

    public static toEdlinkV1IntegrationStatus(json: string): EdlinkV1IntegrationStatus {
        return cast(JSON.parse(json), r('EdlinkV1IntegrationStatus'));
    }

    public static edlinkV1IntegrationStatusToJson(value: EdlinkV1IntegrationStatus): string {
        return JSON.stringify(uncast(value, r('EdlinkV1IntegrationStatus')), null, 2);
    }

    public static toEdlinkV1Event(json: string): EdlinkV1Event {
        return cast(JSON.parse(json), r('EdlinkV1Event'));
    }

    public static edlinkV1EventToJson(value: EdlinkV1Event): string {
        return JSON.stringify(uncast(value, r('EdlinkV1Event')), null, 2);
    }

    public static toEdlinkV1Source(json: string): EdlinkV1Source {
        return cast(JSON.parse(json), r('EdlinkV1Source'));
    }

    public static edlinkV1SourceToJson(value: EdlinkV1Source): string {
        return JSON.stringify(uncast(value, r('EdlinkV1Source')), null, 2);
    }

    public static toEdlinkV2Date(json: string): Date {
        return cast(JSON.parse(json), Date);
    }

    public static edlinkV2DateToJson(value: Date): string {
        return JSON.stringify(uncast(value, Date), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue('array', val);
        return val.map((el) => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue('Date', val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== 'object' || Array.isArray(val)) {
            return invalidValue('object', val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach((key) => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach((key) => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === 'any') return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === 'object' && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === 'object') {
        return typ.hasOwnProperty('unionMembers')
            ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty('arrayItems')
            ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty('props')
            ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== 'number') return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    EdlinkV2Address: o(
        [
            { json: 'city', js: 'city', typ: u(undefined, '') },
            { json: 'country', js: 'country', typ: u(undefined, '') },
            { json: 'latitude', js: 'latitude', typ: u(undefined, 3.14) },
            { json: 'longitude', js: 'longitude', typ: u(undefined, 3.14) },
            { json: 'phone', js: 'phone', typ: u(undefined, '') },
            { json: 'postal_code', js: 'postal_code', typ: u(undefined, '') },
            { json: 'state', js: 'state', typ: u(undefined, '') },
            { json: 'street', js: 'street', typ: u(undefined, '') },
            { json: 'unit', js: 'unit', typ: u(undefined, '') }
        ],
        false
    ),
    EdlinkV2Enrollment: o(
        [
            { json: 'class_id', js: 'class_id', typ: u(undefined, '') },
            { json: 'created_date', js: 'created_date', typ: u(undefined, Date) },
            { json: 'end_date', js: 'end_date', typ: u(undefined, Date) },
            { json: 'external_object_type', js: 'external_object_type', typ: u(undefined, r('ExternalObjectType')) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'person_id', js: 'person_id', typ: u(undefined, '') },
            { json: 'primary', js: 'primary', typ: u(undefined, true) },
            { json: 'properties', js: 'properties', typ: u(undefined, m('any')) },
            { json: 'role', js: 'role', typ: u(undefined, r('EdlinkV2Role')) },
            { json: 'section_id', js: 'section_id', typ: u(undefined, '') },
            { json: 'start_date', js: 'start_date', typ: u(undefined, Date) },
            { json: 'state', js: 'state', typ: u(undefined, r('EdlinkV2EnrollmentState')) },
            { json: 'updated_date', js: 'updated_date', typ: u(undefined, Date) }
        ],
        false
    ),
    EdlinkV2Agent: o(
        [
            { json: 'created_date', js: 'created_date', typ: u(undefined, Date) },
            { json: 'external_object_type', js: 'external_object_type', typ: u(undefined, r('ExternalObjectType')) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'observer_id', js: 'observer_id', typ: u(undefined, '') },
            { json: 'properties', js: 'properties', typ: u(undefined, m('any')) },
            { json: 'relationship', js: 'relationship', typ: u(undefined, r('EdlinkV2Relationship')) },
            { json: 'target_id', js: 'target_id', typ: u(undefined, '') },
            { json: 'updated_date', js: 'updated_date', typ: u(undefined, Date) }
        ],
        false
    ),
    EdlinkV2Person: o(
        [
            { json: 'created_date', js: 'created_date', typ: u(undefined, Date) },
            { json: 'demographics', js: 'demographics', typ: u(undefined, r('Demographics')) },
            { json: 'display_name', js: 'display_name', typ: u(undefined, '') },
            { json: 'district_id', js: 'district_id', typ: u(undefined, '') },
            { json: 'email', js: 'email', typ: u(undefined, '') },
            { json: 'external_object_type', js: 'external_object_type', typ: u(undefined, r('ExternalObjectType')) },
            { json: 'first_name', js: 'first_name', typ: u(undefined, '') },
            { json: 'grade_levels', js: 'grade_levels', typ: u(undefined, a(r('EdlinkV2GradeLevel'))) },
            { json: 'graduation_year', js: 'graduation_year', typ: u(undefined, 3.14) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'last_name', js: 'last_name', typ: u(undefined, '') },
            { json: 'locale', js: 'locale', typ: u(undefined, '') },
            { json: 'middle_name', js: 'middle_name', typ: u(undefined, '') },
            { json: 'phone', js: 'phone', typ: u(undefined, '') },
            { json: 'picture_url', js: 'picture_url', typ: u(undefined, '') },
            { json: 'properties', js: 'properties', typ: u(undefined, m('any')) },
            { json: 'roles', js: 'roles', typ: u(undefined, a(r('EdlinkV2Role'))) },
            { json: 'school_ids', js: 'school_ids', typ: u(undefined, a('')) },
            { json: 'time_zone', js: 'time_zone', typ: u(undefined, '') },
            { json: 'updated_date', js: 'updated_date', typ: u(undefined, Date) }
        ],
        false
    ),
    Demographics: o(
        [
            { json: 'birthday', js: 'birthday', typ: u(undefined, Date) },
            { json: 'english_language_learner', js: 'english_language_learner', typ: u(undefined, true) },
            { json: 'gender', js: 'gender', typ: u(undefined, r('GenderIdentity')) },
            { json: 'residence_status', js: 'residence_status', typ: u(undefined, r('PublicSchoolResidenceStatus')) }
        ],
        false
    ),
    EdlinkV2Demographics: o(
        [
            { json: 'birthday', js: 'birthday', typ: u(undefined, Date) },
            { json: 'english_language_learner', js: 'english_language_learner', typ: u(undefined, true) },
            { json: 'gender', js: 'gender', typ: u(undefined, r('GenderIdentity')) },
            { json: 'residence_status', js: 'residence_status', typ: u(undefined, r('PublicSchoolResidenceStatus')) }
        ],
        false
    ),
    EdlinkV2Section: o(
        [
            { json: 'class_id', js: 'class_id', typ: u(undefined, '') },
            { json: 'created_date', js: 'created_date', typ: u(undefined, Date) },
            { json: 'description', js: 'description', typ: u(undefined, '') },
            { json: 'external_object_type', js: 'external_object_type', typ: u(undefined, r('ExternalObjectType')) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'locale', js: 'locale', typ: u(undefined, '') },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'periods', js: 'periods', typ: u(undefined, a('')) },
            { json: 'picture_url', js: 'picture_url', typ: u(undefined, '') },
            { json: 'properties', js: 'properties', typ: u(undefined, m('any')) },
            { json: 'state', js: 'state', typ: u(undefined, r('EdlinkV2SectionState')) },
            { json: 'time_zone', js: 'time_zone', typ: u(undefined, '') },
            { json: 'updated_date', js: 'updated_date', typ: u(undefined, Date) }
        ],
        false
    ),
    EdlinkV2Class: o(
        [
            { json: 'course_id', js: 'course_id', typ: u(undefined, '') },
            { json: 'created_date', js: 'created_date', typ: u(undefined, Date) },
            { json: 'description', js: 'description', typ: u(undefined, '') },
            { json: 'external_object_type', js: 'external_object_type', typ: u(undefined, r('ExternalObjectType')) },
            { json: 'grade_levels', js: 'grade_levels', typ: u(undefined, a(r('EdlinkV2GradeLevel'))) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'locale', js: 'locale', typ: u(undefined, '') },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'periods', js: 'periods', typ: u(undefined, a('')) },
            { json: 'picture_url', js: 'picture_url', typ: u(undefined, '') },
            { json: 'properties', js: 'properties', typ: u(undefined, m('any')) },
            { json: 'school_id', js: 'school_id', typ: u(undefined, '') },
            { json: 'session_ids', js: 'session_ids', typ: u(undefined, a('')) },
            { json: 'state', js: 'state', typ: u(undefined, r('EdlinkV2ClassState')) },
            { json: 'subjects', js: 'subjects', typ: u(undefined, a(r('EdlinkV2Subject'))) },
            { json: 'time_zone', js: 'time_zone', typ: u(undefined, '') },
            { json: 'updated_date', js: 'updated_date', typ: u(undefined, Date) }
        ],
        false
    ),
    EdlinkV2Session: o(
        [
            { json: 'created_date', js: 'created_date', typ: u(undefined, Date) },
            { json: 'district_id', js: 'district_id', typ: u(undefined, '') },
            { json: 'end_date', js: 'end_date', typ: u(undefined, Date) },
            { json: 'external_object_type', js: 'external_object_type', typ: u(undefined, r('ExternalObjectType')) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'properties', js: 'properties', typ: u(undefined, m('any')) },
            { json: 'school_id', js: 'school_id', typ: u(undefined, '') },
            { json: 'start_date', js: 'start_date', typ: u(undefined, Date) },
            { json: 'state', js: 'state', typ: u(undefined, r('EdlinkV2SessionState')) },
            { json: 'type', js: 'type', typ: u(undefined, r('EdlinkV2SessionType')) },
            { json: 'updated_date', js: 'updated_date', typ: u(undefined, Date) }
        ],
        false
    ),
    EdlinkV2District: o(
        [
            { json: 'created_date', js: 'created_date', typ: u(undefined, Date) },
            { json: 'external_object_type', js: 'external_object_type', typ: u(undefined, r('ExternalObjectType')) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'locale', js: 'locale', typ: u(undefined, '') },
            { json: 'location', js: 'location', typ: u(undefined, r('EdlinkV2DistrictLocation')) },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'picture_url', js: 'picture_url', typ: u(undefined, '') },
            { json: 'properties', js: 'properties', typ: u(undefined, m('any')) },
            { json: 'time_zone', js: 'time_zone', typ: u(undefined, '') },
            { json: 'updated_date', js: 'updated_date', typ: u(undefined, Date) }
        ],
        false
    ),
    EdlinkV2DistrictLocation: o(
        [
            { json: 'city', js: 'city', typ: u(undefined, '') },
            { json: 'country', js: 'country', typ: u(undefined, '') },
            { json: 'latitude', js: 'latitude', typ: u(undefined, 3.14) },
            { json: 'longitude', js: 'longitude', typ: u(undefined, 3.14) },
            { json: 'phone', js: 'phone', typ: u(undefined, '') },
            { json: 'postal_code', js: 'postal_code', typ: u(undefined, '') },
            { json: 'state', js: 'state', typ: u(undefined, '') },
            { json: 'street', js: 'street', typ: u(undefined, '') },
            { json: 'unit', js: 'unit', typ: u(undefined, '') }
        ],
        false
    ),
    EdlinkV2School: o(
        [
            { json: 'created_date', js: 'created_date', typ: u(undefined, Date) },
            { json: 'district_id', js: 'district_id', typ: u(undefined, '') },
            { json: 'external_object_type', js: 'external_object_type', typ: u(undefined, r('ExternalObjectType')) },
            { json: 'grade_levels', js: 'grade_levels', typ: u(undefined, a(r('EdlinkV2GradeLevel'))) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'locale', js: 'locale', typ: u(undefined, '') },
            { json: 'location', js: 'location', typ: u(undefined, r('EdlinkV2SchoolLocation')) },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'picture_url', js: 'picture_url', typ: u(undefined, '') },
            { json: 'properties', js: 'properties', typ: u(undefined, m('any')) },
            { json: 'time_zone', js: 'time_zone', typ: u(undefined, '') },
            { json: 'updated_date', js: 'updated_date', typ: u(undefined, Date) }
        ],
        false
    ),
    EdlinkV2SchoolLocation: o(
        [
            { json: 'city', js: 'city', typ: u(undefined, '') },
            { json: 'country', js: 'country', typ: u(undefined, '') },
            { json: 'latitude', js: 'latitude', typ: u(undefined, 3.14) },
            { json: 'longitude', js: 'longitude', typ: u(undefined, 3.14) },
            { json: 'phone', js: 'phone', typ: u(undefined, '') },
            { json: 'postal_code', js: 'postal_code', typ: u(undefined, '') },
            { json: 'state', js: 'state', typ: u(undefined, '') },
            { json: 'street', js: 'street', typ: u(undefined, '') },
            { json: 'unit', js: 'unit', typ: u(undefined, '') }
        ],
        false
    ),
    EdlinkV2Course: o(
        [
            { json: 'code', js: 'code', typ: u(undefined, '') },
            { json: 'created_date', js: 'created_date', typ: u(undefined, Date) },
            { json: 'district_id', js: 'district_id', typ: u(undefined, '') },
            { json: 'external_object_type', js: 'external_object_type', typ: u(undefined, r('ExternalObjectType')) },
            { json: 'grade_levels', js: 'grade_levels', typ: u(undefined, a(r('EdlinkV2GradeLevel'))) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'properties', js: 'properties', typ: u(undefined, m('any')) },
            { json: 'school_id', js: 'school_id', typ: u(undefined, '') },
            { json: 'session_id', js: 'session_id', typ: u(undefined, '') },
            { json: 'subjects', js: 'subjects', typ: u(undefined, a(r('EdlinkV2Subject'))) },
            { json: 'updated_date', js: 'updated_date', typ: u(undefined, Date) }
        ],
        false
    ),
    EdlinkV1OrganizationEnrollment: o(
        [
            { json: 'end_date', js: 'end_date', typ: u(undefined, Date) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'organization', js: 'organization', typ: u(undefined, r('EdlinkV1Organization')) },
            { json: 'person', js: 'person', typ: u(undefined, r('PurpleV1Person')) },
            { json: 'source', js: 'source', typ: u(undefined, r('EdlinkV1OrganizationSource')) },
            { json: 'start_date', js: 'start_date', typ: u(undefined, Date) },
            { json: 'type', js: 'type', typ: u(undefined, r('EdlinkV1EnrollmentType')) }
        ],
        false
    ),
    EdlinkV1Organization: o(
        [
            { json: 'ancestry', js: 'ancestry', typ: u(undefined, a('')) },
            { json: 'description', js: 'description', typ: u(undefined, '') },
            { json: 'enrollments', js: 'enrollments', typ: u(undefined, a(r('EdlinkV1OrganizationEnrollment'))) },
            { json: 'icon_url', js: 'icon_url', typ: u(undefined, '') },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'source', js: 'source', typ: u(undefined, r('EdlinkV1OrganizationSource')) },
            { json: 'state', js: 'state', typ: u(undefined, '') },
            { json: 'terms', js: 'terms', typ: u(undefined, a('')) },
            { json: 'time_zone', js: 'time_zone', typ: u(undefined, '') },
            { json: 'type', js: 'type', typ: u(undefined, r('EdlinkV1OrganizationType')) }
        ],
        false
    ),
    PurpleV1Person: o(
        [
            { json: 'birthday', js: 'birthday', typ: u(undefined, Date) },
            { json: 'display_name', js: 'display_name', typ: u(undefined, '') },
            { json: 'email', js: 'email', typ: u(undefined, '') },
            { json: 'first_name', js: 'first_name', typ: u(undefined, '') },
            { json: 'gender', js: 'gender', typ: u(undefined, '') },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'last_name', js: 'last_name', typ: u(undefined, '') },
            { json: 'locale', js: 'locale', typ: u(undefined, '') },
            { json: 'middle_name', js: 'middle_name', typ: u(undefined, '') },
            { json: 'phone', js: 'phone', typ: u(undefined, '') },
            { json: 'picture_url', js: 'picture_url', typ: u(undefined, '') },
            { json: 'role', js: 'role', typ: u(undefined, r('EdlinkV2Role')) },
            { json: 'roles', js: 'roles', typ: u(undefined, a(r('EdlinkV2Role'))) },
            { json: 'source', js: 'source', typ: u(undefined, r('EdlinkV1OrganizationSource')) },
            { json: 'time_zone', js: 'time_zone', typ: u(undefined, '') }
        ],
        false
    ),
    EdlinkV1OrganizationSource: o(
        [
            { json: 'created_date', js: 'created_date', typ: u(undefined, Date) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'import_interval', js: 'import_interval', typ: u(undefined, 3.14) },
            { json: 'log_retention_time', js: 'log_retention_time', typ: u(undefined, 3.14) },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'status', js: 'status', typ: u(undefined, '') },
            { json: 'updated_date', js: 'updated_date', typ: u(undefined, Date) }
        ],
        false
    ),
    EdlinkV1Person: o(
        [
            { json: 'birthday', js: 'birthday', typ: u(undefined, Date) },
            { json: 'display_name', js: 'display_name', typ: u(undefined, '') },
            { json: 'email', js: 'email', typ: u(undefined, '') },
            { json: 'first_name', js: 'first_name', typ: u(undefined, '') },
            { json: 'gender', js: 'gender', typ: u(undefined, '') },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'last_name', js: 'last_name', typ: u(undefined, '') },
            { json: 'locale', js: 'locale', typ: u(undefined, '') },
            { json: 'middle_name', js: 'middle_name', typ: u(undefined, '') },
            { json: 'phone', js: 'phone', typ: u(undefined, '') },
            { json: 'picture_url', js: 'picture_url', typ: u(undefined, '') },
            { json: 'role', js: 'role', typ: u(undefined, r('EdlinkV2Role')) },
            { json: 'roles', js: 'roles', typ: u(undefined, a(r('EdlinkV2Role'))) },
            { json: 'source', js: 'source', typ: u(undefined, r('EdlinkV1PersonSource')) },
            { json: 'time_zone', js: 'time_zone', typ: u(undefined, '') }
        ],
        false
    ),
    EdlinkV1PersonSource: o(
        [
            { json: 'created_date', js: 'created_date', typ: u(undefined, Date) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'import_interval', js: 'import_interval', typ: u(undefined, 3.14) },
            { json: 'log_retention_time', js: 'log_retention_time', typ: u(undefined, 3.14) },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'status', js: 'status', typ: u(undefined, '') },
            { json: 'updated_date', js: 'updated_date', typ: u(undefined, Date) }
        ],
        false
    ),
    EdlinkV1Term: o(
        [
            { json: 'end_date', js: 'end_date', typ: u(undefined, Date) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'start_date', js: 'start_date', typ: u(undefined, Date) }
        ],
        false
    ),
    EdlinkV1EnrollmentOrganization: o(
        [
            { json: 'ancestry', js: 'ancestry', typ: u(undefined, a('')) },
            { json: 'description', js: 'description', typ: u(undefined, '') },
            { json: 'enrollments', js: 'enrollments', typ: u(undefined, a(r('EdlinkV1Enrollment'))) },
            { json: 'icon_url', js: 'icon_url', typ: u(undefined, '') },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'source', js: 'source', typ: u(undefined, r('EdlinkV1EnrollmentSource')) },
            { json: 'state', js: 'state', typ: u(undefined, '') },
            { json: 'terms', js: 'terms', typ: u(undefined, a('')) },
            { json: 'time_zone', js: 'time_zone', typ: u(undefined, '') },
            { json: 'type', js: 'type', typ: u(undefined, r('EdlinkV1OrganizationType')) }
        ],
        false
    ),
    EdlinkV1Enrollment: o(
        [
            { json: 'end_date', js: 'end_date', typ: u(undefined, Date) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'organization', js: 'organization', typ: u(undefined, r('EdlinkV1EnrollmentOrganization')) },
            { json: 'person', js: 'person', typ: u(undefined, r('EdlinkV1EnrollmentPerson')) },
            { json: 'source', js: 'source', typ: u(undefined, r('EdlinkV1EnrollmentSource')) },
            { json: 'start_date', js: 'start_date', typ: u(undefined, Date) },
            { json: 'type', js: 'type', typ: u(undefined, r('EdlinkV1EnrollmentType')) }
        ],
        false
    ),
    EdlinkV1EnrollmentSource: o(
        [
            { json: 'created_date', js: 'created_date', typ: u(undefined, Date) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'import_interval', js: 'import_interval', typ: u(undefined, 3.14) },
            { json: 'log_retention_time', js: 'log_retention_time', typ: u(undefined, 3.14) },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'status', js: 'status', typ: u(undefined, '') },
            { json: 'updated_date', js: 'updated_date', typ: u(undefined, Date) }
        ],
        false
    ),
    EdlinkV1EnrollmentPerson: o(
        [
            { json: 'birthday', js: 'birthday', typ: u(undefined, Date) },
            { json: 'display_name', js: 'display_name', typ: u(undefined, '') },
            { json: 'email', js: 'email', typ: u(undefined, '') },
            { json: 'first_name', js: 'first_name', typ: u(undefined, '') },
            { json: 'gender', js: 'gender', typ: u(undefined, '') },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'last_name', js: 'last_name', typ: u(undefined, '') },
            { json: 'locale', js: 'locale', typ: u(undefined, '') },
            { json: 'middle_name', js: 'middle_name', typ: u(undefined, '') },
            { json: 'phone', js: 'phone', typ: u(undefined, '') },
            { json: 'picture_url', js: 'picture_url', typ: u(undefined, '') },
            { json: 'role', js: 'role', typ: u(undefined, r('EdlinkV2Role')) },
            { json: 'roles', js: 'roles', typ: u(undefined, a(r('EdlinkV2Role'))) },
            { json: 'source', js: 'source', typ: u(undefined, r('EdlinkV1EnrollmentSource')) },
            { json: 'time_zone', js: 'time_zone', typ: u(undefined, '') }
        ],
        false
    ),
    EdlinkV1Assignment: o(
        [
            { json: 'course', js: 'course', typ: u(undefined, r('EdlinkV1AssignmentCourse')) },
            { json: 'description', js: 'description', typ: u(undefined, '') },
            { json: 'description_plaintext', js: 'description_plaintext', typ: u(undefined, '') },
            { json: 'display_date', js: 'display_date', typ: u(undefined, Date) },
            { json: 'due_date', js: 'due_date', typ: u(undefined, Date) },
            { json: 'grading_type', js: 'grading_type', typ: u(undefined, '') },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'lock_date', js: 'lock_date', typ: u(undefined, Date) },
            { json: 'personalized', js: 'personalized', typ: u(undefined, true) },
            { json: 'points_possible', js: 'points_possible', typ: u(undefined, 3.14) },
            { json: 'published', js: 'published', typ: u(undefined, true) },
            { json: 'source', js: 'source', typ: u(undefined, r('EdlinkV1AssignmentSource')) },
            { json: 'students', js: 'students', typ: u(undefined, a('')) },
            { json: 'submission_types', js: 'submission_types', typ: u(undefined, a('')) },
            { json: 'title', js: 'title', typ: u(undefined, '') },
            { json: 'url', js: 'url', typ: u(undefined, '') }
        ],
        false
    ),
    PurpleV1Enrollment: o(
        [
            { json: 'end_date', js: 'end_date', typ: u(undefined, Date) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'organization', js: 'organization', typ: u(undefined, r('EdlinkV1AssignmentCourse')) },
            { json: 'person', js: 'person', typ: u(undefined, r('FluffyV1Person')) },
            { json: 'source', js: 'source', typ: u(undefined, r('EdlinkV1AssignmentSource')) },
            { json: 'start_date', js: 'start_date', typ: u(undefined, Date) },
            { json: 'type', js: 'type', typ: u(undefined, r('EdlinkV1EnrollmentType')) }
        ],
        false
    ),
    EdlinkV1AssignmentCourse: o(
        [
            { json: 'ancestry', js: 'ancestry', typ: u(undefined, a('')) },
            { json: 'description', js: 'description', typ: u(undefined, '') },
            { json: 'enrollments', js: 'enrollments', typ: u(undefined, a(r('PurpleV1Enrollment'))) },
            { json: 'icon_url', js: 'icon_url', typ: u(undefined, '') },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'source', js: 'source', typ: u(undefined, r('EdlinkV1AssignmentSource')) },
            { json: 'state', js: 'state', typ: u(undefined, '') },
            { json: 'terms', js: 'terms', typ: u(undefined, a('')) },
            { json: 'time_zone', js: 'time_zone', typ: u(undefined, '') },
            { json: 'type', js: 'type', typ: u(undefined, r('EdlinkV1OrganizationType')) }
        ],
        false
    ),
    FluffyV1Person: o(
        [
            { json: 'birthday', js: 'birthday', typ: u(undefined, Date) },
            { json: 'display_name', js: 'display_name', typ: u(undefined, '') },
            { json: 'email', js: 'email', typ: u(undefined, '') },
            { json: 'first_name', js: 'first_name', typ: u(undefined, '') },
            { json: 'gender', js: 'gender', typ: u(undefined, '') },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'last_name', js: 'last_name', typ: u(undefined, '') },
            { json: 'locale', js: 'locale', typ: u(undefined, '') },
            { json: 'middle_name', js: 'middle_name', typ: u(undefined, '') },
            { json: 'phone', js: 'phone', typ: u(undefined, '') },
            { json: 'picture_url', js: 'picture_url', typ: u(undefined, '') },
            { json: 'role', js: 'role', typ: u(undefined, r('EdlinkV2Role')) },
            { json: 'roles', js: 'roles', typ: u(undefined, a(r('EdlinkV2Role'))) },
            { json: 'source', js: 'source', typ: u(undefined, r('EdlinkV1AssignmentSource')) },
            { json: 'time_zone', js: 'time_zone', typ: u(undefined, '') }
        ],
        false
    ),
    EdlinkV1AssignmentSource: o(
        [
            { json: 'created_date', js: 'created_date', typ: u(undefined, Date) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'import_interval', js: 'import_interval', typ: u(undefined, 3.14) },
            { json: 'log_retention_time', js: 'log_retention_time', typ: u(undefined, 3.14) },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'status', js: 'status', typ: u(undefined, '') },
            { json: 'updated_date', js: 'updated_date', typ: u(undefined, Date) }
        ],
        false
    ),
    EdlinkV1Submission: o(
        [
            { json: 'assignment', js: 'assignment', typ: u(undefined, r('V1Assignment')) },
            { json: 'attempts', js: 'attempts', typ: u(undefined, 3.14) },
            { json: 'body', js: 'body', typ: u(undefined, '') },
            { json: 'created_date', js: 'created_date', typ: u(undefined, Date) },
            { json: 'graded_date', js: 'graded_date', typ: u(undefined, Date) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'late', js: 'late', typ: u(undefined, true) },
            { json: 'missing', js: 'missing', typ: u(undefined, true) },
            { json: 'score', js: 'score', typ: u(undefined, 3.14) },
            { json: 'source', js: 'source', typ: u(undefined, r('AssignmentSource')) },
            { json: 'type', js: 'type', typ: u(undefined, '') },
            { json: 'url', js: 'url', typ: u(undefined, '') }
        ],
        false
    ),
    V1Assignment: o(
        [
            { json: 'course', js: 'course', typ: u(undefined, r('AssignmentCourse')) },
            { json: 'description', js: 'description', typ: u(undefined, '') },
            { json: 'description_plaintext', js: 'description_plaintext', typ: u(undefined, '') },
            { json: 'display_date', js: 'display_date', typ: u(undefined, Date) },
            { json: 'due_date', js: 'due_date', typ: u(undefined, Date) },
            { json: 'grading_type', js: 'grading_type', typ: u(undefined, '') },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'lock_date', js: 'lock_date', typ: u(undefined, Date) },
            { json: 'personalized', js: 'personalized', typ: u(undefined, true) },
            { json: 'points_possible', js: 'points_possible', typ: u(undefined, 3.14) },
            { json: 'published', js: 'published', typ: u(undefined, true) },
            { json: 'source', js: 'source', typ: u(undefined, r('AssignmentSource')) },
            { json: 'students', js: 'students', typ: u(undefined, a('')) },
            { json: 'submission_types', js: 'submission_types', typ: u(undefined, a('')) },
            { json: 'title', js: 'title', typ: u(undefined, '') },
            { json: 'url', js: 'url', typ: u(undefined, '') }
        ],
        false
    ),
    FluffyV1Enrollment: o(
        [
            { json: 'end_date', js: 'end_date', typ: u(undefined, Date) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'organization', js: 'organization', typ: u(undefined, r('AssignmentCourse')) },
            { json: 'person', js: 'person', typ: u(undefined, r('TentacledV1Person')) },
            { json: 'source', js: 'source', typ: u(undefined, r('AssignmentSource')) },
            { json: 'start_date', js: 'start_date', typ: u(undefined, Date) },
            { json: 'type', js: 'type', typ: u(undefined, r('EdlinkV1EnrollmentType')) }
        ],
        false
    ),
    AssignmentCourse: o(
        [
            { json: 'ancestry', js: 'ancestry', typ: u(undefined, a('')) },
            { json: 'description', js: 'description', typ: u(undefined, '') },
            { json: 'enrollments', js: 'enrollments', typ: u(undefined, a(r('FluffyV1Enrollment'))) },
            { json: 'icon_url', js: 'icon_url', typ: u(undefined, '') },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'source', js: 'source', typ: u(undefined, r('AssignmentSource')) },
            { json: 'state', js: 'state', typ: u(undefined, '') },
            { json: 'terms', js: 'terms', typ: u(undefined, a('')) },
            { json: 'time_zone', js: 'time_zone', typ: u(undefined, '') },
            { json: 'type', js: 'type', typ: u(undefined, r('EdlinkV1OrganizationType')) }
        ],
        false
    ),
    TentacledV1Person: o(
        [
            { json: 'birthday', js: 'birthday', typ: u(undefined, Date) },
            { json: 'display_name', js: 'display_name', typ: u(undefined, '') },
            { json: 'email', js: 'email', typ: u(undefined, '') },
            { json: 'first_name', js: 'first_name', typ: u(undefined, '') },
            { json: 'gender', js: 'gender', typ: u(undefined, '') },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'last_name', js: 'last_name', typ: u(undefined, '') },
            { json: 'locale', js: 'locale', typ: u(undefined, '') },
            { json: 'middle_name', js: 'middle_name', typ: u(undefined, '') },
            { json: 'phone', js: 'phone', typ: u(undefined, '') },
            { json: 'picture_url', js: 'picture_url', typ: u(undefined, '') },
            { json: 'role', js: 'role', typ: u(undefined, r('EdlinkV2Role')) },
            { json: 'roles', js: 'roles', typ: u(undefined, a(r('EdlinkV2Role'))) },
            { json: 'source', js: 'source', typ: u(undefined, r('AssignmentSource')) },
            { json: 'time_zone', js: 'time_zone', typ: u(undefined, '') }
        ],
        false
    ),
    AssignmentSource: o(
        [
            { json: 'created_date', js: 'created_date', typ: u(undefined, Date) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'import_interval', js: 'import_interval', typ: u(undefined, 3.14) },
            { json: 'log_retention_time', js: 'log_retention_time', typ: u(undefined, 3.14) },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'status', js: 'status', typ: u(undefined, '') },
            { json: 'updated_date', js: 'updated_date', typ: u(undefined, Date) }
        ],
        false
    ),
    EdlinkV1Provider: o(
        [
            { json: 'allows_data_sync', js: 'allows_data_sync', typ: u(undefined, true) },
            { json: 'application', js: 'application', typ: u(undefined, '') },
            { json: 'configuration', js: 'configuration', typ: u(undefined, '') },
            { json: 'icon_url', js: 'icon_url', typ: u(undefined, '') },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'requires_administrator_consent', js: 'requires_administrator_consent', typ: u(undefined, true) },
            { json: 'requires_administrator_login', js: 'requires_administrator_login', typ: u(undefined, true) },
            { json: 'requires_remote_configuration', js: 'requires_remote_configuration', typ: u(undefined, true) }
        ],
        false
    ),
    EdlinkV1Permission: o(
        [
            { json: 'active', js: 'active', typ: u(undefined, true) },
            { json: 'description', js: 'description', typ: u(undefined, '') },
            { json: 'group', js: 'group', typ: u(undefined, '') },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'scoped', js: 'scoped', typ: u(undefined, true) }
        ],
        false
    ),
    EdlinkV1Integration: o(
        [
            { json: 'access_token', js: 'access_token', typ: u(undefined, '') },
            { json: 'created_date', js: 'created_date', typ: u(undefined, Date) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'permissions', js: 'permissions', typ: u(undefined, a('')) },
            { json: 'provider', js: 'provider', typ: u(undefined, r('V1Provider')) },
            { json: 'scope', js: 'scope', typ: u(undefined, '') },
            { json: 'source', js: 'source', typ: u(undefined, r('EdlinkV1IntegrationSource')) },
            { json: 'status', js: 'status', typ: u(undefined, r('EdlinkV1IntegrationStatus')) },
            { json: 'targets', js: 'targets', typ: u(undefined, a('')) },
            { json: 'team', js: 'team', typ: u(undefined, r('V1Team')) },
            { json: 'updated_date', js: 'updated_date', typ: u(undefined, Date) }
        ],
        false
    ),
    V1Provider: o(
        [
            { json: 'allows_data_sync', js: 'allows_data_sync', typ: u(undefined, true) },
            { json: 'application', js: 'application', typ: u(undefined, '') },
            { json: 'configuration', js: 'configuration', typ: u(undefined, '') },
            { json: 'icon_url', js: 'icon_url', typ: u(undefined, '') },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'requires_administrator_consent', js: 'requires_administrator_consent', typ: u(undefined, true) },
            { json: 'requires_administrator_login', js: 'requires_administrator_login', typ: u(undefined, true) },
            { json: 'requires_remote_configuration', js: 'requires_remote_configuration', typ: u(undefined, true) }
        ],
        false
    ),
    EdlinkV1IntegrationSource: o(
        [
            { json: 'created_date', js: 'created_date', typ: u(undefined, Date) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'import_interval', js: 'import_interval', typ: u(undefined, 3.14) },
            { json: 'log_retention_time', js: 'log_retention_time', typ: u(undefined, 3.14) },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'status', js: 'status', typ: u(undefined, '') },
            { json: 'updated_date', js: 'updated_date', typ: u(undefined, Date) }
        ],
        false
    ),
    V1Team: o(
        [
            { json: 'alias', js: 'alias', typ: u(undefined, '') },
            { json: 'city', js: 'city', typ: u(undefined, '') },
            { json: 'country', js: 'country', typ: u(undefined, '') },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'state', js: 'state', typ: u(undefined, '') },
            { json: 'street_address', js: 'street_address', typ: u(undefined, '') },
            { json: 'type', js: 'type', typ: u(undefined, '') },
            { json: 'unit_number', js: 'unit_number', typ: u(undefined, '') },
            { json: 'zip', js: 'zip', typ: u(undefined, '') }
        ],
        false
    ),
    EdlinkV1Team: o(
        [
            { json: 'alias', js: 'alias', typ: u(undefined, '') },
            { json: 'city', js: 'city', typ: u(undefined, '') },
            { json: 'country', js: 'country', typ: u(undefined, '') },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'state', js: 'state', typ: u(undefined, '') },
            { json: 'street_address', js: 'street_address', typ: u(undefined, '') },
            { json: 'type', js: 'type', typ: u(undefined, '') },
            { json: 'unit_number', js: 'unit_number', typ: u(undefined, '') },
            { json: 'zip', js: 'zip', typ: u(undefined, '') }
        ],
        false
    ),
    EdlinkV1Event: o(
        [
            { json: 'created_date', js: 'created_date', typ: u(undefined, Date) },
            { json: 'data', js: 'data', typ: u(undefined, 'any') },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'type', js: 'type', typ: u(undefined, '') }
        ],
        false
    ),
    EdlinkV1Source: o(
        [
            { json: 'created_date', js: 'created_date', typ: u(undefined, Date) },
            { json: 'id', js: 'id', typ: u(undefined, '') },
            { json: 'import_interval', js: 'import_interval', typ: u(undefined, 3.14) },
            { json: 'log_retention_time', js: 'log_retention_time', typ: u(undefined, 3.14) },
            { json: 'name', js: 'name', typ: u(undefined, '') },
            { json: 'status', js: 'status', typ: u(undefined, '') },
            { json: 'updated_date', js: 'updated_date', typ: u(undefined, Date) }
        ],
        false
    ),
    ExternalObjectType: [
        'agent',
        'announcement',
        'answer',
        'assessment',
        'assessment-question',
        'assessment-submission-body',
        'assignment',
        'class',
        'content',
        'content-module',
        'course',
        'district',
        'enrollment',
        'file-submission-body',
        'grade',
        'person',
        'rubric',
        'school',
        'section',
        'session',
        'submission',
        'submission-attempt',
        'submission-body',
        'tag',
        'text-submission-body',
        'url-submission-body'
    ],
    EdlinkV2Role: [
        'administrator',
        'aide',
        'designer',
        'district-administrator',
        'guardian',
        'member',
        'observer',
        'parent',
        'student',
        'ta',
        'teacher'
    ],
    EdlinkV2EnrollmentState: ['active', 'completed', 'dropped', 'inactive', 'pending', 'upcoming'],
    EdlinkV2Relationship: ['aide', 'guardian', 'parent'],
    GenderIdentity: ['female', 'male', 'other'],
    PublicSchoolResidenceStatus: ['01652', '01653', '01654', '01655', '01656'],
    EdlinkV2GradeLevel: [
        'Birth',
        'IT',
        'KG',
        'Other',
        'PR',
        'PS',
        'PK',
        'Prenatal',
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
        '13',
        'TK',
        'UG'
    ],
    EdlinkV2SectionState: ['active', 'archived', 'completed', 'inactive', 'upcoming'],
    EdlinkV2ClassState: ['active', 'archived', 'completed', 'inactive', 'template', 'upcoming'],
    EdlinkV2Subject: [
        'CEDS.01',
        'CEDS.02',
        'CEDS.03',
        'CEDS.04',
        'CEDS.05',
        'CEDS.07',
        'CEDS.08',
        'CEDS.09',
        'CEDS.10',
        'CEDS.11',
        'CEDS.12',
        'CEDS.13',
        'CEDS.14',
        'CEDS.15',
        'CEDS.16',
        'CEDS.17',
        'CEDS.18',
        'CEDS.19',
        'CEDS.20',
        'CEDS.21',
        'CEDS.22',
        'CEDS.23',
        'CEDS.24',
        'EL.01',
        'EL.02'
    ],
    EdlinkV2SessionState: ['active', 'completed', 'upcoming'],
    EdlinkV2SessionType: ['grading_period', 'school_year', 'semester', 'term'],
    EdlinkV1EnrollmentType: [
        'administrator',
        'aide',
        'designer',
        'district-administrator',
        'guardian',
        'observer',
        'parent',
        'student',
        'ta',
        'teacher'
    ],
    EdlinkV1OrganizationType: ['course', 'district', 'school', 'section'],
    EdlinkV1IntegrationStatus: ['active', 'disabled', 'inactive']
};
