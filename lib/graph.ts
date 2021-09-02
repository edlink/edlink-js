import axios, { AxiosInstance } from 'axios';
import {
    EdlinkV2Class,
    EdlinkV2Agent,
    EdlinkV2Session,
    Convert,
    EdlinkV2District,
    EdlinkV2Enrollment,
    EdlinkV2Person,
    EdlinkV2School,
    EdlinkV2Section,
    EdlinkV2Course
} from '../../types/gen/ts/edlink';
import { Filter } from './filter';

export abstract class GraphAPI {
    protected axios: AxiosInstance;

    protected constructor(private readonly integration_access_token: string) {
        this.axios = axios.create({
            baseURL: 'https://ed.link/api/v2/graph',
            headers: {
                authorization: `Bearer ${integration_access_token}`
            }
        });
    }

    protected async *paginate<T>(url: string, filter?: Filter, limit?: number, formatter?: (raw: any) => T): AsyncGenerator<T> {
        let remaining = limit;
        let next = `${url}?$first=10000${filter ? `&$filter=${filter.toString()}` : ''}`;

        while (next && (remaining === undefined || remaining > 0)) {
            const response = await this.axios.get(url).then((n) => n.data);

            for (const item of response.$data) {
                yield item;

                if (remaining !== undefined) {
                    remaining--;
                }
            }

            next = response.$next;
        }
    }
}

export class GraphV1 extends GraphAPI {
    constructor(integration_access_token: string) {
        super(integration_access_token);
    }
}

export class GraphV2 extends GraphAPI {
    constructor(integration_access_token: string) {
        super(integration_access_token);
    }

    async *listDistricts(): AsyncGenerator<EdlinkV2District> {
        return this.paginate<EdlinkV2District>('/districts', undefined, undefined, (raw) => Convert.toEdlinkV2District(raw));
    }

    async fetchDistrict(district_id: string): Promise<EdlinkV2District> {
        return this.axios.get(`/districts/${district_id}`).then((res) => Convert.toEdlinkV2District(res.data));
    }

    async *listSchools(filter?: Filter): AsyncGenerator<EdlinkV2School> {
        return this.paginate<EdlinkV2School>('/schools', filter, undefined, (raw) => Convert.toEdlinkV2School(raw));
    }

    async fetchSchool(school_id: string): Promise<EdlinkV2School> {
        return this.axios.get(`/schools/${school_id}`).then((res) => Convert.toEdlinkV2School(res.data));
    }

    async *listClasses(filter?: Filter): AsyncGenerator<EdlinkV2Class> {
        return this.paginate<EdlinkV2Class>('/classes', filter, undefined, (raw) => Convert.toEdlinkV2Class(raw));
    }

    async fetchClass(class_id: string): Promise<EdlinkV2Class> {
        return this.axios.get(`/classes/${class_id}`).then((res) => Convert.toEdlinkV2Class(res.data));
    }

    async *listClassSections(class_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Section> {
        return this.paginate<EdlinkV2Section>(`/classes/${class_id}/sections`, filter, undefined, (raw) => Convert.toEdlinkV2Section(raw));
    }

    async *listClassEnrollments(class_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Enrollment> {
        return this.paginate<EdlinkV2Enrollment>(`/classes/${class_id}/enrollments`, filter, undefined, (raw) => Convert.toEdlinkV2Enrollment(raw));
    }

    async *listClassPeople(class_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.paginate<EdlinkV2Person>(`/classes/${class_id}/people`, filter, undefined, (raw) => Convert.toEdlinkV2Person(raw));
    }

    async *listClassTeachers(class_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.paginate<EdlinkV2Person>(`/classes/${class_id}/teachers`, filter, undefined, (raw) => Convert.toEdlinkV2Person(raw));
    }

    async *listClassStudents(class_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.paginate<EdlinkV2Person>(`/classes/${class_id}/students`, filter, undefined, (raw) => Convert.toEdlinkV2Person(raw));
    }

    async *listSections(filter?: Filter): AsyncGenerator<EdlinkV2Section> {
        return this.paginate<EdlinkV2Section>('/sections', filter, undefined, (raw) => Convert.toEdlinkV2Section(raw));
    }

    async fetchSection(section_id: string): Promise<EdlinkV2Section> {
        return this.axios.get(`/sections/${section_id}`).then((res) => Convert.toEdlinkV2Section(res.data));
    }

    async *listSectionEnrollments(section_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Enrollment> {
        return this.paginate<EdlinkV2Enrollment>(`/sections/${section_id}/enrollments`, filter, undefined, (raw) =>
            Convert.toEdlinkV2Enrollment(raw)
        );
    }

    async *listSectionPeople(section_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.paginate<EdlinkV2Person>(`/sections/${section_id}/people`, filter, undefined, (raw) => Convert.toEdlinkV2Person(raw));
    }

    async *listSectionTeachers(section_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.paginate<EdlinkV2Person>(`/sections/${section_id}/teachers`, filter, undefined, (raw) => Convert.toEdlinkV2Person(raw));
    }

    async *listSectionStudents(section_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.paginate<EdlinkV2Person>(`/sections/${section_id}/students`, filter, undefined, (raw) => Convert.toEdlinkV2Person(raw));
    }

    async *listPeople(filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.paginate<EdlinkV2Person>('/people', filter, undefined, (raw) => Convert.toEdlinkV2Person(raw));
    }

    async fetchPerson(person_id: string): Promise<EdlinkV2Person> {
        return this.axios.get(`/people/${person_id}`).then((res) => Convert.toEdlinkV2Person(res.data));
    }

    async *listPersonEnrollments(person_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Enrollment> {
        return this.paginate<EdlinkV2Enrollment>(`/people/${person_id}/enrollments`, filter, undefined, (raw) => Convert.toEdlinkV2Enrollment(raw));
    }

    async *listPersonDistricts(person_id: string, filter?: Filter): AsyncGenerator<EdlinkV2District> {
        return this.paginate<EdlinkV2District>(`/people/${person_id}/districts`, filter, undefined, (raw) => Convert.toEdlinkV2District(raw));
    }

    async *listPersonSchools(person_id: string, filter?: Filter): AsyncGenerator<EdlinkV2School> {
        return this.paginate<EdlinkV2School>(`/people/${person_id}/schools`, filter, undefined, (raw) => Convert.toEdlinkV2School(raw));
    }

    async *listPersonClasses(person_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Class> {
        return this.paginate<EdlinkV2Class>(`/people/${person_id}/classes`, filter, undefined, (raw) => Convert.toEdlinkV2Class(raw));
    }

    async *listPersonSections(person_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Section> {
        return this.paginate<EdlinkV2Section>(`/people/${person_id}/sections`, filter, undefined, (raw) => Convert.toEdlinkV2Section(raw));
    }

    async *listPersonAgents(person_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Agent> {
        return this.paginate<EdlinkV2Agent>(`/people/${person_id}/agents`, filter, undefined, (raw) => Convert.toEdlinkV2Agent(raw));
    }

    async *listEnrollments(filter?: Filter): AsyncGenerator<EdlinkV2Enrollment> {
        return this.paginate<EdlinkV2Enrollment>('/enrollments', filter, undefined, (raw) => Convert.toEdlinkV2Enrollment(raw));
    }

    async fetchEnrollment(enrollment_id: string): Promise<EdlinkV2Person> {
        return this.axios.get(`/enrollments/${enrollment_id}`).then((res) => Convert.toEdlinkV2Enrollment(res.data));
    }

    async *listCourses(filter?: Filter): AsyncGenerator<EdlinkV2Course> {
        return this.paginate<EdlinkV2Course>('/courses', filter, undefined, (raw) => Convert.toEdlinkV2Course(raw));
    }

    async fetchCourse(course_id: string): Promise<EdlinkV2Course> {
        return this.axios.get(`/courses/${course_id}`).then((res) => Convert.toEdlinkV2Course(res.data));
    }

    async *listCourseClasses(course_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Class> {
        return this.paginate<EdlinkV2Class>(`/courses/${course_id}/classes`, filter, undefined, (raw) => Convert.toEdlinkV2Class(raw));
    }

    async *listSessions(filter?: Filter): AsyncGenerator<EdlinkV2Session> {
        return this.paginate<EdlinkV2Session>('/sessions', filter, undefined, (raw) => Convert.toEdlinkV2Session(raw));
    }

    async fetchSession(session_id: string): Promise<EdlinkV2Session> {
        return this.axios.get(`/sessions/${session_id}`).then((res) => Convert.toEdlinkV2Session(res.data));
    }

    async *listAgents(filter?: Filter): AsyncGenerator<EdlinkV2Agent> {
        return this.paginate<EdlinkV2Agent>('/agents', filter, undefined, (raw) => Convert.toEdlinkV2Agent(raw));
    }

    async fetchAgent(agent_id: string): Promise<EdlinkV2Agent> {
        return this.axios.get(`/agents/${agent_id}`).then((res) => Convert.toEdlinkV2Agent(res.data));
    }
}
