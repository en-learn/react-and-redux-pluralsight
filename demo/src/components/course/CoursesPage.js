import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import { browserHistory } from 'react-router';

class CoursesPage extends React.Component {
  // === 1 : Constructor
  constructor(props, context) {
    super(props, context);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  // === 2 : Child functions
  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  // === 3 : render functions (ideally, markup should be kept separately in a child component)
  render() {
    // Destructuring reduces typing! No need for this.props...
    const {courses} = this.props;

    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
               value="Add course"
               className="btn btn-primary"
               onClick={this.redirectToAddCoursePage} />
        <CourseList courses={courses} />
      </div>
    );
  }
}

// === 4 : Proptype validation
CoursesPage.propTypes = {
  // dispatch: PropTypes.func.isRequired, // No longer needed once we've defined mapDispatchToProps
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// === 5 : Redux - connect and related functions
// There's nothing magical about these function names : they can be called anything
function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: course => dispatch(courseActions.createCourse(course)) // No longer needed when using helper:
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

// export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
// This "double function call" is equivalent to:
// const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateAndProps(CoursesPage);