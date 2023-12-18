var siteName = document.getElementById("siteName")
var siteUrl = document.getElementById("siteUrl")
var submitBtn = document.querySelector("#formSubmit")
var modal = document.getElementById("modal")
var bookmarkList = []

if(localStorage.getItem("bookmarks") != null){
    bookmarkList = JSON.parse(localStorage.getItem("bookmarks"))
    showBookmark()
}

submitBtn.addEventListener("click", addBookmark)

function addBookmark() {
    var bookmark = {
        name: siteName.value,
        url: siteUrl.value
    }
    var validateName = /^[A-Za-z]{3,}$/
    var validName = validateName.exec(bookmark.name)
    if(validName != null  ){
        console.log(validName)
        bookmarkList.push(bookmark)
        siteName.value = ""
        siteUrl.value = ""
        showBookmark()
        localStorage.setItem("bookmarks", JSON.stringify(bookmarkList))
    } else if(validName == null){
        modal.style.display = "flex"
    }
}

function showBookmark() {
    var temp = ""
    for (var i = 0; i < bookmarkList.length; i++) {
        temp += `  
    <tr>
        <td>`+i+`</td>
        <td>`+bookmarkList[i].name+`</td>
        <td><a href="https://`+bookmarkList[i].url+`" onclick="visitBookmark()" class="btn btn-outline-danger">Visit</a></td>
        <td><button onclick="removeBookmark(`+i+`)" class="btn btn-outline-danger">Delete</button></td>
    </tr>`
    }
    document.getElementById("myContent").innerHTML = temp
}

function removeBookmark (index){
    bookmarkList.splice(index,"1")
    showBookmark()
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList))
}

