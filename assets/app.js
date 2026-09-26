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
document.getElementById("submitQuiz").onclick=()=>{
 let score=0;
 questions.forEach((q,i)=>{const selected=document.querySelector(`input[name=q${i}]:checked`);const labels=document.querySelectorAll(`input[name=q${i}]`);labels.forEach((r,j)=>{r.parentElement.classList.remove("correct","wrong");if(j===q[5])r.parentElement.classList.add("correct")});if(selected){if(+selected.value===q[5])score++;else selected.parentElement.classList.add("wrong")}});
 document.getElementById("quizResult").innerHTML=`<div class="result">Score: ${score}/10 · ${score*10}%<br>${score>=8?"Excellent work!":"Review the lesson topics and try again."}</div>`;
 window.scrollTo({top:document.getElementById("quiz").offsetTop-70,behavior:"smooth"});
};
document.getElementById("resetQuiz").onclick=()=>location.reload();
document.getElementById("themeBtn").onclick=()=>document.body.classList.toggle("dark");
const links=document.querySelectorAll(".sidebar nav a");const sections=[...links].map(a=>document.querySelector(a.getAttribute("href"))).filter(Boolean);
window.addEventListener("scroll",()=>{let y=window.scrollY+100;let current=sections.find(s=>s.offsetTop<=y && s.offsetTop+s.offsetHeight>y);links.forEach(a=>a.classList.toggle("active",current&&a.getAttribute("href")==="#"+current.id))});
