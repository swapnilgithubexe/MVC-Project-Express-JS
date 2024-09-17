const deleteProduct = (id) => {
  const result = confirm("Shall we delete this product?")

  if (result) {
    fetch("/delete/" + id, {
      method: "POST"
    }).then(res => {
      if (res.ok) {
        location.reload()
      }
    })
  }
}