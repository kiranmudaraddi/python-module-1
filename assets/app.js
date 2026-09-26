const GOOGLE_SCRIPT_URL = "";

function showStudentForm() {
  const quizSection = document.getElementById("quiz");
  const old = document.getElementById("studentForm");
  if (old) return;
  const form = document.createElement("div");
  form.id = "studentForm";
  form.className = "student-form";
  form.innerHTML = `
    <h3>Student Details</h3>
    <p>Enter your details before starting the quiz. Use your official USN.</p>
    <div class="form-grid">
      <label>Name<input id="studentName" type="text" placeholder="Your full name"></label>
      <label>USN<input id="studentUSN" type="text" placeholder="e.g. 1BI26CS001"></label>
      <label>Section<input id="studentSection" type="text" placeholder="e.g. K"></label>
    </div>
    <button class="btn primary" id="startQuizBtn">Start Quiz</button>
    <div id="formMessage"></div>`;
  quizSection.insertBefore(form, document.getElementById("quizBox"));
  document.getElementById("quizBox").style.display="none";
  document.getElementById("submitQuiz").style.display="none";
  document.getElementById("resetQuiz").style.display="none";
  document.getElementById("startQuizBtn").onclick=()=>{
    const name=document.getElementById("studentName").value.trim();
    const usn=document.getElementById("studentUSN").value.trim();
    const section=document.getElementById("studentSection").value.trim();
    if(!name || !usn || !section){
      document.getElementById("formMessage").innerHTML='<div class="warning">Please enter Name, USN and Section.</div>';
      return;
    }
    sessionStorage.setItem("studentName",name);
    sessionStorage.setItem("studentUSN",usn);
    sessionStorage.setItem("studentSection",section);
    form.style.display="none";
    document.getElementById("quizBox").style.display="block";
    document.getElementById("submitQuiz").style.display="inline-block";
    document.getElementById("resetQuiz").style.display="inline-block";
  };
}

showStudentForm();

const questions=[
["Which language is used in this module?","Java","Python","HTML","SQL",1],
["Which error occurs when Python grammar rules are violated?","Runtime error","Semantic error","Syntax error","Logic warning",2],
["Which function reads input from the user?","read()","scan()","input()","get()",2],
["What is the result of 17 % 5?","2","3","4","5",0],
["Which loop is commonly used to iterate over a sequence?","for","switch","case","goto",0],
["Which statement exits a loop early?","skip","break","exitloop","stop",1],
["Which statement skips the current iteration?","pass","continue","next","skip",1],
["Which keyword defines a function?","function","define","def","fun",2],
["What does return do in a function?","Repeats the function","Sends a result back","Prints automatically","Stops Python",1],
["A program runs but gives the wrong result. This is a...","Syntax error","Runtime error","Semantic error","Installation error",2]
];
const box=document.getElementById("quizBox");
questions.forEach((q,i)=>{let d=document.createElement("div");d.className="quiz-q";d.innerHTML=`<b>Q${i+1}. ${q[0]}</b>`+q.slice(1,5).map((x,j)=>`<label><input type="radio" name="q${i}" value="${j}"> ${x}</label>`).join("");box.appendChild(d)});
document.getElementById("submitQuiz").onclick=async()=>{
  let score=0;
  questions.forEach((q,i)=>{
    const selected=document.querySelector(`input[name=q${i}]:checked`);
    const labels=document.querySelectorAll(`input[name=q${i}]`);
    labels.forEach((r,j)=>{
      r.parentElement.classList.remove("correct","wrong");
      if(j===q[5]) r.parentElement.classList.add("correct");
    });
    if(selected){
      if(+selected.value===q[5]) score++;
      else selected.parentElement.classList.add("wrong");
    }
  });

  const name=sessionStorage.getItem("studentName")||"";
  const usn=sessionStorage.getItem("studentUSN")||"";
  const section=sessionStorage.getItem("studentSection")||"";
  const percentage=score*10;

  document.getElementById("quizResult").innerHTML=
    `<div class="result">Score: ${score}/10 · ${percentage}%<br>
    ${score>=8?"Excellent work!":"Review the lesson topics and try again."}
    <div id="saveStatus">Saving your result...</div></div>`;

  const payload={
    name:name,
    usn:usn,
    section:section,
    assessment:"Module 1 Quiz",
    score:score,
    total:10,
    percentage:percentage
  };

  if(!GOOGLE_SCRIPT_URL){
    document.getElementById("saveStatus").innerHTML=
      "Quiz completed. Faculty result connection is not configured yet.";
    return;
  }

  try{
    await fetch(GOOGLE_SCRIPT_URL,{
      method:"POST",
      mode:"no-cors",
      headers:{"Content-Type":"text/plain;charset=utf-8"},
      body:JSON.stringify(payload)
    });
    document.getElementById("saveStatus").innerHTML=
      "✓ Result submitted successfully.";
  }catch(error){
    document.getElementById("saveStatus").innerHTML=
      "Result could not be submitted. Please inform your faculty.";
  }
};
document.getElementById("resetQuiz").onclick=()=>location.reload();
document.getElementById("themeBtn").onclick=()=>document.body.classList.toggle("dark");
const links=document.querySelectorAll(".sidebar nav a");const sections=[...links].map(a=>document.querySelector(a.getAttribute("href"))).filter(Boolean);window.addEventListener("scroll",()=>{let y=window.scrollY+100;let current=sections.find(s=>s.offsetTop<=y&&s.offsetTop+s.offsetHeight>y);links.forEach(a=>a.classList.toggle("active",current&&a.getAttribute("href")==="#"+current.id))});