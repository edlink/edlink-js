import { Auth, UserAPI } from './index';
import {
    Convert,
    EdlinkV1Enrollment,
    EdlinkV1EnrollmentType,
    EdlinkV1Organization,
    EdlinkV1OrganizationType,
    EdlinkV1Person
} from '../edlink';

export class UserV1 extends UserAPI {
    public organizations: UserV1Organizations;
    public schools: UserV1OrganizationsOfType;
    public sections: UserV1OrganizationsOfType;
    public courses: UserV1OrganizationsOfType;

    constructor(auth: Auth) {
        super(auth, 'v1');

        this.organizations = new UserV1Organizations(this);
        this.schools = new UserV1OrganizationsOfType(this.organizations, EdlinkV1OrganizationType.School);
        this.sections = new UserV1OrganizationsOfType(this.organizations, EdlinkV1OrganizationType.Section);
        this.courses = new UserV1Courses(this.organizations);
    }

    async profile(): Promise<EdlinkV1Person> {
        return this.fetch('/profile', Convert.toEdlinkV1Person);
    }
}

class UserV1Organizations {
    constructor(private user: UserV1) {
    }

    async* list(organization_type?: EdlinkV1OrganizationType): AsyncGenerator<EdlinkV1Organization> {
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
    constructor(organizations: UserV1Organizations) {
        super(organizations, EdlinkV1OrganizationType.Course);
    }


}
