const form = document.querySelector("form")!;
interface Book {
  id: number;
  name: string;
  created_at: string;
}

const handleSubmit = async (event: Event) => {
  event.preventDefault();

  const name = document
    .querySelector<HTMLInputElement>("#name")!
    .value.split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  if (await bookAlreadyExist(name)) {
    popSubmitMessage("Livro já existente!");
    return;
  }

  fetch("books/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  }).then(createBooksELements);
  
  popSubmitMessage("Adicionado com sucesso!");
};

const fetchAllBooks = async (): Promise<Book[]> => {
  const response = await fetch("books/", { method: "GET" });

  return response.json() as Promise<Book[]>;
};

const bookAlreadyExist = async (verifyBook: string) => {
  const books = await fetchAllBooks();

  for (let i = 0; i < books.length; i++) {
    const book = books[i];

    if (book.name === verifyBook) return true;
  }
  return false;
};

const createBooksELements = async () => {
  const allBooksElement = document.querySelector<HTMLDivElement>(".all-books")!;
  const books = await fetchAllBooks();

  allBooksElement.innerHTML = books
    .map(
      (book) => `
        <div class="book">
          <p>${book.name}</p>
          <p>Adicionado em: ${formatDate(book.created_at)}</p>
        </div>
      `
    )
    .join("");
};

const popSubmitMessage = (message: string) => {
  const submitMessage =
    document.querySelector<HTMLDivElement>(".submit-message")!;
  submitMessage.innerText = message;
};

const formatDate = (date: string) => {
  const yyyy = date.split("-")[0];
  const mm = date.split("-")[1];
  const dd = date.split("-")[2].substring(0, 2);
  return `  ${dd}/${mm}/${yyyy}`;
};

form.addEventListener("submit", handleSubmit);

window.onload = createBooksELements;
