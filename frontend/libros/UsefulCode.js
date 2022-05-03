try {
  const req = await fetch("http://localhost:3312/api/v1/libros", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "no-cors",
    body: JSON.stringify({
      titulo: titulo,
      autor: autor,
      fecha: fecha,
      isbn: isbn,
      editorial: editorial,
    }),
  });

  req.then((data) => {
    console.log(data);
    alert(data);
  });
} catch (error) {
  alert(error);
}
