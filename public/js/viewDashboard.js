const commentFormHandler = async (event) => {
  event.preventDefault();

  const body = document.getElementById("body-comment").value.trim();
  const band_id = event.target.getAttribute("data-id");
  console.log(body);
  if (body) {
    const response = await fetch("/api/users/comment", {
      method: "POST",
      body: JSON.stringify({ body, band_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/dashboard/${band_id}`)
    } else {
      alert(response.statusText);
    }
  }
};

submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click", commentFormHandler);
