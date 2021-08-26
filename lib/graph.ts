import axios, { AxiosInstance } from 'axios';
import { Class, Agent, Session, Convert, District, Enrollment, Person, School, Section, Course } from '../../types/gen/ts/edlink';
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

    async *listDistricts(): AsyncGenerator<District> {
        return this.paginate<District>('/districts', undefined, undefined, (raw) => Convert.toDistrict(raw));
    }

    async fetchDistrict(district_id: string): Promise<District> {
        return this.axios.get(`/districts/${district_id}`).then((res) => Convert.toDistrict(res.data));
    }

    async *listSchools(filter?: Filter): AsyncGenerator<School> {
        return this.paginate<School>('/schools', filter, undefined, (raw) => Convert.toSchool(raw));
    }

    async fetchSchool(school_id: string): Promise<School> {
        return this.axios.get(`/schools/${school_id}`).then((res) => Convert.toSchool(res.data));
    }

    async *listClasses(filter?: Filter): AsyncGenerator<Class> {
        return this.paginate<Class>('/classes', filter, undefined, (raw) => Convert.toClass(raw));
    }

    async fetchClass(class_id: string): Promise<Class> {
        return this.axios.get(`/classes/${class_id}`).then((res) => Convert.toClass(res.data));
    }

    async *listClassSections(class_id: string, filter?: Filter): AsyncGenerator<Section> {
        return this.paginate<Section>(`/classes/${class_id}/sections`, filter, undefined, (raw) => Convert.toSection(raw));
    }

    async *listClassEnrollments(class_id: string, filter?: Filter): AsyncGenerator<Enrollment> {
        return this.paginate<Enrollment>(`/classes/${class_id}/enrollments`, filter, undefined, (raw) => Convert.toEnrollment(raw));
    }

    async *listClassPeople(class_id: string, filter?: Filter): AsyncGenerator<Person> {
        return this.paginate<Person>(`/classes/${class_id}/people`, filter, undefined, (raw) => Convert.toPerson(raw));
    }

    async *listClassTeachers(class_id: string, filter?: Filter): AsyncGenerator<Person> {
        return this.paginate<Person>(`/classes/${class_id}/teachers`, filter, undefined, (raw) => Convert.toPerson(raw));
    }

    async *listClassStudents(class_id: string, filter?: Filter): AsyncGenerator<Person> {
        return this.paginate<Person>(`/classes/${class_id}/students`, filter, undefined, (raw) => Convert.toPerson(raw));
    }

    async *listSections(filter?: Filter): AsyncGenerator<Section> {
        return this.paginate<Section>('/sections', filter, undefined, (raw) => Convert.toSection(raw));
    }

    async fetchSection(section_id: string): Promise<Section> {
        return this.axios.get(`/sections/${section_id}`).then((res) => Convert.toSection(res.data));
    }

    async *listSectionEnrollments(section_id: string, filter?: Filter): AsyncGenerator<Enrollment> {
        return this.paginate<Enrollment>(`/sections/${section_id}/enrollments`, filter, undefined, (raw) => Convert.toEnrollment(raw));
    }

    async *listSectionPeople(section_id: string, filter?: Filter): AsyncGenerator<Person> {
        return this.paginate<Person>(`/sections/${section_id}/people`, filter, undefined, (raw) => Convert.toPerson(raw));
    }

    async *listSectionTeachers(section_id: string, filter?: Filter): AsyncGenerator<Person> {
        return this.paginate<Person>(`/sections/${section_id}/teachers`, filter, undefined, (raw) => Convert.toPerson(raw));
    }

    async *listSectionStudents(section_id: string, filter?: Filter): AsyncGenerator<Person> {
        return this.paginate<Person>(`/sections/${section_id}/students`, filter, undefined, (raw) => Convert.toPerson(raw));
    }

    async *listPeople(filter?: Filter): AsyncGenerator<Person> {
        return this.paginate<Person>('/people', filter, undefined, (raw) => Convert.toPerson(raw));
    }

    async fetchPerson(person_id: string): Promise<Person> {
        return this.axios.get(`/people/${person_id}`).then((res) => Convert.toPerson(res.data));
    }

    async *listPersonEnrollments(person_id: string, filter?: Filter): AsyncGenerator<Enrollment> {
        return this.paginate<Enrollment>(`/people/${person_id}/enrollments`, filter, undefined, (raw) => Convert.toEnrollment(raw));
    }

    async *listPersonDistricts(person_id: string, filter?: Filter): AsyncGenerator<District> {
        return this.paginate<District>(`/people/${person_id}/districts`, filter, undefined, (raw) => Convert.toDistrict(raw));
    }

    async *listPersonSchools(person_id: string, filter?: Filter): AsyncGenerator<School> {
        return this.paginate<School>(`/people/${person_id}/schools`, filter, undefined, (raw) => Convert.toSchool(raw));
    }

    async *listPersonClasses(person_id: string, filter?: Filter): AsyncGenerator<Class> {
        return this.paginate<Class>(`/people/${person_id}/classes`, filter, undefined, (raw) => Convert.toClass(raw));
    }

    async *listPersonSections(person_id: string, filter?: Filter): AsyncGenerator<Section> {
        return this.paginate<Section>(`/people/${person_id}/sections`, filter, undefined, (raw) => Convert.toSection(raw));
    }

    async *listPersonAgents(person_id: string, filter?: Filter): AsyncGenerator<Agent> {
        return this.paginate<Agent>(`/people/${person_id}/agents`, filter, undefined, (raw) => Convert.toAgent(raw));
    }

    async *listEnrollments(filter?: Filter): AsyncGenerator<Enrollment> {
        return this.paginate<Enrollment>('/enrollments', filter, undefined, (raw) => Convert.toEnrollment(raw));
    }

    async fetchEnrollment(enrollment_id: string): Promise<Person> {
        return this.axios.get(`/enrollments/${enrollment_id}`).then((res) => Convert.toEnrollment(res.data));
    }

    async *listCourses(filter?: Filter): AsyncGenerator<Course> {
        return this.paginate<Course>('/courses', filter, undefined, (raw) => Convert.toCourse(raw));
    }

    async fetchCourse(course_id: string): Promise<Course> {
        return this.axios.get(`/courses/${course_id}`).then((res) => Convert.toCourse(res.data));
    }

    async *listCourseClasses(course_id: string, filter?: Filter): AsyncGenerator<Class> {
        return this.paginate<Class>(`/courses/${course_id}/classes`, filter, undefined, (raw) => Convert.toClass(raw));
    }

    async *listSessions(filter?: Filter): AsyncGenerator<Session> {
        return this.paginate<Course>('/sessions', filter, undefined, (raw) => Convert.toSession(raw));
    }

    async fetchSession(session_id: string): Promise<Session> {
        return this.axios.get(`/sessions/${session_id}`).then((res) => Convert.toSession(res.data));
    }

    async *listAgents(filter?: Filter): AsyncGenerator<Agent> {
        return this.paginate<Course>('/agents', filter, undefined, (raw) => Convert.toAgent(raw));
    }

    async fetchAgent(agent_id: string): Promise<Agent> {
        return this.axios.get(`/agents/${agent_id}`).then((res) => Convert.toAgent(res.data));
    }
}
