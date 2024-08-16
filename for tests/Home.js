import {
  db,
  ref,
  get,
} from "./firebase.js";


function getPostData() {
  const user_ref = ref(db, "post/");
  get(user_ref).then((snapshot) => {
    const data = snapshot.val();

    let html = "";
    const table = document.querySelector(".main");
    for (const key in data) {
      const { title, post_content } = data[key];

      console.log(post_content);

      html += `
           <div class="post"> 
               <h2>${title}</h2>
               <p>
                 ${post_content}
               </p>
           </div>
          `;
    }
    table.innerHTML = html;
  });
}

getPostData();
