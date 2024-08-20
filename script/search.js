"use strict";

// Lấy các phần tử cần thiết từ tài liệu HTML
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const findBtn = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");
const breedInput = document.getElementById("input-breed");

let petArr = JSON.parse(getFromStorage("pets")) ?? [];
let breedArr = JSON.parse(getFromStorage("breeds")) ?? [];
if (petArr) {
  renderTableData(petArr);
}

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
    `;
    tableBodyEl.appendChild(row); //đưa bảng vào html
  }
}

(function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  for (const breed of breedArr) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${breed.breed}</option>`;
    breedInput.appendChild(option);
  }
})();

// Lắng nghe sự kiện click của nút Find
findBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    type: typeInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  let filterAll = petArr;

  // Hiển thị danh sách các thú cưng đã lọc
  if (data.id !== "") {
    filterAll = filterAll.filter((pet) => {
      return pet.id.includes(data.id);
    });
  }
  if (data.name !== "") {
    filterAll = filterAll.filter((pet) => {
      return pet.name.includes(data.name);
    });
  }
  if (data.type !== "Select Type") {
    filterAll = filterAll.filter((pet) => {
      return data.type === pet.type;
    });
  }

  if (data.breed !== "Select Breed") {
    filterAll = filterAll.filter((pet) => {
      return data.breed === pet.breed;
    });
  }

  if (data.vaccinated) {
    filterAll = filterAll.filter((pet) => {
      return pet.vaccinated;
    });
  }

  if (data.dewormed) {
    filterAll = filterAll.filter((pet) => {
      return pet.dewormed;
    });
  }
  if (data.sterilized) {
    filterAll = filterAll.filter((pet) => {
      return pet.sterilized;
    });
  }
  renderTableData(filterAll);
});
