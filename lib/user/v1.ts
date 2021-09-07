import { Auth, UserAPI } from './index';
import {
    Convert,
    EdlinkV1Assignment,
    EdlinkV1Enrollment,
    EdlinkV1EnrollmentType,
    EdlinkV1Organization,
    EdlinkV1OrganizationType,
    EdlinkV1Person,
    EdlinkV1Submission
} from '../edlink';

export class UserV1 extends UserAPI {
    public organizations: UserV1Organizations;
    public schools: UserV1OrganizationsOfType;
    public sections: UserV1OrganizationsOfType;
    public courses: UserV1Courses;

    constructor(auth: Auth) {
        super(auth, 'v1');

        this.organizations = new UserV1Organizations(this);
        this.schools = new UserV1OrganizationsOfType(this.organizations, EdlinkV1OrganizationType.School);
        this.sections = new UserV1OrganizationsOfType(this.organizations, EdlinkV1OrganizationType.Section);
        this.courses = new UserV1Courses(this.organizations, this);
    }

    async profile(): Promise<EdlinkV1Person> {
        return this.fetch('/profile', Convert.toEdlinkV1Person);
    }
}

class UserV1Organizations {
    constructor(private user: UserV1) {}

    async *list(organization_type?: EdlinkV1OrganizationType): AsyncGenerator<EdlinkV1Organization> {
        const url = organization_type ? `/${organization_type}s` : '/organizations';
        return this.user.paginate<EdlinkV1Organization>(url, Convert.toEdlinkV1Organization);
    }

    async fetch(organization_type: EdlinkV1OrganizationType, organization_id: string): Promise<EdlinkV1Organization> {
        return this.user.fetch(`/${organization_type}/${organization_id}`, Convert.toEdlinkV1Organization);
    }

    async *listEnrollments(
        organization_type: EdlinkV1OrganizationType,
        organization_id: string,
        enrollment_type?: EdlinkV1EnrollmentType
    ): AsyncGenerator<EdlinkV1Enrollment> {
        const url = `/${organization_type}/${organization_id}/${enrollment_type ?? 'enrollments'}`;
        return this.user.paginate(url, Convert.toEdlinkV1Enrollment);
    }
}

class UserV1OrganizationsOfType {
    constructor(private organizations: UserV1Organizations, private type: EdlinkV1OrganizationType) {}

    async *list(): AsyncGenerator<EdlinkV1Organization> {
        return this.organizations.list(this.type);
    }

    async fetch(organization_id: string): Promise<EdlinkV1Organization> {
        return this.organizations.fetch(this.type, organization_id);
    }

    async *listEnrollments(organization_id: string, enrollment_type?: EdlinkV1EnrollmentType): AsyncGenerator<EdlinkV1Enrollment> {
        return this.organizations.listEnrollments(this.type, organization_id, enrollment_type);
    }
}

class UserV1Courses extends UserV1OrganizationsOfType {
    constructor(organizations: UserV1Organizations, private user: UserV1) {
        super(organizations, EdlinkV1OrganizationType.Course);
    }

    async *listAssignments(course_id: string): AsyncGenerator<EdlinkV1Assignment> {
        return this.user.paginateModified(`/courses/${course_id}/assignments`, Convert.toEdlinkV1Assignment);
    }

    async fetchAssignment(course_id: string, assignment_id: string): Promise<EdlinkV1Assignment> {
        return this.user.fetch(`/courses/${course_id}/assignments/${assignment_id}`, Convert.toEdlinkV1Assignment);
    }

    async createAssignment(course_id: string, assignment: EdlinkV1Assignment): Promise<EdlinkV1Assignment> {
        return this.user.create(`/courses/${course_id}/assignments`, assignment, Convert.toEdlinkV1Assignment);
    }

    async updateAssignment(course_id: string, assignment_id: string, assignment: EdlinkV1Assignment): Promise<EdlinkV1Assignment> {
        return this.user.create(`/courses/${course_id}/assignments/${assignment_id}`, assignment, Convert.toEdlinkV1Assignment);
    }

    async deleteAssignment(course_id: string, assignment_id: string): Promise<boolean> {
        return this.user.delete(`/courses/${course_id}/assignments/${assignment_id}`);
    }

    async *listSubmissions(course_id: string, assignment_id: string): AsyncGenerator<EdlinkV1Submission> {
        return this.user.paginateModified(`/courses/${course_id}/assignments/${assignment_id}/submissions`, Convert.toEdlinkV1Submission);
    }

    async fetchSubmission(course_id: string, assignment_id: string, submission_id: string): Promise<EdlinkV1Submission> {
        return this.user.fetch(`/courses/${course_id}/assignments/${assignment_id}/submissions/${submission_id}`, Convert.toEdlinkV1Submission);
    }

    async createSubmission(course_id: string, assignment_id: string, submission: EdlinkV1Submission): Promise<EdlinkV1Submission> {
        return this.user.create(`/courses/${course_id}/assignments/${assignment_id}`, submission, Convert.toEdlinkV1Submission);
    }

    async gradeSubmission(course_id: string, assignment_id: string, submission_id: string, score: number): Promise<boolean> {
        return this.user.update(`/courses/${course_id}/assignments/${assignment_id}/submissions/${submission_id}/grade`, { score });
    }
}
