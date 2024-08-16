import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  db,
  set,
  ref,
  get,
  remove,
  update,
} from "./firebase.js";

const notify = document.getElementById("notify");

// signup
const signup = (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (email == "" || password == "") {
    notify.innerText = "Enter an email and password";
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        console.log("response", user);
        if (user) {
          // notify.innerText = "User Created successfully";
        } else {
          notify.innerText = "SorrySomething Wrong";
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        notify.innerText = errorMessage;
      });
  }
};

let signupBtn = document.querySelector("#signupBtn");
signupBtn.addEventListener("click", signup);

// login

const login = (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (email == "" || password == "") {
    notify.innerText = "Enter an email and password";
  } else {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        console.log("response", user);
        if (user) {
          // notify.innerText = "User login successfully";
        } else {
          notify.innerText = "Sorry Something Wrong";
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        notify.innerText = errorCode;
      });
  }
};

let loginBtn = document.querySelector("#loginBtn");
loginBtn.addEventListener("click", login);

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.querySelector(".user-form").classList.add("hide");
    document.querySelector(".admin-page").classList.add("show");
  }
});

// logout

const logOut = (event) => {
  event.preventDefault();
  signOut(auth)
    .then(() => {
      document.querySelector(".user-form").classList.remove("hide");
      document.querySelector(".admin-page").classList.remove("show");
    })
    .catch((error) => {
      console.log(error);
    });
};

let logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", logOut);

// blog section

const Add_post = () => {
  const title = document.querySelector("#title").value;
  const post_content = document.querySelector("#post_content").value;
  const id = Math.floor(Math.random() * 100);

  set(ref(db, "post/" + id), {
    title: title,
    post_content: post_content,
  });
  // notify.innerHTML = "data Added";
  document.querySelector("#title").value = "";
  document.querySelector("#post_content").value = "";

  GetPostData();
};

const add_post_btn = document.querySelector("#post_btn");
add_post_btn.addEventListener("click", Add_post);

// get data

function GetPostData() {
  const user_ref = ref(db, "post/");
  get(user_ref).then((snapshot) => {
    const data = snapshot.val();
    console.log(data);
    let html = "";
    const table = document.querySelector("table");
    for (const key in data) {
      const { title, post_content } = data[key];

      html += `
                <tr>
                     <td> <span class="postNumber"></span></td>
                     <td>${title} </td>
                     <td> <button class="delete" onclick="delete_data(${key})">Delete</button> </td>
                     <td> <button class="update" onclick="update_data(${key})">Update</button> </td>
                </tr>
               `;
    }

    table.innerHTML = html;
  });
}

//  delete_data

window.delete_data = function (key) {
  remove(ref(db, `post/${key}`));
  // notify.innerHTML = "data Deleted";
  GetPostData();
};

// get and update data

window.update_data = function (key) {
  const user_ref = ref(db, `post/${key}`);

  get(user_ref).then((item) => {
    document.querySelector("#title").value = item.val().title;
    document.querySelector("#post_content").value = item.val().post_content;
  });

  const update_btn = document.querySelector(".update_btn");
  update_btn.classList.add("show");
  document.querySelector(".post_btn").classList.add("hide");
  //   update

  function Update_Form() {
    const title = document.querySelector("#title").value;
    const post_content = document.querySelector("#post_content").value;

    update(ref(db, `post/${key}`), {
      title: title,
      post_content: post_content,
    });
    GetPostData();
  }

  update_btn.addEventListener("click", Update_Form);
};
