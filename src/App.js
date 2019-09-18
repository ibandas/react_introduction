import React, { useState, useEffect } from 'react';
import 'rbx/index.css';
import { Button, Container, Title } from 'rbx';


const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};

const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
  course.id.slice(1, 4)
)
  
const Course = ({ course }) => (
  <Button>
    { getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }
  </Button>
);

// const CourseList = ({ courses }) => (
//   <Button.Group>
//     {courses.map(course => <Course key={course.id} course={ course } />)}
//   </Button.Group>
// );
const TermSelector = ({ state }) => (
  <Button.Group hasAddons>
  { Object.values(terms)
      .map(value => 
        <Button key={value}
          color={ buttonColor(value === state.term) }
          onClick={ () => state.setTerm(value) }
          >
          { value }
        </Button>
      )
  }
  </Button.Group>
);

const buttonColor = selected => (
  selected ? 'success' : null
);

const CourseList = ({ courses }) => {
  const [term, setTerm] = React.useState('Fall');
  const termCourses = courses.filter(course => term === getCourseTerm(course));
  
  return (
    <React.Fragment>
      <TermSelector state={ { term, setTerm } } />
      <div className="buttons">
        { termCourses.map(course =>
           <Course key={ course.id } course={ course }  />) }
      </div>
    </React.Fragment>
  );
};

const Banner = ({ title }) => (
  <Title>{ title || '[loading...]' }</Title>
);

const App = () => {
  const [schedule, setSchedule] = useState({ title: '', courses: [] });
  const url = '/data/cs-courses.json';

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(json);
    }
    fetchSchedule();
  }, [])

  return (
    <Container>
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </Container>
  );
};

export default App;