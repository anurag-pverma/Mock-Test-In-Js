function getInput(id) {
  let value1 = document.getElementById(id).value;

  return value1;
}

function RegisterUser(n, a, p, u, pass, b, P) {
  this.name = n;
  this.age = a;
  this.place = p;
  this.username = u;
  this.password = pass;
  this.batch = b;
  this.profession = P;
}

async function Register() {
  const name = getInput("name");
  const age = getInput("age");
  const place = getInput("place");
  const username = getInput("username");
  const password = getInput("password");
  const batch = getInput("batch");
  const profession = getInput("profession");

  let data = new RegisterUser(
    name,
    age,
    place,
    username,
    password,
    batch,
    profession
  );

  console.log(data);

  const registerUrl = "http://localhost:3000/users";
  let res = await fetch(registerUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let dataRegister = await res.json();
  console.log(dataRegister);
  alert("successfully registered");
}
