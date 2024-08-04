export async function GetProductsWithOwner() {
    const response = await fetch(`http://localhost:3000/api/products`)
    if (!response.ok) {
        throw new Error('Nie udało się pobrać danych')
    }
    return response.json();
}