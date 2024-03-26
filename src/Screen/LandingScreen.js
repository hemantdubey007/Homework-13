
import React, { useReducer } from "react";
import "./LandingScreen.css";
import employees from "../data.js";
import EmployeeCard from "../Components/EmployeeCard.js";

function reducer(state, action) {
  switch (action.type) {

    case "add": {
      const employeeListdata = [...state.employeeList];
      employeeListdata[action.payLoad - 1].isAdded =
        !employeeListdata[action.payLoad - 1].isAdded;

      const teamListData = [
        ...state.teamList,
        employeeListdata[action.payLoad - 1],
      ];

      return {
        ...state,
        employeeList: employeeListdata,
        teamList: teamListData,
      };
    }

    case "remove": {
      const employeeListdata = [...state.employeeList];
      employeeListdata[action.payLoad - 1].isAdded =
        !employeeListdata[action.payLoad - 1].isAdded;

      const teamListData = state.teamList.filter((elem) => {
        if (elem.id === action.payLoad) {
          return false;
        }
        return true;
      });
      return {
        ...state,
        employeeList: employeeListdata,
        teamList: teamListData,
      };
    }

    case 'sort':{
        const teamListData = [...state.teamList];
        teamListData.sort((curr,next)=>{
            return curr.age - next.age
        })

        return{
            ...state,
            teamList : teamListData
        }
    }

    default:
      return { ...state };
  }
}

const LandingScreen = () => {
  const [state, dispatch] = useReducer(reducer, {
    employeeList: employees,
    teamList: [],
  });

  function addEmployee(id) {
    // console.log(id);
    dispatch({ type: "add", payLoad: id });
  }

  function removeEmployee(id) {
    dispatch({ type: "remove", payLoad: id });
  }

  function averageAge(){
    if(state.teamList.length === 0){
        return 0
    }
    const totalAge = state.teamList.reduce((acc,current)=>{
        return acc + current.age
    },0);

    const averageAge = totalAge / state.teamList.length;

    return averageAge.toFixed(2)
  }

  function sortHandler(){
    dispatch({type: "sort"})
  }

  return (
    <div id="container">
      <div>
        <h2>Employees</h2>
        {state.employeeList.map((elem) => {
          return (
            <EmployeeCard
              key={elem.id}
              id={elem.id}
              name={elem.first_name}
              age={elem.age}
              isAdded={elem.isAdded}
              btnType="Add"
              btnAction={addEmployee}
            />
          );
        })}
      </div>
      <div id="team-details-card">
        <div id="team-list-container">
            <h2>Team</h2>
            <button id="sorting-btn" onClick={sortHandler}>Sort by age</button>
            {state.teamList.map((elem) => {
            return (
                <EmployeeCard
                key={elem.id}
                id={elem.id}
                name={elem.first_name}
                age={elem.age}
                btnType="remove"
                btnAction={removeEmployee}
                />
            );
            })}
        </div>
        <div id="average-age-card">
            <p>Average Age : </p>
            <p>{averageAge()} </p>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
