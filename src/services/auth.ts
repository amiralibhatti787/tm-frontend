export function isAuthenticated(): boolean {
  const authToken = localStorage.getItem("authToken");
  console.log("authToken==>amir", !!authToken);
  return !!authToken; // Returns true if authToken exists, otherwise false
}
