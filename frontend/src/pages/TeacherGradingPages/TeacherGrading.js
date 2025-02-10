import React, { useState } from "react";
import { Layout, Typography } from "antd";
import CourseList from "../../components/cource/CourseList";
import TeacherAssessmentList from "../../components/assessment/TeacherAssessmentList";
import StudentSubmissionList from "../../components/submissions/StudentSubmissionList";
import GradeAssessment from "../../components/assessment/GradeAssessment";

const { Content } = Layout;
const { Title } = Typography;

// Dummy Data
const courses = [
    { id: 1, name: "Mathematics" },
    { id: 2, name: "Science" },
];

const assessments = {
    1: [
        { id: 101, title: "Algebra Test" },
        { id: 102, title: "Geometry Assignment" },
    ],
    2: [
        { id: 201, title: "Physics Report" },
        { id: 202, title: "Chemistry Lab" },
    ],
};

const studentSubmissions = {
    101: [
        { id: 1, studentName: "Alice", fileName: "algebra.pdf" },
        { id: 2, studentName: "Bob", fileName: "algebra_bob.pdf" },
    ],
    102: [
        { id: 3, studentName: "Charlie", fileName: "geometry.pdf" },
    ],
    201: [
        { id: 4, studentName: "David", fileName: "physics.pdf" },
    ],
};

const TeacherGrading = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedAssessment, setSelectedAssessment] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);

    return (
        <Layout style={{ padding: "24px" }}>
            <Content>
                <Title level={2}>Teacher Grading</Title>

                {!selectedCourse ? (
                    <CourseList courses={courses} onSelectCourse={setSelectedCourse} />
                ) : !selectedAssessment ? (
                    <TeacherAssessmentList
                        assessments={assessments[selectedCourse.id] || []}
                        onSelectAssessment={setSelectedAssessment}
                    />
                ) : !selectedStudent ? (
                    <StudentSubmissionList
                        submissions={studentSubmissions[selectedAssessment.id] || []}
                        onSelectStudent={setSelectedStudent}
                    />
                ) : (
                    <GradeAssessment student={selectedStudent} />
                )}
            </Content>
        </Layout>
    );
};

export default TeacherGrading;