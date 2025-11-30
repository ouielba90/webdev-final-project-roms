async function getPosts() {
    return fetch("http://localhost:3000/posts")
        .then((response) => response.json())    
        .then((data) => {
            console.log(data);
            return data;
    
})
        .catch((error) => {
            console.error("Error fetching posts:", error);
        });
}

export default getPosts;