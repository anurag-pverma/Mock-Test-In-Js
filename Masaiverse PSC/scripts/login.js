let data;

function getInput(id) {
  let value = document.getElementById(id).value;
  return value;
}

function loginUser(email, password) {
  this.email = email;
  this.password = password;
}

async function Login() {
  try {
    const email = getInput("email");
    const password = getInput("password");

    data = new loginUser(email, password);

    console.log(data);
  } catch (error) {
    console.log(error);
  }

  const loginUrl = "https://reqres.in/api/login";

  let res = await fetch(loginUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let dataLogin = await res.json();
  console.log(dataLogin);
  window.location.href = "./data.html";
}
