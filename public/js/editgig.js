
const updGig = async (event) => {

    event.preventDefault();

    const location = document.querySelector("#gig-location").value.trim();
    const date = document.querySelector("#gig-date").value.trim();
    const time = document.querySelector("#gig-time").value.trim();
    const gigId = document.querySelector("#gig-id").value.trim();
    console.log(location, date, time, gigId);

    if (location && date && time && gigId) {
  
      const response = await fetch(`/api/gig/${gigId}`, {
        method: "PUT",
        body: JSON.stringify({ location, date, time }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to update gig");
      }
    }
  };

  document
  .querySelector("#update-gig-form")
  .addEventListener("submit", updGig);