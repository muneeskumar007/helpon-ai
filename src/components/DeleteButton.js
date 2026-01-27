
function DeleteButton({ publicId }) {
  const handleDelete = async () => {
    try {
      const res = await fetch("/.netlify/functions/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: publicId, type: "image" }),
      });

      const data = await res.json();
      console.log("Delete result:", data);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}

export default DeleteButton;
