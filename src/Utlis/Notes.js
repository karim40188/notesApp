import Swal from "sweetalert2";
import axios from "axios";

export function showAddModel({ updater }) {
  Swal.fire({
    title: "Add note 💙",
    html: `<input type="text" id="title" placeholder="Enter a title"  class="form-control"/>
        <textarea placeholder="Enter a description" id="description" class="form-control mt-3"></textarea>`,
    showCancelButton: true,
    confirmButtonText: "Add",
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      let title = document.getElementById("title").value;
      let content = document.getElementById("description").value;
      return { title, content };
    },

    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    addNote({
      title: result.value.title,
      content: result.value.content,
      updater,
    });
  });
}

async function addNote({ title, content, updater }) {
  let { data } = await axios.post(
    "https://note-sigma-black.vercel.app/api/v1/notes",
    {
      title: title,
      content: content,
    },
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
  if (data.msg == "done") {
    getAllNotes({ updater });
  }
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
}

export async function getAllNotes({ updater }) {
  let { data } = await axios
    .get("https://note-sigma-black.vercel.app/api/v1/notes", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
  })
    .catch((err) => {
      if (err.response.data.msg == "not notes found") {
        updater([]);
      } else {
        console.log("errorrrrrrrrrrrr");
      }
    });

  updater(data.notes);
}

export async function deleteNote({ id, updater }) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      let response = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      getAllNotes({ updater });
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}
export function updateModal({ id, title, content}) {
  Swal.fire({
    title: "Submit your Github username",
    html: `
    <input type='text' id='title' class='form-control' />
    <textarea type='text' id='content' class='form-control mt-3'></textarea>

    `,
    showCancelButton: true,
    confirmButtonText: "Look up",
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      let title = document.getElementById("title").value;
      let content = document.getElementById("content").value;
      return { title, content };
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      updateNote({
        id,
        title: result.value.title,
        content: result.value.content,
      });
      
    }
    
  });
}

async function updateNote({ id, title, content }) {
  let response = await axios.put(
    `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
    {
      title: title,
      content: content,
    },
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
  console.log(response);

}
