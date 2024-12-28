"use client";

import EmptyData from "@/components/shared/empty-data";
import ViewCard from "@/components/shared/view-card";
export default function WaitingInterviewsDataTable({ waitingInterviews }) {
  console.log("waitingInterviews", waitingInterviews);
  
  const WaitingInterviewStudents = waitingInterviews?.results?.map(
    (student) => {
      console.log("student", student);
      return {
        id: student.id,
        full_name: student?.student?.full_name,
        student_id: student.student.user_id,
        image: student.student.user_image,
        email: student.student.email,
        phone: student.student.phone,
       type:'waiting-interview'
      };
    }
  );

  return (
    <div>
      {WaitingInterviewStudents?.length > 0
        ? WaitingInterviewStudents.map((student, index) => (
            <ViewCard key={index} student={student}/>
          ))
        : 
 <EmptyData />
         }
    </div>
  );
}
