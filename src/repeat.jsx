import './repeat.css'
import List from './components/List';
import {useState} from 'react';

function App(){
    const [person,setPerson]=useState({
        name:'서태영',
        age:26,
        nickname:"탱"
    });
    
    // city 값을 새로 추가하여 업데이트하는 함수
    const updateCity=() =>{
        setPerson(prevPerson => ({
            ...prevPerson, // 이전 person 객체의 복사본 생성 
            city:"서울" // 새로 city 값을 추가하거나 업데이트 
        }));
     };

     // age 값을 1씩 증가시키는 함수 
     const increaseAge = () => {
        setPerson(prevPerson => ({
            ...prevPerson,
            age: prevPerson.age+1
        }));
     };

    return(
        <>
            <h1>이름 : {person.name}</h1>
            <h2>나이 : {person.age}</h2>
            <h3>닉네임 : {person.nickname}</h3>
            {person.city&& <h4>도시 : {person.city}</h4>}
            <button onClick={updateCity}>도시 추가</button>
            <button onClick={increaseAge}>나이 증가</button>
        </>
    )
}

export default App