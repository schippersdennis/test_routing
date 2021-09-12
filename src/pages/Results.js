import React, { useState, useEffect} from "react";
import StudentFilter from "../components/StudentFilter/StudentFilter";
import ResultFilter from "../components/ResultFilter/ResultFilter";
import ResultChart from "../components/ResultChart/ResultChart";
import resultFilterOptions from "../constants/resultFilterOptions";
import studentData from "../Data";
import { useHistory, useParams } from 'react-router-dom';

function Results() {
    let history = useHistory();
	let {student} = useParams();     
	const [activeStudent, setActiveStudent] = useState("All students");
	const [activeResultFilter, setActiveResultFilter] = useState(
		resultFilterOptions.DIFFICULTY_ENJOYMENT
	);          

	useEffect(()=>{
		if(typeof student !== 'undefined' ){
		setActiveStudent(student)
		}
	},[student])

	const handleChange = (value)=> {
    history.push(`/results/${value}`);
    }  

	const studentsWithoutDubs = new Set(
		studentData.map(({ studentName }) => studentName)
	);
	const students = Array.from(studentsWithoutDubs);  
    
	return (
		<div className="results">
			<h1>Results</h1>
			<p>Choose which results you would like to see!</p>
			<StudentFilter
				students={students}
				activeStudent={activeStudent}
				setActiveStudent={setActiveStudent}
                 handleChange={ handleChange}
			/>
			<ResultFilter
				activeResultFilter={activeResultFilter}
				setActiveResultFilter={setActiveResultFilter}
			/>
			<ResultChart
				activeStudent={activeStudent}
				activeResultFilter={activeResultFilter}
				data={studentData}
			/>
		</div>
	);
}

export default Results;
