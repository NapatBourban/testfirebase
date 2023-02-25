<script setup>
import { ref } from "vue";
import router from "../router";
import { db } from "../main";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const Email = ref("");
const Pass = ref("");
const Datauser = ref({
  Name: "",
  Email: Email,
  Password: Pass,
  Lastname: "",
  tel: "",
  age: "",
  sex: "",
});
function Register() {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, Email.value, Pass.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("add user :" + user);
      router.push("home");
      AdduserData();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Eror : " + errorCode);
      // ..
    });
}

async function AdduserData() {
  try {
    const docRef = await addDoc(collection(db, "User"), Datauser.value);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
</script>
<template>
  <div class="d-flex" style="width: 100%; height: 32rem; margin: 8rem 5rem 5rem 5rem">
    <div class="w-25 h-50 m-5">
      <img
        alt="Vue logo"
        class="logo"
        src="../assets/pngtree-3d-dollars-and-gold-coins-money-sacks-png-image_8402114.png"
        width="350"
        height="350"
      />
    </div>
    <div class="w-15 h-60 m-5 border border-4 border-white p-3 mb-2 bg-white text-dark">
      <div class="input-group">
        <label for="inputname" class="col-sm-2 col-form-label">Name</label>
        <input
          type="text"
          aria-label="First name"
          class="form-control col-sm-2 m-3"
          placeholder="Name"
          v-model="Datauser.Name"
          required
        />
        <input
          type="text"
          aria-label="Last name"
          class="form-control col-sm-2 m-3"
          placeholder="Last Name"
          v-model="Datauser.Lastname"
          required
        />
      </div>
      <div class="mb-3 row">
        <label for="inputemail" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input
            type="email"
            class="form-control"
            id="inputemail"
            v-model="Email"
            placeholder="email@example.com"
            required
          />
        </div>
      </div>
      <div class="mb-3 row">
        <label for="inputPassword" class="col-sm-2 col-form-label">Pass</label>
        <div class="col-sm-10">
          <input
            type="password"
            class="form-control"
            style="height: 50px"
            id="inputPassword"
            v-model="Pass"
            placeholder="Password"
            required
          />
        </div>
      </div>
      <div class="mb-3 row">
        <label for="inputPassword" class="col-sm-2 col-form-label">tel</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="inputPassword"
            v-model="Datauser.tel"
            placeholder="0xx-xxx-xxxx"
            required
          />
        </div>
      </div>
      <div class="d-flex">
        <div class="mb-3 row m-3">
          <label for="inputPassword" class="col-sm-2 col-form-label">Age</label>
          <div class="col-sm-10">
            <input
              type="number"
              class="form-control"
              id="inputPassword"
              v-model="Datauser.age"
            />
          </div>
        </div>

        <div class="col-md-4 d-flex">
          <label for="inputState" class="form-label mt-4">Sex</label>
          <select id="inputState" class="form-select col-sm-3 m-3" v-model="Datauser.sex">
            <option selected value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
      </div>
      <div class="form-check d-flex justify-content-center">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckChecked"
          required
        />
        <label class="form-check-label" for="flexCheckChecked">
          ต้องการรับข่าวสารทาง Email
        </label>
      </div>

      <div class="d-flex justify-content-center m-3">
        <button
          type="button"
          @click="Register()"
          class="btn btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          กรอกข้อมูลเรียบร้อย
        </button>
      </div>

      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">หน้ายืนยัน</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                ยกเลิก
              </button>
              <button
                type="button"
                class="btn btn-dark"
                @click="Register()"
                data-bs-dismiss="modal"
              >
                ยืนยันการสมัคร
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
