"use strict";

//

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");

let petArr = JSON.parse(getFromStorage("pets")) ?? [];
let breedArr = JSON.parse(getFromStorage("breeds")) ?? [];

if (petArr) {
  renderTableData(petArr);
}

// hiển thị thông  tin khi người dùng nhập
function renderTableData(petArr) {
  tableBodyEl.innerHTML = ""; //xóa tất cả bảng
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr"); //thêm bảng
    row.innerHTML = `
    <th>${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight}</td>
    <td>${petArr[i].length}</td>
    <td>${petArr[i].breed}</td>
    <td>
    <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
  </td>
 
  <td><i class="bi ${
    petArr[i].vaccinated === true ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td><i class="bi  ${
    petArr[i].dewormed === true ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td><i class="bi ${
    petArr[i].sterilized === true ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }" ></i></td>
  <td>${petArr[i].bmi ? petArr[i].bmi : "?"}</td>
<td>${petArr[i].date}</td>
<td>
<button class="btn btn-danger" onclick="deletePet('${
      petArr[i].id
    }')">Delete</button>
</td>
    `;
    tableBodyEl.appendChild(row); //đưa bảng vào html
  }
}

//hiển thị breed trong danh sach quan li thu cung

function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  const filterBreed = breedArr.filter(
    (breed) => breed.type === typeInput.value
  );
  for (const breed of filterBreed) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${breed.breed}</option>`;
    breedInput.appendChild(option);
  }
}

// submit

submitBtn.addEventListener("click", function () {
  // ngày tháng hiện tại
  let date1 = new Date();
  let date2 =
    date1.getDate() + "/" + (date1.getMonth() + 1) + "/" + date1.getFullYear();
  // lấy dữ liệu người dùng
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: date2,
  };

  // validate data
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unque");
      return false;
    }
  }
  if (!data.id || !data.age || !data.weight || !data.length) {
    alert("Please data fill");
  } else if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15");
  } else if (data.weight < 1 || data.weight > 15) {
    alert("weight must be between 1 and 15");
  } else if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100");
  } else if (data.breed === "Select Breed") {
    alert("Please select Breed");
  } else if (data.type === "Select Type") {
    alert("Please select Type");
  } else {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
    saveToStorage("pets", JSON.stringify(petArr));
  }

  //7 xóa dữ liệu người dùng nhập khi ấn nút submit
  function clearInput() {
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    weightInput.value = "";
    lengthInput.value = "";
    colorInput.value = "#000000";
    typeInput.value = "Select Type";
    breedInput.value = "Select Breed";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
  }
});

// xác nhận khi xóa thú cưng
const deletePet = (petId) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    const index = petArr.findIndex((pet) => pet.id === petId);
    if (index !== -1) {
      petArr.splice(index, 1);
    }
  }
  renderTableData(petArr);
  saveToStorage("pets", JSON.stringify(petArr));
};
//

// hiển thị thú cưng khỏe mạnh
let healthyPetArr = []; //lưu trữ thúc cưng khỏe mạnh
let healthyCheck = false;

healthyBtn.addEventListener("click", function () {
  tableBodyEl.innerHTML = "";
  if (healthyCheck === false) {
    healthyBtn.innerHTML = "Show All Pet";
    healthyCheck = true;

    healthyPetArr = petArr.filter(function (pet) {
      return (
        pet.vaccinated === true &&
        pet.dewormed === true &&
        pet.sterilized === true
      );
    });

    renderTableData(healthyPetArr);
  } else {
    healthyBtn.innerHTML = "Show Healthy Pet";
    healthyCheck = false;
    renderTableData(petArr);
  }
});
// tính chỉ số BMI
const calculateBtn = document.getElementById("calculate-btn");
calculateBtn.addEventListener("click", function () {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].type === "Dog") {
      petArr[i].bmi = (
        (petArr[i].weight * 703) /
        petArr[i].length ** 2
      ).toFixed(2);
    } else {
      petArr[i].bmi = (
        (petArr[i].weight * 886) /
        petArr[i].length ** 2
      ).toFixed(2);
    }
  }
  renderTableData(petArr);
});
//
