import { Filter } from '../filter';
import { GraphAPI } from './index';
import {
    Convert,
    EdlinkV2Agent,
    EdlinkV2Class,
    EdlinkV2Course,
    EdlinkV2District,
    EdlinkV2Enrollment,
    EdlinkV2Person,
    EdlinkV2School,
    EdlinkV2Section,
    EdlinkV2Session
} from '../edlink';

export class GraphV2 extends GraphAPI {
    public districts: GraphV2Districts;
    public schools: GraphV2Schools;
    public classes: GraphV2Classes;
    public sections: GraphV2Sections;
    public people: GraphV2People;
    public enrollments: GraphV2Enrollments;
    public courses: GraphV2Courses;
    public sessions: GraphV2Sessions;
    public agents: GraphV2Agents;

    constructor(integration_access_token: string) {
        super(integration_access_token, 'v2');

        this.districts = new GraphV2Districts(this);
        this.schools = new GraphV2Schools(this);
        this.classes = new GraphV2Classes(this);
        this.sections = new GraphV2Sections(this);
        this.people = new GraphV2People(this);
        this.enrollments = new GraphV2Enrollments(this);
        this.courses = new GraphV2Courses(this);
        this.sessions = new GraphV2Sessions(this);
        this.agents = new GraphV2Agents(this);
    }
}

class GraphV2Districts {
    constructor(private graph: GraphV2) {}

    async *list(): AsyncGenerator<EdlinkV2District> {
        return this.graph.paginate('/districts', n => n as EdlinkV2District);
    }

    async fetch(district_id: string): Promise<EdlinkV2District> {
        return this.graph.fetch(`/districts/${district_id}`, n => n as EdlinkV2District);
    }
}

class GraphV2Schools {
    constructor(private graph: GraphV2) {}

    async *list(filter?: Filter): AsyncGenerator<EdlinkV2School> {
        return this.graph.paginate('/schools', n => n as EdlinkV2School, filter);
    }

    async fetch(school_id: string): Promise<EdlinkV2School> {
        return this.graph.fetch(`/schools/${school_id}`, n => n as EdlinkV2School);
    }
}

class GraphV2Classes {
    constructor(private graph: GraphV2) {}

    async *list(filter?: Filter): AsyncGenerator<EdlinkV2Class> {
        return this.graph.paginate('/classes', n => n as EdlinkV2Class, filter);
    }

    async fetch(class_id: string): Promise<EdlinkV2Class> {
        return this.graph.fetch(`/classes/${class_id}`, n => n as EdlinkV2Class);
    }

    async *listSections(class_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Section> {
        return this.graph.paginate(`/classes/${class_id}/sections`, n => n as EdlinkV2Section, filter);
    }

    async *listEnrollments(class_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Enrollment> {
        return this.graph.paginate(`/classes/${class_id}/enrollments`, n => n as EdlinkV2Enrollment, filter);
    }

    async *listPeople(class_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.graph.paginate(`/classes/${class_id}/people`, n => n as EdlinkV2Person, filter);
    }

    async *listTeachers(class_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.graph.paginate(`/classes/${class_id}/teachers`, n => n as EdlinkV2Person, filter);
    }

    async *listStudents(class_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.graph.paginate(`/classes/${class_id}/students`, n => n as EdlinkV2Person, filter);
    }
}

class GraphV2Sections {
    constructor(private graph: GraphV2) {}

    async *list(filter?: Filter): AsyncGenerator<EdlinkV2Section> {
        return this.graph.paginate('/sections', n => n as EdlinkV2Section, filter);
    }

    async fetch(section_id: string): Promise<EdlinkV2Section> {
        return this.graph.fetch(`/sections/${section_id}`, n => n as EdlinkV2Section);
    }

    async *listEnrollments(section_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Enrollment> {
        return this.graph.paginate(`/sections/${section_id}/enrollments`, n => n as EdlinkV2Enrollment, filter);
    }

    async *listPeople(section_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.graph.paginate(`/sections/${section_id}/people`, n => n as EdlinkV2Person, filter);
    }

    async *listTeachers(section_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.graph.paginate(`/sections/${section_id}/teachers`, n => n as EdlinkV2Person, filter);
    }

    async *listStudents(section_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.graph.paginate(`/sections/${section_id}/students`, n => n as EdlinkV2Person, filter);
    }
}

class GraphV2People {
    constructor(private graph: GraphV2) {}

    async *list(filter?: Filter): AsyncGenerator<EdlinkV2Person> {
        return this.graph.paginate('/people', n => n as EdlinkV2Person, filter);
    }

    async fetch(person_id: string): Promise<EdlinkV2Person> {
        return this.graph.fetch(`/people/${person_id}`, n => n as EdlinkV2Person);
    }

    async *listEnrollments(person_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Enrollment> {
        return this.graph.paginate(`/people/${person_id}/enrollments`, n => n as EdlinkV2Enrollment, filter);
    }

    async *listDistricts(person_id: string, filter?: Filter): AsyncGenerator<EdlinkV2District> {
        return this.graph.paginate(`/people/${person_id}/districts`, n => n as EdlinkV2District, filter);
    }

    async *listSchools(person_id: string, filter?: Filter): AsyncGenerator<EdlinkV2School> {
        return this.graph.paginate(`/people/${person_id}/schools`, n => n as EdlinkV2School, filter);
    }

    async *listClasses(person_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Class> {
        return this.graph.paginate(`/people/${person_id}/classes`, n => n as EdlinkV2Class, filter);
    }

    async *listSections(person_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Section> {
        return this.graph.paginate(`/people/${person_id}/sections`, n => n as EdlinkV2Section, filter);
    }

    async *listAgents(person_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Agent> {
        return this.graph.paginate(`/people/${person_id}/agents`, n => n as EdlinkV2Agent, filter);
    }
}

class GraphV2Enrollments {
    constructor(private graph: GraphV2) {}

    async *list(filter?: Filter): AsyncGenerator<EdlinkV2Enrollment> {
        return this.graph.paginate<EdlinkV2Enrollment>('/enrollments', n => n as EdlinkV2Enrollment, filter);
    }

    async fetch(enrollment_id: string): Promise<EdlinkV2Person> {
        return this.graph.fetch(`/enrollments/${enrollment_id}`, n => n as EdlinkV2Enrollment);
    }
}

class GraphV2Courses {
    constructor(private graph: GraphV2) {}

    async *list(filter?: Filter): AsyncGenerator<EdlinkV2Course> {
        return this.graph.paginate('/courses', n => n as EdlinkV2Course, filter);
    }

    async fetchCourse(course_id: string): Promise<EdlinkV2Course> {
        return this.graph.fetch(`/courses/${course_id}`, n => n as EdlinkV2Course);
    }

    async *listClasses(course_id: string, filter?: Filter): AsyncGenerator<EdlinkV2Class> {
        return this.graph.paginate(`/courses/${course_id}/classes`, n => n as EdlinkV2Class, filter);
    }
}

class GraphV2Sessions {
    constructor(private graph: GraphV2) {}

    async *list(filter?: Filter): AsyncGenerator<EdlinkV2Session> {
        return this.graph.paginate('/sessions', n => n as EdlinkV2Session, filter);
    }

    async fetch(session_id: string): Promise<EdlinkV2Session> {
        return this.graph.fetch(`/sessions/${session_id}`, n => n as EdlinkV2Session);
    }
}

class GraphV2Agents {
    constructor(private graph: GraphV2) {}

    async *list(filter?: Filter): AsyncGenerator<EdlinkV2Agent> {
        return this.graph.paginate('/agents', n => n as EdlinkV2Agent, filter);
    }

    async fetch(agent_id: string): Promise<EdlinkV2Agent> {
        return this.graph.fetch(`/agents/${agent_id}`, n => n as EdlinkV2Agent);
    }
}
