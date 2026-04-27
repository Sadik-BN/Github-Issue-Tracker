const issueCount = document.getElementById("issue-count");


const showSpinner = status => {
    if (status == true) {
        document.getElementById("spinner").hidden = false;
        document.getElementById("card-container").hidden = true;
    }
    else {
        document.getElementById("spinner").hidden = true;
        document.getElementById("card-container").hidden = false;
    }
}


const loadIssues = async () => {

    showSpinner(true);
    const serverData = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues").then(response => response.json());

    displayIssues(serverData.data);
    showSpinner(false);
};

const loadOpen = async () => {
    showSpinner(true);
    const serverData = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues").then(response => response.json());

    const opendata = serverData.data.filter(issue=>issue.status === "open");

    displayIssues(opendata);

    showSpinner(false);
};

const loadClosed = async () => {
    showSpinner(true);
    const serverData = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues").then(response => response.json());

    const closedData = serverData.data.filter(issue => issue.status === "closed");

    displayIssues(closedData);
    showSpinner(false);
};

const loadSrc = async (text)=>{
    showSpinner(true);
    const serverData = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`).then(response => response.json());

    displayIssues(serverData.data);

    showSpinner(false);
};


const displayModal=(Issue)=>{

    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML="";

    const newDiv = document.createElement("div");

    newDiv.innerHTML=`
                        <div class="space-y-6">
                    <h3 class="text-[24px] font-bold">Fix broken image uploads</h3>
                    <p class="text-[#64748B] text-[12px]"> <span
                            class="font-medium text-[12px] text-white bg-[#00A96E] rounded-full px-3 py-1">Opened</span>
                        • Opened by Fahim Ahmed • 22/02/2026</p>
                    <div class="flex gap-1">
                        <p
                            class="text-[#D97706] text-[12px] font-medium bg-[#D977061a] rounded-full px-6 py-1 text-center">
                            BUG</p>
                        <p
                            class="text-[#D97706] text-[12px] font-medium bg-[#D977061a] rounded-full px-6 py-1 text-center">
                            HELP WANTED</p>
                    </div>
                    <p class="text-[#64748B]">The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.</p>
                    <div class="grid grid-cols-2 items-center bg-[#F8FAFC] rounded-lg shadow-md p-4">
                        <div>
                            <p class="text-[#64748B]">Assignee:</p>
                            <p class="font-semibold">Fahim Ahmed</p>
                        </div>
                        <div>
                            <p class="text-[#64748B]">Priority</p>
                            <p class="font-medium text-[12px] text-white bg-[#EF4444] rounded-full px-3 py-1 w-[60px] text-center">HIGH</p>

                        </div>
                    </div>
                </div>
    `
    modalBody.appendChild(newDiv);
    modal.showModal();
}

const loadDetails = async(id)=>{

    showSpinner(true);
    const serverData = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`).then(response => response.json());

    displayModal(serverData.data);
    
    showSpinner(false);
}



const displayIssues = (Issues) => {
    const issuesContainer = document.getElementById("card-container");
    issuesContainer.innerHTML = "";
    issueCount.innerText = `${Issues.length} Issues`;
    Issues.forEach(Issue => {
        let newDiv = document.createElement("div");

        const labelsHTML = Issue.labels.map(label => 
            `
                <p class="text-[#D97706] text-[12px] font-medium bg-[#D977061a] rounded-full px-6 py-1 text-center"> ${label} </p>
            `
        ).join("");

        newDiv.innerHTML = `
                <div onclick="loadDetails(${Issue.id})" class="shadow-md rounded-md border-t-2 ${Issue.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]"} space-y-3 p-4">
                    <div class="flex justify-between items-center">
                        <img src="${Issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}" alt="">
                        <p
                            class="text-[${Issue.priority === "high" ? "#EF4444" : Issue.priority === "medium" ? "#F59E0B" : "#9CA3AF"}] text-[12px] font-medium bg-[${Issue.priority === "high" ? "#EF44441a" : Issue.priority === "medium" ? "#F59E0B1a" : "#9CA3AF1a"}] rounded-full px-6 py-1 text-center">
                            ${Issue.priority.toUpperCase()}</p>
                    </div>
                    <h3 class="text-[14px] font-semibold">${Issue.title}</h3>
                    <p class="text-[12px] text-[#64748B]">${Issue.description}</p>
                    <div class="flex gap-1">
                        ${labelsHTML}
                    </div>
                    <div class="border-t-[1px] border-gray-300 mt-[12px] pt-3">
                        <p class="text-[#64748B] text-[12px]">#${Issue.id} by ${Issue.author}</p>
                        <p class="text-[#64748B] text-[12px]">${Issue.createdAt}</p>
                    </div>
                </div>

        `
        issuesContainer.appendChild(newDiv);

    });
}

loadIssues();


const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closedBtn = document.getElementById("closed");
const srcBtn = document.getElementById("src-btn");


allBtn.addEventListener("click",()=>{

    let btns = document.getElementsByClassName("btn");
    for (let btn of btns) {
        btn.classList.add("btn-outline");
    }
    allBtn.classList.remove("btn-outline");
    loadIssues();
});
openBtn.addEventListener("click",()=>{
    let btns = document.getElementsByClassName("btn");
    for (let btn of btns) {
        btn.classList.add("btn-outline");
    }
    openBtn.classList.remove("btn-outline");
    loadOpen();
});
closedBtn.addEventListener("click",()=>{
    let btns = document.getElementsByClassName("btn");
    for (let btn of btns) {
        btn.classList.add("btn-outline");
    }
    closedBtn.classList.remove("btn-outline");
    loadClosed();
});

srcBtn.addEventListener("click",()=>{
    let btns = document.getElementsByClassName("btn");
    for (let btn of btns) {
        btn.classList.add("btn-outline");
    }
    srcBtn.classList.remove("btn-outline");
    const srcText = document.getElementById("src-box").value;
    loadSrc(srcText);
});