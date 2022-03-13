const searchBar = document.querySelector(".users .search input"),
searchBtn = document.querySelector(".users .search button"),
userList = document.querySelector(".users .users-list");

searchBtn.onclick = ()=> {
    searchBar.classList.toggle("active");
    searchBar.focus();
    searchBtn.classList.toggle("active");
    searchBar.value = "";
}

searchBar.onkeyup = ()=> {
    let searchTerm = searchBar.value;
    if(searchTerm != "") {
        searchBar.classList.add("active");
    }else{
        searchBar.classList.remove("active");
    }
        //let's start Ajax
        let xhr = new XMLHttpRequest(); //creating XWM object
        xhr.open("POST", "php/search.php");
        xhr.onload =()=>{
            if(xhr.readyState === XMLHttpRequest.DONE) {
                if(xhr.status === 200){
                    let data = xhr.response;
                    userList.innerHTML = data;
                    }
                }
            }
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send("searchTerm=" + searchTerm);
        }

setInterval(() => {
    //let's start Ajax
    let xhr = new XMLHttpRequest(); //creating XWM object
    xhr.open("GET", "php/users.php");
    xhr.onload =()=>{
        if(xhr.readyState === XMLHttpRequest.DONE) {
            if(xhr.status === 200){
                let data = xhr.response;
                if(!searchBar.classList.contains("active")){ //if active active not in search bar then add this data
                    userList.innerHTML = data;
                }
                }
            }
        }
        xhr.send();

}, 500); //this function will run frequently after 500ms