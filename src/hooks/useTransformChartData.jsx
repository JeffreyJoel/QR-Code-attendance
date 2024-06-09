 export function transformClassesData(classes) {
    const transformedData = [];
  
    const classesArray = Array.isArray(classes) ? classes : [];
    classesArray.forEach((classObj, index) => {
      const totalStudents = classObj.students.length;
      let attendedCount = 0;
  
      classObj.students.forEach(student => {
        if (student.attended) {
          attendedCount++;
        }
      });
  
      const attendancePercentage = (attendedCount / totalStudents) * 100;
  
      transformedData.push({
        week: `week ${index+1}`, // Use the formatted timestamp as the name
        attendance: attendancePercentage.toFixed(2), // Store the attendance percentage
      });
    });
  
    return transformedData;
  }
  