const staffData = [
  {
    id: 1,
    name: "Alex Rosetta",
    email: "alexyrosetta@egmail.com",
    image: "./assets//images/staff1.png",
  },
  {
    id: 2,
    name: "Maria July",
    email: "mariajuly@egmail.com",
    image: "./assets//images/staff2.png",
  },
];

const serviceData = [
  {
    id: 1,
    name: "Oral hygiene",
    image: "./assets//images/service1.png",
    duration: "1 hour",
    price: 50.0,
  },
  {
    id: 2,
    name: "Implants",
    image: "./assets//images/service2.png",
    duration: "1 hour 30 minutes",
    price: 120.0,
  },
];

const steps = ["staff", "service", "date", "confirmation"];
let currentStep = "staff";

// steps
const staffStep = document.querySelector("#staff-step");
const serviceStep = document.querySelector("#service-step");
const dateStep = document.querySelector("#date-step");
const confirmationStep = document.querySelector("#confirmation-step");

// staff
const staffContenList = document.querySelector(".staff-content-list");
const staffContent = document.querySelector(".staff-content");
const staffNextBtn = document.querySelector(".staff-next-btn");
const staffAlert = document.querySelector(".staff-alert");

// service
const serviceContenList = document.querySelector(".service-content-list");
const serviceContent = document.querySelector(".service-content");
const serviceNextBtn = document.querySelector(".service-next-btn");
const serviceBackBtn = document.querySelector(".service-back-btn");
const serviceAlert = document.querySelector(".service-alert");

// confirmation

const confirmContent = document.querySelector(".confirm-content");
const selectedStaffName = document.querySelector(".type-staff-name");
const selectedServiceName = document.querySelector(".type-service-name");
const selectedPrice = document.querySelector(".type-price");
const confirmBackBtn = document.querySelector(".confirm-back-btn");
const confirmBtn = document.querySelector(".confirm-booking-btn");
const confirmationForm = document.querySelector(".confirmation-form");
const confirmAlert = document.querySelector(".modal");
const confirmAlertClose = document.querySelector(".close-btn");
const confirmSuccess = document.querySelector(".success");
const confirmSuccessClose = document.querySelector(".close-btn-success");
// content header
const selectedListName = document.querySelector(".selected-list-name");
// id
let selectedStaffId = null;
let selectedServiceId = null;

// currentStep

const currentStepDisplay = () => {
  staffStep.classList.remove("completed", "active");
  serviceStep.classList.remove("completed", "active");
  dateStep.classList.remove("completed", "active");
  confirmationStep.classList.remove("completed", "active");

  if (currentStep === "staff") {
    staffStep.classList.add("active");
  } else if (currentStep === "service") {
    staffStep.classList.add("completed");
    serviceStep.classList.add("active");
  } else if (currentStep === "date") {
    staffStep.classList.add("completed");
    serviceStep.classList.add("completed");
    dateStep.classList.add("active");
  } else if (currentStep === "confirmation") {
    staffStep.classList.add("completed");
    serviceStep.classList.add("completed");
    dateStep.classList.add("completed");
    confirmationStep.classList.add("active");
  }
};

// click steps

window.onload = () => {
  staffContent.style.display = "block";
  serviceContent.style.display = "none";
  confirmContent.style.display = "none";
};

staffStep.addEventListener("click", () => {
  currentStep = "staff";
  currentStepDisplay();
  staffContent.style.display = "block";
  serviceContent.style.display = "none";
  confirmContent.style.display = "none";
  serviceAlert.style.display = "none";
});

staffContenList.addEventListener("click", () => {
  currentStep = "service";
  currentStepDisplay();
  staffContent.style.display = "none";
  serviceContent.style.display = "block";
  confirmContent.style.display = "none";
});

serviceStep.addEventListener("click", () => {
  if (selectedStaffId !== null) {
    currentStep = "service";
    currentStepDisplay();
    staffContent.style.display = "none";
    serviceContent.style.display = "block";
    confirmContent.style.display = "none";
  } else {
    staffAlert.style.display = "flex";
  }
});

serviceContenList.addEventListener("click", () => {
  currentStep = "confirmation";
  currentStepDisplay();
  staffContent.style.display = "none";
  serviceContent.style.display = "none";
  confirmContent.style.display = "block";

  const selectedService = serviceData.find(
    (service) => service.id === selectedServiceId
  );
  const selectedStaff = staffData.find(
    (person) => person.id === selectedStaffId
  );

  selectedStaffName.textContent = `${selectedStaff.name}`;
  selectedServiceName.textContent = `${selectedService.name}`;
  selectedPrice.textContent = `$${selectedService.price}`;
});

// back and next button

staffNextBtn.addEventListener("click", () => {
  if (selectedStaffId !== null) {
    currentStep = "service";
    currentStepDisplay();
    staffContent.style.display = "none";
    serviceContent.style.display = "block";
  } else {
    staffAlert.style.display = "flex";
  }
});

serviceBackBtn.addEventListener("click", () => {
  currentStep = "staff";
  currentStepDisplay();
  staffContent.style.display = "block";
  serviceContent.style.display = "none";
  serviceAlert.style.display = "none";
});

confirmBackBtn.addEventListener("click", () => {
  currentStep = "service";
  currentStepDisplay();
  staffContent.style.display = "none";
  serviceContent.style.display = "block";
  confirmContent.style.display = "none";
});

serviceNextBtn.addEventListener("click", () => {
  if (selectedServiceId !== null) {
    currentStep = "confirmation";
    currentStepDisplay();
    staffContent.style.display = "none";
    serviceContent.style.display = "none";
    confirmContent.style.display = "block";
  } else {
    serviceAlert.style.display = "flex";
  }
});

//

staffData.forEach((person) => {
  const li = document.createElement("li");
  li.classList.add("staff-list-content");
  li.dataset.id = person.id;
  li.innerHTML = `
    <img src="${person.image}" alt="staff-1" class="staff-image">
    <div class="staff-info">
        <h4 class="staff-fullname">${person.name}</h4>
        <h5 class="staff-email">${person.email}</h5>
    </div>
    `;
  li.addEventListener("click", () => {
    staffAlert.style.display = "none";
    if (selectedStaffId !== null) {
      const selectedStaff = staffContenList.querySelector(
        `li[data-id="${selectedStaffId}"]`
      );
      selectedStaff.classList.remove("active-staff");
    }
    li.classList.add("active-staff");
    selectedStaffId = person.id;
  });
  staffContenList.appendChild(li);
});

serviceData.forEach((service) => {
  const li = document.createElement("li");
  li.classList.add("service-list-content");
  li.dataset.id = service.id;
  li.innerHTML = `
    <div class="image-and-info">
    <img src="${service.image}" alt="staff-1" class="service-image">
    <div class="service-info">
        <h4 class="service-fullname">${service.name}</h4>
        <h5 class="service-time">${service.duration}</h5>
    </div>
</div>
<h1>${
    service.price % 1 === 0
      ? service.price.toFixed(0)
      : service.price.toFixed(2)
  }$</h1>
    `;
  li.addEventListener("click", () => {
    serviceAlert.style.display = "none";
    if (selectedServiceId !== null) {
      const selectedService = serviceContenList.querySelector(
        `li[data-id="${selectedServiceId}"]`
      );
      selectedService.classList.remove("active-service");
    }
    li.classList.add("active-service");
    selectedServiceId = service.id;
  });
  serviceContenList.appendChild(li);
});

// confirm button

confirmBtn.addEventListener("click", () => {
  if (confirmationForm.checkValidity()) {
    const customerData = {
      name: document.getElementById("name").value,
      surname: document.getElementById("lastname").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone")?.value,
    };

    const allData = {
      staff_id: selectedStaffId,
      service_id: selectedServiceId,
      date: "coming soon",
      time: "coming soon",
      customer: customerData,
    };

    confirmSuccess.style.display = "flex";

    console.log(allData);
  } else {
    confirmAlert.style.display = "flex";
  }
});

confirmAlertClose.addEventListener("click", () => {
  confirmAlert.style.display = "none";
});

confirmSuccessClose.addEventListener("click", () => {
  confirmSuccess.style.display = "none";
});

currentStepDisplay();
