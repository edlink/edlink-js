import { GraphAPI } from './index';
import {
    Convert,
    EdlinkV1Event,
    EdlinkV1Enrollment,
    EdlinkV1EnrollmentType,
    EdlinkV1Organization,
    EdlinkV1OrganizationType,
    EdlinkV1Term,
    EdlinkV1Person,
} from '../../../types/gen/ts/edlink';

export class GraphV1 extends GraphAPI {
    public organizations: GraphV1Organizations;
    public courses: GraphV1OrganizationsOfType;
    public districts: GraphV1OrganizationsOfType;
    public schools: GraphV1OrganizationsOfType;
    public sections: GraphV1OrganizationsOfType;
    public terms: GraphV1Terms;
    public people: GraphV1People;
    public enrollments: GraphV1Enrollments;
    public events: GraphV1Events;

    constructor(integration_access_token: string) {
        super(integration_access_token, 'v1');

        this.organizations = new GraphV1Organizations(this);
        this.courses = new GraphV1OrganizationsOfType(this.organizations, EdlinkV1OrganizationType.Course);
        this.districts = new GraphV1OrganizationsOfType(this.organizations, EdlinkV1OrganizationType.District);
        this.schools = new GraphV1OrganizationsOfType(this.organizations, EdlinkV1OrganizationType.School);
        this.sections = new GraphV1OrganizationsOfType(this.organizations, EdlinkV1OrganizationType.Section);
        this.terms = new GraphV1Terms(this);
        this.people = new GraphV1People(this);
        this.enrollments = new GraphV1Enrollments(this);
        this.events = new GraphV1Events(this);
    }
}

class GraphV1Organizations {
    constructor(private graph: GraphV1) {
    }

    async *list(organization_type?: EdlinkV1OrganizationType): AsyncGenerator<EdlinkV1Organization> {
        const url = organization_type ? `/${organization_type}s` : '/organizations';
        return this.graph.paginate<EdlinkV1Organization>(url, Convert.toEdlinkV1Organization);
    }

    async fetch(organization_type: EdlinkV1OrganizationType, organization_id: string): Promise<EdlinkV1Organization> {
        return this.graph.fetch(`/${organization_type}/${organization_id}`, Convert.toEdlinkV1Organization);
    }

    async *listEnrollments(
        organization_type: EdlinkV1OrganizationType,
        organization_id: string,
        enrollment_type?: EdlinkV1EnrollmentType
    ): AsyncGenerator<EdlinkV1Enrollment> {
        const url = `/${organization_type}/${organization_id}/${enrollment_type ?? 'enrollments'}`;
        return this.graph.paginate(url, Convert.toEdlinkV1Enrollment);
    }
}

class GraphV1OrganizationsOfType {
    constructor(private organizations: GraphV1Organizations, private type: EdlinkV1OrganizationType) {
    }

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

class GraphV1Terms {
    constructor(private graph: GraphV1) {
    }

    async *list(): AsyncGenerator<EdlinkV1Term> {
        return this.graph.paginate('/terms', Convert.toEdlinkV1Term);
    }

    async fetch(term_id: string): Promise<EdlinkV1Term> {
        return this.graph.fetch(`/terms/${term_id}`, Convert.toEdlinkV1Term);
    }
}

class GraphV1People {
    constructor(private graph: GraphV1) {
    }

    async *list(): AsyncGenerator<EdlinkV1Person> {
        return this.graph.paginate('/people', Convert.toEdlinkV1Person);
    }

    async fetch(person_id: string): Promise<EdlinkV1Person> {
        return this.graph.fetch(`/people/${person_id}`, Convert.toEdlinkV1Person);
    }
}

class GraphV1Enrollments {
    constructor(private graph: GraphV1) {
    }

    async *list(): AsyncGenerator<EdlinkV1Enrollment> {
        return this.graph.paginate('/enrollments', Convert.toEdlinkV1Enrollment);
    }

    async fetch(enrollment_id: string): Promise<EdlinkV1Enrollment> {
        return this.graph.fetch(`/enrollments/${enrollment_id}`, Convert.toEdlinkV1Enrollment);
    }
}

class GraphV1Events {
    constructor(private graph: GraphV1) {
    }

    async *list(since?: Date): AsyncGenerator<EdlinkV1Event> {
        return this.graph.paginate('/events', Convert.toEdlinkV1Event, undefined, undefined, (next) => {
            if(since === undefined || next.created_date === undefined) {
                return false;
            }

            // We want to stop iterating through events if we encounter one that's older than our "since" parameter.
            return next.created_date < since;
        });
    }

    async fetch(event_id: string): Promise<EdlinkV1Event> {
        return this.graph.fetch(`/events/${event_id}`, Convert.toEdlinkV1Event);
    }
}
