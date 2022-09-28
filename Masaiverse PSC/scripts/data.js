let data;

async function userData() {
  try {
    let res = await fetch(`http://localhost:3000/users`);
    data = await res.json();
    console.log(data);
    objData(data);
  } catch (error) {
    console.log(error);
  }
}

userData();

function objData(userData) {
  let dataDiv = document.getElementById("dataDiv");
  dataDiv.innerHTML = null;

  userData.map((e) => {
    let div = document.createElement("div");

    let img = document.createElement("img");
    img.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQGrtXz5QodQsSPYoHeBTPaIdNmYJ2ZkGDxQ&usqp=CAU";

    let name = document.createElement("h4");
    name.textContent = `Name: ${e.name}`;

    let age = document.createElement("h4");
    age.textContent = `Age: ${e.age}`;

    let place = document.createElement("h4");
    place.textContent = `Place: ${e.place}`;

    let batchName = document.createElement("h4");
    batchName.textContent = `Batch Name: ${e.batch}`;

    let profession = document.createElement("h4");
    profession.textContent = `Profession: ${e.profession}`;

    let buttonDelete = document.createElement("button");
    buttonDelete.textContent = "Delete";
    buttonDelete.addEventListener("click", function () {
      deleteEdit(e);
    });

    let buttonEdit = document.createElement("button");
    buttonEdit.textContent = "Edit";
    buttonEdit.addEventListener("click", function () {
      edit(e.id);
    });

    div.append(
      img,
      name,
      age,
      place,
      batchName,
      profession,
      buttonDelete,
      buttonEdit
    );

    dataDiv.append(div);
  });
}

async function deleteEdit(e) {
  try {
    let res = await fetch(`http://localhost:3000/users/${e.id}`, {
      method: "DELETE",
    });

    let deleteData = await res.json();
    console.log(deleteData);
  } catch (error) {
    console.log(error);
  }
}

function ageSort() {
  document.getElementById("dataDiv").innerHTML = null;
  var age = document.querySelector("#sort").value;
  console.log(age);
  if (age == "low") {
    data.sort(function (a, b) {
      return +a.age - +b.age;
    });
  }

  if (age == "high") {
    data.sort(function (a, b) {
      return +b.age - +a.age;
    });
  }
  objData(data);
}

function search() {
  document.getElementById("dataDiv").innerHTML = null;
  let text = document.getElementById("search").value;
  objData(data.filter((e) => e.name == text));
}

function filterbtc() {
  document.getElementById("dataDiv").innerHTML = null;
  let selected = document.getElementById("filterbtc").value;
  //    console.log(selected);
  objData(data.filter((e) => e.batch_name == selected));
}

let modal = document.getElementById("modal");
let submit = document.getElementById("submit");

document.getElementById("close").addEventListener("click", () => {
  modal.style.display = "none";
});

async function edit(id) {
  modal.style.display = "block";

  submit.addEventListener("click", () => {
    modalEdit(id);
  });
}

async function modalEdit(id) {
  let select = document.getElementById("profession");
  let selected = select.value;
  console.log(selected);

  let params = {
    profession: selected,
  };

  let edit = await fetch(`http://localhost:3000/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(params),
    headers: {
      "Content-type": "application/json",
    },
  });

  let data = await edit.json();

  modal.style.display = "none";
  selected = select.value = "";
  userData();
}
