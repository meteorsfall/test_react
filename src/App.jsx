import 'styles.css';
import { useState, useEffect } from 'react';

export default function App() {
	return {
		<div>
			<h1>Hello, React is working!</h1>
		</div>
	}
]

const messages = document.getElementById('messages');
messages.style.display = 'none';
const message = document.getElementById('message');
let copy1 = message.cloneNode(true);
let copy2 = message.cloneNode(true);
copy2.style.borderBottom = '0px';
messages.appendChild(copy1);
messages.appendChild(copy2);

function showMessages() {
    const messages = document.getElementById('messages');
    messages.style.display =
        messages.style.display === 'none' ? 'flex' : 'none';
}

const dropdownMenus = document.getElementsByClassName('dropdown-menu');
for (let i = 0; i < dropdownMenus.length; i++) {
    let menu = dropdownMenus[i];
    menu.style.display = 'none';
}

document.addEventListener('click', function(event) {
    for (let i = 0; i < dropdownMenus.length; i++) {
        let menu = dropdownMenus[i];
        let menuParent = menu.parentNode;
        if (menuParent.contains(event.target) && menu.style.display != 'flex') {
            menu.style.display = 'flex';
        } else {
            menu.style.display = 'none';
        }
    }
})

const dropdownLines = document.getElementsByClassName('dropdown-line');
for (let i = 0; i < dropdownLines.length; i++) {
    let dropdownLine = dropdownLines[i];
    dropdownLine.onclick = () =>
        dropdownLine.parentNode.parentNode.querySelector('span').innerHTML =
            dropdownLine.innerText;
}

const turnDarkElems = document.getElementsByClassName('turn-dark');
for (let i = 0; i < turnDarkElems.length; i++) {
    let turnDarkElem = turnDarkElems[i];
    turnDarkElem.addEventListener('click', function() {
        if (turnDarkElem.style.backgroundColor == 'rgb(157, 205, 205)') {
            turnDarkElem.style.backgroundColor = 'rgb(44, 61, 81)';
            turnDarkElem.style.color = 'rgb(157, 205, 205)';
        } else {
            turnDarkElem.style.backgroundColor = 'rgb(157, 205, 205)';
            turnDarkElem.style.color = 'black';
        }
    });
}

const watchElems = document.getElementsByClassName('watch');
for (let i = 0; i < watchElems.length; i++) {
    let watchElem = watchElems[i];
    watchElem.addEventListener('click', function() {
        if (watchElem.textContent == 'Watch') {
            watchElem.textContent = 'Watching';
        } else {
            watchElem.textContent = 'Watch';
        }
    });
}

const icon2Elems = document.getElementsByClassName('icon2');
for (let i = 0; i < icon2Elems.length; i++) {
    let icon2Elem = icon2Elems[i];
    icon2Elem.addEventListener('click', function() {
        this.classList.toggle('active');
    });
}

function renderContests(contests) {
    contestsHTML =
        '<hr style="margin-left:5em; margin-right:5em; margin-top: 1em; margin-bottom: 0em;">'
    for (contest of contests) {
        tagsHTML = '';
        for (let [i, tag] of contest.tags.entries() ) {
            if (i == 0) {
                tagsHTML +=
                    `<div class="small-button box-highlight"> ${tag} </div>`;
            } else {
                tagsHTML += `<div class="small-button"> ${tag} </div>`;
            }
        }

        contestsHTML += `
        <div class="message" style="display: flex; flex-direction: row; margin-left:5em; margin-right: 5em; margin-top: 0em; margin-bottom: 0em; gap: 1em; border-bottom: 1px solid #6F6F6F; padding: 1em 0;">
            <div class="nodesign" style="background-color: white;"> </div>
            <div style="display: flex; flex-direction: column; width: 40em; gap: .4em;">
              <h1 style="margin-top: .5em;"> ${contest.title} </h1>
              <p style="color: #6F6F6F; margin-top: 0em; margin-bottom:0em;"> ${
            contest.description} </p>
              <p style="color: #6F6F6F"> <i>${contest.author}</i> </p>
              <div style="display: flex; flex-direction: row; gap: 1em;">
                ${tagsHTML}
              </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 1.5em; color:#6F6F6F; justify-content: center; margin-left: auto; margin-right: 5em;">
              <div style="display: flex; flex-direction: row; gap: 1em;">
                <i class="fa-regular fa-image"> </i>
                <div class="gray-text"> 0 designs </div>
              </div>
              <div style="display:flex; flex-direction: row; gap: 1em;">
                <i class="fa-regular fa-clock"> </i>
                <div> 4 days </div>
              </div>
              <div style="display:flex; flex-direction: row; gap: 1em;">
                <i class="fa-solid fa-comment"> </i>
                <div> No feedback </div>
              </div>
              <div class="small-button turn-dark watch" style="width:4em; color: #000000;"> Watch </div>
            </div>
      </div>
`;
    }
    document.getElementById('contests').innerHTML = contestsHTML;
}

async function fetch_contests() {
    fetch('/contests.json')
        .then(r => r.json())
        .then(data => {
            const contests = data
            console.log(contests);
            renderContests(contests)
        })
        .catch(error => console.error('Error:', error));
}

const addPostButton = document.getElementById('add-post-button');
const addPostForm = document.getElementById('add-post-form');
addPostButton.addEventListener('click', function() {
    this.style.display = 'none';
    addPostForm.style.display = 'block';
});

addPostForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const new_data = {...data, "tags": [], "days": 0, "designs": 0};
    console.log(new_data);
    const res = await fetch('/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(new_data)
    });

    if (res.ok) {
        alert('Submission saved!');
        e.target.reset();
        fetch_contests();
    } else {
        alert('Submission failed.');
    }
});


window.onload = function() {
    fetch_contests();
}
