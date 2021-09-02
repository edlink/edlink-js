// noinspection JSUnusedGlobalSymbols

import axios, { AxiosInstance } from 'axios';
import {
    Convert,
    EdlinkV1Organization,
    EdlinkV1OrganizationType,
    EdlinkV2Agent,
    EdlinkV2Class,
    EdlinkV2Course,
    EdlinkV2District,
    EdlinkV2Enrollment,
    EdlinkV2Person,
    EdlinkV2School,
    EdlinkV2Section,
    EdlinkV2Session
} from '../../types/gen/ts/edlink';
import { Filter } from './filter';

export abstract class GraphAPI {
    private axios: AxiosInstance;

    protected constructor(private readonly integration_access_token: string, private readonly version: 'v1' | 'v2') {
        this.axios = axios.create({
            baseURL: `https://ed.link/api/${version}/graph`,
            headers: {
                authorization: `Bearer ${integration_access_token}`
            }
        });
    }

    protected async *paginate<T>(url: string, formatter: (raw: any) => T, filter?: Filter, limit?: number): AsyncGenerator<T> {
        let remaining = limit;
        let next = `${url}?$first=10000${filter ? `&$filter=${filter.toString()}` : ''}`;

        while (next && (remaining === undefined || remaining > 0)) {
            const response = await this.axios.get(url).then((n) => n.data);

            for (const item of response.$data) {
                yield formatter(item);

                if (remaining !== undefined) {
                    remaining--;
                }
            }

            next = response.$next;
        }
    }

    protected async fetch<T>(url: string, formatter: (raw: any) => T): Promise<T> {
        return this.axios.get(url).then((res) => formatter(res.data.$data));
    }
}

export class GraphV1 extends GraphAPI {
    constructor(integration_access_token: string) {
        super(integration_access_token, 'v1');
    }

    async *listOrganizations(organization_type?: EdlinkV1OrganizationType): AsyncGenerator<EdlinkV1Organization> {
        const url = organization_type ? `/${organization_type}s` : '/organizations';
        return this.paginate<EdlinkV1Organization>(url, Convert.toEdlinkV1Organization);
    }

    async fetchOrganization(organization_type: EdlinkV1OrganizationType, organization_id: string): Promise<EdlinkV1Organization> {
        return this.fetch<EdlinkV1Organization>(`/${organization_type}/${organization_id}`, Convert.toEdlinkV1Organization);
    }

    async *listCourses(): AsyncGenerator<EdlinkV1Organization> {
        return this.listOrganizations(EdlinkV1OrganizationType.Course);
    }

    async fetchCourse(organization_id: string): Promise<EdlinkV1Organization> {
        return this.fetchOrganization(EdlinkV1OrganizationType.Course, organization_id);
    }

    async *listDistricts(): AsyncGenerator<EdlinkV1Organization> {
        return this.listOrganizations(EdlinkV1OrganizationType.District);
    }

    async fetchDistrict(organization_id: string): Promise<EdlinkV1Organization> {
        return this.fetchOrganization(EdlinkV1OrganizationType.District, organization_id);
    }

    async *listSchools(): AsyncGenerator<EdlinkV1Organization> {
        return this.listOrganizations(EdlinkV1OrganizationType.School);
    }

    async fetchSchool(organization_id: string): Promise<EdlinkV1Organization> {
        return this.fetchOrganization(EdlinkV1OrganizationType.School, organization_id);
    }

    async *listSections(): AsyncGenerator<EdlinkV1Organization> {
        return this.listOrganizations(EdlinkV1OrganizationType.Section);
    }

    async fetchSection(organization_id: string): Promise<EdlinkV1Organization> {
        return this.fetchOrganization(EdlinkV1OrganizationType.Section, organization_id);
    }
}

export class GraphV2 extends GraphAPI {
    constructor(integration_access_token: string) {
        super(integration_access_token, 'v2');
    }

    async *listDistricts(): AsyncGenerator<EdlinkV2District> {
        return this.paginate('/districts', Convert.toEdlinkV2District);
    }

    async fetchDistrict(district_id: string): Promise<EdlinkV2District> {
        return this.fetch(`/districts/${district_id}`, Convert.toEdlinkV2District);
    }

    async *listSchools(filter?: Filter): AsyncGenerator<EdlinkV2School> {
        return this.paginate('/schools', Convert.toEdlinkV2School, filter);
    }

    async fetchSchool(school_id: string): Promise<EdlinkV2School> {
        return this.fetch(`/schools/${school_id}`, Convert.toEdlinkV2School);
    }

    async *listClasses(filter?: Filter): AsyncGenerator<EdlinkV2Class> {
        return this.paginate('/classes', Convert.toEdlinkV2Class, filter);
    }

    async fetchClass(class_id: string): Promise<EdlinkV2Class> {
        return this.fetch(`/classes/${class_id}`, Convert.toEdlinkV2Class);
    }

    async *listClassSections(class_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Section> {
        return this.paginate(`/classes/${class_id}/sections`, Convert.toEdlinkV2Section, filter);
    }

    async *listClassEnrollments(class_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Enrollment> {
        return this.paginate(`/classes/${class_id}/enrollments`, Convert.toEdlinkV2Enrollment, filter);
    }

    async *listClassPeople(class_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.paginate(`/classes/${class_id}/people`, Convert.toEdlinkV2Person, filter);
    }

    async *listClassTeachers(class_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.paginate(`/classes/${class_id}/teachers`, Convert.toEdlinkV2Person, filter);
    }

    async *listClassStudents(class_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.paginate(`/classes/${class_id}/students`, Convert.toEdlinkV2Person, filter);
    }

    async *listSections(filter?: Filter): AsyncGenerator<EdlinkV2Section> {
        return this.paginate('/sections', Convert.toEdlinkV2Section, filter);
    }

    async fetchSection(section_id: string): Promise<EdlinkV2Section> {
        return this.fetch(`/sections/${section_id}`, Convert.toEdlinkV2Section);
    }

    async *listSectionEnrollments(section_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Enrollment> {
        return this.paginate(`/sections/${section_id}/enrollments`, Convert.toEdlinkV2Enrollment, filter);
    }

    async *listSectionPeople(section_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.paginate(`/sections/${section_id}/people`, Convert.toEdlinkV2Person, filter);
    }

    async *listSectionTeachers(section_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.paginate(`/sections/${section_id}/teachers`, Convert.toEdlinkV2Person, filter);
    }

    async *listSectionStudents(section_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.paginate(`/sections/${section_id}/students`, Convert.toEdlinkV2Person, filter);
    }

    async *listPeople(filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.paginate('/people', Convert.toEdlinkV2Person, filter);
    }

    async fetchPerson(person_id: string): Promise<EdlinkV2Person> {
        return this.fetch(`/people/${person_id}`, Convert.toEdlinkV2Person);
    }

    async *listPersonEnrollments(person_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Enrollment> {
        return this.paginate(`/people/${person_id}/enrollments`, Convert.toEdlinkV2Enrollment, filter);
    }

    async *listPersonDistricts(person_id: string, filter?: Filter): AsyncGenerator<EdlinkV2District> {
        return this.paginate(`/people/${person_id}/districts`, Convert.toEdlinkV2District, filter);
    }

    async *listPersonSchools(person_id: string, filter?: Filter): AsyncGenerator<EdlinkV2School> {
        return this.paginate(`/people/${person_id}/schools`, Convert.toEdlinkV2School, filter);
    }

    async *listPersonClasses(person_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Class> {
        return this.paginate(`/people/${person_id}/classes`, Convert.toEdlinkV2Class, filter);
    }

    async *listPersonSections(person_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Section> {
        return this.paginate(`/people/${person_id}/sections`, Convert.toEdlinkV2Section, filter);
    }

    async *listPersonAgents(person_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Agent> {
        return this.paginate(`/people/${person_id}/agents`, Convert.toEdlinkV2Agent, filter);
    }

    async *listEnrollments(filter?: Filter): AsyncGenerator<EdlinkV2Enrollment> {
        return this.paginate<EdlinkV2Enrollment>('/enrollments', Convert.toEdlinkV2Enrollment, filter);
    }

    async fetchEnrollment(enrollment_id: string): Promise<EdlinkV2Person> {
        return this.fetch(`/enrollments/${enrollment_id}`, Convert.toEdlinkV2Enrollment);
    }

    async *listCourses(filter?: Filter): AsyncGenerator<EdlinkV2Course> {
        return this.paginate('/courses', Convert.toEdlinkV2Course, filter);
    }

    async fetchCourse(course_id: string): Promise<EdlinkV2Course> {
        return this.fetch(`/courses/${course_id}`, Convert.toEdlinkV2Course);
    }

    async *listCourseClasses(course_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Class> {
        return this.paginate(`/courses/${course_id}/classes`, Convert.toEdlinkV2Class, filter);
    }

    async *listSessions(filter?: Filter): AsyncGenerator<EdlinkV2Session> {
        return this.paginate('/sessions', Convert.toEdlinkV2Session, filter);
    }

    async fetchSession(session_id: string): Promise<EdlinkV2Session> {
        return this.fetch(`/sessions/${session_id}`, Convert.toEdlinkV2Session);
    }

    async *listAgents(filter?: Filter): AsyncGenerator<EdlinkV2Agent> {
        return this.paginate('/agents', Convert.toEdlinkV2Agent, filter);
    }

    async fetchAgent(agent_id: string): Promise<EdlinkV2Agent> {
        return this.fetch(`/agents/${agent_id}`, Convert.toEdlinkV2Agent);
    }
}
