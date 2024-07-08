const form = document.querySelector("#form")!;
const output = document.querySelector<HTMLDivElement>(".output")!;

interface Book {
  id: number;
  name: string;
  created_at: string;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const bookId = document.querySelector<HTMLInputElement>("#id")!.value;

  try {
    const response = await fetch(`/books/${bookId}`, { method: "GET" });
    const bookData: Book[] = await response.json();
    output.textContent = JSON.stringify(bookData, null, 2);
    console.log(bookData[0].name);
  } catch (error) {
    console.error(error);
  }
});

const form2 = document.querySelector("#form2")!;