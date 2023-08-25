const newFormHandler = async (event) => {
  event.preventDefault();

  const location = document.querySelector("#gig-location").value.trim();
  const date = document.querySelector("#gig-date").value.trim();
  const time = document.querySelector("#gig-time").value.trim();

  if (location && date && time) {
    const response = await fetch(`/api/gig`, {
      method: "POST",
      body: JSON.stringify({ location, date, time }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/gig/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  }
};

const updButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    console.log(id);
    // const response = await fetch(`/api/gig/${id}`, {
    //   method: "UPDATE",
    // });
    document.location.href=`/updategig/${id}`;
    // if (response.ok) {
      
    // } else {
    //   alert("Failed to delete post");
    // }
  }
};

document
  .querySelector("#new-post-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector("#delete")
  .addEventListener("click", delButtonHandler);
console.log(document.querySelector('#gigs'));
document.querySelector("#gigs").addEventListener("click", updButtonHandler);
