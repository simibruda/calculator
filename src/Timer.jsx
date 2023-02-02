import { React, useState, useEffect } from "react";
import "./Timer.css";
function Timer() {
  const [functionmat, setFunctionmat] = useState("");
  const [operators, setOperstors] = useState([]);
  const [numbers, setNumbers] = useState([]);

  const [push, setPush] = useState(0);
 
  useEffect(() => {
    setNumbers(functionmat.match(/(?:\d*\.)?\d+/g));
    setOperstors(functionmat.match(/[\*\+\-\/\%]/g));
    if (operators && operators.length >= 1 && numbers && numbers.length >= 2) {
      let firstgrade = numbers.map((str) => parseFloat(Number(str)));
     
      let newOperators = [...operators];

      newOperators.forEach((element, index) => {
        let newRezultat = 0;
        if (newOperators[index] == "*") {
          newRezultat += firstgrade[index] * firstgrade[index + 1];
          firstgrade[index + 1] = newRezultat;
          firstgrade[index] = newRezultat;
        }
        if (newOperators[index] == "/") {
          newRezultat += firstgrade[index] / firstgrade[index + 1];
          firstgrade[index + 1] = newRezultat;
          firstgrade[index] = newRezultat;
        }
        if (newOperators[index] == "%") {
          newRezultat += firstgrade[index] % firstgrade[index + 1];
          firstgrade[index + 1] = newRezultat;
        }
      });
    

      let operatorsfirstgrade = ["*", "/", "%"];
      for (let i = newOperators.length - 1; i >= 0; i--) {
        if (operatorsfirstgrade.includes(newOperators[i])) {
          newOperators.splice(i, 1);
          firstgrade.splice(i, 1);
        }
      }
      if (
        firstgrade.length >= 2 &&
        (newOperators.includes("+") || newOperators.includes("-"))
      ) {
        let secondgrade = [...firstgrade];
        newOperators.forEach((element, index) => {
          let newRezultat = 0;
          if (newOperators[index] == "+") {
            newRezultat += secondgrade[index] + secondgrade[index + 1];
            secondgrade[index + 1] = newRezultat;
            secondgrade[index] = newRezultat;
          }
          if (newOperators[index] == "-") {
            newRezultat += secondgrade[index] - secondgrade[index + 1];
            secondgrade[index + 1] = newRezultat;
            secondgrade[index] = newRezultat;
          }
        });
        let operatorssecondgrade = ["+", "-"];
        for (let i = newOperators.length - 1; i >= 0; i--) {
          if (operatorssecondgrade.includes(newOperators[i])) {
            newOperators.splice(i, 1);
            secondgrade.splice(i, 1);
          }
        }
        if(push===1){
          let rez=JSON.stringify(secondgrade[0]);
          setFunctionmat(rez);
          setPush(0);
        }
        
      } else {
        if(push===1){
          let rez=JSON.stringify(firstgrade[0]) ;
          setFunctionmat(rez);
          setPush(0);
        }
        
      }
    }
  }, [functionmat, push]);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="container-writing">
          <h1> {functionmat}</h1>
        </div>
      </div>
      <div className="container">
        <button onClick={() => setFunctionmat(functionmat + "1")}>1</button>
        <button onClick={() => setFunctionmat(functionmat + "2")}>2</button>
        <button onClick={() => setFunctionmat(functionmat + "3")}>3</button>
        <button onClick={() => setFunctionmat(functionmat + "4")}>4</button>
        <button onClick={() => setFunctionmat(functionmat + "5")}>5</button>
        <button onClick={() => setFunctionmat(functionmat + "6")}>6</button>
        <button onClick={() => setFunctionmat(functionmat + "7")}>7</button>
        <button onClick={() => setFunctionmat(functionmat + "8")}>8</button>
        <button onClick={() => setFunctionmat(functionmat + "9")}>9</button>
        <button onClick={() => setFunctionmat(functionmat + "0")}>0</button>
        <button
          onClick={() => {
            if (
              /[0-9]/.test(functionmat.charAt(functionmat.length - 1)) &&
              functionmat != ""
            ) {
              setFunctionmat(functionmat + "+");
            }
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            if (
              /[0-9]/.test(functionmat.charAt(functionmat.length - 1)) &&
              functionmat != ""
            ) {
              setFunctionmat(functionmat + "-");
            }
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            if (
              /[0-9]/.test(functionmat.charAt(functionmat.length - 1)) &&
              functionmat != ""
            ) {
              setFunctionmat(functionmat + "/");
            }
          }}
        >
          /
        </button>
        <button
          onClick={() => {
            if (
              /[0-9]/.test(functionmat.charAt(functionmat.length - 1)) &&
              functionmat != ""
            ) {
              setFunctionmat(functionmat + "*");
            }
          }}
        >
          *
        </button>
        <button
          onClick={() => {
            if (
              /[0-9]/.test(functionmat.charAt(functionmat.length - 1)) &&
              functionmat != ""
            ) {
              setFunctionmat(functionmat + "%");
            }
          }}
        >
          %
        </button>
        <button
          onClick={() => {
            if (
              /[0-9]/.test(functionmat.charAt(functionmat.length - 1)) &&
              functionmat != ""
            ) {
              setFunctionmat(functionmat + ".");
            }
          }}
        >
          .
        </button>
        <button onClick={() => setFunctionmat("")}>C</button>
        <button
          onClick={() => {
           setPush(push+1);
          }}
        >
          Calculare
        </button>
      </div>
     
    </div>
  );
}

export default Timer;
