export default function updateLocalstorage(updatedData) {
  localStorage.setItem("todotasker", JSON.stringify(updatedData));
}
