"use strict";

const mainForm = document.getElementById("main");
const containerForm = document.getElementById("container-form");
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

let petArr = JSON.parse(getFromStorage("pets")) ?? [];
let breedArr = JSON.parse(getFromStorage("breeds")) ?? [];
if (petArr) {
  renderTableData(petArr);
}

//hien thi giu lieu giong (trang quan li thu cung)
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

<td>${petArr[i].date}</td>
<td>
<button class="btn btn-warning" onclick="startEditPet('${
      petArr[i].id
    }')">Edit</button>
</td>
    `;
    tableBodyEl.appendChild(row); //đưa bảng vào html
  }
}

//display breed
function renderBreed() {
  //làm mới select breed
  breedInput.innerHTML = "<option>Select Breed</option>";
  //lọc theo con vật
  const filterBreed = breedArr.filter(
    (breed) => breed.type === typeInput.value
  );

  for (const breed of filterBreed) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${breed.breed}</option>`;
    breedInput.appendChild(option);
  }
}

//edit pet

function startEditPet(petId) {
  // Tìm đối tượng pet với petId trong mảng petArr

  const currentPet = petArr.find((pet) => pet.id === petId);

  // Hiển thị form
  containerForm.classList.remove("hide");

  // Hiển thị giá trị của đối tượng pet lên form

  idInput.value = currentPet.id;
  nameInput.value = currentPet.name;
  ageInput.value = currentPet.age;
  typeInput.value = currentPet.type;
  renderBreed();
  weightInput.value = currentPet.weight;
  lengthInput.value = currentPet.length;
  colorInput.value = currentPet.color;
  breedInput.value = currentPet.breed;
  vaccinatedInput.checked = currentPet.vaccinated;
  dewormedInput.checked = currentPet.dewormed;
  sterilizedInput.checked = currentPet.sterilized;
}

submitBtn.addEventListener("click", function () {
  // Ẩn form

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

  // Tìm đối tượng pet cần chỉnh sửa trong mảng petArr
  const petIndex = petArr.findIndex((pet) => pet.id === data.id);
  // Nếu đối tượng pet đã tồn tại trong mảng, cập nhật giá trị của nó
  if (petIndex !== -1) {
    petArr[petIndex].name = data.name;
    petArr[petIndex].age = data.age;
    petArr[petIndex].type = data.type;
    petArr[petIndex].weight = data.weight;
    petArr[petIndex].length = data.length;
    petArr[petIndex].color = data.color;
    petArr[petIndex].breed = data.breed;
    petArr[petIndex].vaccinated = data.vaccinated;
    petArr[petIndex].dewormed = data.dewormed;
    petArr[petIndex].sterilized = data.sterilized;
    petArr[petIndex].date = data.date;
  }

  //validate  data
  if (!data.age || !data.weight || !data.length) {
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
    // lưu dữ liệu thay đổi pet
    saveToStorage("pets", JSON.stringify(petArr));
    //refresh list
    renderTableData(petArr);
    //refresh form
    clearInput();
    // hide form
    containerForm.classList.add("hide");
  }
  // xóa dữ liệu người dùng nhập
  function clearInput() {
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    typeInput.value = "";
    weightInput.value = "";
    lengthInput.value = "";
    colorInput.value = "#000000";
    breedInput.value = "";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
  }
});
