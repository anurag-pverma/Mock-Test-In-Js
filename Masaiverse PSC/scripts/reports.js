async function userData() {
  try {
    let res = await fetch(`http://localhost:3000/users`);
    let data = await res.json();
    // console.log(data);
    showData(data);
  } catch (error) {
    console.log(error);
  }
}

userData();

function showData(data) {
  let studentCount = 0;
  let professionalCount = 0;

  data.map((e) => {
    if (e.profession == "student") {
      studentCount++;
    } else {
      professionalCount++;
    }
  });
  //   console.log(professionalCount);

  let table = document.createElement("table");
  let th1 = document.createElement("th");
  let th2 = document.createElement("th");
  let tr = document.createElement("tr");
  let tr1 = document.createElement("tr");
  let tr2 = document.createElement("tr");
  let tr3 = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  let td5 = document.createElement("td");
  let td6 = document.createElement("td");

  th1.textContent = "Type";
  th2.textContent = "Count";

  td1.textContent = "Guests";
  td2.textContent = data.length;

  td3.textContent = "students";

  td4.textContent = studentCount;

  td5.textContent = "Professional";

  td6.textContent = professionalCount;

  tr1.append(td1, td2);

  tr2.append(td3, td4);

  tr3.append(td5, td6);

  tr.append(th1, th2);

  table.append(tr, tr1, tr2, tr3);

  document.getElementById("table").append(table);
}
