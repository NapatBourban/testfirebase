<script setup>
import { ref } from "vue";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../main";
import { getAuth, signOut } from "firebase/auth";
import router from "../router";

const menu = ref({ month: "", years: "", amountbef: 0, amountaef: 0 });
const allmenu = ref([]);
const result = ref();

function cal() {
  this.result = menu.value.amountbef - menu.value.amountaef;
}
async function showMenu() {
  const querySnapshot = await getDocs(collection(db, "List"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    const mydoc = ref({ id: doc.id, data: doc.data() });
    allmenu.value.push(mydoc.value);
    //allmenu.value.push(mydoc.value);
  });
}

function logout() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      router.push("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("User asdasdas : " + errorCode + errorMessage);
    });
}

async function AdduserData() {
  try {
    const docRef = await addDoc(collection(db, "List"), menu.value);
    console.log("Document written with ID: ", docRef.id);
    cal();
    console.log(result);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function deleuserData(id) {
  await deleteDoc(doc(db, "List", id));
  await deleteDoc(doc(db, "List", allmenu.value.pop(id)));
}
</script>
<template>
  <div>
    <button
      class="navbar-toggler position-absolute top-0 end-0 m-5 mt-2"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasDarkNavbar"
      aria-controls="offcanvasDarkNavbar"
      style="width: 50px; height: 50px"
    >
      <span class="navbar-toggler-icon"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="currentColor"
          class="bi bi-list"
          viewBox="0 0 16 16"
          style="color: aliceblue"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          /></svg
      ></span>
    </button>
  </div>
  <div
    class="offcanvas offcanvas-end text-bg-dark"
    style="width: 20rem"
    tabindex="-1"
    id="offcanvasDarkNavbar"
    aria-labelledby="offcanvasDarkNavbarLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
      <button
        type="button"
        class="btn-close btn-close-white"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
        <li class="nav-item d-flex justify-content-center m-3">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Data
          </button>
        </li>
        <li class="nav-item d-flex justify-content-center">
          <button class="btn btn-danger" @click="logout()">Log Out</button>
        </li>
      </ul>
    </div>
  </div>

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
          <h1 class="modal-title fs-5" id="exampleModalLabel">Add amount before-after</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div>
            <div class="m-2">
              Month
              <div class="input-group mb-1">
                <select class="form-select" id="inputGroupSelect01" v-model="menu.month">
                  <option selected value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
              <br />
            </div>
            <div>
              Years
              <input
                class="w-100"
                type="number"
                min="2000"
                max="2080"
                step="1"
                v-model="menu.years"
                required
              /><br />
            </div>
            <div>
              <div class="mt-5 d-flex justify-content-center">
                <button
                  class="btn btn-dark"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Before - After
                </button>

                <div class="collapse" id="collapseExample">
                  <div class="card card-body">
                    <div class="d-flex">
                      <div class="m-2">
                        Amount Before
                        <input
                          type="number"
                          name=""
                          id="3"
                          v-model="menu.amountbef"
                          placeholder="$"
                        />
                      </div>
                      <div class="m-2">
                        Amount After
                        <input
                          type="number"
                          name=""
                          id="3"
                          v-model="menu.amountaef"
                          placeholder="$"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="($event) => AdduserData()"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>

  <div><img src="" /></div>

  <div class="d-flex justify-content-center m-5">
    <div class="container bg-secondary" style="width: 60rem">
      <tr class="row text-center bg-white text-dark" style="height: 50px">
        <td class="col m-2"><h4>month</h4></td>
        <td class="col m-2"><h4>year</h4></td>
        <td class="col m-2" placeholder="$" style="width: 20%"><h4>ต้นเดือน</h4></td>
        <td class="col m-2" placeholder="$"><h4>ท้ายเดือน</h4></td>
        <td class="col m-2"><h4>รายจ่าย</h4></td>
        <td class="col m-2"></td>
      </tr>
      <tr
        class="row text-center text-white"
        v-for="(menuItem, index) in allmenu"
        :key="index"
      >
        <td class="col m-2">{{ menuItem.data.month }}</td>
        <td class="col m-2">{{ menuItem.data.years }}</td>
        <td class="col m-2">{{ menuItem.data.amountbef }}</td>
        <td class="col m-2">{{ menuItem.data.amountaef }}</td>
        <td class="col m-2">{{ menuItem.data.amountbef - menuItem.data.amountaef }}</td>
        <td class="col m-2">
          {{ menuItem.data.id
          }}<button @click="deleuserData(menuItem.id)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash3-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"
              />
            </svg>
          </button>
        </td>
      </tr>
    </div>
  </div>
  <div class="d-flex justify-content-center" style="margin-top: 8%">
    <br /><button
      @click="($event) => showMenu()"
      style="width: 200px; height: 50px"
      class="text-white btn btn-secondary"
    >
      List Payment/Month
    </button>
  </div>
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
          <h5 class="modal-title" id="exampleModalLabel">Add Menu</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="($event) => AdduserData()"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
