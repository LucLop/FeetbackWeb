//Librairies
import React, { PureComponent } from "react";
import { useState } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";
//qgl querry to get the measures for a patient id

const SENSOR_DATA = gql`
query($pacient: String! ) {
  getMeasures(patient: $pacient) {
    sensors {
      averagePressureS
      maxPressureS
      minPressureS
    }
  }
}
`;
//Function get the measures for one sensor with the sensor number that returns an array
function getSensorNData(data, sensorNumber) {
  var arr = [];
  if (data!==undefined && sensorNumber!==undefined){
    data.getMeasures.forEach(read => {
      arr.push({Pressure: read.sensors[sensorNumber].averagePressureS});
    });
  }
  return arr;
}
//Get every measures for every sensors
function getAllSensorNData(data, sensorNumber) {
  var arr = [];
  if (data!==undefined){
    
    var measure = 0

    for(measure = 0; measure < data.getMeasures.length; measure++){
      let read = data.getMeasures[measure];
      var sensor = {name: `Measure ${measure + 1}` }
      var current = 0

      if(sensorNumber == -1){

        for(current = 0; current < read.sensors.length; current++){
          var sensorName = `Sensor ${current + 1}` 
          sensor[sensorName] =  read.sensors[current].averagePressureS;
        }
      }
      else{
        var sensorName = `Sensor ${sensorNumber + 1}` 
        sensor[sensorName] =  read.sensors[sensorNumber].averagePressureS;
      }
      arr.push(sensor);
    }
  }
  return arr;
}

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}
//Put a unique key for each sensor display
function getUniqueKeys(data){
  let allKeys = []
  data.forEach(measure =>{
    Object.keys(measure).forEach(key =>{
      allKeys.push(key)
    })});

  var unique = allKeys.filter( onlyUnique );
  return unique
}
//Random color for display
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
//default function
export default function MainGraph(props) {
  //const [sensorNumber] = useState(0);
  //get the response for a query with the id of patient passed to the component to get its measures
  const { loading, error, data } = useQuery(SENSOR_DATA, {
    variables: {
      pacient: ""+`${props.pacient}`},
    });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur :(</p>;
    
    
  //const personne = this.props.WidgetData;
  console.log("Sensor number")
  console.log(props.sensorNumber)
  console.log("All")
  let allData = getAllSensorNData(data,props.sensorNumber)
  console.log(allData)
  let keys = getUniqueKeys(allData)

  return (
    //Display a graph with the 5 sensors measures on it
    
    <ResponsiveContainer aspect="2">


    <LineChart
    data={allData}
    margin={{
      top: 0,
      right: 3,
      left: -30,
      bottom: 0
    }}
    >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    {
      (props.sensorNumber !== -1) ?
      keys.length ? (
        
        keys.map(sensor => {
          if (sensor !="name")
          {
            return (
              <ReferenceLine y={allData[0][sensor]} label="Reference" stroke="#8884d8" strokeDasharray="5 5"  />
              )}})): (<></>) : ""
      
    } 
    {keys.length ? (
      
      keys.map(sensor => {
        if (sensor !="name")
        {
          console.log(allData[0][sensor])
          return (
          <Line
          type="monotone"
          dataKey={sensor}
          stroke={getRandomColor()}
          activeDot={{ r: 8 }}
          />
          )
        }
      }
      
      
      )
      ) : (
      <></>
      )}
      </LineChart>
      </ResponsiveContainer>
      );
    }
