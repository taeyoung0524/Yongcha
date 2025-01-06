import { useState } from 'react';

function App(){
  //1. 추가하기
  //2. 삭제하기 
  //3. 수정하기 (핵심)

  const [todos, setTodos] = useState([
    {id:1, task:'투두 만들어보기'},
    {id:2, task:"희연 혜원 혜윤 건 찬민"}
  ]);
  //console.log(todos);  todos 리스트 확인해보기 -> 초깃값

  const [text,setText]=useState('');
  // 사용자가 입력한 할 일을 저장하는 상태 =text 
  // text 값을 변경하는 함수로, 입력 필드에 새로운 할 일을 입력할 때 호출됨 = setText

  const [editingId, setIsEditingId] = useState('');
  // 현재 수정적인 할 일의 ID를 저장하는 상태 = editingId
  // 할 일을 수정할 때, 어떤 할 일을 수정하는지 ID를 저장하는 함수 = setIsEditingId

  const [editText, setEditText] = useState('');
  // 수정 중인 할 일의 텍스트를 저장 = editText
  // 수정 중인 할 일의 텍스트를 변경하는 함수 = setEditText

  //렌더링 방지 함수 생성 : 폼 자동 제출 방지 
  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  //1.새로운 할 일 추가하기 -> map 사용하기 -> 새로운 배열 반환해줌
  const addTodo = () =>{
    setTodos((prev)=> [
      ...prev,
      {id:Math.floor(Math.random()*100)+2,task:text},
    ]);
    setText(''); // 할 일을 추가한 후 입력 필드 비워준다.
    // 음 공백으로 만들어주기..!, Math.floor()는 소수점을 버리고 정수로 변환 
    // +2는 id가 0이 되는 것을 방지 
  };

  //2. 삭제하기 -> filter 사용하기 -> 새로운 배열 반환하는 친구
  // 내가 클릭한 것만 삭제해야함 -> 해당하는 id 가져오기
  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((item)=>item.id !==id));
    // item의 형태 -> {id:1, task: '투두 만들어보기'}
    // id = 삭제 클릭한 것의 id
  };

  //3. 수정하기 -> 내가 클릭한 친구가 id가 같은지 우선 확인해야한다.
  const updateTodo=(id,text) =>{
    setTodos((prev)=>
      prev.map((item)=>item.id===id ? {...item,task:test}:item)
    );
    setIsEditingId(''); // 수정 상태 초기화하기 
  };

  return(
    <>
      <form onSubmit={(handleSubmit)}>
        <input type="text" value={text} onChange={(e)=>setText(e.target.value)}/>
        <button onClick={()=>addTodo()} type="submit">할 일 등록</button>
      </form>
      <div>
        {todos.map((todo, _) => (// 구조분해할당
          <div style={{display:'flex', gap:'20px'}}>
            {editingId!==todo.id&& (
              <div key={todo.id} style={{display:'flex', gap:'5px'}}>
                <p>{todo.id}.</p>
                <p>{todo.task}</p>
              </div>
              )}
            {editingId === todo.id&& (
              <div key={todo.id} style={{display:'flex', gap:'5px'}}>
                <p>{todo.id}.</p>
                <input defaultValue={todo.task} onChange={(e)=>setEditText(e.target.value)}/>
                </div>
            )}
            <button onClick={()=>deleteTodo(todo.id)}>삭제하기</button>
            {editingId === todo.id ? (
              <button onClick={()=>updateTodo(editingId,editText)}>수정 완료</button>
            ) : (
              <button onClick={()=>setIsEditingId(todo.id)}>수정 진행</button>)}
          </div>
          // editingId !== todo.id -> 수정이 아닌 상태
          // editingId === todo.id -> 수정중인 상태 
          ))}  
      </div>
    </>
  );
}

export default App;
