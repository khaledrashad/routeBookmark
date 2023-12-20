var siteName = document.getElementById("siteName")
var siteUrl = document.getElementById("siteUrl")
var submitBtn = document.querySelector("#formSubmit")
var modal = document.getElementById("modal")
let closeBtn = document.getElementById("modalClose")
var bookmarkList = []

if (localStorage.getItem("bookmarks") != null) {
    bookmarkList = JSON.parse(localStorage.getItem("bookmarks"))
    showBookmark()
}
document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        addBookmark()
    } else if (e.key == "Escape")
        closeModal()
})

modal.addEventListener("click",(e)=>{
     if(e.target.getAttribute("id") == "modal"){
        closeModal()
     }
})
submitBtn.addEventListener("click", addBookmark)
closeBtn.addEventListener('click', closeModal)
function closeModal() {
    modal.style.display = "none"
}

function addBookmark() {
    var bookmark = {
        name: siteName.value,
        url: siteUrl.value
    }
    var validateName = /^[A-Za-z]{3,}$/
    var validName = validateName.exec(bookmark.name)
    let validateUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    let validUrl = validateUrl.test(bookmark.url)
    if (validName != null && validUrl == true) {
        bookmarkList.push(bookmark)
        siteName.value = ""
        siteUrl.value = ""
        showBookmark()
        localStorage.setItem("bookmarks", JSON.stringify(bookmarkList))
    } else if (validName == null || validUrl == false) {
        modal.style.display = "flex"
    }
}

function showBookmark() {
    var temp = ""
    for (var i = 0; i < bookmarkList.length; i++) {
        temp += `  
    <tr>
        <td>`+ i + `</td>
        <td>`+ bookmarkList[i].name + `</td>
        <td><a href="https://`+ bookmarkList[i].url + `" onclick="visitBookmark()" class="btn btn-outline-danger">Visit</a></td>
        <td><button onclick="removeBookmark(`+ i + `)" class="btn btn-outline-danger">Delete</button></td>
    </tr>`
    }
    document.getElementById("myContent").innerHTML = temp
}

function removeBookmark(index) {
    bookmarkList.splice(index, "1")
    showBookmark()
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList))
}

