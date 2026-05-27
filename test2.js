export async function fetchAPI() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data; // ส่ง object กลับ
    } catch (error) {
        console.error('Error fetching API:', error);
        return {}; // return object ว่างถ้า error
    }
}
