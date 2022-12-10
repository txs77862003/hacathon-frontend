



import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Form from './form'
import React from "react";

 



/*type item ={
  users:{

    id:string,
    name:string,
    age:number
  }[]
}
*/

function App() {
  const [name, setName] = useState("");
 // const [email, setEmail] = useState("");
  const [age, setAge] = useState<number>(0); //ここをletにした
  const [users, setUsers] = useState([]);//これを加えた

  /* 全然意味がなさそう
  interface users {
    id : string
    name: string
    age : number
  }
*/

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>,name:string,age:number) => {
    e.preventDefault();


    console.log("onSubmit: ", name, " ", age);


    if (!name) {
      alert("Please enter name");
      return;
    }

    if (name.length > 50) {
      alert("Please enter a name shorter than 50 characters");
      return;
    }
    
    if (age < 20 || age > 80) {
      alert("Please enter age between 20 and 80");
      return;
    }

   
   
    

    try {
      const result = await fetch("http://localhost:8000/user", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          age: age,
        }),

      });
    
      /*const response = await fetch(
        "http://localhost:8000/user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    */

      /*useEffect(() => {
        // 処理
        fetchUsers()
      }, [value]);
      */

      if (!result.ok) {
        throw Error(`Failed to create user: ${result.status}`);
      }

     


      fetchUsers();
      setName("");
      setAge(0);

      //todo Goのサーバーからすべてのuserをgetしuser一覧を更新する
      //fetchUsers();
    } catch (err) {
       console.error(err);
    }//こちらはpostリクエストをする

    try {
     
      const response = await fetch(
        "http://localhost:8000/user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    

      /*useEffect(() => {
        // 処理
        fetchUsers()
      }, [value]);
      */

      if (!response.ok) {
        throw Error(`Failed to create user: ${response.status}`);
      }

     


      fetchUsers();
      setName("");
      setAge(0);

      //todo Goのサーバーからすべてのuserをgetしuser一覧を更新する
      //fetchUsers();
    } catch (err) {
       console.error(err);
    }//こちらはpostリクエストした後の更新



    
   
}; //onsubmit

//users を取得
const fetchUsers = async () => {
  try {
    const res = await fetch("http://localhost:8000/user");
    if (!res.ok) {
      throw Error(`Failed to fetch users: ${res.status}`);
    }
    console.log (res)

    const users = await res.json();
    setUsers(users);
    console.log(users)
  } catch (err) {
    console.error(err);
  }
};


useEffect(() => {
  //todo これは起動時になるように揃える
  fetchUsers()
}, [])

useEffect(() => {
  //todo これは起動時になるように揃える
  console.log("Render毎に実行")
})



/*const response = await fetch(
  "http://localhost:8000/user",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
);
*/


  




  
  return (
    <div className="App">
      <header className="App-header">
        <div className= "header-slogan"></div>
        <h1>User Register</h1>
    
      </header>
        <Form onSubmit={onSubmit}/>
       
      <div>
      <h2>ユーザ一覧</h2>
        {users.map((item: {
           name: string | undefined; 
           age : number | undefined;

        }) =>(
          <li>
            <a>{item.name},</a>
            <a>{item.age}</a>
          </li>  //todo　これをどうにかする　　　データ取得用の手軽な React フックが欲しいだけであれば、 npm install use-data-api してドキュメントに従ってください。導入するのであればスターを付けるのも忘れずに^^


        ))}
      <div></div> //todo どうにかしてusers.〇〇にすることで、エラーを解消したい。
      </div>

      
    </div>
  );
}

export default App;



